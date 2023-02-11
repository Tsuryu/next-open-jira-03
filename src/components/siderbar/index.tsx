import { useContext } from 'react';

import { Box, Drawer, List, Typography, ListItemButton, ListItemText, ListItemIcon, Divider } from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { UIContext } from '@/context';

const menuItems = ['Inbox', 'Starred', 'Send Email', 'Drafts'];

export const Sidebar = () => {
  const { sidemenuOpen, closeSidebar } = useContext(UIContext);

  return (
    <Drawer anchor="left" open={sidemenuOpen} onClose={closeSidebar}>
      <Box sx={{ width: '250px' }}>
        <Box sx={{ padding: '5px 10px' }}>
          <Typography variant="h4">Menu</Typography>
        </Box>
        <List>
          {menuItems.map((menuItem, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ListItemButton key={index}>
              <ListItemIcon>
                <InboxOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={menuItem} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          {menuItems.map((menuItem, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ListItemButton key={index}>
              <ListItemIcon>
                <InboxOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={menuItem} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
