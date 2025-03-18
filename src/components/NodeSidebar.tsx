
import React, { useState } from 'react';
import { Search, Plus, Server } from 'lucide-react';
import { Node, Container } from '@/lib/data';
import NodeItem from './NodeItem';
import ContainerItem from './ContainerItem';

interface NodeSidebarProps {
  nodes: Node[];
  onSelectNode: (nodeId: string) => void;
  onSelectContainer: (containerId: string) => void;
  selectedNodeId: string | null;
  selectedContainerId: string | null;
}

const NodeSidebar: React.FC<NodeSidebarProps> = ({
  nodes,
  onSelectNode,
  onSelectContainer,
  selectedNodeId,
  selectedContainerId,
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const toggleNodeExpand = (nodeId: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const filteredNodes = nodes.filter((node) => {
    const matchesNode = node.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesContainer = node.containers.some((container) =>
      container.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesNode || matchesContainer;
  });

  return (
    <div className="flex flex-col h-full bg-dashboard-sidebar-bg border-r border-dashboard-sidebar-border">
      <div className="p-4 border-b border-dashboard-sidebar-border">
        <div className="flex items-center gap-2">
          <Server size={20} className="text-dashboard-sidebar-item" />
          <h1 className="text-lg font-medium text-white">Datacenter</h1>
        </div>
      </div>
      
      <div className="relative px-3 py-2 border-b border-dashboard-sidebar-border">
        <div className="relative">
          <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-dashboard-sidebar-item" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-9 bg-dashboard-sidebar-bg/50 border border-dashboard-sidebar-border/50 rounded-md pl-8 pr-3 text-sm placeholder:text-dashboard-sidebar-item/70 text-white focus:outline-none focus:border-dashboard-sidebar-hover focus:ring-1 focus:ring-dashboard-sidebar-hover transition-all duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="py-2">
          {filteredNodes.map((node) => (
            <div key={node.id}>
              <NodeItem
                node={node}
                isExpanded={!!expandedNodes[node.id] || searchQuery !== ''}
                isActive={selectedNodeId === node.id && !selectedContainerId}
                onClick={() => onSelectNode(node.id)}
                onToggleExpand={() => toggleNodeExpand(node.id)}
              />
              
              {(!!expandedNodes[node.id] || searchQuery !== '') && (
                <div className="ml-2 animate-fade-in overflow-hidden">
                  {node.containers
                    .filter((container) =>
                      container.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((container) => (
                      <ContainerItem
                        key={container.id}
                        container={container}
                        isActive={selectedContainerId === container.id}
                        onClick={() => onSelectContainer(container.id)}
                      />
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-3 border-t border-dashboard-sidebar-border">
        <button className="flex items-center justify-center w-full gap-1.5 px-3 py-2 text-sm font-medium text-white bg-dashboard-sidebar-hover/90 hover:bg-dashboard-sidebar-hover rounded-md transition-colors duration-200">
          <Plus size={16} />
          <span>Add Node</span>
        </button>
      </div>
    </div>
  );
};

export default NodeSidebar;
