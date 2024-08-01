import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

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
                    width: '80%',
                    maxWidth: 600,
                    padding: 3,
                    backgroundColor: '#fff',
                    borderRadius: 1,
                    boxShadow: 24,
                    textAlign: 'left',
                }}
            >
                <Typography id="modal-title" variant="h6" gutterBottom>
                    Call Details
                </Typography>

                <Box display="flex" alignItems="center" mb={2}>
                    <PhoneIcon sx={{ mr: 1 }} />
                    <Typography id="modal-description" variant="body1">
                        {`Caller: ${callDetails.callerNameOrNumber}`}
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={2}>
                    <AccessTimeIcon sx={{ mr: 1 }} />
                    <Typography variant="body1">
                        {`Time: ${callDetails.time}`}
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={2}>
                    <DescriptionIcon sx={{ mr: 1 }} />
                    <Typography variant="body1">
                        {`Description: ${callDetails.description}`}
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={2}>
                    <ArrowRightAltIcon sx={{ mr: 1 }} />
                    <Typography variant="body1">
                        {`Direction: ${callDetails.direction}`}
                    </Typography>
                </Box>

                <Box mt={2} display="flex" justifyContent="center">
                    <Button onClick={onClose} variant="contained" color="primary">Close</Button>
                </Box>
            </Box>
        </Box>
    </Modal>
);

export default CallDetailsModal;
