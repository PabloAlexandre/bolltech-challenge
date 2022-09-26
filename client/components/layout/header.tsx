import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { logout } from '../../utils/Auth';
import { useRouter } from 'next/router';

export function Header() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    logout();
    router.push('/login')
  }

  return (
    <header className="header">
      <h1>Todolist Challenge</h1>
      <div >
        <div className="user-info" onClick={handleClick}>
          <span >Name</span>
          <ArrowDropDownIcon />
        </div>
        
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </header>
  );
}
