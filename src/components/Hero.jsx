import Star from "../assets/star.svg";



const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1 className="text-[30px]">Welcome to Judyhub Online market</h1>
                <p>Discover amazing features and services</p>
                <div className="flex">
                    <img src={Star} className="w-8 h-8"/>
                    <img src={Star} className="w-8 h-8"/>
                    <img src={Star} className="w-8 h-8"/>
                    <img src={Star} className="w-8 h-8"/>
                    <img src={Star} className="w-8 h-8"/>
                </div>
                <button className="cta-button bg-primaryGreen px-4 py-2 rounded-[16px] mt-8">
                    Get Started
                </button>
            </div>
        </section>
    );
};

export default Hero;


