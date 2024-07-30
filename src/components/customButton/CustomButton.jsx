import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/icons-material/BorderAllOutlined';

const CustomButton = ({ buttonName, onClick,icon })  => {
  return (
    <Card sx={{ marginBottom: 2, cursor: 'pointer' }} onClick={onClick}>
    <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton sx={{ p: 0 }}>
                {icon || <Icon />} {/* Default icon or custom icon */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                {buttonName}
            </Typography>
        </Box>
    </CardContent>
</Card>
  )
}

export default CustomButton