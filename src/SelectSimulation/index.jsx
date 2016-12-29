import React, { Component } from 'react';
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

export default class SelectSimulation extends Component {
  constructor(props) {
    super(props);
    this.renderSelectMenu = this.renderSelectMenu.bind(this);
  }

  renderSelectMenu() {
    return (
      <SelectField
        value={this.props.selectedValue}
        style={styles.rootElement}
        labelStyle={styles.label}
        onChange={this.props.onChange}
      >
        <MenuItem value={false} primaryText="Custom Simulation" />
        <MenuItem value primaryText="Default Simulation" />
      </SelectField>
    );
  }

  render() {
    let element = null;

    if (this.props.displayElement) {
      element = this.renderSelectMenu();
    }

    return (element);
  }
}

SelectSimulation.propTypes = {
  selectedValue: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
  displayElement: React.PropTypes.bool.isRequired,
};
