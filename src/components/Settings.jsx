
import { useContext, useState } from "react";
import { Card, CardContent, Typography, Switch, FormControlLabel, Button, Box, Divider, CircularProgress } from "@mui/material";
import { DarkMode, Notifications, Settings, LogoutRounded } from "@mui/icons-material";
import { MainContext } from "../context/mainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";





const SettingsPage = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { secondaryBrown, adminChecker, profileFormData, setProfileFormData, downloadProfileData } = useContext(MainContext);
    const { name } = profileFormData;
    const apiSignOutUrl = import.meta.env.VITE_API_SIGNOUT_URL;

    const handleSignOut = async () => {
        setIsLoading(true);
        if (name !== "Guest") {
            try {
                const response = await axios.post(apiSignOutUrl, { name });
                const message = response.data.message;
                console.log("Message:>>>", message);
                toast(message, { type: "success" });
                localStorage.setItem("user-token", "");
                setProfileFormData({ 
                    ...profileFormData, 
                    name: "Guest", 
                    email: "guest@mail.com",
                    number: "10000100001",
                    address: "",
                    image: "", 
                });
                downloadProfileData();
                setTimeout(() => { 
                    setIsLoading(false);
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                }, 1000);
            } catch (error) {
                console.error(error);
                toast(error.message, { type: "error" });
                setTimeout(() => { setIsLoading(false) }, 1000);
            }
        } else {
            console.log("Not signed in:", name);
            toast(`Not signed in, ${name}`, { type: "warning" });
            setTimeout(() => { setIsLoading(false) }, 1000);
        }
    }


    return (
        <Card sx={{ maxWidth: 500, mx: "auto", mt: 4, p: 2, boxShadow: 5, borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
                    Settings
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {/* Dark Mode Toggle */}
                <FormControlLabel
                    control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
                    label={
                        <Box display="flex" alignItems="center">
                        <DarkMode sx={{ mr: 1 }} /> Dark Mode
                        </Box>
                    }
                />
                <Divider sx={{ my: 2 }} />

                {/* Notifications Toggle */}
                <FormControlLabel
                    control={<Switch checked={notifications} onChange={() => setNotifications(!notifications)} />}
                    label={
                        <Box display="flex" alignItems="center">
                        <Notifications sx={{ mr: 1 }} /> Notifications
                        </Box>
                    }
                />
                <Divider sx={{ my: 2 }} />

                <Button 
                    variant="outlined" 
                    color={secondaryBrown} 
                    startIcon={<Settings />} 
                    fullWidth
                    onClick={() => navigate("advanced")}
                >
                    Advanced Settings
                </Button>

                {
                    adminChecker && (
                        <Button 
                            variant="outlined" 
                            color={secondaryBrown} 
                            startIcon={<Settings />} 
                            fullWidth
                            onClick={() => navigate("admin")}
                            sx={{ mt: 2 }}
                        >
                            Manage Product Settings
                        </Button>
                    )
                }
                <Button
                    variant="contained"
                    color="error"
                    startIcon={ isLoading ? <CircularProgress size={24} color="inherit"/> : <LogoutRounded />}
                    fullWidth
                    onClick={handleSignOut}
                    sx={{ mt: 2 }}
                >
                    { isLoading ? "Signing out..." : "Sign Out" }
                </Button>
            </CardContent>
        </Card>
    );
};

export default SettingsPage;

