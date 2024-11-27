import { useContext } from "react";
import { MainContext } from "../context/mainContext";



const SignUp = () => {

    const { setLoginState } = useContext(MainContext);

    return (
        <div className="w-[700px] h-[500px] my-6 bg-white py-10 px-14">
            <h3 className="ss:text-[30px] text-[20px] font-semibold">
                Sign In
            </h3>
            <div className="flex flex-col gap-6 mt-[90px]">
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
            <p className="text-slate-900 font-semibold">Don&apos;t have an account?&nbsp;
                <span onClick={() => setLoginState(false)} className="text-red-900 underline cursor-pointer">Sign Up</span>
            </p>
            <div className="flex flex-row justify-start items-center mt-4">
                <input type="checkbox" />
                <p className="text-slate-900 text-[14px] pl-2">
                    By continuing, I agree to the terms of use and privacy policy
                </p>
            </div>
        </div>
    )
}

export default SignUp;
