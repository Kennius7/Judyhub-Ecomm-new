
import { Card, CardContent, Typography, Avatar, Button, IconButton, Box, Divider } from "@mui/material";
import { ShoppingCart, Settings, Edit } from "@mui/icons-material";
import { useContext } from "react";
import { MainContext } from "../context/mainContext";
import { useNavigate } from "react-router-dom";




const ProfileSection = () => {
    const { profileFormData, cartItemNumber } = useContext(MainContext);
    const { name, email, image, address, number } = profileFormData;
    const navigate = useNavigate();


    return (
        <Card 
            sx={{ 
                boxShadow: 5, 
                borderRadius: 3,
                width: window.innerWidth > 768 ? 500 : 
                window.innerWidth < 768 && window.innerWidth > 480 ? 450 : "96%",
                height: window.innerWidth > 768 ? 480 : 
                window.innerWidth < 768 && window.innerWidth > 480 ? 400 : 420, 
                cursor: "pointer", 
                padding: "4px",
            }}
        >
            <CardContent>
                {/* User Details */}
                <Box display="flex" alignItems="center" flexDirection="column">
                    <Avatar 
                        src={image} 
                        sx={{ 
                            width: window.innerWidth > 480 ? 150 : 120, 
                            height: window.innerWidth > 480 ? 150 : 120, 
                            mb: 2 
                        }} 
                    />
                    <div className="w-full flex flex-col justify-center items-start">
                        <Typography variant="h6" fontWeight="bold">Name: {name}</Typography>
                        <Typography variant="body1" color="text.secondary">Email: {email}</Typography>
                        <Typography variant="body1" color="text.secondary">H. Address: {address}</Typography>
                        <Typography variant="body1" color="text.secondary">Phone: {number}</Typography>
                    </div>
                </Box>

                <Divider sx={{ my: 2, borderWidth: 2 }} />

                {/* Cart Details */}
                <Box display="flex" justifyContent="space-around" alignItems="center" mb={2}>
                    <Typography variant="body1">Cart Items: {cartItemNumber}</Typography>
                    <IconButton color="primary">
                        <ShoppingCart />
                    </IconButton>
                </Box>

                {/* Settings & Edit Profile */}
                <Box display="flex" justifyContent="space-around" gap={1}>
                    <Button 
                        variant="outlined" 
                        startIcon={<Settings />}
                        onClick={() => navigate("settings")}
                    >
                        Settings
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        startIcon={<Edit />}
                        onClick={() => navigate("editprofile")}
                    >
                        Edit Profile
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProfileSection;

