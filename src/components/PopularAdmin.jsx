import ProductItemAdmin from "./ProductItemAdmin";
import { useContext } from "react";
import { MainContext } from "../context/mainContext";



const Popular = () => {
    const { fetchedData } = useContext(MainContext);
    const PopularProducts = fetchedData.products;

    return (
        <section className="bg-slate-100">
            <div className="w-full text-[30px] font-bold text-center py-[10px]">
                Edit Popular Products
            </div>
            <hr 
                className="h-[3px] md:w-1/2 mx-auto bg-gradient-to-l from-transparent 
                via-black to-transparent mb-[80px]"
            />
            <div className="mt-[20px] grid md:grid-cols-7 ss:grid-cols-3 xs:grid-cols-2 
                grid-cols-1 md:gap-3 gap-6 px-2">
                {
                    PopularProducts.filter(product => product.tags === "popular").map(
                        product => <ProductItemAdmin item={product} key={product.id} />
                    )
                }
            </div>
        </section>
    );
};

export default Popular;
