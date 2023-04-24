/*
 * File: SideNav.tsx
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 12:55:44 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:05:29 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023 , Deriv By Priya
 */

import styles from './sidenav.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { navData } from './sideNavData';
import { useState } from 'react';
import { Box } from '@mui/material';

const Sidenav = () => {
  const [open, setopen] = useState(true);
  const toggleOpen = () => {
    setopen(!open);
  };
  const viewHeight = window.outerHeight;

  return (
    <div>
      <div style={{ height: viewHeight }} className={open ? styles.sidenav : styles.sidenavClosed}>
        <button className={styles.menuBtn} onClick={toggleOpen}>
          {open ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
        </button>
        {navData.map((item) => {
          return (
            <NavLink key={item.id} className={styles.sideitem} to={item.link}>
              {item.icon}
              <span className={styles.linkText}>{item.text}</span>
            </NavLink>
          );
        })}
      </div>
      <Box p={4} className={open ? styles.mainBlock : styles.mainBlockCollapsed}>
        <Outlet />
      </Box>
    </div>
  );
};

export default Sidenav;
