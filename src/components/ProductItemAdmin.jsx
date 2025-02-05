/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchIcon, NairaSign } from "../assets";
import { PiPencil } from "react-icons/pi";
import EditProducts from "./EditProducts";



const ProductItem = ({ item, isShow, setIsShow, handleCheckboxChange, selectProducts }) => {

    const { id, name, image, newPrice, oldPrice, category, tags } = item;
    const [selectedProduct, setSelectedProduct] = useState(null);
    const handleEdit = () => {
        setSelectedProduct(item);
        setIsShow(true);
    }
    const handleClose = () => {
        setIsShow(false);
    }


    return (
        <div className="xs:w-[320px] w-[320px] xs:h-[280px] h-[290px] rounded-[8px] overflow-hidden 
            shadow-[0px_0px_5px_0px_#0b1f139c] bg-slate-100 xs:m-0 m-auto flexColCenter">
            <div className="w-full xs:h-[160px] h-[170px] flexCenter relative group overflow-hidden 
                transition-all duration-700">
                <Link 
                    to={`/product/${id}`} 
                    className="flexCenter w-10 h-10 bg-white/70 rounded-full absolute z-4 transition-all duration-300"
                >
                    <img 
                        src={SearchIcon} 
                        alt="search-icon" 
                        className="w-6 h-6 hover:rotate-45 hover:scale-110 transition-all duration-300 opacity-70"
                    />
                </Link>
                <input 
                    type="checkbox" 
                    checked={selectProducts?.has(id)}
                    onChange={() => handleCheckboxChange(id)}
                    className="absolute z-[5] top-2 right-2 w-5 h-5 shadow-[0px_0px_5px_0px_#0b1f139c] 
                    cursor-pointer" 
                />
                <Link to={`/product/${id}`} className="w-full h-full">
                    <img 
                        src={image} 
                        alt={name} 
                        className="w-full h-full object-cover hover:scale-110 transition-all 
                        duration-1000 bg-slate-600"
                    />
                </Link>
            </div>
            <div className="p-2 overflow-hidden w-full xs:h-[120px] h-[120px] relative">
                <div className="text-slate-900 text-[15px] font-medium">
                    {name}
                </div>
                <hr 
                    className="h-[2px] w-full bg-black mb-1"
                />
                <div className="flex flex-col justify-center items-start gap-2">
                    <div className="flexCenter">
                        <div className="text-[12px] leading-[10px] text-slate-700">
                            New Price:&nbsp;
                        </div>
                        <img src={NairaSign} alt="N" className="w-3 h-3" />
                        <div className="text-[12px] text-primaryGreen font-medium leading-[10px]">
                            {newPrice}
                        </div>
                    </div>
                    <div className="flexCenter">
                        <div className="text-[12px] leading-[10px] text-slate-700">
                            Old Price:&nbsp;
                        </div>
                        <img src={NairaSign} alt="N" className="w-3 h-3" />
                        <div className="text-[12px] line-through text-secondaryBrown font-medium leading-[10px]">
                            {oldPrice}
                        </div>
                    </div>
                    <div className="flexCenter">
                        <div className="text-[12px] leading-[10px] text-slate-700">
                            Category:&nbsp;
                        </div>
                        <div className="text-[12px] text-slate-700 font-medium leading-[10px]">
                            {category}
                        </div>
                    </div>
                    <div className="flexCenter">
                        <div className="text-[12px] leading-[10px] text-slate-700">
                            Tags:&nbsp;
                        </div>
                        <div className="">
                            <div className="text-[12px] text-slate-700 font-medium leading-[10px]">
                                {tags}
                            </div>
                            <div 
                                onClick={handleEdit} 
                                className="absolute z-[4] xs:bottom-3 bottom-2 xs:right-[15px] right-[10px] 
                                w-6 h-6 bg-primaryGreen/40 rounded-full flexCenter 
                                shadow-[0px_0px_5px_0px_#0b1f139c]"
                            >
                                <PiPencil  
                                    size={20} 
                                    color={"#613207"} 
                                    style={{ width: 20, height: 20 }} 
                                    className={`cursor-pointer`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                isShow && selectedProduct && (
                    <EditProducts 
                        isShow={isShow} 
                        onClose={handleClose} 
                        title="Edit Product Data"
                        id={selectedProduct?.id} 
                        productName={selectedProduct?.name}
                        newPrice={selectedProduct?.newPrice}
                        oldPrice={selectedProduct?.oldPrice}
                        category={selectedProduct?.category}
                        tags={selectedProduct?.tags}
                        image={selectedProduct?.image}
                    />
                )
            }
        </div>
    )
}


export default ProductItem