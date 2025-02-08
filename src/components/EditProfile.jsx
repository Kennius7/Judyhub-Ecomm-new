/* eslint-disable no-unused-vars */

import { useState } from "react";
import { Card, CardContent, Typography, TextField, Button, Avatar, Box, Divider } from "@mui/material";
import { PhotoCamera, Save } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
import UploadPicture from "./UploadPicture";




const EditProfilePage = () => {
    // const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        avatar: "/static/images/avatar/1.jpg",
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    let imageURL1 = "https://firebasestorage.googleapis.com/v0/b/judy-hub-ecommerce.appspot.com/o/images%2F858374ea-890c-4a01-ab01-0ce9fbceaa02_shirts3.jpg?alt=media&token=c621b372-3f70-46d1-8e1e-4b9c25b58da8";
    const [isShow, setIsShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [progress, setProgress] = useState(1);
    const [image, setImage] = useState(null);
    const [buttonText, setButtonText] = useState("Upload");
    const [fileName, setFileName] = useState("No File Selected");

    const handlePictureEdit = () => {
        setProgress(1);
        setPreview(null);
        setIsLoading(false);
        setImage(null);
        setButtonText("Upload");
        setFileName("No File Selected");
        setIsShow(true);
    }
    const handleClose = () => {
        setIsShow(false);
        setProgress(1);
        setPreview(null);
        setIsLoading(false);
        setImage(null);
        setFileName("No File Selected");
        setButtonText("Upload");
    }



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
                    <Button 
                        variant="contained" 
                        component="label" 
                        startIcon={<PhotoCamera />}
                        onClick={handlePictureEdit}
                    >
                        Change Avatar
                        {/* <input hidden accept="image/*" type="file" /> */}
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
            <UploadPicture 
                isShow={isShow} 
                onClose={handleClose} 
                title={"Change Profile Picture"} 
                progress={progress} 
                setProgress={setProgress} 
                preview={preview} 
                setPreview={setPreview} 
                isLoading={isLoading} 
                setIsLoading={setIsLoading} 
                image={image} 
                setImage={setImage} 
                buttonText={buttonText} 
                setButtonText={setButtonText} 
                fileName={fileName}
                setFileName={setFileName}
            />
        </Card>
    );
};

export default EditProfilePage;

