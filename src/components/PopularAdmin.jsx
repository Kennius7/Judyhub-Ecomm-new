import ProductItemAdmin from "./ProductItemAdmin";
import { useState, useContext } from "react";
import { MainContext } from "../context/mainContext";
// import { isArray } from "lodash";
// import Spinner from "../components/Spinner.jsx";



const Popular = () => {
    const { fetchedData } = useContext(MainContext);
    const [isShow, setIsShow] = useState(false);
    const PopularProducts = Array.isArray(fetchedData?.products) ? fetchedData.products : [];
    console.log("PopularProducts:>>>>", PopularProducts, Array.isArray(PopularProducts));
    // const PopularProducts = fetchedData.products;
    // console.log("PopularProducts:>>>>", PopularProducts);
    // if (isArray(PopularProducts)) {
    //     return (
    //         <div className="w-full flex justify-center items-center h-[100vh]">
    //             <div className="w-full flex flex-col justify-center items-center">
    //                 <div className="text-center text-[20px] font-bold mb-4">
    //                     Loading, Please wait...
    //                 </div>
    //                 <Spinner borColor2="#0db915" dim2="65px" dim3="50px" />
    //             </div>
    //         </div>
    //     )
    // }
    const FilteredProducts = PopularProducts?.filter(p => p.tags === "popular");


    return (
        <section className="bg-slate-100">
            <div className="w-full text-[30px] font-bold text-center py-[10px]">
                Edit Popular Products
            </div>
            <hr 
                className="h-[3px] md:w-1/2 mx-auto bg-gradient-to-l from-transparent 
                via-black to-transparent mb-[80px]"
            />
            <div className="mt-[20px] grid md:grid-cols-6 ss:grid-cols-3 xs:grid-cols-2 
                grid-cols-1 md:gap-3 gap-6 px-2">
                {
                    FilteredProducts.map( product => (
                            <ProductItemAdmin 
                                item={product} 
                                key={product.id} 
                                isShow={isShow} 
                                setIsShow={setIsShow}
                            />
                        )
                    )
                }
            </div>
        </section>
    );
};

export default Popular;
