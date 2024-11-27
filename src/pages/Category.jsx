/* eslint-disable react/prop-types */
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CategoryItems } from "../constants/data";
import ProductItem from "../components/ProductItem";
import ScrollToTop from "../../ScrollToTop";



const Category = ({ category, banner }) => {
  return (
    <section className="">
      <ScrollToTop/>
      <div className="w-full h-[300px]">
        <img src={banner} alt="banner" className="w-full h-full bg-center object-center" />
      </div>
      <div>
        <h3><span>Showing 1 to 12</span> out of 36 products</h3>
        <div>Sort <MdOutlineKeyboardArrowDown/></div>
      </div>
      <div className="text-[20px] uppercase font-semibold">
        {category}
      </div>
      <div className="mt-[20px] grid md:grid-cols-4 ss:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-6">
        {
          CategoryItems.map(item => {
            if (category === item.category) {
              return <ProductItem key={item.id} item={item} />
            }
          })
        }
      </div>
    </section>
  )
}

export default Category