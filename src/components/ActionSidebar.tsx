
import React from 'react';
import { 
  LayoutDashboard, Boxes, Network, HardDrive, SaveAll, Shield, Settings,
  Terminal, BarChart2, History, ListTodo, Play, Square, Pause, 
  RefreshCw, Power, MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Node, Container, Action, nodeActions, containerActions } from '@/lib/data';

interface ActionSidebarProps {
  selectedNode: Node | null;
  selectedContainer: Container | null;
  selectedAction: string | null;
  onSelectAction: (actionId: string) => void;
}

const getActionIcon = (iconName: string, size = 18) => {
  const icons: Record<string, React.ReactNode> = {
    LayoutDashboard: <LayoutDashboard size={size} />,
    Boxes: <Boxes size={size} />,
    Network: <Network size={size} />,
    HardDrive: <HardDrive size={size} />,
    SaveAll: <SaveAll size={size} />,
    Shield: <Shield size={size} />,
    Settings: <Settings size={size} />,
    Terminal: <Terminal size={size} />,
    BarChart2: <BarChart2 size={size} />,
    History: <History size={size} />,
    ListTodo: <ListTodo size={size} />
  };

  return icons[iconName] || <Settings size={size} />;
};

const ActionSidebar: React.FC<ActionSidebarProps> = ({
  selectedNode,
  selectedContainer,
  selectedAction,
  onSelectAction,
}) => {
  if (!selectedNode && !selectedContainer) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-dashboard-action-bg border-r border-dashboard-sidebar-border">
        <p className="text-dashboard-action-item/60 text-sm">Select a node or container</p>
      </div>
    );
  }

  const actions = selectedContainer ? containerActions : nodeActions;
  
  return (
    <div className="flex flex-col h-full bg-dashboard-action-bg border-r border-dashboard-sidebar-border">
      <div className="p-4 border-b border-dashboard-sidebar-border">
        <div className="flex items-center gap-2.5">
          {selectedContainer ? (
            <>
              <div className="p-1.5 bg-dashboard-sidebar-bg/70 rounded-md">
                <Boxes size={18} className="text-dashboard-action-item" />
              </div>
              <div>
                <h2 className="text-sm font-medium text-white">{selectedContainer.name}</h2>
                <p className="text-xs text-dashboard-action-item">
                  {selectedContainer.type.toUpperCase()} Container
                </p>
              </div>
            </>
          ) : selectedNode ? (
            <>
              <div className="p-1.5 bg-dashboard-sidebar-bg/70 rounded-md">
                <LayoutDashboard size={18} className="text-dashboard-action-item" />
              </div>
              <div>
                <h2 className="text-sm font-medium text-white">{selectedNode.name}</h2>
                <p className="text-xs text-dashboard-action-item">{selectedNode.ip}</p>
              </div>
            </>
          ) : null}
        </div>
      </div>
      
      {selectedContainer && (
        <div className="px-3 py-2 border-b border-dashboard-sidebar-border/50 flex items-center justify-between gap-1">
          {selectedContainer.status === 'running' ? (
            <>
              <button className="action-button flex-1">
                <Terminal size={16} />
                <span className="text-xs">Console</span>
              </button>
              <button className="action-button flex-1">
                <Pause size={16} />
                <span className="text-xs">Pause</span>
              </button>
              <button className="action-button flex-1">
                <Square size={16} />
                <span className="text-xs">Stop</span>
              </button>
            </>
          ) : selectedContainer.status === 'stopped' ? (
            <>
              <button className="action-button flex-1">
                <Play size={16} />
                <span className="text-xs">Start</span>
              </button>
              <button className="action-button flex-1">
                <RefreshCw size={16} />
                <span className="text-xs">Reset</span>
              </button>
              <button className="action-button flex-1">
                <Power size={16} />
                <span className="text-xs">Destroy</span>
              </button>
            </>
          ) : (
            <>
              <button className="action-button flex-1">
                <Play size={16} />
                <span className="text-xs">Resume</span>
              </button>
              <button className="action-button flex-1">
                <Square size={16} />
                <span className="text-xs">Stop</span>
              </button>
              <button className="action-button flex-1">
                <MoreVertical size={16} />
                <span className="text-xs">More</span>
              </button>
            </>
          )}
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto py-2">
        {actions.map((action) => (
          <button
            key={action.id}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 w-full text-left",
              "transition-colors duration-200 hover:bg-dashboard-sidebar-bg/30",
              selectedAction === action.id ? "text-dashboard-action-active bg-dashboard-sidebar-bg/40" : "text-dashboard-action-item"
            )}
            onClick={() => onSelectAction(action.id)}
          >
            <div className="flex-shrink-0">
              {getActionIcon(action.icon)}
            </div>
            <span className="text-sm font-medium">{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionSidebar;
