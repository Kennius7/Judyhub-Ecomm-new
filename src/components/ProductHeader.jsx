/* eslint-disable react/prop-types */
// import { ArrowRight } from "lucide-react";
// import { TbArrowRight } from "react-icons/tb";




const ProductHeader = ({ product }) => {
    const arrowText = ">>";

    return (
        <div className="w-full flex flex-row justify-start items-center font-semibold 
            text-slate-900 xs:text-[18px] text-[17px] pb-6 xs:mt-12 mt-20">
            Home {arrowText} Shop {arrowText} { product.category } 
            <br className="xs:hidden block" /> {arrowText} { product.name }
        </div>
    )
}

export default ProductHeader;
