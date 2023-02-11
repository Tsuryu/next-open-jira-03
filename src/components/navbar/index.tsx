import { useContext } from 'react';

import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import { UIContext } from '@/context';
import NextLink from 'next/link';
import Link from '@mui/material/Link';

export const Navbar = () => {
  const { openSidebar } = useContext(UIContext);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSidebar}>
          <MenuOutlinedIcon />
        </IconButton>
        <NextLink href="/" passHref legacyBehavior>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link underline="none" color="white">
            <Typography variant="h6">OpenJira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
