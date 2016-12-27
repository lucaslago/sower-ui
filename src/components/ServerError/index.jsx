import React from 'react';
import Subheader from 'material-ui/Subheader';
import CloudOff from 'react-icons/lib/md/cloud-off';

const errorMessageStyle = {
  fontSize: '2rem',
};

const ServerError = () => {
  return(
    <div className="server-error">
      <CloudOff size={60} color={'lightgrey'} />
      <Subheader style={errorMessageStyle}>
        We're sorry, something went wrong in our servers
      </Subheader>
    </div>
  );
};

export default ServerError;
