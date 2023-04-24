/*
 * File: CustomTab.tsx
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 1:20:31 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:02:56 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

import React, { FC, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface customTabProps {
  id: number;
  label: string;
  Component: React.ReactNode;
  isHidden: boolean;
}

interface IProps {
  tabs: customTabProps[];
  onTabChange: any;
  defaultTab?: number;
}

const AntTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#6666ff',
  },
});

const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(({ theme }) => ({
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  marginRight: theme.spacing(1),
  '&.Mui-selected': {
    color: '#6666ff',
  },
  width: '15.5vw',
}));

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface StyledTabProps {
  label: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const CustomTab: FC<IProps> = ({ tabs, defaultTab, onTabChange }: IProps) => {
  const route = useLocation();

  const [value, setValue] = React.useState(0);
  const handleChange = (event: any, tabId: React.SetStateAction<number>) => {
    console.log(tabId);
    setValue(tabId);
    onTabChange(tabId);
  };
  useEffect(() => {
    setValue(defaultTab ? defaultTab : 0);
  }, [route.pathname.split('/')?.length, defaultTab]);

  return (
    <Box sx={{}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginLeft: '16px' }}>
        <AntTabs value={value} onChange={handleChange} aria-label='clinic tabs'>
          {tabs.map(
            (option) =>
              !option.isHidden && (
                <AntTab label={option.label} key={option.id} {...a11yProps(option.id)} />
              ),
          )}
        </AntTabs>
      </Box>
      {tabs.map(
        ({ Component }, i: number) =>
          !tabs[i].isHidden && (
            <TabPanel value={value} index={i} key={i}>
              {Component}
            </TabPanel>
          ),
      )}
    </Box>
  );
};

export default CustomTab;
