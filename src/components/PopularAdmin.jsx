import ProductItemAdmin from "./ProductItemAdmin";
import { useState, useContext } from "react";
import { MainContext } from "../context/mainContext";



const Popular = () => {
    const { fetchedData } = useContext(MainContext);
    const [isShow, setIsShow] = useState(false);
    const PopularProducts = fetchedData.products;
    const FilteredProducts = PopularProducts.filter(p => p.tags === "popular");


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
