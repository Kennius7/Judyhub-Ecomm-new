// /* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { CategoryItems as AllProducts } from "../constants/data"
import ProductHeader from "../components/ProductHeader";
import ProductDisplay from "../components/ProductDisplay";
import ScrollToTop from "../../ScrollToTop";


const Product = () => {
  // const AllProducts = CategoryItems;
  const { productId } = useParams();
  const Products = AllProducts.find(p => p.id === Number(productId));
  // console.log("Products: ", Products, "Product ID: ", productId);

  if (!Products) {
    return <div>
      Product Not Found!
    </div>
  }

  return (
    <section className="px-16 py-6">
      <ScrollToTop/>
      <div>
        <ProductHeader product={Products} />
        <ProductDisplay product={Products} />
      </div>
    </section>
  )
}

export default Product