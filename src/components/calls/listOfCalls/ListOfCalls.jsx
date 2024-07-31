import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import Call from '../call/Call.jsx';
import CustomButton from '../../customButton/CustomButton.jsx';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { CallContext } from '../../../contexts/CallContext.jsx';

const ListOfCalls = () => {
 const {calls,loading} = useContext(CallContext)

    const handleButtonClick1 = () => {
        console.log('Button 1 clicked!');
    };
  return (
    <Box>
    <CustomButton buttonName="Archive all calls" onClick={handleButtonClick1} icon={<ArchiveOutlinedIcon />} />    
    {calls.map(call => (
        <Call
            key={call.id}
            callerNameOrNumber={call.from}
            time={call.created_at}
            description={"Tried to call on "+call.via}
            icon={null}
            onClick={() => console.log(`Call clicked: ${call.id}`)}
        />
    ))}
</Box>
  )
}

export default ListOfCalls