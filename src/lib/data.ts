
// Node types
export type NodeStatus = 'online' | 'offline' | 'maintenance';
export type ContainerStatus = 'running' | 'stopped' | 'paused';
export type ContainerType = 'lxc' | 'qemu';

export interface Node {
  id: string;
  name: string;
  status: NodeStatus;
  ip: string;
  cpuUsage: number;
  memoryTotal: number;
  memoryUsed: number;
  storageTotal: number;
  storageUsed: number;
  containers: Container[];
}

export interface Container {
  id: string;
  nodeId: string;
  name: string;
  status: ContainerStatus;
  type: ContainerType;
  cpu: number;
  memory: number;
  disk: number;
  uptime: number; // in seconds
  ip: string;
}

export interface Action {
  id: string;
  name: string;
  icon: string;
}

// Sample data
export const nodes: Node[] = [
  {
    id: 'node-1',
    name: 'prod-node-01',
    status: 'online',
    ip: '192.168.1.101',
    cpuUsage: 25,
    memoryTotal: 32768, // 32 GB
    memoryUsed: 12288, // 12 GB
    storageTotal: 1099511627776, // 1 TB
    storageUsed: 439804651110, // 400 GB
    containers: [
      {
        id: 'ct-101',
        nodeId: 'node-1',
        name: 'web-server-1',
        status: 'running',
        type: 'lxc',
        cpu: 2,
        memory: 2048, // 2 GB
        disk: 10737418240, // 10 GB
        uptime: 1209600, // 14 days
        ip: '192.168.1.201',
      },
      {
        id: 'ct-102',
        nodeId: 'node-1',
        name: 'db-server-1',
        status: 'running',
        type: 'qemu',
        cpu: 4,
        memory: 8192, // 8 GB
        disk: 53687091200, // 50 GB
        uptime: 2419200, // 28 days
        ip: '192.168.1.202',
      },
      {
        id: 'ct-103',
        nodeId: 'node-1',
        name: 'cache-1',
        status: 'stopped',
        type: 'lxc',
        cpu: 1,
        memory: 1024, // 1 GB
        disk: 5368709120, // 5 GB
        uptime: 0,
        ip: '192.168.1.203',
      },
    ],
  },
  {
    id: 'node-2',
    name: 'prod-node-02',
    status: 'online',
    ip: '192.168.1.102',
    cpuUsage: 45,
    memoryTotal: 65536, // 64 GB
    memoryUsed: 40960, // 40 GB
    storageTotal: 2199023255552, // 2 TB
    storageUsed: 1099511627776, // 1 TB
    containers: [
      {
        id: 'ct-201',
        nodeId: 'node-2',
        name: 'web-server-2',
        status: 'running',
        type: 'lxc',
        cpu: 2,
        memory: 4096, // 4 GB
        disk: 21474836480, // 20 GB
        uptime: 604800, // 7 days
        ip: '192.168.1.211',
      },
      {
        id: 'ct-202',
        nodeId: 'node-2',
        name: 'db-server-2',
        status: 'running',
        type: 'qemu',
        cpu: 8,
        memory: 16384, // 16 GB
        disk: 107374182400, // 100 GB
        uptime: 1814400, // 21 days
        ip: '192.168.1.212',
      },
      {
        id: 'ct-203',
        nodeId: 'node-2',
        name: 'monitoring',
        status: 'paused',
        type: 'lxc',
        cpu: 2,
        memory: 2048, // 2 GB
        disk: 32212254720, // 30 GB
        uptime: 0,
        ip: '192.168.1.213',
      },
      {
        id: 'ct-204',
        nodeId: 'node-2',
        name: 'backup-server',
        status: 'running',
        type: 'qemu',
        cpu: 4,
        memory: 8192, // 8 GB
        disk: 549755813888, // 512 GB
        uptime: 2592000, // 30 days
        ip: '192.168.1.214',
      },
    ],
  },
  {
    id: 'node-3',
    name: 'dev-node-01',
    status: 'maintenance',
    ip: '192.168.1.103',
    cpuUsage: 10,
    memoryTotal: 16384, // 16 GB
    memoryUsed: 4096, // 4 GB
    storageTotal: 549755813888, // 512 GB
    storageUsed: 274877906944, // 256 GB
    containers: [
      {
        id: 'ct-301',
        nodeId: 'node-3',
        name: 'test-env',
        status: 'stopped',
        type: 'lxc',
        cpu: 1,
        memory: 2048, // 2 GB
        disk: 10737418240, // 10 GB
        uptime: 0,
        ip: '192.168.1.221',
      },
      {
        id: 'ct-302',
        nodeId: 'node-3',
        name: 'dev-box',
        status: 'stopped',
        type: 'qemu',
        cpu: 2,
        memory: 4096, // 4 GB
        disk: 53687091200, // 50 GB
        uptime: 0,
        ip: '192.168.1.222',
      },
    ],
  },
];

// Node-level actions
export const nodeActions: Action[] = [
  { id: 'node-summary', name: 'Summary', icon: 'LayoutDashboard' },
  { id: 'node-containers', name: 'Containers', icon: 'Boxes' },
  { id: 'node-network', name: 'Network', icon: 'Network' },
  { id: 'node-storage', name: 'Storage', icon: 'HardDrive' },
  { id: 'node-backup', name: 'Backup', icon: 'SaveAll' },
  { id: 'node-firewall', name: 'Firewall', icon: 'Shield' },
  { id: 'node-settings', name: 'Settings', icon: 'Settings' },
];

// Container-level actions
export const containerActions: Action[] = [
  { id: 'container-summary', name: 'Summary', icon: 'LayoutDashboard' },
  { id: 'container-console', name: 'Console', icon: 'Terminal' },
  { id: 'container-resources', name: 'Resources', icon: 'BarChart2' },
  { id: 'container-network', name: 'Network', icon: 'Network' },
  { id: 'container-storage', name: 'Storage', icon: 'HardDrive' },
  { id: 'container-snapshots', name: 'Snapshots', icon: 'History' },
  { id: 'container-tasks', name: 'Tasks', icon: 'ListTodo' },
  { id: 'container-settings', name: 'Settings', icon: 'Settings' },
];

// Action functions
export const getNodeById = (id: string): Node | undefined => {
  return nodes.find(node => node.id === id);
};

export const getContainerById = (id: string): Container | undefined => {
  for (const node of nodes) {
    const container = node.containers.find(container => container.id === id);
    if (container) return container;
  }
  return undefined;
};

// Format functions
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const formatUptime = (seconds: number): string => {
  if (seconds === 0) return 'N/A';
  
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  let result = '';
  if (days > 0) result += `${days}d `;
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m`;
  
  return result.trim();
};
