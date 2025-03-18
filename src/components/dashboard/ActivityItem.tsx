
import React, { ReactNode } from 'react';

interface ActivityItemProps {
  icon: ReactNode;
  title: string;
  timestamp: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ icon, title, timestamp }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-full flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
