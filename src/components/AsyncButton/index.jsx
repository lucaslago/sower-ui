import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

const AsyncButton = props => {
  if(props.makingRequest) {
    return (<CircularProgress />);
  }
  return (
    <div>
      <label> arroz</label>
      <RaisedButton label={ props.label } type={ props.type }/>
    </div>
  );
};

export default AsyncButton;
