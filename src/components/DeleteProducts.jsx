/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { MainContext } from "../context/mainContext";
import Button from "./Button";
import { toast } from "react-toastify";
import axios from "axios";



const DeleteProducts = ({ selectedProducts, setSelectedProducts }) => {
    const { downloadData } = useContext(MainContext);
    const ids = [...selectedProducts];
    console.log("Selected IDs:>>>>", ids);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteText, setDeleteText] = useState("Delete");
    const apiDeleteProductUrl = import.meta.env.VITE_API_DELETEDATA_URL;

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
        <section className="w-[450px]">
            <div className="w-full h-[60px] flex flex-row justify-between items-center">
                <div className="px-1 text-[17px] font-medium text-slate-900">
                    Delete { [...selectedProducts]?.length } number of products
                </div>
                <div>
                    <Button
                        onClick={handleDeletes} 
                        buttonText={deleteText}
                        isLoading={isLoading}
                        disabled={isLoading}
                        loaderMargLeft={"mr-3"}
                        className="bg-slate-800 rounded-xl w-[160px] h-[38px] text-white font-semibold flexCenter" 
                    />
                </div>
            </div>
        </section>
    )
}

export default DeleteProducts
