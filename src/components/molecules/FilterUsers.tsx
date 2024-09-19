import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { User } from "@src/types/userTypes";

type FilterProps = {
  users: User[];
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
};

const FilterUsers = ({ users, filters, setFilters }: FilterProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (userId: string) => {
    setFilters((prevFilters) =>
      prevFilters.includes(userId)
        ? prevFilters.filter((id) => id !== userId)
        : [...prevFilters, userId]
    );
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <AccountCircleOutlinedIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {users.map((user: User) => (
          <MenuItem key={user._id} onClick={() => handleMenuItemClick(user._id)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={filters.includes(user._id)}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={`${user.name} ${user.surname}`} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default FilterUsers;
