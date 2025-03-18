
import React from 'react';
import { cn } from '@/lib/utils';
import { ContainerStatus, NodeStatus } from '@/lib/data';

interface StatusBadgeProps {
  status: ContainerStatus | NodeStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusClass = 
    status === 'running' || status === 'online' 
      ? 'status-running' 
      : status === 'stopped' || status === 'offline' 
        ? 'status-stopped' 
        : 'status-paused';
  
  return (
    <div className={cn("status-badge", statusClass)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};

export default StatusBadge;
