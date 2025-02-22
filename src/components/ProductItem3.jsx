/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { SearchIcon, NairaSign } from "../assets";


const ProductItem = ({ item: { id, name, image, newPrice, oldPrice } }) => {
    return (
        <div className="rounded-[8px] overflow-hidden shadow-xl bg-slate-100">
            <div 
                className="flexCenter relative group overflow-hidden transition-all duration-700"
            >
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
                <Link to={`/product/${id}`}>
                    <img 
                        src={image} 
                        alt={name} 
                        className="w-full block object-cover hover:scale-110 transition-all duration-1000"
                    />
                </Link>
            </div>
            <div className="p-4 overflow-hidden">
                <div className="my-[6px] medium-16 line-clamp-2 text-slate-900 text-[20px] font-semibold">
                    {name}
                </div>
                <div className="flex flex-col justify-center items-start">
                    <div className="flexCenter mb-2">
                        <div className="text-[17px] font-sans leading-[10px]">
                            New Price:&nbsp;
                        </div>
                        <img src={NairaSign} alt="N" className="w-5 h-5" />
                        <div className="text-[17px] text-primaryGreen font-bold font-poppins leading-[10px] ml-1">
                            {newPrice}
                        </div>
                    </div>
                    <div className="flexCenter">
                        <div className="text-[17px] font-sans leading-[10px]">
                            Old Price:&nbsp;
                        </div>
                        <img src={NairaSign} alt="N" className="w-5 h-5" />
                        <div className="text-[16px] line-through text-secondaryBrown font-semibold 
                            font-poppins leading-[10px] ml-1">
                            {oldPrice}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ProductItem