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

const Menu = (props) => {
  return(
    <IconMenu
      style={menuIconStyle}
      className="IconMenu"
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem className="MenuItem" onTouchTap={props.handleClick} primaryText={props.primaryText} />
    </IconMenu>
  );
};

export default Menu;
