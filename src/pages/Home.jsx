import { Hero, Popular, Offers, NewCollection, NewsLetter } from "../components";



const Home = () => {
  return (
    <>
      <section className="">
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