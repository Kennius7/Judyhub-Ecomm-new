import { Box, Button, Typography, Container } from '@mui/material';
import { primaryGreen } from '../constants/colors';



const Hero = () => {

    return (
        <Box
            className="bg-hero1 title-text-shadow5 !important"
            sx={{
                // backgroundImage: 'url(../assets/bg1.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '60vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textAlign: 'center',
                p: 4,
            }}
        >
            <Typography 
                variant={window.innerWidth > 500 ? "h3" : "h4"} 
                fontWeight="bold" 
                gutterBottom 
                className="title-text-shadow5 outline-4 outline-slate-800 !important"
                sx={{ 
                    color: primaryGreen, 
                    marginTop: window.innerWidth > 500 ? 0 : 7, 
                    letterSpacing: window.innerWidth > 500 ? 0 : -4,
                    outlineWidth: 4, outlineColor: "#fff",
                }}
            >
                Judyhub Online Market
            </Typography>
            <Container>
                <Typography 
                    variant={window.innerWidth > 500 ? "h2" : "h4"} 
                    fontWeight="bold" 
                    gutterBottom
                >
                    Shop the Latest Trends
                </Typography>
                <Typography variant={window.innerWidth > 500 ? "h5" : "h6"} gutterBottom>
                    Discover exclusive deals and new arrivals every day.
                </Typography>
                <Button 
                    variant="contained" 
                    size="large" 
                    className="shadow-inner"
                    sx={{ backgroundColor: primaryGreen, marginTop: window.innerWidth > 500 ? 0 : 5}}
                >
                    Shop Now
                </Button>
            </Container>
        </Box>
    );
};

export default Hero;


