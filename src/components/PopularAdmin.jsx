import ProductItemAdmin from "./ProductItemAdmin";
import { useState, useContext } from "react";
import { MainContext } from "../context/mainContext";
import DeleteProducts from "./DeleteProducts";
import CreateProduct from "./CreateProduct";



const Popular = () => {
    const { fetchedData } = useContext(MainContext);
    const [isShow, setIsShow] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(new Set());
    const PopularProducts = Array.isArray(fetchedData?.products) ? fetchedData.products : [];
    const FilteredProducts = PopularProducts?.filter(p => p.tags === "popular");

    const handleCheckboxChange = (productId) => {
        setSelectedProducts(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(productId)) {
                newSelected.delete(productId);
            } else {
                newSelected.add(productId);
            }
            return newSelected;
        });
    };


    return (
        <section className="bg-slate-100">
            <div className="w-full text-[30px] font-bold text-center py-[10px]">
                Edit Popular Products
            </div>
            <hr 
                className="h-[3px] md:w-1/2 mx-auto bg-gradient-to-l from-transparent 
                via-black to-transparent mb-[20px]"
            />
            <div className="w-full flex flex-row justify-between items-center">
                <DeleteProducts 
                    selectedProducts={selectedProducts} 
                    setSelectedProducts={setSelectedProducts}
                />
                <CreateProduct/>
            </div>
            <div className="mt-[20px] grid md:grid-cols-6 ss:grid-cols-3 xs:grid-cols-2 
                grid-cols-1 md:gap-3 gap-6 px-2">
                {
                    FilteredProducts.map( product => (
                            <ProductItemAdmin 
                                item={product} 
                                key={product.id} 
                                isShow={isShow} 
                                setIsShow={setIsShow}
                                selectProducts={selectedProducts}
                                handleCheckboxChange={handleCheckboxChange}
                            />
                        )
                    )
                }
            </div>
        </section>
    );
};

export default Popular;
