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
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';


const CallDetailsModal = ({ open, onClose, callDetails }) => (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Full viewport height to center vertically
        overflow: 'auto',
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: '80%', // Adjust width as needed
          maxWidth: 600, // Optional: limit maximum width
          padding: 2,
          backgroundColor: 'white',
          borderRadius: 1,
          boxShadow: 24, // Optional: add shadow for better visibility
          textAlign: 'center', // Center text horizontally
        }}
      >
        <Typography id="modal-title" variant="h6" gutterBottom>
          Call Details
        </Typography>
        <Typography id="modal-description" variant="body1" gutterBottom>
          {`Caller: ${callDetails.callerNameOrNumber}`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Time: ${callDetails.time}`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Description: ${callDetails.description}`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Direction: ${callDetails.direction}`}
        </Typography>
        <Button onClick={onClose} sx={{ marginTop: 2 }}>Close</Button>
      </Box>
    </Box>
  </Modal>
  );
  

const Call = ({ callId,callerNameOrNumber, time, description,direction, icon, onClick,count, call_type}) => {
  const [isSwiped, setIsSwiped] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const { updateCall } = useContext(CallContext);

  const handlers = useSwipeable({
    onSwipedLeft: () => setIsSwiped(true),
    onSwipedRight: () => setIsSwiped(false),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleArchive = (e) => {
    // Ensure e is defined and stopPropagation is available
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    console.log("call ID:", callId); // Log callId
    if (callId) {
      updateCall(callId, true);
    } else {
      console.error('callId is undefined');
    }
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setDetailsOpen(true);
  };

  const getIconByCallType = (callType) => {
    switch (callType) {
      case 'missed':
        return <PhoneMissedOutlinedIcon  color="warning"/>;
      case 'answered':
        return <PhoneCallbackOutlinedIcon color="primary"/>;
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
        // onClick={handleDoubleClick}
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
          style={{ marginLeft: '16px',
          marginBottom:'3px' }}
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
            backgroundColor: '#87CEEB', // Red color for delete action
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            transition: 'background-color 0.3s ease',
          }}
          onClick={(e) => {
            handleArchive(e);
          }}
        >
          <Typography variant="button">Archive</Typography>
        </Box>
      )}
        <CallDetailsModal 
        open={detailsOpen} 
        onClose={() => setDetailsOpen(false)} 
        callDetails={{ callerNameOrNumber, time, description,direction }} 
      />
    </Box>
  );
};

export default Call;
