import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import PhoneIcon from '@mui/icons-material/Phone';

const Call = ({ callerNameOrNumber, time, description, icon, onClick }) => {
    return (
        <Card sx={{ marginBottom: 2, cursor: 'pointer' }} onClick={onClick}>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div">
                    {callerNameOrNumber}
                </Typography>
            </Box>   
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <IconButton>
                        {icon || <PhoneIcon />} {/* Default icon */}
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
);
}

export default Call