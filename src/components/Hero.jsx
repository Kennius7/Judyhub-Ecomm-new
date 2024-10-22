import Star from "../assets/star.svg";



const Hero = () => {

    const starDimensions = "ss:w-8 ss:h-8 w-6 h-6"


    return (
        <section className="bg-hero bg-cover ss:bg-center bg-no-repeat w-full ss:h-[500px] xs:h-[350px] h-[400px] relative">
            <div className="w-full absolute z-[2] ss:top-32 top-10 pl-2">
                <h1 
                    style={{ 
                        background: "linear-gradient(180deg, #146409, #000)",
                        backgroundClip: "text",
                        color: "transparent",
                        WebkitBackgroundClip: "text",
                        fontWeight: "700"
                    }} 
                    className="font-sans lg:text-[40px] ss:text-[35px] xs:text-[32px] text-[29px]"
                >
                    Judyhub Online Market
                </h1>
                <h3 className="font-sans font-bold ss:text-[24px] text-[18px] text-white ss:mt-[10px] 
                    mt-[6px] ss:w-full w-[70%] ss:leading-normal leading-[24px] title-text-shadow1">
                    Shop the Latest Trends, Delivered to Your Doorstep!
                </h3>
                <p className="ss:max-w-[650px] xs:max-w-[400px] max-w-[250px] ss:mt-[6px] mt-[3px] ss:text-[20px] text-[15px] 
                    font-semibold font-sans ss:leading-normal leading-[22px] title-text-shadow3">
                    Discover fashion, electronics, home essentials, and more, all in one place. 
                    Enjoy exclusive deals, fast shipping, and hassle-free returns. 
                    Your one-stop shop for everything you need!
                </p>
                <div className="flex justify-start items-center ss:mt-[30px] mt-[10px]">
                    <img src={Star} className={`${starDimensions}`}/>
                    <img src={Star} className={`${starDimensions}`}/>
                    <img src={Star} className={`${starDimensions}`}/>
                    <img src={Star} className={`${starDimensions}`}/>
                    <img src={Star} className={`${starDimensions}`}/>
                    <div className="flex justify-start items-center text-white ss:text-[16px] text-[14px] 
                        ml-[10px] pt-2 ss:font-medium font-semibold title-text-shadow1">
                        125,027 Reviews
                    </div>
                </div>
                <div 
                    className="flex justify-between items-center ss:w-[40%] xs:w-[75%] w-[96%] ss:h-[40px] 
                    h-[35px] ss:mt-8 mt-5"
                >
                    <button 
                        style={{ background: "linear-gradient(180deg, #0db915, #064709)" }} 
                        className="w-[48%] h-full rounded-[22px] button-shadow1 font-sans ss:text-[16px] text-[14px]">
                        Start Shopping Now
                    </button>
                    <button 
                        style={{ background: "linear-gradient(180deg, #0db915, #064709)" }} 
                        className="w-[48%] h-full rounded-[22px] button-shadow1 font-sans ss:text-[16px] text-[14px]">
                        Explore Today&apos;s Deals
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;


