import React, { useContext, useMemo } from 'react';
import Box from '@mui/material/Box';
import Call from '../call/Call.jsx';
import Typography from '@mui/material/Typography';
import CustomButton from '../../customButton/CustomButton.jsx';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { CallContext } from '../../../contexts/CallContext.jsx';

const Inbox = () => {
  const { calls, updateCall } = useContext(CallContext);

  const handleArchiveAll = () => {
    calls.forEach(call => updateCall(call.id, true));
  };

  // Use useMemo to optimize grouping logic and avoid unnecessary re-renders
  const groupedCalls = useMemo(() => {
    const unarchivedCalls = calls.filter(call => !call.is_archived);
    const grouped = unarchivedCalls.reduce((acc, call) => {
      const { from, created_at } = call;
      const date = new Date(created_at).toISOString().split('T')[0];
      const key = `${from}-${date}`;

      if (!acc[key]) {
        acc[key] = {
          calls: [call],
          count: 1
        };
      } else {
        acc[key].calls.push(call);
        acc[key].count++;
      }

      return acc;
    }, {});

    return Object.values(grouped);
  }, [calls]);

  return (
    <Box>
      <CustomButton buttonName="Archive all calls" onClick={handleArchiveAll} icon={<ArchiveOutlinedIcon />}
        disabled={calls.length === 0}

      />
      {groupedCalls.map(({ calls, count }) => (
        <Box key={calls[0].id} mb={2}>
          <Typography variant="h6" align="center" gutterBottom>
            {calls[0].date}
          </Typography>
          <Call
            callerNameOrNumber={calls[0].from}
            time={calls[0].time}
            description={"Tried to call on " + calls[0].via}
            direction={calls[0].direction}
            icon={null}
            onClick={() => updateCall(calls[0].id, !calls[0].is_archived)}
            callId={calls[0].id}
            count={count}
            call_type={calls[0].call_type}
            groupedCallIds={calls.map(c => c.id)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default Inbox;
