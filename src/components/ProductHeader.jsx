/* eslint-disable react/prop-types */
import { TbArrowRight } from "react-icons/tb";



const ProductHeader = ({ product }) => {

    return (
        <div className="flex flex-row justify-start gap-x-4 items-center font-semibold text-slate-900 text-[18px] pb-6">
            Home <TbArrowRight/> Shop <TbArrowRight/> { product.category } <TbArrowRight/> { product.name }
        </div>
    )
}

export default ProductHeader;
