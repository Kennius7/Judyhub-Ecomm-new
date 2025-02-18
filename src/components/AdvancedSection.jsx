/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import UploadImage from "./UploadImages";
import { toast } from "react-toastify";
import { AllProducts, judyhubProducts } from "../constants/data";
import Button from "./Button";
import axios from "axios";
import PopularAdmin from "./PopularAdmin";
import NewCollectionAdmin from "./NewCollectionAdmin";
import OtherProductsAdmin from "./OtherProductsAdmin";
import { MainContext } from "../context/mainContext";
import { productAPI } from "../constants/api";



const AdminSection = () => {
    const { downloadData } = useContext(MainContext);
    const [isShow, setIsShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isPostLoading, setIsPostLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);
    const [buttonText, setButtonText] = useState("Upload");
    const [postButtonText, setPostButtonText] = useState("Post");



    const handlePictureEdit = () => {setIsShow(true)}
    const handleClose = () => {
        setIsShow(false);
        setProgress(0);
        setPreview(null);
        setIsLoading(false);
        setImage(null);
        setButtonText("Upload");
    }
    const handlePost = async () => {
        console.log("Posting data to database...");
        setIsPostLoading(true);
        setPostButtonText("Posting");
        try {
            const apiType = "POSTPRODUCTDATA";
            const res = await axios.post(productAPI, { AllProducts, apiType });
            const responseMsg = res.data.message;
            console.log(responseMsg);
            console.log("Data updated successfully!");
            toast(responseMsg, { type: "success" } );
            downloadData();
            setIsPostLoading(false);
            setPostButtonText("Post");
        } catch (error) {
            console.error("Error updating data:", error.message);
            toast("Error updating data:" + "  " + error.message, { type: "error" } );
            setIsPostLoading(false);
            setPostButtonText("Post");
        }
    }

    return (
        <section className="w-full bg-slate-100 flexColCenter py-20">
            {/* <PopularAdmin/> */}
            {/* <NewCollectionAdmin/>
            <OtherProductsAdmin/> */}
            <div className="w-full text-center h-[70vh] flexCenter">
                Advanced Settings
            </div>
                {/* <div className="flexColCenter mt-10">
                    <div className="mb-10 text-[18px]">
                        Posting Data to Database
                    </div>
                    <Button
                        buttonText={postButtonText}
                        onClick={handlePost}
                        className={`w-[140px] h-[35px] rounded-[16px] text-[16px] flex flex-row 
                        justify-evenly items-center
                        shadow-[0px_0px_5px_0px_#0b1f139c] font-medium text-white 
                        transition-all duration-300`} 
                        isLoading={isPostLoading}
                    />
                </div> */}

        </section>
    )
}

export default AdminSection
