/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { toast } from "react-toastify";
import { PiPencil } from "react-icons/pi";



const EditDescription = ({ isShow, onClose, title, productName, description, setProductData }) => {

    const [data, setData] = useState({ description: description });
    const [isLoading, setIsLoading] = useState(false);
    const [buttonText, setButtonText] = useState("Save Description");
    const [isEditProfile, setIsEditProfile] = useState({ description: false });
    const handleChange = (e) => { setData({ ...data, [e.target.name]: e.target.value }) };

    const editDescription = () => {
        setIsEditProfile({ ...isEditProfile, description: !isEditProfile.description });
    }

    const handleSave = () => {
        setIsLoading(true);
        setButtonText("Saving...");
        setProductData(prevData => ({ ...prevData, description: data.description }));
        setTimeout(() => {
            toast(`Description saved!`, { type: "success" } );
            setIsLoading(false);
            setButtonText("Saved!");
            onClose();
        }, 2000);
    }


    return (
        <Modal 
            show={isShow} 
            onClose={onClose} 
            title={title}
            width={window.innerWidth > 768 ? "650px" : "96%"}
            height={window.innerWidth > 768 ? "450px" : "650px"}
        >
            <div className="flex flex-col justify-between w-full h-full mt-1">
            
                    <div className="w-full flex flex-col justify-center items-start xs:mt-1 mt-10 bg-red-200">
                        <div className="w-full flex justify-start items-center my-1">
                            <div className="flexCenter text-[20px]">
                                {productName}&nbsp;Description:
                            </div>
                        </div>
                        <div className="w-full flexCenter bg-green-200">
                            <div className="relative w-full">
                                <textarea cols={80} rows={12}
                                    placeholder={ data.description } 
                                    disabled={!isEditProfile.description}
                                    name="description"
                                    value={!isEditProfile.description ? "" : data.description}
                                    onChange={handleChange}
                                    onBlur={editDescription}
                                    className="placeholder:text-slate-700 placeholder:text-[16px] text-[15px]
                                    placeholder:italic bg-blue-300 outline-none w-full text-start pr-2"
                                />
                                <PiPencil 
                                    onClick={editDescription} 
                                    size={20} 
                                    color={isEditProfile.description ? "#ff0101" : "#000"} 
                                    style={{ 
                                        width: window.innerWidth > 500 ? 30 : 20, 
                                        height: window.innerWidth > 500 ? 30 : 20, 
                                        opacity: 0.7
                                    }} 
                                    className={`absolute bottom-3 right-1 cursor-pointer`}
                                />
                            </div>
                        </div>
                    </div>
                
                <div className="w-[200px] flex flex-row justify-start xs:mt-4 mt-4">
                    <Button 
                        buttonText={buttonText}
                        onClick={handleSave}
                        className={`w-[180px] h-[35px] rounded-[16px] text-[16px] flex flex-row 
                        justify-evenly items-center shadow-[0px_0px_5px_0px_#0b1f139c] 
                        font-medium text-white transition-all duration-300`} 
                        isLoading={isLoading}
                    />
                </div>
            </div>

        </Modal>
    );
};

export default EditDescription;



