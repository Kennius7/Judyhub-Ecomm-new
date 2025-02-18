/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { MainContext } from "../context/mainContext";
import Button from "./Button";
import { toast } from "react-toastify";
import axios from "axios";
import { apiDeleteProductUrl } from "../constants/api";



const DeleteProducts = ({ selectedProducts, setSelectedProducts }) => {
    const { downloadData } = useContext(MainContext);
    const ids = [...selectedProducts];
    console.log("Selected IDs:>>>>", ids);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteText, setDeleteText] = useState("Delete");

    const handleDeletes = async () => {
        setIsLoading(true);
        setDeleteText("Deleting...");

        if (ids.length === 0) {
            toast("Please select at least one item to delete.", { type: "warning" });
            setTimeout(() => {
                setIsLoading(false);
                setDeleteText("Delete");
            }, 2000);
            return;
        }

        try {
            const response = await axios.delete(apiDeleteProductUrl, { data: { ids } });
            const message = response?.data?.message;
            setDeleteText("Deleted!");
            toast(message, { type: "success" });
            setTimeout(() => {
                setDeleteText("Delete")
                downloadData();
            }, 2000);
        } catch (error) {
            console.error("Error deleting item:", error);
            const errorMessage = error?.response?.data?.error;
            toast(`Error deleting item: ${errorMessage}`, { type: "error" });
            setDeleteText("Delete Failed!");
            setTimeout(() => setDeleteText("Delete"), 2000);
        } finally {
            setIsLoading(false);
            setDeleteText("Delete");
            setSelectedProducts(new Set());
        }
    }


    return (
        <section className="xs:w-[450px] w-[200px] xs:px-0 px-2">
            <div className="w-full xs:h-[60px] h-fit flex xs:flex-row flex-col xs:justify-start 
                justify-center xs:items-center items-start">
                <div className="xs:px-1 px-0 xs:text-[17px] text-[15px] font-medium text-slate-900 xs:mr-4 mr-0">
                    Delete { [...selectedProducts]?.length } products
                </div>
                <div>
                    <Button
                        onClick={handleDeletes} 
                        btnGradColor1="#064709"
                        btnGradColor2="#000"
                        buttonText={deleteText}
                        isLoading={isLoading}
                        disabled={isLoading}
                        loaderMargLeft={isLoading ? "mr-3" : "mr-0"}
                        className="bg-slate-800 rounded-xl w-[120px] h-[32px] text-white 
                        xs:text-[14px] text-[12px] font-semibold flexCenter" 
                    />
                </div>
            </div>
        </section>
    )
}

export default DeleteProducts
