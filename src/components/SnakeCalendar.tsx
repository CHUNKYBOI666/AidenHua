import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { ActivityCalendar, type Activity } from "react-activity-calendar";
import {
  eachDayOfInterval,
  formatISO,
  parseISO,
  getDay,
  subWeeks,
  nextDay,
  differenceInCalendarDays,
  type Day,
} from "date-fns";

/** Slower cadence for comfortable play */
const TICK_MS = 260;
const LABEL_MARGIN = 8;
const MAX_SNAKE_LENGTH = 5;
/** Empty hold before color fade begins — lengthens overall regen */
const REGEN_HOLD_MS = 4000;
/** Color ramp timing (unchanged visual pace) */
const COLOR_REGEN_BASE_MS = 2200;
const COLOR_REGEN_PER_LEVEL_MS = 450;
const REGEN_TICK_MS = 50;

function colorRegenMs(level: number) {
  return COLOR_REGEN_BASE_MS + level * COLOR_REGEN_PER_LEVEL_MS;
}

function totalRegenMs(level: number) {
  return REGEN_HOLD_MS + colorRegenMs(level);
}

/** Smooth 0→1 curve so cells fade in instead of popping */
function regenOpacity(progress: number) {
  const t = Math.max(0, Math.min(1, progress));
  return t * t * (3 - 2 * t);
}

type DevouredEntry = {
  eatenAt: number;
  key: string;
  activity: Activity;
};

/** Very light yellow snake blocks (classic grid snake, not circles) */
const SNAKE_FILL = "#fffbeb";
const SNAKE_STROKE = "#f5e8c8";

function range(fromArg: number, toArg?: number): number[] {
  const from = toArg === undefined ? 0 : fromArg;
  const to = toArg ?? fromArg;
  if (to <= from) {
    throw new RangeError("Invalid range");
  }
  return Array.from({ length: to - from }, (_, i) => from + i);
}

function fillHoles(activities: Activity[]): Activity[] {
  const calendar = new Map(activities.map((a) => [a.date, a]));
  const firstActivity = activities[0];
  const lastActivity = activities[activities.length - 1];
  return eachDayOfInterval({
    start: parseISO(firstActivity.date),
    end: parseISO(lastActivity.date),
  }).map((day) => {
    const date = formatISO(day, { representation: "date" });
    const existing = calendar.get(date);
    if (existing) return existing;
    return { date, count: 0, level: 0 };
  });
}

/** Mirrors react-activity-calendar grid: columns = weeks, rows = weekday index (Sun–Sat when weekStart=0). */
function groupByWeeks(
  activities: Activity[],
  weekStart: Day = 0
): (Activity | undefined)[][] {
  const normalizedActivities = fillHoles(activities);
  const firstActivity = normalizedActivities[0];
  const firstDate = parseISO(firstActivity.date);
  const firstCalendarDate =
    getDay(firstDate) === weekStart
      ? firstDate
      : subWeeks(nextDay(firstDate, weekStart), 1);

  const padCount = differenceInCalendarDays(firstDate, firstCalendarDate);
  const paddedActivities: (Activity | undefined)[] = [
    ...Array(padCount).fill(undefined),
    ...normalizedActivities,
  ];
  const numberOfWeeks = Math.ceil(paddedActivities.length / 7);
  return range(numberOfWeeks).map((weekIndex) =>
    paddedActivities.slice(weekIndex * 7, weekIndex * 7 + 7)
  );
}

function cellKey(col: number, row: number) {
  return `${col},${row}`;
}

type Dir = { dc: number; dr: number };

function opposite(a: Dir, b: Dir): boolean {
  return a.dc === -b.dc && a.dr === -b.dr;
}

