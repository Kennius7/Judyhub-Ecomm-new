import Button from "./Button"


const NewsLetter = () => {
    return (
        <section className="md:py-28 ss:py-4 py-2 px-5 bg-slate-400/5">
            <div className="ss:w-[80%] w-full flex flex-col justify-center items-center mx-auto gap-y-8">
                <h3 className="ss:text-[30px] text-[20px] font-semibold">
                    Get Exclusive Offers On Your Email
                </h3>
                <h4 className="uppercase font-semibold text-[16px] font-sans">
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
                        className={`rounded-[25px] w-[40%] h-full text-slate-900 font-semibold`} />
                </div>
            </div>
        </section>
    )
}


export default NewsLetter