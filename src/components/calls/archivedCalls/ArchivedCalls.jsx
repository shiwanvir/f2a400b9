import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Call from '../call/Call.jsx';
import CustomButton from '../../customButton/CustomButton.jsx';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import { CallContext } from '../../../contexts/CallContext.jsx';

const ArchivedCalls = () => {
  //access call context
  const { calls, unarchiveAllCalls } = useContext(CallContext);

  const handleButtonClickunArchiveAll = () => {
    unarchiveAllCalls()
  };

  const archivedCalls = calls.filter(call => call.is_archived);
  return (
    <Box>
       <CustomButton
        buttonName="Un Archive all calls"
        onClick={handleButtonClickunArchiveAll}
        icon={<UnarchiveOutlinedIcon />}
        disabled={archivedCalls.length === 0}//disable when list is empty
      />
      {archivedCalls.map(call => (
        <Box key={call.id} mb={1}>
          <Typography variant="h6" align="center" gutterBottom>
            {call.date}
          </Typography>

          <Call
            key={call.id}
            callerNameOrNumber={call.from}
            time={call.time}
            description={"Tried to call on " + call.via}
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

export default ArchivedCalls