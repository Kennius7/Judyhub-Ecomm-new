/* eslint-disable react-hooks/exhaustive-deps */

import { Card, CardContent, Typography, Avatar, Button, IconButton, Box, Divider } from "@mui/material";
import { ShoppingCart, Settings, Edit } from "@mui/icons-material";
import { useState, useContext, useEffect } from "react";
import { MainContext } from "../context/mainContext";
import { useNavigate } from "react-router-dom";




const ProfileSection = () => {
    const { profileFormData, cartItemNumber, adminChecker } = useContext(MainContext);
    const { name, email, image, address, number } = profileFormData;
    const navigate = useNavigate();
    const [buttonText, setButtonText] = useState("All Transactions");

    const handleButtonText = () => {
        adminChecker ? setButtonText("All Transactions") : setButtonText("My Orders");
    }

    useEffect(() => {
        handleButtonText();
    }, [])

    const transactionRouterChecker = () => { 
        if (adminChecker) {
            navigate("allorders");
        } else { 
            setButtonText("Your Orders");
            navigate("orders");
        }
    }


    return (
        <Card 
            sx={{ 
                boxShadow: 5, 
                borderRadius: 3,
                width: window.innerWidth > 768 ? 500 : 
                window.innerWidth < 768 && window.innerWidth > 480 ? 450 : "96%",
                height: window.innerWidth > 768 ? 480 : 
                window.innerWidth < 768 && window.innerWidth > 480 ? 400 : 600, 
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
                <Box display="flex" flexDirection="column" justifyContent="space-around" gap={1}>
                    <div className="flex xs:flex-row flex-col xs:justify-between justify-center items-center">
                        <Button 
                            variant="contained"
                            color="error" 
                            startIcon={<Settings />}
                            sx={{
                                width: window.innerWidth > 500 ? "30%" : "100%",
                                marginBottom: window.innerWidth > 500 ? 0 : 2,
                            }}
                            onClick={() => navigate("settings")}
                        >
                            Settings
                        </Button>
                        {
                            adminChecker
                            ?
                            <Button 
                                variant="contained" 
                                color="warning" 
                                startIcon={<Edit />}
                                sx={{
                                    width: window.innerWidth > 500 ? "30%" : "100%",
                                    marginBottom: window.innerWidth > 500 ? 0 : 2,
                                }}
                                onClick={() => navigate("orders")}
                            >
                                My Orders
                            </Button>
                            :
                            null
                        }
                        <Button 
                            variant="contained" 
                            color="primary" 
                            startIcon={<Edit />}
                            sx={{
                                width: window.innerWidth > 500 ? "30%" : "100%",
                                marginBottom: window.innerWidth > 500 ? 0 : 2,
                            }}
                            onClick={() => navigate("editprofile")}
                        >
                            Edit Profile
                        </Button>
                    </div>
                    <Button 
                        variant="contained" 
                        color={adminChecker ? "success" : "warning"} 
                        sx={{ marginTop: "5px" }}
                        onClick={transactionRouterChecker}
                    >
                        {buttonText}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProfileSection;

