import React, { useState,useContext } from 'react';
import { BottomNavigation, BottomNavigationAction,ThemeProvider,createTheme,Badge } from '@mui/material';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import DialpadOutlinedIcon from '@mui/icons-material/DialpadOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ModeStandbyOutlinedIcon from '@mui/icons-material/ModeStandbyOutlined';
import './BottomNavigationBar.css';
import { CallContext } from '../../contexts/CallContext.jsx';
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
    const { calls } = useContext(CallContext);
    const totalCalls = calls.length;
  

    return (
      <ThemeProvider theme={theme}>
      <BottomNavigation
        sx={{ justifyContent: 'space-around' }}
        className="bottom-nav"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
      >
         <BottomNavigationAction
          icon={<Badge badgeContent={totalCalls} color="error" max={99}    sx={{
            '& .MuiBadge-badge': {
              fontSize: '10px', 
              padding: '4px 8px',
            },
          }}>
            <CallOutlinedIcon sx={{ fontSize: '70px' }} />
          </Badge>}
        />
        <BottomNavigationAction  icon={<PermIdentityOutlinedIcon sx={{ fontSize: '70px' }} />}/>
        <BottomNavigationAction  icon={<DialpadOutlinedIcon  sx={{ fontSize: '70px'}} />} />
        <BottomNavigationAction  icon={<SettingsOutlinedIcon sx={{ fontSize: '70px' }} />} />
        <BottomNavigationAction  icon={<ModeStandbyOutlinedIcon  sx={{ fontSize: '70px' }}/>} />
      </BottomNavigation>
      </ThemeProvider>
    );
}
