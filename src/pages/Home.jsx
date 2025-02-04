import { useContext } from "react";
import { MainContext } from "../context/mainContext.js";
import { Hero, Popular, Offers, NewCollection, NewsLetter } from "../components";
import ScrollToTop from "../../ScrollToTop";
import Spinner from "../components/Spinner.jsx";



const Home = () => {
  const { fetchedData } = useContext(MainContext);

  return (
    <>
      {
        fetchedData.products.length === 0
        ?
        <div className="w-full flex justify-center items-center h-[100vh]">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="text-center text-[20px] font-bold mb-4">
              Loading, Please wait...
            </div>
            <Spinner borColor2="#0db915" dim2="65px" dim3="50px" />
          </div>
        </div>
        :
        <section className="">
          <ScrollToTop/>
          <Hero/>
          <Popular/>
          <Offers/>
          <NewCollection/>
          <NewsLetter/>
        </section>
      }
    </>
  )
}

export default Home
