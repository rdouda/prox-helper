
import React from 'react';
import { Cpu, Database, HardDrive, Clock, Network, Shield } from 'lucide-react';
import { Container } from '@/lib/data';
import { formatBytes, formatUptime } from '@/lib/data';
import MetricCard from '../dashboard/MetricCard';

interface ContainerMetricsProps {
  container: Container;
}

const ContainerMetrics: React.FC<ContainerMetricsProps> = ({ container }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <MetricCard 
        icon={<div className="p-2 bg-primary/10 rounded-md">
          <Cpu size={20} className="text-primary" />
        </div>}
        title="CPU"
        value={`${container.cpu} vCPU`}
        progressValue={Math.min(container.cpu * 15, 100)}
      />
      
      <MetricCard 
        icon={<div className="p-2 bg-blue-500/10 rounded-md">
          <Database size={20} className="text-blue-500" />
        </div>}
        title="Memory"
        value={formatBytes(container.memory * 1024 * 1024)}
        progressValue={65}
        progressColor="bg-blue-500"
        animationDelay="50ms"
      />
      
      <MetricCard 
        icon={<div className="p-2 bg-purple-500/10 rounded-md">
          <HardDrive size={20} className="text-purple-500" />
        </div>}
        title="Storage"
        value={formatBytes(container.disk)}
        progressValue={40}
        progressColor="bg-purple-500"
        animationDelay="100ms"
      />
      
      <MetricCard 
        icon={<div className="p-2 bg-green-500/10 rounded-md">
          <Clock size={20} className="text-green-500" />
        </div>}
        title="Uptime"
        value={container.status === 'running' ? formatUptime(container.uptime) : 'Not running'}
        animationDelay="150ms"
      />
      
      <MetricCard 
        icon={<div className="p-2 bg-orange-500/10 rounded-md">
          <Network size={20} className="text-orange-500" />
        </div>}
        title="Network"
        value={container.ip}
        animationDelay="200ms"
      />
      
      <MetricCard 
        icon={<div className="p-2 bg-red-500/10 rounded-md">
          <Shield size={20} className="text-red-500" />
        </div>}
        title="Protection"
        value="Enabled"
        animationDelay="250ms"
      />
    </div>
  );
};

export default ContainerMetrics;
