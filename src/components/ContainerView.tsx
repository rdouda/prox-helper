
import React from 'react';
import { Node, Container } from '@/lib/data';
import WelcomeScreen from './dashboard/WelcomeScreen';
import ContainerDetailsView from './container/ContainerDetailsView';
import NodeDetailsView from './node/NodeDetailsView';

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
    return <WelcomeScreen />;
  }

  // Container view
  if (selectedContainer) {
    return <ContainerDetailsView selectedContainer={selectedContainer} selectedNode={selectedNode} />;
  }

  // Node view
  if (selectedNode) {
    return <NodeDetailsView selectedNode={selectedNode} />;
  }

  return null;
};

export default ContainerView;
