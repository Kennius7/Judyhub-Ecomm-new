import Button from "./Button"


const NewsLetter = () => {
    return (
        <section className="xs:py-28 py-10 px-5 bg-slate-400/5">
            <div className="ss:w-[80%] w-full flex flex-col justify-center items-center 
                mx-auto xs:gap-y-8 gap-y-2">
                <h3 className="xs:text-[30px] text-[18px] font-semibold">
                    Get Exclusive Offers On Your Email
                </h3>
                <h4 className="uppercase font-semibold xs:text-[16px] text-[14px] font-sans 
                    xs:mb-1 mb-8">
                    Subscribe To Our Newsletter And Stay Updated
                </h4>
                <div className="flex flex-row justify-between items-center rounded-full bg-slate-200
                    ring-1 ring-slate-900/5 hover:ring-slate-900/15 w-full max-w-[500px] h-[40px]">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="bg-transparent w-full outline-offset-0 border-none h-full ml-6 outline-none" 
                    />
                    <Button 
                        buttonText={"Subscribe"} 
                        className={`rounded-[25px] xs:w-[40%] w-[200px] xs:h-full h-[40px] 
                        text-slate-100 font-medium`} 
                    />
                </div>
            </div>
        </section>
    )
}


export default NewsLetter