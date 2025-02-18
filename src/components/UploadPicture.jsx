/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useContext } from "react";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import ModalPics from "./ModalPics";
import Button from "./Button";
import { toast } from "react-toastify";
import { AccountCircle } from "@mui/icons-material";
import axios from "axios";
import { MainContext } from "../context/mainContext";
import { userAPI } from "../constants/api";



const UploadPicture = ({ 
    isShow, onClose, title, progress, setProgress, preview, fileName, setFileName,
    setPreview, isLoading, setIsLoading, image, setImage, buttonText, setButtonText,
}) => {

    const imageRef = useRef(null);
    const { downloadProfileData, profileFormData, setProfileFormData } = useContext(MainContext);
    const [heightSize, setHeightSize] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    let progressWidthValue = progress.toString() + "%";

    let imageURL1 = "https://firebasestorage.googleapis.com/v0/b/judy-hub-ecommerce.appspot.com/o/images%2F858374ea-890c-4a01-ab01-0ce9fbceaa02_shirts3.jpg?alt=media&token=c621b372-3f70-46d1-8e1e-4b9c25b58da8";

    const getHeightValue = () => {
        if (imageRef?.current) {
            setHeightSize(imageRef?.current?.offsetWidth);
        }
    }

    console.log("Height Value:", heightSize);
    console.log("Preview:", preview);
    console.log("File Name:", fileName);

    useEffect(() => {
        getHeightValue();
        window.addEventListener("resize", getHeightValue());
        return () => window.removeEventListener("resize", getHeightValue());
    })

    const handleFileChange = (e) => {
        console.log("Check:>>>>", e.target.files[0]);
        // const file = e.target.files[0];
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setFileName(e?.target?.files[0]?.name);
            setPreview(URL.createObjectURL(e.target.files[0]));
            setTimeout(() => { console.log("Preview Pics:", preview, "Image Content:", image) }, 3000);
        }
    };

    const handleUpload = () => {
        setIsLoading(true);
        setButtonText("Uploading");
        setProgress(1);
        if (!image) {
            toast("Please select a picture to upload", { type: "warning" });
            setIsLoading(false);
            setButtonText("Upload");
            return;
        }

        const uniqueFileName = `${uuidv4()}_${image.name}`;
        const storageRef = ref(storage, `images/${uniqueFileName}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            (error) => {
                console.error("Picture upload failed", error);
                toast(`Picture upload failed!`, { type: "error" } );
                setProgress(0);
                setIsLoading(false);
                setButtonText("Upload");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUrl(downloadURL);
                    toast(`Picture uploaded!`, { type: "success" } );
                    setProgress(0);
                    setIsLoading(false);
                    setButtonText("Upload");

                    setProfileFormData((prevData) => {
                        const updatedData = { ...prevData, image: downloadURL };
                        console.log("Updated User Profile Data Before Upload:", updatedData);
                        uploadData(updatedData);
                        return updatedData;
                    });
                    const uploadData = async (updatedData) => {
                        try {
                            const apiType = "UPDATEPICS";
                            const response = await axios.post(userAPI, { updatedData, apiType });
                            console.log("Profile Data:>>>>", profileFormData);
                            const message = response.data.message;
                            console.log("Response:>>>>", message);
                            toast(`Data updated successfully!`, { type: "success" } );
                            downloadProfileData();
                        } catch (error) {
                            toast(`Error updating data. ${error}`, { type: "error" } );
                            console.error(error);
                        } finally {
                            setButtonText("Save");
                            setIsLoading(false);
                        }
                    }
                });
            }
        );
    };


    return (
        <ModalPics 
            show={isShow} 
            onClose={onClose} 
            title={title} 
            width={window.innerWidth > 500 ? "550px" : "96%"} 
            height={window.innerWidth > 500 ? "420px" : "550px"}
        >
            <div className="w-full xs:h-[85%] h-[90%] flex flex-row justify-center 
                items-start xs:mt-2 mt-1">
                <div className="w-full h-[80%] flex flex-col xs:justify-around justify-start items-start relative">
                    <input 
                        key={image ? image.name : "default"}
                        type="file" 
                        id="picUploadId"
                        accept="image/*" 
                        style={{ display: "none" }}
                        placeholder={fileName}
                        onChange={handleFileChange} 
                        className="xs:w-[70%] w-full mb-4 bg-primaryGreen rounded-lg py-1 xs:px-0 px-1 text-white" 
                    />
                    <div className="w-full flex justify-center items-center">
                        <label 
                            htmlFor="picUploadId"
                            className="w-[30%] xs:h-[45px] h-[40px] cursor-pointer p-2 bg-slate-100 
                            text-slate-800 rounded-l-[8px] xs:text-[15px] text-[12px] font-semibold 
                            text-end flex justify-center items-center"
                        >
                            Choose File
                        </label>
                        <span className="w-[70%] xs:h-[45px] h-[40px] bg-primaryGreen rounded-r-[8px] 
                            pl-2 text-[15px] text-start text-white font-medium flex items-center">
                            {fileName}
                        </span>
                    </div>
                    {/* <div className="absolute z-[4] top-[1px] xs:right-[170px] right-[1px] xs:w-[230px] w-[70%] 
                        h-[35px] text-start pl-2 bg-primaryGreen text-white rounded-lg border-[1px] 
                        border-white flex items-center">
                        {fileName}
                    </div> */}
                    <div className={`w-full xs:h-[95%] h-[98%] flex xs:flex-row flex-col 
                        xs:justify-between justify-start xs:items-end items-start xs:mt-0 mt-4`}>
                        <div className="xs:w-[70%] w-full h-full flex flex-col justify-center items-start">
                            <h3 className="xs:text-[18px] text-[19px] font-medium my-1">
                                Preview:
                            </h3>
                            <div 
                                ref={imageRef} 
                                style={{ width: window.innerWidth > 500 ? "60%" : "95%", height: `${heightSize}px` }}
                                className="rounded-[20px]"
                            >
                                {
                                    preview
                                    ? 
                                    (
                                        <img 
                                            // ref={imageRef}
                                            // style={{ width: "80%", height: `${heightSize}px` }}
                                            src={preview} 
                                            alt="Selected Preview" 
                                            className="w-full h-full object-cover bg-slate-400 overflow-hidden 
                                            rounded-[10px]"
                                        />
                                    )
                                    : 
                                    (
                                        <div className="w-full h-full object-cover overflow-hidden bg-red-700 
                                            rounded-[10px]">
                                            <AccountCircle 
                                                htmlColor="white" 
                                                sx={{ width: "100%", height: "100%" }} 
                                            />
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className="xs:w-[29%] w-full flex flex-row xs:justify-center justify-start 
                            xs:mt-0 mt-4">
                            <Button 
                                buttonText={buttonText}
                                onClick={handleUpload}
                                className={`xs:w-[90%] w-[95%] xs:h-[35px] h-[40px] xs:rounded-[16px] rounded-[8px] 
                                text-[14px] flex flex-row justify-evenly items-center
                                shadow-[0px_0px_5px_0px_#0b1f139c] font-medium text-white 
                                transition-all duration-300`} 
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>
            { 
                isLoading && image && (
                    <div className="w-full h-[20px] bg-slate-300 rounded-lg flex flex-row 
                        justify-center items-center">
                        <div className="w-[98%] justify-start items-center">
                            <div 
                                style={{ width: progressWidthValue, height: "12px" }} 
                                className={`bg-slate-600 rounded transition-all duration-1000`}
                            >
                            </div>
                        </div>
                    </div>
                )
            }
        </ModalPics>
    );
};

export default UploadPicture;



