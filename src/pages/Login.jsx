

const Login = () => {

    return (
        <section className="flex flex-row justify-center items-center w-full bg-slate-200">
            <div className="w-[700px] h-[500px] my-6 bg-white py-10 px-14">
                <h3 className="ss:text-[30px] text-[20px] font-semibold">
                    Sign Up
                </h3>
                <div className="flex flex-col gap-4 mt-8">
                    <input 
                        type="text" 
                        placeholder="Your Name" 
                        className="h-12 outline-none bg-slate-900/5 rounded-xl pl-5 w-full" />
                    <input 
                        type="email" 
                        placeholder="Your Email Address" 
                        className="h-12 outline-none bg-slate-900/5 rounded-xl pl-5 w-full" />
                    <input 
                        type="password" 
                        placeholder="Your Password" 
                        className="h-12 outline-none bg-slate-900/5 rounded-xl pl-5 w-full" />
                </div>
                <button className="bg-slate-800 rounded-xl w-full h-12 my-6 text-white font-semibold">
                    Continue
                </button>
                <p className="text-slate-900 font-semibold">Already have an account?&nbsp;
                    <span className="text-red-900 underline cursor-pointer">Login</span>
                </p>
                <div className="flex flex-row justify-start items-center mt-4">
                    <input type="checkbox" />
                    <p className="text-slate-900 text-[14px] pl-2">
                        By continuing, I agree to the terms of use and privacy policy
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Login