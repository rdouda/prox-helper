
import React from 'react';
import { ChevronDown, ChevronRight, Server, Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Node, NodeStatus } from '@/lib/data';

interface NodeItemProps {
  node: Node;
  isExpanded: boolean;
  isActive: boolean;
  onClick: () => void;
  onToggleExpand: () => void;
}

const getStatusIcon = (status: NodeStatus) => {
  switch (status) {
    case 'online':
      return <Wifi size={14} className="text-green-500" />;
    case 'offline':
      return <WifiOff size={14} className="text-red-500" />;
    case 'maintenance':
      return <AlertTriangle size={14} className="text-yellow-500" />;
    default:
      return null;
  }
};

const NodeItem: React.FC<NodeItemProps> = ({ 
  node, 
  isExpanded, 
  isActive, 
  onClick, 
  onToggleExpand 
}) => {
  return (
    <div className="relative">
      <div 
        className={cn(
          "node-item group",
          isActive && "active"
        )}
        onClick={onClick}
      >
        <button 
          className="absolute left-0 flex items-center justify-center w-6 h-full text-dashboard-sidebar-item/70 hover:text-dashboard-sidebar-hover"
          onClick={(e) => {
            e.stopPropagation();
            onToggleExpand();
          }}
        >
          {isExpanded ? 
            <ChevronDown size={16} className="transition-transform duration-200" /> : 
            <ChevronRight size={16} className="transition-transform duration-200" />
          }
        </button>
        
        <div className="flex items-center ml-4 gap-2.5">
          <Server size={18} className="flex-shrink-0" />
          <span className="text-sm font-medium truncate">{node.name}</span>
          <div className="flex-shrink-0 ml-auto">{getStatusIcon(node.status)}</div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="animate-fade-in">
          {/* Containers will be rendered here by the parent component */}
        </div>
      )}
    </div>
  );
};

export default NodeItem;
