
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  progressValue?: number;
  progressColor?: string;
  animationDelay?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  value,
  progressValue,
  progressColor = 'bg-primary',
  animationDelay
}) => {
  return (
    <div 
      className="glass p-5 rounded-lg shadow-sm animate-scale-in" 
      style={{ animationDelay }}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-lg font-semibold">{value}</p>
        </div>
      </div>
      {progressValue !== undefined && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
          <div 
            className={cn("h-full rounded-full", progressColor)} 
            style={{ width: `${progressValue}%` }} 
          />
        </div>
      )}
    </div>
  );
};

export default MetricCard;
