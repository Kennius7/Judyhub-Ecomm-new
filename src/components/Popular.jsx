/* eslint-disable no-unused-vars */
import ProductItem from "./ProductItem";
// import ProductItem2 from "./ProductItem";
import { useContext } from "react";
import { MainContext } from "../context/mainContext";



const Popular = () => {
    const { fetchedData } = useContext(MainContext);
    // const PopularProducts = fetchedData.products;
    const PopularProducts = Array.isArray(fetchedData?.products) ? fetchedData.products : [];
    // console.log("PopularProducts:>>>>", PopularProducts, Array.isArray(PopularProducts));

    return (
        <section className="w-full bg-slate-200 md:py-6 ss:py-4 py-12 xs:px-5 px-0">
            <div className="w-full xs:text-[30px] text-[22px] font-bold text-center py-[10px]">
                Popular Products
            </div>
            <hr 
                className="h-[3px] md:w-1/2 mx-auto bg-gradient-to-l from-transparent 
                via-black to-transparent xs:mb-[80px] mb-[30px]"
            />
            <div className="w-full mt-[10px] grid md:grid-cols-6 xs:grid-cols-3 grid-cols-3 xs:gap-x-1 
                gap-x-[1px] xs:gap-y-1 gap-y-[6px] px-2">
                {
                    PopularProducts.filter(product => product.tags === "popular").map(
                        product => <ProductItem item={product} key={product.id} />
                    )
                }
            </div>
        </section>
    );
};

export default Popular;
