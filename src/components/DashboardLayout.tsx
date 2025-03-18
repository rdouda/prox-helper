
import React, { useState, useEffect } from 'react';
import NodeSidebar from './NodeSidebar';
import ActionSidebar from './ActionSidebar';
import ContainerView from './ContainerView';
import { nodes, getNodeById, getContainerById } from '@/lib/data';
import { cn } from '@/lib/utils';

const DashboardLayout: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const selectedNode = selectedNodeId ? getNodeById(selectedNodeId) : null;
  const selectedContainer = selectedContainerId ? getContainerById(selectedContainerId) : null;
  
  // Set default action when selecting a node or container
  useEffect(() => {
    if (selectedContainer) {
      setSelectedActionId('container-summary');
    } else if (selectedNode) {
      setSelectedActionId('node-summary');
    }
  }, [selectedNodeId, selectedContainerId]);
  
  const handleNodeSelect = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setSelectedContainerId(null);
    setIsMobileSidebarOpen(false);
  };
  
  const handleContainerSelect = (containerId: string) => {
    const container = getContainerById(containerId);
    if (container) {
      setSelectedNodeId(container.nodeId);
      setSelectedContainerId(containerId);
      setIsMobileSidebarOpen(false);
    }
  };
  
  const handleActionSelect = (actionId: string) => {
    setSelectedActionId(actionId);
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-dashboard-content-bg">
      {/* Mobile sidebar toggle */}
      <button
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-primary text-white shadow-lg md:hidden"
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isMobileSidebarOpen ? (
            <path d="M18 6 6 18M6 6l12 12" />
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" />
          )}
        </svg>
      </button>
      
      {/* Mobile overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-dashboard-overlay z-30 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      
      {/* Node Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 w-64 z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <NodeSidebar
          nodes={nodes}
          onSelectNode={handleNodeSelect}
          onSelectContainer={handleContainerSelect}
          selectedNodeId={selectedNodeId}
          selectedContainerId={selectedContainerId}
        />
      </div>
      
      {/* Action Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-64 w-56 z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <ActionSidebar
          selectedNode={selectedNode}
          selectedContainer={selectedContainer}
          selectedAction={selectedActionId}
          onSelectAction={handleActionSelect}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ContainerView
          selectedNode={selectedNode}
          selectedContainer={selectedContainer}
          selectedAction={selectedActionId}
        />
      </div>
    </div>
  );
};

export default DashboardLayout;
