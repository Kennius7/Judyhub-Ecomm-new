
import { useState } from "react";
import { Card, CardContent, Typography, TextField, Button, Avatar, Box, Divider } from "@mui/material";
import { PhotoCamera, Save } from "@mui/icons-material";




const EditProfilePage = () => {
    const [user, setUser] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        avatar: "/static/images/avatar/1.jpg",
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <Card 
            sx={{ 
                maxWidth: 500, 
                mx: "auto", 
                mt: 4, 
                p: 2, 
                boxShadow: 5, 
                borderRadius: 3 
            }}
        >
            <CardContent>
                <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
                    Edit Profile
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {/* Avatar Section */}
                <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                    <Avatar src={user.avatar} sx={{ width: 80, height: 80, mb: 1 }} />
                    <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
                        Change Avatar
                        <input hidden accept="image/*" type="file" />
                    </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />

                {/* Name Input */}
                <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    margin="normal"
                />

                {/* Email Input */}
                <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    margin="normal"
                />

                {/* Save Button */}
                <Button variant="contained" color="primary" startIcon={<Save />} fullWidth sx={{ mt: 2 }}>
                    Save Changes
                </Button>
            </CardContent>
        </Card>
    );
};

export default EditProfilePage;

