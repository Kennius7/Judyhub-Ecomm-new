/* eslint-disable react/prop-types */

import Button from "../components/Button";
import { Star } from "../assets/SvgExport";



const ProductDisplay = ({ product }) => {

    return (
        <section className="">
            <div className="">
                <div className="flex gap-x-2">
                    <div className="flex flex-col justify-between">
                        <img src={product.image} alt="product Pics" className="max-w-[99px]" />
                        <img src={product.image} alt="product Pics" className="max-w-[99px]" />
                        <img src={product.image} alt="product Pics" className="max-w-[99px]" />
                        <img src={product.image} alt="product Pics" className="max-w-[99px]" />
                    </div>
                    <div>
                        <img src={product.image} alt="product Pics" className="max-w-[450px]" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <h3 className="font-semibold text-slate-900 text-[30px]">
                        { product.name }
                    </h3>
                    <div className="text-primaryGreen flex gap-1">
                        <Star widthSize={"20px"} heightSize={"20px"} opacity={"0.8"} color={"#28a517"}/>
                        <Star widthSize={"20px"} heightSize={"20px"} opacity={"0.8"} color={"#28a517"}/>
                        <Star widthSize={"20px"} heightSize={"20px"} opacity={"0.8"} color={"#28a517"}/>
                        <Star widthSize={"20px"} heightSize={"20px"} opacity={"0.8"} color={"#28a517"}/>
                        <p className="text-slate-900">(111)</p>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-x-2 my-4 font-semibold text-[16px]">
                        <div className="text-slate-900">Price:</div>
                        <div className="text-secondaryBrown line-through">{ product.oldPrice }</div>
                        <div className="text-primaryGreen">{ product.newPrice }</div>
                    </div>
                    <div>
                        <h4 className="text-[20px] text-slate-900 font-semibold mb-3">
                            Select Size:
                        </h4>
                        <div className="flex flex-row justify-start items-center gap-x-3">
                            <div className="ring-2 ring-slate-900 w-10 h-10 flex flex-row justify-center 
                                items-center text-center cursor-pointer rounded-sm">
                                S
                            </div>
                            <div className="ring-2 ring-slate-900/10 w-10 h-10 flex flex-row justify-center 
                                items-center text-center cursor-pointer rounded-sm">
                                M
                            </div>
                            <div className="ring-2 ring-slate-900/10 w-10 h-10 flex flex-row justify-center 
                                items-center text-center cursor-pointer rounded-sm">
                                L
                            </div>
                            <div className="ring-2 ring-slate-900/10 w-10 h-10 flex flex-row justify-center 
                                items-center text-center cursor-pointer rounded-sm">
                                XL
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-start gap-3 mt-6">
                            <Button 
                                buttonText={"Add To Cart"} 
                                className={`rounded-[20px] text-dimWhite w-[550px] h-[40px]`} />
                            <Button 
                                buttonText={"Buy It Now"} 
                                className={`rounded-[20px] text-dimWhite w-[550px] h-[40px]`} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDisplay

