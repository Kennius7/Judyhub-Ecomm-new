import { useState, useContext } from "react";
import { MainContext } from "../context/mainContext";
import axios from "axios";
import ButtonGrad from "./ButtonGrad";
import { toast } from "react-toastify";
import { BsEyeSlash, BsFillEyeFill } from "react-icons/bs";
import { apiSignUpUrl } from "../constants/api";



const SignUp = () => {
    const [signupText, setSignupText] = useState("Sign Up");
    const [isVisible, setIsVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { setLoginState } = useContext(MainContext);
    const [signUpFormData, setSignUpFormData] = useState({ 
        name: "", email: "", number: "", password: "", address: "", image: "", cartData: [] 
    });
    const { name, email, number, password, address, image, cartData } = signUpFormData;
    const handleChange = (e) => setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value });


    const handleSignUp = async() => {
        setIsLoading(true);
        setSignupText("Signing Up...");
        const apiType = "SIGNUP";
        if ( name.trim() && email.trim() && number.trim() && password.trim()) {
            try {
                const response = await axios.post(
                    apiSignUpUrl, 
                    { name, email, number, password, address, image, cartData, apiType }, 
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: false,
                    }
                );
                const message = response?.data?.message || "Signed in successfully!";
                toast(message, { type: "success" });
                toast("Please sign in...", { type: "success" });
                setSignUpFormData({ ...signUpFormData, name: "", email: "", number: "", password: "" });
                setSignupText("Signed up!");
                setTimeout(() => setSignupText("Sign up"), 2000);
                setTimeout(() => setLoginState(false), 3000);
            } catch (error) {
                console.error("Error signing in:", error);
                const errorMessage = error?.response?.data?.error;
                const errMessage = errorMessage === "Error: Firebase: Error (auth/email-already-in-use)." 
                ? "Email has been used before." : errorMessage === "Error: Firebase: Error (auth/network-request-failed)." 
                ? "Network error. Check you network." 
                : errorMessage === "Password is too weak. Please choose a stronger password." 
                ? "Password too weak. Use a stronger password." : "An unexpected error occurred."
                toast(errMessage, { type: "error" });
                setSignupText("Sign Up Failed!");
                setTimeout(() => setSignupText("Sign Up"), 2000);
            } finally {
                setIsLoading(false);
            }
        } else {
            // Handle empty email or password
            toast("Please provide name, number, email and password.", { type: "warning" });
            setIsLoading(false);
            setSignupText("Sign Up Failed!");
            setTimeout(() => setSignupText("Sign Up"), 2000);
        }
    }


    return (
        <div className="xs:w-[700px] w-full xs:h-[500px] h-[600px] xs:my-6 my-0 bg-dimWhite 
            xs:py-10 py-[120px] xs:px-14 px-4">
            <h3 className="ss:text-[30px] text-[20px] font-semibold">
                Sign Up
            </h3>
            <div className="flex flex-col gap-4 xs:mt-6 mt-8">
                <input 
                    type="text" 
                    name="name"
                    placeholder="Your Name" 
                    onChange={handleChange}
                    value={name}
                    className="h-12 outline-none bg-slate-900/5 rounded-xl pl-5 w-full" />
                <input 
                    type="email" 
                    name="email"
                    placeholder="Your Email Address" 
                    onChange={handleChange}
                    value={email}
                    className="h-12 outline-none bg-slate-900/5 rounded-xl pl-5 w-full" />
                <input 
                    type="number" 
                    name="number"
                    placeholder="Your Phone Number" 
                    onChange={handleChange}
                    value={number}
                    className="h-12 outline-none bg-slate-900/5 rounded-xl pl-5 w-full" />
                <div className="relative">
                    <input 
                        type={!isVisible ? "password" : "text"} 
                        name="password"
                        placeholder="Your Password" 
                        onChange={handleChange}
                        value={password}
                        className="h-12 outline-none bg-slate-900/5 rounded-xl pl-5 w-full" />
                    <div 
                        onClick={() => setIsVisible(!isVisible)} 
                        className={`rounded-full absolute z-[2] xs:top-3 top-3 sm:right-3 right-2 cursor-pointer`}>
                        { 
                            isVisible ?
                            <BsFillEyeFill style={{ width: 25, height: 25 }} size={24}/> :
                            <BsEyeSlash style={{ width: 25, height: 25 }} size={24}/>
                        }
                    </div>
                </div>
            </div>

            <ButtonGrad
                onClick={handleSignUp} 
                buttonText={signupText}
                isLoading={isLoading}
                disabled={!isChecked}
                loaderMargLeft={"mr-3"}
                className="rounded-xl w-full h-12 mb-2 xs:mt-6 mt-7 text-white 
                font-semibold flexCenter transition-all duration-1000"
            />
            <p className="text-slate-900 font-sans font-semibold xs:text-[18px] text-[15px] flexStart">
                Already have an account?&nbsp;
                <span 
                    onClick={() => setLoginState(false)} 
                    className="text-red-900 underline cursor-pointer font-sans xs:text-[17px] text-[14px]">
                    Sign in
                </span>
            </p>
            <div className="flex flex-row justify-start items-start mt-1">
                <input type="checkbox" className="mt-1" onClick={() => setIsChecked(!isChecked)} />
                <p className="text-slate-900 text-[14px] pl-2">
                    By continuing, I agree to the terms of use and privacy policy
                </p>
            </div>
        </div>
    )
}

export default SignUp;

