
import React from 'react';
import { BarChart2 } from 'lucide-react';

interface PerformancePanelProps {
  title?: string;
}

const PerformancePanel: React.FC<PerformancePanelProps> = ({ title = 'Performance' }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium mb-4">{title}</h2>
      <div className="glass p-5 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium">Resource Usage</h3>
          <div className="flex items-center gap-2">
            <select className="text-xs bg-transparent border border-gray-300 dark:border-gray-700 rounded px-2 py-1">
              <option>Last hour</option>
              <option>Last day</option>
              <option>Last week</option>
            </select>
          </div>
        </div>
        
        <div className="h-60 flex items-center justify-center">
          <div className="flex items-center gap-6">
            <BarChart2 size={100} className="text-muted-foreground/30" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Performance data is available</p>
              <button className="text-xs text-primary font-medium hover:underline">
                View detailed metrics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformancePanel;
