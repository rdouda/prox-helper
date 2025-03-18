
import React from 'react';
import { Box, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container, ContainerStatus, ContainerType } from '@/lib/data';

interface ContainerItemProps {
  container: Container;
  isActive: boolean;
  onClick: () => void;
}

const getStatusColor = (status: ContainerStatus) => {
  switch (status) {
    case 'running':
      return 'text-green-500';
    case 'stopped':
      return 'text-red-500';
    case 'paused':
      return 'text-yellow-500';
    default:
      return 'text-gray-500';
  }
};

const getContainerIcon = (type: ContainerType) => {
  switch (type) {
    case 'lxc':
      return <Box size={14} className="flex-shrink-0" />;
    case 'qemu':
      return <Circle size={14} className="flex-shrink-0" />;
    default:
      return null;
  }
};

const ContainerItem: React.FC<ContainerItemProps> = ({ 
  container, 
  isActive, 
  onClick 
}) => {
  return (
    <div 
      className={cn(
        "container-item group",
        isActive && "active"
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-2.5">
        {getContainerIcon(container.type)}
        <span className="text-sm truncate">{container.name}</span>
        <Circle 
          size={8} 
          className={cn(
            "flex-shrink-0 ml-auto", 
            getStatusColor(container.status)
          )} 
          fill="currentColor" 
        />
      </div>
    </div>
  );
};

export default ContainerItem;
