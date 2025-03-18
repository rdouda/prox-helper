
import React from 'react';
import { Container, Node } from '@/lib/data';
import ContainerHeader from './ContainerHeader';
import ContainerMetrics from './ContainerMetrics';
import PerformancePanel from '../dashboard/PerformancePanel';
import ContainerActivityLog from './ContainerActivityLog';

interface ContainerDetailsViewProps {
  selectedContainer: Container;
  selectedNode: Node | null;
}

const ContainerDetailsView: React.FC<ContainerDetailsViewProps> = ({ 
  selectedContainer, 
  selectedNode 
}) => {
  return (
    <div className="h-full bg-dashboard-content-bg p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <ContainerHeader 
          container={selectedContainer} 
          nodeName={selectedNode?.name}
        />
        
        <ContainerMetrics container={selectedContainer} />
        
        <PerformancePanel />
        
        <ContainerActivityLog container={selectedContainer} />
      </div>
    </div>
  );
};

export default ContainerDetailsView;
