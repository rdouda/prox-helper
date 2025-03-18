
import React from 'react';

const WelcomeScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full bg-dashboard-content-bg">
      <div className="text-center">
        <h2 className="text-xl font-medium mb-2">Welcome to Proxmox Dashboard</h2>
        <p className="text-muted-foreground">Select a node or container to view details</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
