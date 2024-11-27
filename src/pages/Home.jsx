import { Hero, Popular, Offers, NewCollection, NewsLetter } from "../components";
import ScrollToTop from "../../ScrollToTop";



const Home = () => {
  return (
    <>
      <section className="">
        <ScrollToTop/>
        <Hero/>
        <Popular/>
        <Offers/>
        <NewCollection/>
        <NewsLetter/>
      </section>
    </>
  )
}

export default Home