
import React from 'react';
import { Calendar, Database, Shield } from 'lucide-react';
import { Container } from '@/lib/data';
import { formatBytes } from '@/lib/data';
import ActivityItem from '../dashboard/ActivityItem';

interface ContainerActivityLogProps {
  container: Container;
}

const ContainerActivityLog: React.FC<ContainerActivityLogProps> = ({ container }) => {
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Activity Log</h2>
      <div className="glass p-5 rounded-lg shadow-sm">
        <div className="space-y-4">
          <ActivityItem 
            icon={<Calendar size={14} className="text-blue-500" />}
            title="Container started"
            timestamp="Yesterday at 14:23"
          />
          <ActivityItem 
            icon={<Database size={14} className="text-orange-500" />}
            title={`Memory increased to ${formatBytes(container.memory * 1024 * 1024)}`}
            timestamp="3 days ago at 09:11"
          />
          <ActivityItem 
            icon={<Shield size={14} className="text-green-500" />}
            title="Security update applied"
            timestamp="1 week ago at 03:15"
          />
        </div>
      </div>
    </div>
  );
};

export default ContainerActivityLog;
