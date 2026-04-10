import { useMemo } from 'react';

export default function ContributionGraph() {
  // Generate a mock grid of contributions
  const grid = useMemo(() => {
    const weeks = 52;
    const days = 7;
    return Array.from({ length: weeks }, () =>
      Array.from({ length: days }, () => Math.floor(Math.random() * 5))
    );
  }, []);

  const getColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-gray-100';
      case 1: return 'bg-green-100';
      case 2: return 'bg-green-300';
      case 3: return 'bg-green-500';
      case 4: return 'bg-green-700';
      default: return 'bg-gray-100';
    }
  };

  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  return (
    <div className="border border-gray-200 p-6 bg-white overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-900">194 contributions in the last year</h3>
        <div className="text-xs text-gray-500 hover:text-blue-600 cursor-pointer">
          Contribution settings ▾
        </div>
      </div>

      <div className="flex gap-1 min-w-max">
        <div className="flex flex-col justify-between text-[10px] text-gray-400 pr-2 pt-6">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between text-[10px] text-gray-400 mb-2 px-1">
            {months.map(m => <span key={m}>{m}</span>)}
          </div>
          <div className="flex gap-1">
            {grid.map((week, i) => (
              <div key={i} className="flex flex-col gap-1">
                {week.map((day, j) => (
                  <div
                    key={j}
                    className={`w-3 h-3 ${getColor(day)} transition-colors hover:ring-1 hover:ring-gray-300`}
                    title={`${day} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 text-[10px] text-gray-500">
        <a href="#" className="hover:text-blue-600">Learn how we count contributions</a>
        <div className="flex items-center gap-1">
          <span>Less</span>
          <div className="w-2.5 h-2.5 bg-gray-100" />
          <div className="w-2.5 h-2.5 bg-green-100" />
          <div className="w-2.5 h-2.5 bg-green-300" />
          <div className="w-2.5 h-2.5 bg-green-500" />
          <div className="w-2.5 h-2.5 bg-green-700" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
