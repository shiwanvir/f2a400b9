import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import Box from '@mui/material/Box';
import Logo from '../../Logo.jsx';
import './TopNavigationTab.css';
import TabPanel from '../tabPanel/TabPanel.jsx';
import ListOfCalls from '../calls/listOfCalls/ListOfCalls.jsx';
import DetailsOfCalls from '../calls/detailsOfcalls/DetailsOfCalles.jsx';
import ArchivedCalls from '../calls/archivedCalls/ArchivedCalls.jsx';

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
        <Box width="100%">
        <Box display="flex" alignItems="center" sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Box flexShrink={0} p={1}>
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
                            backgroundColor: '#FF5733',
                        },
                    }}
                >
                    <Tab label="Inbox" className="tab-text" />
                    <Tab label={capitalizeFirstLetter("All calls")} className="tab-text" />
                    <Tab icon={<AppsOutlinedIcon />} iconPosition="end" />
                </Tabs>
            </Box>
        </Box>
        <Box>
            <TabPanel value={value} index={0}>
                <ListOfCalls />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DetailsOfCalls />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ArchivedCalls />
            </TabPanel>
        </Box>
    </Box>
);
}

export default TopNavigationTab