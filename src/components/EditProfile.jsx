/* eslint-disable no-unused-vars */

import { useContext, useState } from "react";
import { Card, CardContent, Typography, TextField, Button, Avatar, Box, Divider } from "@mui/material";
import { PhotoCamera, Save } from "@mui/icons-material";
import UploadPicture from "./UploadPicture";
import { MainContext } from "../context/mainContext";
import axios from "axios";
import { toast } from "react-toastify";
import { userAPI } from "../constants/api";



const EditProfilePage = () => {
    
    const { profileFormData, setProfileFormData } = useContext(MainContext);
    const { name, email, image, number, address } = profileFormData;
    let imageURL1 = "https://firebasestorage.googleapis.com/v0/b/judy-hub-ecommerce.appspot.com/o/images%2F858374ea-890c-4a01-ab01-0ce9fbceaa02_shirts3.jpg?alt=media&token=c621b372-3f70-46d1-8e1e-4b9c25b58da8";
    const [isShow, setIsShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState(image);
    const [progress, setProgress] = useState(1);
    const [buttonText, setButtonText] = useState("Upload");
    const [saveButtonText, setSaveButtonText] = useState("Save Changes");
    const [fileName, setFileName] = useState("No File Selected");
    const [images, setImages] = useState(null);

    // console.log("Preview Edit Data:>>>", preview, "Image Edit Data:>>>", image, "Profile Data:>>>", profileFormData);
    
    const handleChange = (e) => {
        setProfileFormData({ ...profileFormData, [e.target.name]: e.target.value });
    };

    const handlePictureEdit = () => {setIsShow(true)}
    const handleClose = () => {
        setIsShow(false);
        setProgress(1);
        setIsLoading(false);
        setFileName("No File Selected");
        setButtonText("Upload");
    }

    const handleFormUpload = async () => {
        setIsLoading(true);
        setSaveButtonText("Saving...");
        try {
            const apiType = "UPDATEUSER";
            const response = await axios.post(userAPI, { profileFormData, apiType });
            console.log("Profile Data:>>>>", profileFormData);
            const message = response.data.message;
            console.log("Response:>>>>", message);
            toast(`Data updated successfully!`, { type: "success" } );
        } catch (error) {
            console.error("Error uploading profile:", error);
            toast(`Data update failed!`, { type: "error" } );
        } finally {
            setIsLoading(false);
            setSaveButtonText("Save Changes");
        }
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
                    <Avatar src={preview} sx={{ width: 80, height: 80, mb: 1 }} />
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
                    value={name}
                    onChange={handleChange}
                    margin="normal"
                />

                {/* Email Input */}
                <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    margin="normal"
                />

                {/* Number Input */}
                <TextField
                    fullWidth
                    label="Phone Number"
                    name="number"
                    value={number}
                    onChange={handleChange}
                    margin="normal"
                />

                {/* Address Input */}
                <TextField
                    fullWidth
                    label="Home Address"
                    name="address"
                    value={address}
                    onChange={handleChange}
                    margin="normal"
                />

                {/* Save Button */}
                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<Save />} 
                    fullWidth sx={{ mt: 2 }}
                    onClick={handleFormUpload}
                >
                    {saveButtonText}
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
                image={images} 
                setImage={setImages} 
                buttonText={buttonText} 
                setButtonText={setButtonText} 
                fileName={fileName}
                setFileName={setFileName}
            />
        </Card>
    );
};

export default EditProfilePage;

