

const Offers = () => {
    return (
        <section 
            className="bg-offers bg-cover ss:bg-center bg-no-repeat w-full ss:h-[500px] 
            xs:h-[350px] h-[400px] relative py-[40px] px-6"
        >
            <div>
                <div className="text-white text-[70px] font-poppins">
                    End of year sales 50%
                </div>
                <div className="text-slate-300 text-[30px] font-poppins">
                    Oil perfumes in sizes from 3ml to 1litre
                </div>
                <button className="text-slate-900 text-[20px] px-10 py-3 bg-primaryGreen rounded-[25px] 
                    mt-10 font-semibold font-poppins">
                    Go to Store
                </button>
            </div>
        </section>
    )
}


export default Offers