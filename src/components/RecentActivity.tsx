import { GitCommit, Book, ChevronDown } from 'lucide-react';
import { ACTIVITIES } from '../constants';

export default function RecentActivity() {
  return (
    <div className="mt-8">
      <h3 className="text-base font-medium text-gray-900 mb-4">Contribution activity</h3>
      
      <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-px before:bg-gray-200">
        {ACTIVITIES.map((activity) => (
          <div key={activity.id} className="relative pl-8">
            <div className="absolute left-0 top-0 w-6 h-6 bg-gray-100 border border-gray-200 flex items-center justify-center z-10">
              {activity.type === 'commit' ? (
                <GitCommit size={14} className="text-gray-600" />
              ) : (
                <Book size={14} className="text-gray-600" />
              )}
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-900">
                {activity.title}
              </h4>
              <span className="text-xs text-gray-500">{activity.date}</span>
            </div>

            {activity.details && (
              <ul className="space-y-1">
                {activity.details.map((detail, i) => (
                  <li key={i} className="text-sm text-blue-600 hover:underline cursor-pointer">
                    {detail}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 h-1.5 w-full bg-gray-100 overflow-hidden flex">
              <div className="h-full bg-green-500" style={{ width: '80%' }} />
              <div className="h-full bg-green-300" style={{ width: '20%' }} />
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-8 py-2 border border-gray-200 text-sm font-medium text-blue-600 hover:bg-gray-50 transition-colors">
        Show more activity
      </button>
    </div>
  );
}
