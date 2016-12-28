import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const menuIconStyle = {
  float: 'right',
  marginRight: '0px',
  paddingRight: '0px'
};

const Menu = ({handleClick, primaryText, disabled}) => {
  return(
    <IconMenu
      style={menuIconStyle}
      className="IconMenu"
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem className="MenuItem" disabled={disabled} onTouchTap={handleClick} primaryText={primaryText} />
    </IconMenu>
  );
};

Menu.propTypes = {
  handleClick: React.PropTypes.func.isRequired,
  primaryText: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool.isRequired
};

export default Menu;
