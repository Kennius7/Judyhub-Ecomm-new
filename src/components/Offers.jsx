import Button from "./Button"


const Offers = () => {
    return (
        <section 
            className="bg-offers bg-cover ss:bg-center bg-no-repeat w-full ss:h-[500px] 
            xs:h-[350px] h-[400px] relative py-[40px] xs:px-6 px-2"
        >
            <div className="xs:mt-[110px] mt-[80px]">
                <div className="text-white ss:text-[70px] xs:text-[40px] text-[32px] font-poppins 
                    xs:tracking-normal -tracking-[1px]">
                    End of year sales 50%
                </div>
                <div className="text-slate-300 ss:text-[30px] xs:text-[20px] text-[19px] font-poppins 
                    xs:tracking-normal -tracking-[1px]">
                    Oil perfumes in sizes from 3ml to 1litre
                </div>
                <Button 
                    buttonText={"Go to Store"} 
                    className={`w-[200px] text-slate-900 xs:text-[20px] text-[16px] xs:px-10 px-6 py-2 cursor-pointer
                    bg-primaryGreen rounded-[25px] xs:mt-10 mt-4 font-semibold font-poppins 
                    outline-none shadow-[0px_0px_5px_0px_#0b1f139c]`} />
            </div>
        </section>
    )
}


export default Offers