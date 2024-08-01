import React, { useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneMissedOutlinedIcon from '@mui/icons-material/PhoneMissedOutlined';
import VoicemailOutlinedIcon from '@mui/icons-material/VoicemailOutlined';
import PhoneCallbackOutlinedIcon from '@mui/icons-material/PhoneCallbackOutlined';
import { useSwipeable } from 'react-swipeable';
import { CallContext } from '../../../contexts/CallContext.jsx';
import Badge from '@mui/material/Badge';
import CallDetailsModal from '../callDetailsModal/CallDetailsModal.jsx';


const Call = ({ callId, callerNameOrNumber, time, description, direction, count, call_type, is_archived, groupedCallIds }) => {
  const [isSwiped, setIsSwiped] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { updateCall } = useContext(CallContext);
  const [loading, setLoading] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => setIsSwiped(true),
    onSwipedRight: () => setIsSwiped(false),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleArchive = async (e, is_archived) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }

    setLoading(true);

    try {
      if (groupedCallIds) {
        // Await all update calls for grouped calls
        await Promise.all(groupedCallIds.map(id => updateCall(id, !is_archived)));
      } else {
        await updateCall(callId, !is_archived);
      }
    } catch (error) {
      console.error('Error updating call:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setDetailsOpen(true);
  };

  const getIconByCallType = (callType) => {
    switch (callType) {
      case 'missed':
        return <PhoneMissedOutlinedIcon color="warning" />;
      case 'answered':
        return <PhoneCallbackOutlinedIcon color="primary" />;
      case 'voicemail':
        return <VoicemailOutlinedIcon color="info" />;
      default:
        return <PhoneIcon />; // Default icon if call_type is unknown
    }
  };

  return (
    <Box {...handlers} sx={{ overflow: 'hidden', position: 'relative' }} onDoubleClick={handleDoubleClick} >
      <Card
        sx={{
          marginBottom: 2,
          cursor: 'pointer',
          transform: isSwiped ? 'translateX(-100px)' : 'translateX(0)',
          transition: 'transform 0.3s ease',
          display: 'flex',
          alignItems: 'center',
        }}

      >
        <CardContent sx={{ flex: '1 1 auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div">
              {callerNameOrNumber}
              {count > 1 && (
                <Badge
                  badgeContent={count}
                  color="error"
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  overlap="rectangular"
                  style={{
                    marginLeft: '16px',
                    marginBottom: '3px'
                  }}
                />
              )}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <IconButton>
              {getIconByCallType(call_type)}
            </IconButton>
            <Typography variant="caption" color="text.secondary">
              {time}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      {isSwiped && (
        <Box

          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: '100px',
            height: '150px',
            backgroundColor: '#87CEEB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            transition: 'background-color 0.3s ease',
          }}
          onClick={(e) => {
            handleArchive(e, is_archived);
          }}
        >
          <Typography variant="button" sx={{ textTransform: 'none' }}>{is_archived ? 'Unarchive' : 'Archive'}</Typography>
        </Box>
      )}
     
      <CallDetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        callDetails={{ callerNameOrNumber, time, description, direction }}
      />
    </Box>
  );
};

export default Call;
