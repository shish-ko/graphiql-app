import React from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface MenuLink {
  text: string;
  onClick: () => void;
}

interface BurgerMenuProps {
  items: MenuLink[];
}

export const BurgerMenu = ({ items }: BurgerMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon color="primary" sx={{ fontSize: '32px' }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          style: {
            backgroundColor: 'primary',
          },
        }}
      >
        {items.map((item, indx) => (
          <MenuItem
            key={indx}
            onClick={() => {
              item.onClick();
              setAnchorEl(null);
            }}
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
