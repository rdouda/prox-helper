
import React from 'react';
import { Container } from '@/lib/data';
import { formatBytes, formatUptime } from '@/lib/data';
import { cn } from '@/lib/utils';
import StatusBadge from '../dashboard/StatusBadge';

interface NodeContainersTableProps {
  containers: Container[];
}

const NodeContainersTable: React.FC<NodeContainersTableProps> = ({ containers }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium mb-4">Containers ({containers.length})</h2>
      <div className="glass p-5 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 text-xs font-medium text-muted-foreground">NAME</th>
                <th className="pb-3 text-xs font-medium text-muted-foreground">STATUS</th>
                <th className="pb-3 text-xs font-medium text-muted-foreground">TYPE</th>
                <th className="pb-3 text-xs font-medium text-muted-foreground">CPU</th>
                <th className="pb-3 text-xs font-medium text-muted-foreground">MEMORY</th>
                <th className="pb-3 text-xs font-medium text-muted-foreground">DISK</th>
                <th className="pb-3 text-xs font-medium text-muted-foreground">UPTIME</th>
              </tr>
            </thead>
            <tbody>
              {containers.map((container) => (
                <tr key={container.id} className="border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-3 text-sm font-medium">{container.name}</td>
                  <td className="py-3">
                    <StatusBadge status={container.status} />
                  </td>
                  <td className="py-3 text-sm">{container.type.toUpperCase()}</td>
                  <td className="py-3 text-sm">{container.cpu} vCPU</td>
                  <td className="py-3 text-sm">{formatBytes(container.memory * 1024 * 1024)}</td>
                  <td className="py-3 text-sm">{formatBytes(container.disk)}</td>
                  <td className="py-3 text-sm">{container.status === 'running' ? formatUptime(container.uptime) : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NodeContainersTable;
