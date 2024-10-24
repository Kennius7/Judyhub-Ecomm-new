import { PopularProducts } from "../constants/data";
import ProductItem from "./ProductItem";


const Popular = () => {

    return (
        <section className="bg-slate-100 md:py-6 ss:py-4 py-2 px-5">
            <div className="w-full text-[30px] font-bold text-center py-[10px]">
                Popular Products
            </div>
            <hr 
                className="h-[3px] md:w-1/2 mx-auto bg-gradient-to-l from-transparent 
                via-black to-transparent mb-[80px]"
            />
            <div className="mt-[20px] grid md:grid-cols-4 ss:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-6">
                {
                    PopularProducts.map(product => (
                        <ProductItem item={product} key={product.id} />
                    ))
                }
            </div>
        </section>
    );
};

export default Popular;
