/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Modal from "./Modal";
import Button from "./Button";
import { toast } from "react-toastify";



const UploadImage = ({ 
    isShow, onClose, title, progress, setProgress, preview, 
    setPreview, isLoading, setIsLoading, image, setImage, buttonText, setButtonText
}) => {

    const [imageUrl, setImageUrl] = useState("");
    let progressWidthValue = progress.toString() + "%";
    let imageURL1 = "https://firebasestorage.googleapis.com/v0/b/judy-hub-ecommerce.appspot.com/o/images%2F858374ea-890c-4a01-ab01-0ce9fbceaa02_shirts3.jpg?alt=media&token=c621b372-3f70-46d1-8e1e-4b9c25b58da8";


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setTimeout(() => { console.log("Preview Pics:", preview, "Image Content:", image) }, 3000);
        }
    };

    const handleUpload = () => {
        setIsLoading(true);
        setButtonText("Uploading");
        setProgress(0);
        if (!image) {
            toast("Please select a picture to upload", { type: "warning" });
            setIsLoading(false);
            setButtonText("Upload");
            return;
        }

        const uniqueFileName = `${uuidv4()}_${image.name}`;
        const storageRef = ref(storage, `images/${uniqueFileName}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        const addVar = 0.001;

        const initialUploadIllusion = () => {
            for (let index = 0; index < 2; index += addVar) setProgress(prev => prev + addVar);
        }
        initialUploadIllusion();

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(prev => prev + progress);
            },
            (error) => {
                console.error("Picture upload failed", error);
                toast(`Picture upload failed!`, { type: "error" } );
                setPreview(null);
                setProgress(0);
                setIsLoading(false);
                setImage(null);
                setButtonText("Upload");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUrl(downloadURL);
                    toast(`Picture uploaded!`, { type: "success" } );
                    setPreview(null);
                    setProgress(0);
                    setIsLoading(false);
                    setImage(null);
                    setButtonText("Upload");
                });
            }
        );
    };


    return (
        <Modal show={isShow} onClose={onClose} title={title}>
            <div className="w-full sm:h-[250px] xs:h-[300px] h-[230px] flexCenter xs:mt-3 mt-1">
                <div className="w-full flex flex-col justify-around items-end">
                    <input 
                        key={image ? image.name : "default"}
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="w-full mb-4" 
                    />
                    <div className={`w-full xs:h-[180px] h-[150px] flex flex-row items-end 
                        ${preview ? "justify-between" : "justify-end"}`}>
                        {
                            preview ? (
                                <div className="flex flex-col justify-around items-start">
                                    <h3 className="xs:text-[18px] text-[15px]">
                                        Preview:
                                    </h3>
                                    <img 
                                        src={preview} 
                                        alt="Selected Preview" 
                                        className="xs:w-[150px] w-[120px] xs:h-[150px] h-[120px] object-cover" 
                                    />
                                </div>
                            ) : (
                                <div className="xs:w-[150px] w-[120px] xs:h-[150px] h-[120px]"></div>
                            )
                        }
                        <div className="w-[200px] flex flex-row justify-end">
                            <Button 
                                buttonText={buttonText}
                                onClick={handleUpload}
                                className={`w-[140px] h-[35px] rounded-[16px] text-[16px] flex flex-row 
                                justify-evenly items-center
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
        </Modal>
    );
};

export default UploadImage;



