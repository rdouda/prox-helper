
import React from 'react';
import { Container } from '@/lib/data';
import StatusBadge from '../dashboard/StatusBadge';

interface ContainerHeaderProps {
  container: Container;
  nodeName?: string;
}

const ContainerHeader: React.FC<ContainerHeaderProps> = ({ container, nodeName }) => {
  return (
    <header className="mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{container.name}</h1>
        <StatusBadge status={container.status} />
      </div>
      <p className="text-sm text-muted-foreground">
        {container.type.toUpperCase()} Container {nodeName ? `on ${nodeName}` : ''}
      </p>
    </header>
  );
};

export default ContainerHeader;
