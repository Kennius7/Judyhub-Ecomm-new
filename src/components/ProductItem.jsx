/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { SearchIcon } from "../assets";


const ProductItem = ({ item: { id, name, image, newPrice, oldPrice } }) => {
    return (
        <div className="rounded-[8px] overflow-hidden shadow-xl bg-slate-100">
            <div 
                className="flexCenter relative group overflow-hidden transition-all duration-200"
            >
                <Link 
                    to={`/product/${id}`} 
                    className="flexCenter w-12 h-12 bg-white rounded-[50%] absolute z-4 scale-0 
                    group-hover:scale-100 transition-all duration-700"
                >
                    <img 
                        src={SearchIcon} 
                        alt="search-icon" 
                        className="hover:rotate-90 hover:scale-125 transition-all duration-300"
                    />
                </Link>
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full block object-cover group-hover:scale-110 transition-all duration-1000"
                />
            </div>
            <div className="p-4 overflow-hidden">
                <div className="my-[6px] medium-16 line-clamp-2 text-slate-900 text-[20px] font-semibold">
                    {name}
                </div>
                <div className="flex gap-5">
                    <div className="text-[18px]">
                        {newPrice}
                    </div>
                    <div className="text-[18px] line-through">
                        {oldPrice}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ProductItem