async function fetchCalendarData(username: string, year: string | number) {
  const apiUrl = "https://github-contributions-api.jogruber.de/v4/";
  const response = await fetch(`${apiUrl}${username}?y=${String(year)}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error ?? "Failed to load contributions");
  }
  return data as { contributions: Activity[] };
}

export type SnakeCalendarProps = {
  username: string;
  year?: string | number;
  blockSize?: number;
  blockMargin?: number;
  blockRadius?: number;
  fontSize?: number;
  showTotalCount?: boolean;
  showColorLegend?: boolean;
  showMonthLabels?: boolean;
  theme?: {
    light: string[];
    dark?: string[];
  };
  /** Same contract as `GitHubCalendar`: receives raw API contributions, return shaped list. */
  transformData?: (contributions: Activity[]) => Activity[];
  /** Shrink blocks to fit container width (use on narrow/mobile layouts). */
  fitToWidth?: boolean;
};

export function SnakeCalendar({
  username,
  year = "last",
  blockSize = 12,
  blockMargin = 6,
  blockRadius = 0,
  fontSize = 14,
  showTotalCount = false,
  showColorLegend = false,
  showMonthLabels = true,
  theme = {
    light: ["#eeeeee", "#767676", "#676767", "#4d4d4d", "#1a1a1a"],
  },
  transformData: transformFn,
  fitToWidth = false,
}: SnakeCalendarProps) {
  const weekStart: Day = 0;

  /** Inline `transformData` from parents must not reset derived state every render. */
  const transformRef = useRef(transformFn);
  transformRef.current = transformFn;

  const [rawContributions, setRawContributions] = useState<Activity[] | null>(
    null
  );
  const [fetchError, setFetchError] = useState<string | null>(null);

  const contributions = useMemo(() => {
    if (!rawContributions) return null;
    const fn = transformRef.current;
    return fn ? fn(rawContributions) : rawContributions;
  }, [rawContributions]);

  const weeks = useMemo(() => {
    if (!contributions?.length) return null;
    return groupByWeeks(contributions, weekStart);
  }, [contributions, weekStart]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [fittedBlockSize, setFittedBlockSize] = useState(blockSize);

  useEffect(() => {
    setFittedBlockSize(blockSize);
  }, [blockSize]);

  useEffect(() => {
    if (!fitToWidth) {
      setFittedBlockSize(blockSize);
      return;
    }

    const node = containerRef.current;
    if (!node || !weeks?.length) return;

    const fit = () => {
      const available = node.clientWidth;
      if (available <= 0) return;
      const cols = weeks.length;
      const fitted = Math.floor((available + blockMargin) / cols - blockMargin);
      setFittedBlockSize(Math.max(4, Math.min(blockSize, fitted)));
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(node);
    return () => ro.disconnect();
  }, [weeks, blockSize, blockMargin, fitToWidth]);

  const blockScale = fittedBlockSize / blockSize;
  const fittedFontSize = Math.max(8, Math.round(fontSize * blockScale));
  const labelHeight = showMonthLabels ? fittedFontSize + LABEL_MARGIN : 0;

  const dimensions = useMemo(() => {
    if (!weeks?.length) return null;
    const width =
      weeks.length * (fittedBlockSize + blockMargin) - blockMargin;
    const height =
      labelHeight + (fittedBlockSize + blockMargin) * 7 - blockMargin;
    return { width, height };
  }, [weeks, fittedBlockSize, blockMargin, labelHeight]);

  const gridMeta = useMemo(() => {
    if (!weeks) return null;
    const numCols = weeks.length;
    const numRows = 7;

    const isWalkable = (col: number, row: number) => {
      const cell = weeks[col]?.[row];
      return cell !== undefined;
    };

    const allCommitKeys = new Set<string>();
    for (let c = 0; c < numCols; c++) {
      for (let r = 0; r < numRows; r++) {
        const a = weeks[c][r];
        if (a && a.count > 0) {
          allCommitKeys.add(cellKey(c, r));
        }
      }
    }

    function nextInDirection(c: number, r: number, dir: Dir): { col: number; row: number } {
      let nc = c;
      let nr = r;
      for (let step = 0; step < numCols * numRows; step++) {
        if (dir.dc !== 0) {
          nc = (nc + dir.dc + numCols) % numCols;
        }
        if (dir.dr !== 0) {
          nr = (nr + dir.dr + numRows) % numRows;
        }
        if (isWalkable(nc, nr)) {
          return { col: nc, row: nr };
        }
      }
      return { col: c, row: r };
    }

    return {
      weeks,
      numCols,
      numRows,
      isWalkable,
      allCommitKeys,
      nextInDirection,
    };
  }, [weeks]);

  const directionRef = useRef<Dir>({ dc: 1, dr: 0 });
  const pendingDirRef = useRef<Dir | null>(null);

  const [snake, setSnake] = useState<{ col: number; row: number }[]>([]);
  const [food, setFood] = useState<Set<string>>(() => new Set());
  /** Contribution cells eaten — regenerate gradually based on eat time and level */
  const [devouredCells, setDevouredCells] = useState<Map<string, DevouredEntry>>(
    () => new Map()
  );
  const [regenTick, setRegenTick] = useState(0);

  const calendarData = useMemo(() => {
    if (!contributions?.length) return [];
    const now = Date.now();
    return contributions.map((a) => {
      const entry = devouredCells.get(a.date);
      if (!entry) return a;

      if (now - entry.eatenAt >= totalRegenMs(entry.activity.level)) {
        return entry.activity;
      }

      return { ...entry.activity, level: 0, count: 0 };
    });
  }, [contributions, devouredCells, regenTick]);

  const regeneratingOverlays = useMemo(() => {
    const now = Date.now();
    const palette = theme.light;
    const overlays: {
      key: string;
      col: number;
      row: number;
      fill: string;
      opacity: number;
    }[] = [];

    for (const entry of devouredCells.values()) {
      const elapsed = now - entry.eatenAt;
      const colorMs = colorRegenMs(entry.activity.level);
      if (elapsed < REGEN_HOLD_MS || elapsed >= REGEN_HOLD_MS + colorMs) {
        continue;
      }

      const colorProgress = (elapsed - REGEN_HOLD_MS) / colorMs;
      const [col, row] = entry.key.split(",").map(Number);
      const level = Math.min(entry.activity.level, palette.length - 1);
      overlays.push({
        key: entry.key,
        col,
        row,
        fill: palette[level],
        opacity: regenOpacity(colorProgress),
      });
    }

    return overlays;
  }, [devouredCells, regenTick, theme.light]);

  useEffect(() => {
    let cancelled = false;
    setFetchError(null);
    setRawContributions(null);
    fetchCalendarData(username, year)
      .then((data) => {
        if (!cancelled) setRawContributions(data.contributions);
      })
      .catch((e: Error) => {
        if (!cancelled) setFetchError(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, [username, year]);

  useEffect(() => {
    if (!gridMeta || !contributions?.length) {
      setSnake([]);
      setFood(new Set());
      setDevouredCells(new Map());
      return;
    }

    const { numCols, numRows, allCommitKeys, weeks: w } = gridMeta;

    let startCol = 0;
    let startRow = 0;
    let found = false;
    for (let c = 0; c < numCols && !found; c++) {
      for (let r = 0; r < numRows; r++) {
        const a = w[c][r];
        if (a !== undefined && a.count === 0) {
          startCol = c;
          startRow = r;
          found = true;
          break;
        }
      }
    }
    if (!found) {
      for (let c = 0; c < numCols && !found; c++) {
        for (let r = 0; r < numRows; r++) {
          if (w[c][r] !== undefined) {
            startCol = c;
            startRow = r;
            found = true;
            break;
          }
        }
      }
    }

    const startKey = cellKey(startCol, startRow);
    const snakeKeys = new Set([startKey]);

    const initialFood = new Set<string>();
    for (const key of allCommitKeys) {
      if (!snakeKeys.has(key)) initialFood.add(key);
    }

    setSnake([{ col: startCol, row: startRow }]);
    setFood(initialFood);
    setDevouredCells(new Map());
    directionRef.current = { dc: 1, dr: 0 };
    pendingDirRef.current = null;
  }, [gridMeta, contributions]);

  const snakeRef = useRef(snake);
  const foodRef = useRef(food);
  const devouredCellsRef = useRef(devouredCells);
  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);
  useEffect(() => {
    foodRef.current = food;
  }, [food]);
  useEffect(() => {
    devouredCellsRef.current = devouredCells;
  }, [devouredCells]);

  useEffect(() => {
    if (!gridMeta) return;

    const tick = () => {
      const meta = gridMeta;
      if (pendingDirRef.current) {
        const next = pendingDirRef.current;
        if (!opposite(next, directionRef.current)) {
          directionRef.current = next;
        }
        pendingDirRef.current = null;
      }

      const dir = directionRef.current;
      const body = snakeRef.current;
      const foodSet = foodRef.current;
      if (body.length === 0) return;

      const head = body[0];
      const nextPos = meta.nextInDirection(head.col, head.row, dir);
      const nextKey = cellKey(nextPos.col, nextPos.row);

      const hitsBody = body
        .slice(0, -1)
        .some((seg) => cellKey(seg.col, seg.row) === nextKey);
      if (hitsBody) return;

      const eating = foodSet.has(nextKey);

      let newSnake: { col: number; row: number }[];
      if (eating) {
        newSnake = [nextPos, ...body];
        if (newSnake.length > MAX_SNAKE_LENGTH) {
          newSnake = newSnake.slice(0, MAX_SNAKE_LENGTH);
        }
      } else {
        newSnake = [nextPos, ...body.slice(0, -1)];
      }

      let newFood = new Set(foodSet);
      if (eating) {
        newFood.delete(nextKey);
      }

      const eatenCell = meta.weeks[nextPos.col][nextPos.row];
      const eatenDate =
        eating && eatenCell ? eatenCell.date : null;

      snakeRef.current = newSnake;
      foodRef.current = newFood;
      setSnake(newSnake);
      setFood(newFood);
      if (eating && eatenDate && eatenCell) {
        setDevouredCells((prev) => {
          const next = new Map(prev);
          next.set(eatenDate, {
            eatenAt: Date.now(),
            key: nextKey,
            activity: { ...eatenCell },
          });
          return next;
        });
      }
    };

    const id = window.setInterval(tick, TICK_MS);
    return () => window.clearInterval(id);
  }, [gridMeta]);

  useEffect(() => {
    const id = window.setInterval(() => {
      const now = Date.now();
      setRegenTick((t) => t + 1);

      const prev = devouredCellsRef.current;
      if (prev.size === 0) return;

      const restoredKeys: string[] = [];
      const next = new Map(prev);

      for (const [date, entry] of prev) {
        if (now - entry.eatenAt >= totalRegenMs(entry.activity.level)) {
          next.delete(date);
          restoredKeys.push(entry.key);
        }
      }

      if (restoredKeys.length === 0) return;

      devouredCellsRef.current = next;
      setDevouredCells(next);

      const occupied = new Set(
        snakeRef.current.map((s) => cellKey(s.col, s.row))
      );
      setFood((foodPrev) => {
        const foodNext = new Set(foodPrev);
        for (const key of restoredKeys) {
          if (!occupied.has(key)) foodNext.add(key);
        }
        foodRef.current = foodNext;
        return foodNext;
      });
    }, REGEN_TICK_MS);

    return () => window.clearInterval(id);
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      let dir: Dir | null = null;
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          dir = { dc: 0, dr: -1 };
          break;
        case "ArrowDown":
        case "s":
        case "S":
          dir = { dc: 0, dr: 1 };
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          dir = { dc: -1, dr: 0 };
          break;
        case "ArrowRight":
        case "d":
        case "D":
          dir = { dc: 1, dr: 0 };
          break;
        default:
          return;
      }
      e.preventDefault();
      pendingDirRef.current = dir;
    },
    []
  );

  const labels = useMemo(
    () => ({
      totalCount:
        year === "last"
          ? "{{count}} contributions in the last year"
          : "{{count}} contributions in {{year}}",
    }),
    [year]
  );

  if (fetchError) {
    return (
      <div className="text-[11px] text-red-600 max-w-[280px]">
        {fetchError}
      </div>
    );
  }

  const waitingForFetch = rawContributions === null;

  if (waitingForFetch) {
    return (
      <ActivityCalendar
        className="snake-calendar"
        data={[]}
        loading
        colorScheme="light"
        blockSize={blockSize}
        blockMargin={blockMargin}
        blockRadius={blockRadius}
        fontSize={fontSize}
        showTotalCount={showTotalCount}
        showColorLegend={showColorLegend}
        showMonthLabels={showMonthLabels}
        theme={theme}
        labels={labels}
        maxLevel={4}
      />
    );
  }

  if (
    !contributions?.length ||
    !weeks ||
    !dimensions ||
    !gridMeta
  ) {
    return (
      <div className="text-[11px] text-[#888888] max-w-[280px]">
        No contribution days in this range to play on.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 ${fitToWidth ? "w-full max-w-full overflow-hidden" : "inline-block w-max max-w-full"}`}
      tabIndex={0}
      role="application"
      aria-label="Snake game on contribution calendar. Use arrow keys or WASD."
      onKeyDown={onKeyDown}
      onPointerDown={() => containerRef.current?.focus()}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <ActivityCalendar
        className="snake-calendar"
        data={calendarData}
        loading={false}
        colorScheme="light"
        blockSize={fittedBlockSize}
        blockMargin={blockMargin}
        blockRadius={blockRadius}
        fontSize={fittedFontSize}
        showTotalCount={showTotalCount}
        showColorLegend={showColorLegend}
        showMonthLabels={showMonthLabels}
        theme={theme}
        labels={labels}
        maxLevel={4}
        weekStart={weekStart}
      />

      <svg
        className="pointer-events-none absolute left-0 top-[2px] z-10 overflow-hidden"
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        aria-hidden
      >
        {regeneratingOverlays.map((cell) => {
          const x = cell.col * (fittedBlockSize + blockMargin);
          const y = labelHeight + cell.row * (fittedBlockSize + blockMargin);
          return (
            <rect
              key={`regen-${cell.key}`}
              x={x}
              y={y}
              width={fittedBlockSize}
              height={fittedBlockSize}
              rx={blockRadius}
              ry={blockRadius}
              fill={cell.fill}
              opacity={cell.opacity}
            />
          );
        })}
        {snake.map((seg, i) => {
          const x = seg.col * (fittedBlockSize + blockMargin);
          const y =
            labelHeight + seg.row * (fittedBlockSize + blockMargin);
          const isHead = i === 0;
          return (
            <rect
              key={`${seg.col}-${seg.row}-${i}`}
              x={x}
              y={y}
              width={fittedBlockSize}
              height={fittedBlockSize}
              rx={blockRadius}
              ry={blockRadius}
              fill={SNAKE_FILL}
              stroke={SNAKE_STROKE}
              strokeWidth={isHead ? 1.1 : 0.85}
              opacity={0.98}
            />
          );
        })}
      </svg>
    </div>
  );
}
