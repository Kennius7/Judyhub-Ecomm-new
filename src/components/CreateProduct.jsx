/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef, useContext, useEffect } from "react";
import Modal from "./Modal";
import { MainContext } from "../context/mainContext";
import Button from "./Button";
import { PiPencil } from "react-icons/pi";
import { toast } from "react-toastify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { storage } from "../../firebaseConfig";
import { BiMinus, BiPlus } from "react-icons/bi";



const CreateProduct = () => {
    const { downloadData, fetchedData } = useContext(MainContext);
    const [newID, setNewID] = useState(0);
    let sampleImageUrl = "https://firebasestorage.googleapis.com/v0/b/judy-hub-ecommerce.appspot.com/o/images%2F858374ea-890c-4a01-ab01-0ce9fbceaa02_shirts3.jpg?alt=media&token=c621b372-3f70-46d1-8e1e-4b9c25b58da8";
    const getNewID = (arr) => {
        if (!Array.isArray(arr)) {
            console.error("Fetched Data is not an array...");
        } else {
            let newID = arr.reduce((max, item) => (item.id > max ? item.id : max), 0) + 1;
            setNewID(newID);
        }
    }
    const getNewIDText = (arr) => {
        if (!Array.isArray(arr)) {
            console.error("Fetched Data is not an array...");
        } else {
            let newID = arr.reduce((max, item) => (item.id > max ? item.id : max), 0) + 1;
            return newID;
        }
    }

    useEffect(() => {
        getNewID(fetchedData?.products)
    }, [fetchedData?.products])
    
    useEffect(() => {
        setProductData((prev) => ({ ...prev, id: newID }));
    }, [newID]);

    console.log("Fetched Data:>>>>", fetchedData);
    const [productData, setProductData] = useState({
        productName: "Sample Name",
        newPrice: "New Price",
        oldPrice: "Old Price",
        category: "Category",
        tags: "Tags",
        image: sampleImageUrl,
        id: newID,
    }); 
    console.log("New Id:>>>>", productData.id);
    const [isShow, setIsShow] = useState(false);
    const handleCreate = () => setIsShow(true);
    const handleClose = () => setIsShow(false);
    const [preview, setPreview] = useState(productData.image);
    const [images, setImages] = useState(null);
    const [progress, setProgress] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [buttonText, setButtonText] = useState("Save");

    
    let progressWidthValue = progress.toString() + "%";
    console.log("Progress Value:>>>", progressWidthValue);
    const apiCreateProductUrl = import.meta.env.VITE_API_CREATE_PRODUCT_URL

    const nameRef = useRef(null);
    const priceRef = useRef(null);
    const oldPriceRef = useRef(null);
    const categoryRef = useRef(null);
    const tagsRef = useRef(null);
    const idRef = useRef(null);

    const [isEditProfile, setIsEditProfile] = useState({
        productName: false,
        newPrice: false,
        oldPrice: false,
        category: false,
        tags: false,
        id: false,
    });

    const handleChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });
    };

    const handleIncrement = () => {
        setProductData((prevData) => ({
        ...prevData, id: prevData.id + 1
        }));
    }

    const handleDecrement = () => {
        if (productData.id > getNewIDText(fetchedData.products)) {
            setProductData((prevData) => ({
            ...prevData, id: prevData.id - 1
            }));
        }
    }

    const editField = async (ref) => {
        // console.log("Ref Values Check:", ref.current.firstChild.placeholder);
        // console.log("Doc Id: ", id);

        if (ref.current && ref.current.firstChild.name === "productName") {
            setIsEditProfile({ ...isEditProfile, productName: !isEditProfile.productName });
            setProductData(prevData => ({
                ...prevData,
                [ref.current.firstChild.name]: prevData[ref.current.firstChild.name] 
            }));
        }
        if (ref.current && ref.current.firstChild.name === "newPrice") {
            setIsEditProfile({ ...isEditProfile, newPrice: !isEditProfile.newPrice });
            setProductData(prevData => ({
                ...prevData,
                [ref.current.firstChild.name]: prevData[ref.current.firstChild.name] 
            }));
        }
        if (ref.current && ref.current.firstChild.name === "oldPrice") {
            setIsEditProfile({ ...isEditProfile, oldPrice: !isEditProfile.oldPrice });
            setProductData(prevData => ({
                ...prevData,
                [ref.current.firstChild.name]: prevData[ref.current.firstChild.name] 
            }));
        }
        if (ref.current && ref.current.firstChild.name === "category") {
            setIsEditProfile({ ...isEditProfile, category: !isEditProfile.category });
            setProductData(prevData => ({
                ...prevData,
                [ref.current.firstChild.name]: prevData[ref.current.firstChild.name] 
            }));
        }
        if (ref.current && ref.current.firstChild.name === "tags") {
            setIsEditProfile({ ...isEditProfile, tags: !isEditProfile.tags });
            setProductData(prevData => ({
                ...prevData,
                [ref.current.firstChild.name]: prevData[ref.current.firstChild.name] 
            }));
        }
        // if (ref.current && ref.current.firstChild.name === "id") {
        //     setIsEditProfile({ ...isEditProfile, id: !isEditProfile.id });
        //     setProductData(prevData => ({
        //         ...prevData,
        //         [ref.current.firstChild.name]: prevData[ref.current.firstChild.name] 
        //     }));
        // }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImages(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        setIsLoading(true);
        setButtonText("Saving");
        setProgress(0);
        if (!images && productData?.image?.length === 0) {
            toast("Please select a picture to upload", { type: "warning" });
            setIsLoading(false);
            setButtonText("Save");
            return;
        }

        if (images?.name || productData.name.length !== 0) {
            const uniqueFileName = `${uuidv4()}_${images?.name}` || `${uuidv4()}_${productData?.name}`;
            const storageRef = ref(storage, `images/${uniqueFileName}`);
            const uploadTask = uploadBytesResumable(storageRef, images);
            const addVar = 0.001;
    
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    console.log("Current Progress:>>>>", progress);
                    setProgress(prev => {
                        if (prev >= 100) {
                            return prev;
                        } else return progress;
                    });
                },
                (error) => {
                    console.error("Data update failed", error);
                    toast(`Picture upload failed!`, { type: "error" } );
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setProductData((prevData) => {
                            const updatedData = { ...prevData, image: downloadURL };
                            console.log("Updated Product Data Before Upload:", updatedData);
                            uploadData(updatedData);
                            return updatedData;
                        });
                        const uploadData = async (updatedData) => {
                            try {
                                const response = await axios.post(apiCreateProductUrl, { updatedData });
                                console.log("Product Data:>>>>", productData);
                                const message = response.data.message;
                                console.log("Response:>>>>", message);
                                toast(`Data updated successfully!`, { type: "success" } );
                                downloadData();
                            } catch (error) {
                                toast(`Error updating data. ${error}`, { type: "error" } );
                                console.error(error);
                            } finally {
                                setButtonText("Save");
                                setIsLoading(false);
                            }
                        }
                        // toast(`Picture saved!`, { type: "success" } );
                        // console.log("Download URL:>>>>", productData.image);
                    });
                }
            );
        }
    };


    return (
        <section>
            <div className="xs:px-0 px-2">
                <Button
                    onClick={handleCreate} 
                    buttonText={"Add Product"}
                    className="bg-slate-800 rounded-xl xs:w-[200px] w-[130px] xs:text-[15px] 
                    text-[12px] text-center h-[38px] text-white font-semibold flexCenter" 
                />
            </div>
            {
                isShow && (
                    <Modal 
                        show={isShow} 
                        onClose={handleClose} 
                        title={"Create New Product"}
                        width={window.innerWidth > 768 ? "650px" : "96%"}
                        height={window.innerWidth > 768 ? "450px" : "650px"}
                    >
                        <div className="flex flex-col justify-between w-full h-full mt-3">
                            <div className="flex xs:flex-row flex-col xs:justify-between xs:w-[630px] w-full 
                                justify-center items-center">
                                {/* Product Image Data Value */}
                                <div className="flex flex-col xs:justify-around xs:w-[250px] w-full h-[300px]
                                    justify-start items-start">
                                    <input 
                                        // key={images ? images.name : "default"}
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleFileChange} 
                                        className="xs:w-[250px] w-full mb-4 bg-primaryGreen text-white 
                                        rounded-lg xs:text-[16px] text-[15px] leading-[30px]"
                                    />
                                    <div className={`xs:w-[200px] w-full xs:h-[180px] h-[260px] flex flex-col justify-center 
                                        items-start xs:mt-4 mt-0`}>
                                        {
                                            preview ? (
                                                <div className="w-full flex flex-col justify-around items-start">
                                                    <h3 className="xs:text-[22px] text-[19px] leading-[30px]">
                                                        Preview:
                                                    </h3>
                                                    <img 
                                                        src={preview} 
                                                        alt="Selected Preview" 
                                                        className="xs:w-[200px] w-full xs:h-[200px] h-[240px] object-cover" 
                                                    />
                                                </div>
                                            ) : (
                                                <div className="xs:w-[200px] w-[220px] xs:h-[200px] h-[200px]"></div>
                                            )
                                        }
                                        <div className="w-[200px] xs:flex hidden flex-row justify-start xs:mt-10 mt-4">
                                            <Button 
                                                buttonText={buttonText}
                                                onClick={handleUpload}
                                                className={`w-[140px] h-[35px] rounded-[16px] text-[16px] flex flex-row 
                                                justify-evenly items-center shadow-[0px_0px_5px_0px_#0b1f139c] 
                                                font-medium text-white transition-all duration-300`} 
                                                isLoading={isLoading}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Product Text Data Values */}
                                <div className="xs:w-[70%] w-full flex flex-col justify-center items-start gap-2 xs:mt-4 mt-10">
                                    <div className="w-full flexCenter">
                                        <div className="sm:text-[17px] text-[13px] text-slate-700 xs:w-[130px] w-[120px] 
                                        xs:pl-0 pl-1">
                                            Product Name:
                                        </div>
                                        <div ref={nameRef} className="flexBetween">
                                            <input 
                                                placeholder={ productData.productName } 
                                                disabled={!isEditProfile.productName}
                                                name="productName"
                                                value={!isEditProfile.productName ? "" : productData.productName}
                                                onChange={handleChange}
                                                onBlur={() => editField(nameRef)}
                                                className="placeholder:text-slate-700 placeholder:text-[14px] text-[13px]
                                                placeholder:italic bg-transparent outline-none cursor-pointer text-end pr-2
                                                w-[190px] placeholder:text-center"
                                            />
                                            <PiPencil 
                                                onClick={() => editField(nameRef)} 
                                                size={20} 
                                                color={isEditProfile.productName ? "#ff0101" : "#000"} 
                                                style={{ width: 20, height: 20, opacity: 0.7}} 
                                                className={`cursor-pointer m-1`}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full flexCenter">
                                        <div className="sm:text-[17px] text-[13px] text-slate-700 xs:w-[130px] w-[100px] 
                                        xs:pl-0 pl-1">
                                            New Price:
                                        </div>
                                        <div ref={priceRef} className="flexBetween">
                                            <input 
                                                placeholder={ productData.newPrice } 
                                                disabled={!isEditProfile.newPrice}
                                                name="newPrice"
                                                value={!isEditProfile.newPrice ? "" : productData.newPrice}
                                                onChange={handleChange}
                                                onBlur={() => editField(priceRef)}
                                                className="placeholder:text-slate-700 placeholder:text-[14px] text-[13px]
                                                placeholder:italic bg-transparent outline-none cursor-pointer text-end pr-2 
                                                w-[190px] placeholder:text-center"
                                            />
                                            <PiPencil 
                                                onClick={() => editField(priceRef)} 
                                                size={20} 
                                                color={isEditProfile.newPrice ? "#ff0101" : "#000"} 
                                                style={{ width: 20, height: 20, opacity: 0.7}} 
                                                className={`cursor-pointer m-1`}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full flexCenter">
                                        <div className="sm:text-[17px] text-[13px] text-slate-700 xs:w-[130px] w-[100px]">
                                            Old Price:
                                        </div>
                                        <div ref={oldPriceRef} className="flexBetween">
                                            <input 
                                                placeholder={ productData.oldPrice } 
                                                disabled={!isEditProfile.oldPrice}
                                                name="oldPrice"
                                                value={!isEditProfile.oldPrice ? "" : productData.oldPrice}
                                                onChange={handleChange}
                                                onBlur={() => editField(oldPriceRef)}
                                                className="placeholder:text-slate-700 placeholder:text-[16px] text-[15px]
                                                placeholder:italic bg-transparent outline-none cursor-pointer text-end pr-2 
                                                w-[190px] placeholder:text-center"
                                            />
                                            <PiPencil 
                                                onClick={() => editField(oldPriceRef)} 
                                                size={20} 
                                                color={isEditProfile.oldPrice ? "#ff0101" : "#000"} 
                                                style={{ width: 20, height: 20, opacity: 0.7}} 
                                                className={`cursor-pointer`}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full flexCenter">
                                        <div className="sm:text-[17px] text-[13px] text-slate-700 xs:w-[130px] w-[100px]">
                                            Category:
                                        </div>
                                        <div ref={categoryRef} className="flexBetween">
                                            <input 
                                                placeholder={ productData.category } 
                                                disabled={!isEditProfile.category}
                                                name="category"
                                                value={!isEditProfile.category ? "" : productData.category}
                                                onChange={handleChange}
                                                onBlur={() => editField(categoryRef)}
                                                className="placeholder:text-slate-700 placeholder:text-[16px] text-[15px]
                                                placeholder:italic bg-transparent outline-none cursor-pointer text-end pr-2 
                                                w-[190px] placeholder:text-center"
                                            />
                                            <PiPencil 
                                                onClick={() => editField(categoryRef)} 
                                                size={20} 
                                                color={isEditProfile.category ? "#ff0101" : "#000"} 
                                                style={{ width: 20, height: 20, opacity: 0.7}} 
                                                className={`cursor-pointer`}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full flexCenter">
                                        <div className="sm:text-[17px] text-[14px] text-slate-700 xs:w-[130px] w-[100px]">
                                            Tags:
                                        </div>
                                        <div ref={tagsRef} className="flexBetween">
                                            <input 
                                                placeholder={ productData.tags } 
                                                disabled={!isEditProfile.tags}
                                                name="tags"
                                                value={!isEditProfile.tags ? "" : productData.tags}
                                                onChange={handleChange}
                                                onBlur={() => editField(tagsRef)}
                                                className="placeholder:text-slate-700 placeholder:text-[16px] text-[15px]
                                                placeholder:italic bg-transparent outline-none cursor-pointer text-end pr-2 
                                                w-[190px] placeholder:text-center"
                                            />
                                            <PiPencil 
                                                onClick={() => editField(tagsRef)} 
                                                size={20} 
                                                color={isEditProfile.tags ? "#ff0101" : "#000"} 
                                                style={{ width: 20, height: 20, opacity: 0.7}} 
                                                className={`cursor-pointer`}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full flexCenter">
                                        <div className="sm:text-[17px] text-[13px] text-slate-700 xs:w-[130px] w-[100px]">
                                            Prod. ID No.({getNewIDText(fetchedData?.products)}):
                                        </div>
                                        <div ref={idRef} className="flexBetween">
                                            <div 
                                                onClick={handleDecrement} 
                                                className="bg-slate-400 rounded-md"
                                            >
                                                <BiMinus style={{ width: 25, height: 25 }} size={24} />
                                            </div>
                                            <input 
                                                type="number"
                                                placeholder={productData?.id} 
                                                name="id"
                                                readOnly
                                                value={productData?.id}
                                                className="placeholder:text-slate-700 placeholder:text-[18px] text-[15px]
                                                placeholder:italic bg-blue-100 outline-none cursor-pointer text-center 
                                                w-[160px] p-2 placeholder:text-center mx-1 rounded-lg"
                                            />
                                            <div 
                                                onClick={handleIncrement} 
                                                className="bg-slate-300 rounded-md"
                                            >
                                                <BiPlus style={{ width: 25, height: 25 }} size={24} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[200px] xs:hidden flex flex-row justify-start xs:mt-10 mt-4">
                                <Button 
                                    buttonText={buttonText}
                                    onClick={handleUpload}
                                    className={`w-[140px] h-[35px] rounded-[16px] text-[16px] flex flex-row 
                                    justify-evenly items-center shadow-[0px_0px_5px_0px_#0b1f139c] 
                                    font-medium text-white transition-all duration-300`} 
                                    isLoading={isLoading}
                                />
                            </div>
                            {
                                isLoading ? (
                                    <div className="w-full h-[20px] bg-slate-300 rounded-lg flex flex-row 
                                        justify-center items-center xs:mt-14 mt-4">
                                        <div className="w-[98%] justify-start items-center">
                                            <div 
                                                style={{ width: progressWidthValue, height: "12px" }} 
                                                className={`bg-slate-600 rounded transition-all duration-1000`}
                                            >
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-[20px]"></div>
                                )
                            }
                        </div>
                    </Modal>
                )
            }
        </section>
    )
}

export default CreateProduct
