import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import Box from '@mui/material/Box';
import Logo from '../../Logo.jsx';
import './TopNavigationTab.css';

const TopNavigationTab = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const capitalizeFirstLetter = (text) => {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      };

    return (
        <Box display="flex" alignItems="center" width="100%">
            <Box flexShrink={0}>
                <Logo />
            </Box>
            <Box flexGrow={1}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="icon position tabs example"
                    variant="fullWidth"
                    sx={{
                        '& .MuiTabs-indicator': {
                          backgroundColor: '#FF5733', // Green color for selected tab indicator
                        },
                      }}
                >
                    <Tab label="Inbox"  className="tab-text"/>
                    <Tab label={capitalizeFirstLetter("All calls")} className="tab-text"/>
                    <Tab icon={<AppsOutlinedIcon />} iconPosition="end"/>
                </Tabs>
            </Box>
        </Box>
    );
}

export default TopNavigationTab