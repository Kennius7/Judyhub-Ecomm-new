import Star from "../assets/star.svg";



const Hero = () => {
    return (
        <section className="bg-hero opacity-85 bg-center object-cover bg-no-repeat w-full h-[500px] relative">
            <div className="w-full absolute z-2 top-20 pl-2">
                <h1 className="font-bold text-[40px] capitalize text-secondaryBrown title-text-shadow2">
                    Judyhub Online market
                </h1>
                <p className="max-w-[650px] mt-[20px] text-[20px] font-semibold">
                    Discover fashion, electronics, home essentials, and more—all in one place. 
                    Enjoy exclusive deals, fast shipping, and hassle-free returns. 
                    Your one-stop shop for everything you need!
                </p>
                <div className="flex mt-[30px]">
                    <img src={Star} className="w-8 h-8"/>
                    <img src={Star} className="w-8 h-8"/>
                    <img src={Star} className="w-8 h-8"/>
                    <img src={Star} className="w-8 h-8"/>
                    <img src={Star} className="w-8 h-8"/>
                </div>
                <div className="flex justify-between items-center w-[40%]">
                    <button className="bg-primaryGreen w-[48%] h-[40px] rounded-[16px] mt-8">
                        Shop now
                    </button>
                    <button className="bg-primaryGreen w-[48%] h-[40px] rounded-[16px] mt-8">
                        Offers
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;


