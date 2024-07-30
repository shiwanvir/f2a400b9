import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction,ThemeProvider,createTheme } from '@mui/material';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import DialpadOutlinedIcon from '@mui/icons-material/DialpadOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ModeStandbyOutlinedIcon from '@mui/icons-material/ModeStandbyOutlined';
import './BottomNavigationBar.css';

// set a global theme that overrides the default styles.
const theme = createTheme({
  components: {
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: '#2AC420',
          },
        },
      },
    },
  },
});

export const BottomNavigationBar = () => {
    const [value, setValue] = useState(0);

    return (
      <ThemeProvider theme={theme}>
      <BottomNavigation
        className="bottom-nav"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction  icon={<CallOutlinedIcon/>} />
        <BottomNavigationAction  icon={<PermIdentityOutlinedIcon />} />
        <BottomNavigationAction  icon={<DialpadOutlinedIcon />} />
        <BottomNavigationAction  icon={<SettingsOutlinedIcon />} />
        <BottomNavigationAction  icon={<ModeStandbyOutlinedIcon />} />
      </BottomNavigation>
      </ThemeProvider>
    );
}
