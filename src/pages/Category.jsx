/* eslint-disable react/prop-types */
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import { CategoryItems } from "../constants/data";
import ProductItem from "../components/ProductItem";
import ScrollToTop from "../../ScrollToTop";
import { useContext } from "react";
import { MainContext } from "../context/mainContext";
import { removeSpaces } from "../constants/functions";
import { Typography } from '@mui/material';



const Category = ({ category, banner }) => {
  const { fetchedData } = useContext(MainContext);
  const CategoryItems = Array.isArray(fetchedData?.products) ? fetchedData.products : [];
  const FilteredCategoryItems = CategoryItems.filter(product => product.category === removeSpaces(category));

  return (
    <>
      <ScrollToTop/>
      <div className="w-full h-[300px]">
        <img src={banner} alt="banner" className="w-full h-full bg-center object-center" />
      </div>
      <div>
        <h3><span>Showing 1 to 7</span> out of { FilteredCategoryItems.length } products</h3>
        <div>Sort <MdOutlineKeyboardArrowDown/></div>
      </div>
      {/* <div className="text-[20px] uppercase font-semibold">
        {category}
      </div> */}
      <Typography variant="h5" fontWeight="bold" component="div" className="uppercase">
        { category }
      </Typography>
      <div className="w-full mt-[10px] grid md:grid-cols-6 xs:grid-cols-3 grid-cols-3 xs:gap-x-1 
        gap-x-[1px] xs:gap-y-1 gap-y-[6px] px-2">
        { FilteredCategoryItems.map(item => <ProductItem key={item.id} item={item} />) }
      </div>
    </>
  )
}




export default Category