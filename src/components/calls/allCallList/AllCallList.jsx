import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Call from '../call/Call.jsx';
import CustomButton from '../../customButton/CustomButton.jsx';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { CallContext } from '../../../contexts/CallContext.jsx';

const AllCallList = () => {
const { calls, loading, updateCall } = useContext(CallContext);

    const handleButtonClickArchiveAll = () => {
      calls.forEach(call => updateCall(call.id, true));
    };

  const unarchivedCalls = calls.filter(call => !call.is_archived);    
  return (
    <Box>
    <CustomButton buttonName="Archive all calls" onClick={handleButtonClickArchiveAll} icon={<ArchiveOutlinedIcon />} />    
    {unarchivedCalls.map(call => (
      <Box key={call.id} mb={1}>
           <Typography variant="h6" align="center" gutterBottom>
            {call.date}
          </Typography> 

        <Call
            key={call.id}
            callerNameOrNumber={call.from}
            time={call.time}
            description={"Tried to call on "+call.via}
            direction={call.direction}
            icon={null}
            callId={call.id}
            call_type={call.call_type}
            is_archived={call.is_archived}
        />
        </Box>
    ))}
</Box>
  )
}

export default AllCallList