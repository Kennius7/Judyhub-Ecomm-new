
import { useContext, useState } from "react";
import { Card, CardContent, Typography, Switch, FormControlLabel, Button, Box, Divider } from "@mui/material";
import { DarkMode, Notifications, Settings, LogoutRounded } from "@mui/icons-material";
import { MainContext } from "../context/mainContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";





const SettingsPage = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const navigate = useNavigate();
    const { secondaryBrown, adminChecker } = useContext(MainContext);


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
                    startIcon={<LogoutRounded />}
                    fullWidth
                    onClick={signOut}
                    sx={{ mt: 2 }}
                >
                    Sign Out
                </Button>
            </CardContent>
        </Card>
    );
};

export default SettingsPage;

