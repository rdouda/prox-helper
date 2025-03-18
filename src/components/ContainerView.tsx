import React from 'react';
import { Node, Container, formatBytes, formatUptime, containerActions, nodeActions } from '@/lib/data';
import { Server, Cpu, HardDrive, Clock, Network, Shield, Calendar, BarChart2, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContainerViewProps {
  selectedNode: Node | null;
  selectedContainer: Container | null;
  selectedAction: string | null;
}

const ContainerView: React.FC<ContainerViewProps> = ({
  selectedNode,
  selectedContainer,
  selectedAction,
}) => {
  if (!selectedNode && !selectedContainer) {
    return (
      <div className="flex items-center justify-center h-full bg-dashboard-content-bg">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">Welcome to Proxmox Dashboard</h2>
          <p className="text-muted-foreground">Select a node or container to view details</p>
        </div>
      </div>
    );
  }

  // Container view
  if (selectedContainer) {
    return (
      <div className="h-full bg-dashboard-content-bg p-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <header className="mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">{selectedContainer.name}</h1>
              <div className={cn(
                "status-badge",
                `status-${selectedContainer.status}`
              )}>
                {selectedContainer.status.charAt(0).toUpperCase() + selectedContainer.status.slice(1)}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {selectedContainer.type.toUpperCase()} Container on {selectedNode?.name}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="glass p-5 rounded-lg shadow-sm animate-scale-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Cpu size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">CPU</h3>
                  <p className="text-lg font-semibold">{selectedContainer.cpu} vCPU</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full rounded-full" 
                  style={{ width: `${Math.min(selectedContainer.cpu * 15, 100)}%` }} 
                />
              </div>
            </div>

            <div className="glass p-5 rounded-lg shadow-sm animate-scale-in" style={{ animationDelay: '50ms' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-md">
                  <Database size={20} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Memory</h3>
                  <p className="text-lg font-semibold">{formatBytes(selectedContainer.memory * 1024 * 1024)}</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-500 h-full rounded-full" 
                  style={{ width: '65%' }} 
                />
              </div>
            </div>

            <div className="glass p-5 rounded-lg shadow-sm animate-scale-in" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/10 rounded-md">
                  <HardDrive size={20} className="text-purple-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Storage</h3>
                  <p className="text-lg font-semibold">{formatBytes(selectedContainer.disk)}</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-purple-500 h-full rounded-full" 
                  style={{ width: '40%' }} 
                />
              </div>
            </div>

            <div className="glass p-5 rounded-lg shadow-sm animate-scale-in" style={{ animationDelay: '150ms' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-md">
                  <Clock size={20} className="text-green-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Uptime</h3>
                  <p className="text-lg font-semibold">
                    {selectedContainer.status === 'running' 
                      ? formatUptime(selectedContainer.uptime) 
                      : 'Not running'}
                  </p>
                </div>
              </div>
            </div>

            <div className="glass p-5 rounded-lg shadow-sm animate-scale-in" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 rounded-md">
                  <Network size={20} className="text-orange-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Network</h3>
                  <p className="text-lg font-semibold">{selectedContainer.ip}</p>
                </div>
              </div>
            </div>

            <div className="glass p-5 rounded-lg shadow-sm animate-scale-in" style={{ animationDelay: '250ms' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded-md">
                  <Shield size={20} className="text-red-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Protection</h3>
                  <p className="text-lg font-semibold">Enabled</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">Performance</h2>
            <div className="glass p-5 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">Resource Usage</h3>
                <div className="flex items-center gap-2">
                  <select className="text-xs bg-transparent border border-gray-300 dark:border-gray-700 rounded px-2 py-1">
                    <option>Last hour</option>
                    <option>Last day</option>
                    <option>Last week</option>
                  </select>
                </div>
              </div>
              
              <div className="h-60 flex items-center justify-center">
                <div className="flex items-center gap-6">
                  <BarChart2 size={100} className="text-muted-foreground/30" />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Performance data is available</p>
                    <button className="text-xs text-primary font-medium hover:underline">
                      View detailed metrics
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-4">Activity Log</h2>
            <div className="glass p-5 rounded-lg shadow-sm">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-full flex-shrink-0 mt-0.5">
                    <Calendar size={14} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Container started</p>
                    <p className="text-xs text-muted-foreground">Yesterday at 14:23</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-full flex-shrink-0 mt-0.5">
                    <Database size={14} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Memory increased to {formatBytes(selectedContainer.memory * 1024 * 1024)}</p>
                    <p className="text-xs text-muted-foreground">3 days ago at 09:11</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-500/10 rounded-full flex-shrink-0 mt-0.5">
                    <Shield size={14} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Security update applied</p>
                    <p className="text-xs text-muted-foreground">1 week ago at 03:15</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Node view
  return (
    <div className="h-full bg-dashboard-content-bg p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">{selectedNode.name}</h1>
            <div className={cn(
              "status-badge",
              selectedNode.status === 'online' ? 'status-running' : 
              selectedNode.status === 'offline' ? 'status-stopped' : 'status-paused'
            )}>
              {selectedNode.status.charAt(0).toUpperCase() + selectedNode.status.slice(1)}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{selectedNode.ip}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="glass p-5 rounded-lg shadow-sm animate-scale-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-md">
                <Cpu size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium">CPU Usage</h3>
                <p className="text-lg font-semibold">{selectedNode.cpuUsage}%</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full" 
                style={{ width: `${selectedNode.cpuUsage}%` }} 
              />
            </div>
          </div>

          <div className="glass p-5 rounded-lg shadow-sm animate-scale-in" style={{ animationDelay: '50ms' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-md">
                <Database size={20} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Memory</h3>
                <p className="text-lg font-semibold">{formatBytes(selectedNode.memoryUsed)} / {formatBytes(selectedNode.memoryTotal)}</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-500 h-full rounded-full" 
                style={{ width: `${(selectedNode.memoryUsed / selectedNode.memoryTotal) * 100}%` }} 
              />
            </div>
          </div>

          <div className="glass p-5 rounded-lg shadow-sm animate-scale-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/10 rounded-md">
                <HardDrive size={20} className="text-purple-500" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Storage</h3>
                <p className="text-lg font-semibold">{formatBytes(selectedNode.storageUsed)} / {formatBytes(selectedNode.storageTotal)}</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-purple-500 h-full rounded-full" 
                style={{ width: `${(selectedNode.storageUsed / selectedNode.storageTotal) * 100}%` }} 
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Containers ({selectedNode.containers.length})</h2>
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
                  {selectedNode.containers.map((container) => (
                    <tr key={container.id} className="border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="py-3 text-sm font-medium">{container.name}</td>
                      <td className="py-3">
                        <div className={cn(
                          "status-badge",
                          `status-${container.status}`
                        )}>
                          {container.status.charAt(0).toUpperCase() + container.status.slice(1)}
                        </div>
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

        <div>
          <h2 className="text-xl font-medium mb-4">Performance</h2>
          <div className="glass p-5 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Resource Usage</h3>
              <div className="flex items-center gap-2">
                <select className="text-xs bg-transparent border border-gray-300 dark:border-gray-700 rounded px-2 py-1">
                  <option>Last hour</option>
                  <option>Last day</option>
                  <option>Last week</option>
                </select>
              </div>
            </div>
            
            <div className="h-60 flex items-center justify-center">
              <div className="flex items-center gap-6">
                <BarChart2 size={100} className="text-muted-foreground/30" />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Performance data is available</p>
                  <button className="text-xs text-primary font-medium hover:underline">
                    View detailed metrics
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerView;
