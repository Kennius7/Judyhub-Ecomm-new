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
                height: window.innerWidth > 500 ? '60vh' : '65vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textAlign: 'center',
                p: 4,
            }}
        >
            <div className='bg-slate-200 rounded-xl flexCenter xs:w-[32%] w-[96%] h-[40px] mt-16 mb-4'>
                <Typography 
                    // variant={window.innerWidth > 500 ? "h3" : "h5"} 
                    fontWeight="bold" 
                    // gutterBottom 
                    className="title-text-shadow1 outline-4 outline-slate-800 !important"
                    sx={{ 
                        color: primaryGreen, 
                        marginTop: window.innerWidth > 500 ? 0 : 0, 
                        letterSpacing: window.innerWidth > 500 ? 0 : -2,
                        outlineWidth: 4, outlineColor: "#fff",
                        fontSize: window.innerWidth > 500 ? 30 : 26,
                        width: "100%",
                    }}
                >
                    Judyhub Online Market
                </Typography>
            </div>
            <Container>
                <Typography 
                    variant={window.innerWidth > 500 ? "h3" : "h4"} 
                    fontWeight="bold" 
                    gutterBottom
                >
                    Shop the Latest Trends
                </Typography>
                <Typography variant={window.innerWidth > 500 ? "h4" : "h6"} gutterBottom>
                    Discover exclusive deals and new arrivals every day.
                </Typography>
                <Button 
                    variant="contained" 
                    size="large" 
                    className="shadow-inner"
                    sx={{ 
                        backgroundColor: primaryGreen, 
                        marginTop: window.innerWidth > 500 ? 2 : 5,
                        width: window.innerWidth > 500 ? "20%" : "60%",
                        fontSize: window.innerWidth > 500 ? 18 : 16,
                    }}
                >
                    Shop Now
                </Button>
            </Container>
        </Box>
    );
};

export default Hero;


