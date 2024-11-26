

const NewsLetter = () => {
    return (
        <section className="md:py-28 ss:py-4 py-2 px-5">
            <div className="ss:w-[80%] w-full flex flex-col justify-center items-center mx-auto gap-y-8">
                <h3 className="ss:text-[30px] text-[20px] font-semibold">
                    Get Exclusive Offers On Your Email
                </h3>
                <h4 className="uppercase font-semibold text-[16px] font-poppins">
                    Subscribe To Our Newsletter And Stay Updated
                </h4>
                <div className="flex flex-row justify-between items-center rounded-full bg-slate-200
                    ring-1 ring-slate-900/5 hover:ring-slate-900/15 w-full max-w-[500px] h-[40px]">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="bg-transparent w-full outline-offset-0 border-none h-full ml-6 outline-none" 
                    />
                    <button 
                        style={{ background: "linear-gradient(180deg, #0db915, #064709)" }} 
                        className="bg-primaryGreen rounded-[25px] w-[40%] h-full"
                    >
                        Subscribe
                    </button>
                </div>
            </div>
        </section>
    )
}


export default NewsLetter