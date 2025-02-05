import ProductItemAdmin from "./ProductItemAdmin";
import { useState, useContext } from "react";
import { MainContext } from "../context/mainContext";
import DeleteProducts from "./DeleteProducts";



const OtherProductsAdmin = () => {
    const { fetchedData } = useContext(MainContext);
    const [isShow, setIsShow] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(new Set());
    const OtherProducts = Array.isArray(fetchedData?.products) ? fetchedData.products : [];
    const FilteredProducts = OtherProducts?.filter(p => !["latest", "popular"].includes(p.tags));

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
        <section className="w-full bg-slate-100 xs:py-16 py-12">
            <div className="w-full xs:text-[30px] text-[22px] xs:font-bold font-semibold text-center py-[10px]">
                Edit Other Products ( {FilteredProducts.length} )
            </div>
            <hr 
                className="h-[3px] md:w-1/2 w-full mx-auto bg-gradient-to-l from-transparent 
                via-black to-transparent mb-[20px]"
            />
            <div className="w-full xs:h-[70px] h-[50px] flex flex-row justify-start items-end xs:px-0 px-3">
                <DeleteProducts 
                    selectedProducts={selectedProducts} 
                    setSelectedProducts={setSelectedProducts}
                />
            </div>
            <div className="mt-[20px] grid md:grid-cols-4 ss:grid-cols-3 xs:grid-cols-2 
                grid-cols-1 md:gap-3 xs:gap-6 gap-5 xs:px-2 px-4">
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

export default OtherProductsAdmin;
