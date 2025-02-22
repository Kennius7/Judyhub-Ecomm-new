/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
// import { CategoryItems as AllProducts } from "../constants/data"
import ProductHeader from "../components/ProductHeader";
import ProductDisplay from "../components/ProductDisplay";
import ScrollToTop from "../../ScrollToTop";
import { useContext } from "react";
import { MainContext } from "../context/mainContext";



const Product = () => {
  // const AllProducts = CategoryItems;
  const { fetchedData } = useContext(MainContext);
  const { productId } = useParams();
  // const Products = AllProducts.find(p => p.id === Number(productId));
  const Products = fetchedData.products.find(p => p.id === Number(productId));
  // console.log("Products: ", Products, "Product ID: ", productId);

  if (!Products) {
    return <div>
      Product Not Found!
    </div>
  }

  return (
    <section className="w-full xs:px-16 px-4 py-6">
      <ScrollToTop/>
      <div className="w-full flexColCenter">
        <ProductHeader product={Products} />
        <ProductDisplay product={Products} />
      </div>
    </section>
  )
}

export default Product