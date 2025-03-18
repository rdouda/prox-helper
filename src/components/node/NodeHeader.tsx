
import React from 'react';
import { Node } from '@/lib/data';
import StatusBadge from '../dashboard/StatusBadge';

interface NodeHeaderProps {
  node: Node;
}

const NodeHeader: React.FC<NodeHeaderProps> = ({ node }) => {
  return (
    <header className="mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{node.name}</h1>
        <StatusBadge status={node.status} />
      </div>
      <p className="text-sm text-muted-foreground">{node.ip}</p>
    </header>
  );
};

export default NodeHeader;
