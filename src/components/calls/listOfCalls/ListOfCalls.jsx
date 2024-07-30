import React from 'react'
import Box from '@mui/material/Box';
import Call from '../call/Call.jsx';
import CustomButton from '../../customButton/CustomButton.jsx';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
const ListOfCalls = () => {
 
    const calls = [
        { id: 1, callerNameOrNumber: 'John Doe', time: '10:30 AM', description: 'Discussed project updates', icon: null },
        { id: 2, callerNameOrNumber: '+1234567890', time: '11:15 AM', description: 'Follow-up call', icon: null },
        { id: 3, callerNameOrNumber: 'Jane Smith', time: '1:45 PM', description: 'Scheduled meeting', icon: null },
    ];

    const handleButtonClick1 = () => {
        console.log('Button 1 clicked!');
    };
  return (
    <Box>
    <CustomButton buttonName="Archive all calls" onClick={handleButtonClick1} icon={<ArchiveOutlinedIcon />} />    
    {calls.map(call => (
        <Call
            key={call.id}
            callerNameOrNumber={call.callerNameOrNumber}
            time={call.time}
            description={call.description}
            icon={call.icon}
            onClick={() => console.log(`Call clicked: ${call.id}`)}
        />
    ))}
</Box>
  )
}

export default ListOfCalls