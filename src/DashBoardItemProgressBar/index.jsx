import React from 'react';
import Subheader from 'material-ui/Subheader';
import LinearProgress from 'material-ui/LinearProgress';

const DashboardItemProgressBar = () => (
  <div className="dashboard-item-progress-bar">
    <Subheader>7050 / 8552</Subheader>
    <LinearProgress mode="determinate" value={70} />
  </div>
  );

export default DashboardItemProgressBar;
