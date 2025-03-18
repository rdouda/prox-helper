
import React from 'react';
import { Node } from '@/lib/data';
import NodeHeader from './NodeHeader';
import NodeMetrics from './NodeMetrics';
import NodeContainersTable from './NodeContainersTable';
import PerformancePanel from '../dashboard/PerformancePanel';

interface NodeDetailsViewProps {
  selectedNode: Node;
}

const NodeDetailsView: React.FC<NodeDetailsViewProps> = ({ selectedNode }) => {
  return (
    <div className="h-full bg-dashboard-content-bg p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <NodeHeader node={selectedNode} />
        <NodeMetrics node={selectedNode} />
        <NodeContainersTable containers={selectedNode.containers} />
        <PerformancePanel />
      </div>
    </div>
  );
};

export default NodeDetailsView;
