import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  rootElement: {
    width: 'auto',
    marginLeft: '1rem',
  },
  label: {
    overflow: 'visible',
  },
};

const SelectSimulation = (props) => {
  let element = null;

  if (props.displayElement) {
    element = (<SelectField
      value={props.selectedValue}
      style={styles.rootElement}
      labelStyle={styles.label}
      onChange={props.onChange}
      className="select-simulation"
    >
      <MenuItem value={false} primaryText="Custom Simulation" />
      <MenuItem value primaryText="Default Simulation" />
    </SelectField>);
  }

  return (element);
};

export default SelectSimulation;

SelectSimulation.propTypes = {
  selectedValue: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
  displayElement: React.PropTypes.bool.isRequired,
};
