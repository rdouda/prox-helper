
import React from 'react';
import { Node } from '@/lib/data';
import { Cpu, Database, HardDrive } from 'lucide-react';
import { formatBytes } from '@/lib/data';
import MetricCard from '../dashboard/MetricCard';

interface NodeMetricsProps {
  node: Node;
}

const NodeMetrics: React.FC<NodeMetricsProps> = ({ node }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <MetricCard 
        icon={<div className="p-2 bg-primary/10 rounded-md">
          <Cpu size={20} className="text-primary" />
        </div>}
        title="CPU Usage"
        value={`${node.cpuUsage}%`}
        progressValue={node.cpuUsage}
      />
      
      <MetricCard 
        icon={<div className="p-2 bg-blue-500/10 rounded-md">
          <Database size={20} className="text-blue-500" />
        </div>}
        title="Memory"
        value={`${formatBytes(node.memoryUsed)} / ${formatBytes(node.memoryTotal)}`}
        progressValue={(node.memoryUsed / node.memoryTotal) * 100}
        progressColor="bg-blue-500"
        animationDelay="50ms"
      />
      
      <MetricCard 
        icon={<div className="p-2 bg-purple-500/10 rounded-md">
          <HardDrive size={20} className="text-purple-500" />
        </div>}
        title="Storage"
        value={`${formatBytes(node.storageUsed)} / ${formatBytes(node.storageTotal)}`}
        progressValue={(node.storageUsed / node.storageTotal) * 100}
        progressColor="bg-purple-500"
        animationDelay="100ms"
      />
    </div>
  );
};

export default NodeMetrics;
