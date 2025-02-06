
import { useState } from "react";
import { Card, CardContent, Typography, Switch, FormControlLabel, Button, Box, Divider } from "@mui/material";
import { DarkMode, Notifications, Security } from "@mui/icons-material";




const SettingsPage = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

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

                {/* Security Section */}
                <Button variant="outlined" color="error" startIcon={<Security />} fullWidth>
                    Manage Security
                </Button>
            </CardContent>
        </Card>
    );
};

export default SettingsPage;

