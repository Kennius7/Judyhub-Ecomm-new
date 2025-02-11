import { useState, useContext } from "react";
import { MainContext } from "../context/mainContext";
import axios from "axios";
import Button from "./Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BsEyeSlash, BsFillEyeFill } from "react-icons/bs";



const SignUp = () => {
    const navigate = useNavigate();
    const { setLoginState, downloadProfileData } = useContext(MainContext);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [signinText, setSigninText] = useState("Sign In");
    const [signInFormData, setSignInFormData] = useState({ email: "", password: "" });
    const { email, password } = signInFormData;
    const handleChange = (e) => setSignInFormData({ ...signInFormData, [e.target.name]: e.target.value });
    const apiSignInUrl = import.meta.env.VITE_API_SIGNIN_URL;

    const handleSignin = async () => {
        setIsLoading(true);
        setSigninText("Signing In...");
    
        if (email.trim() && password.trim()) {
            try {
                const response = await axios.post(
                    apiSignInUrl, 
                    { email, password }, 
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: false,
                    }
                );
                const fetchedToken = response?.data?.token;
                localStorage.setItem("user-token", fetchedToken);
                console.log("Token:>>>>", fetchedToken);
                const message = response?.data?.message;
                // console.log("Message:>>>>", response);
                toast(message, { type: "success" });
                setSignInFormData({ ...signInFormData, email: "", password: "" });
                downloadProfileData();
                setSigninText("Signed In!");
                setTimeout(() => setSigninText("Sign In"), 2000);
                setTimeout(() => navigate(-1), 3000);
            } catch (error) {
                console.error("Error signing in:", error);
                const errorMessage = error?.response?.data?.error;
                toast(`Error: ${errorMessage}`, { type: "error" });
                setSigninText("Sign In Failed!");
                setTimeout(() => setSigninText("Sign In"), 2000);
            } finally {
                setIsLoading(false);
            }
        } else {
            // Handle empty email or password
            toast("Please provide both email and password.", { type: "warning" });
            setIsLoading(false);
            setSigninText("Sign In Failed!");
            setTimeout(() => setSigninText("Sign In"), 2000);
        }
    };


    return (
        <div className="xs:w-[700px] w-full xs:h-[500px] h-[500px] xs:my-6 my-0 bg-dimWhite 
            xs:py-20 py-[70px] xs:px-14 px-4">
            <h3 className="ss:text-[30px] text-[20px] font-semibold xs:mt-0 mt-14">
                Sign In
            </h3>
            <div className="flex flex-col gap-6 xs:mt-[60px] mt-[40px]">
                <input 
                    type="email" 
                    name="email"
                    value={email}
                    placeholder="Your Email Address" 
                    onChange={handleChange}
                    className="h-12 outline-none bg-slate-900/5 rounded-xl pl-5 w-full" />
                <div className="relative">
                    <input 
                        type={!isVisible ? "password" : "text"} 
                        name="password"
                        value={password}
                        placeholder="Your Password" 
                        onChange={handleChange}
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
            <Button 
                onClick={handleSignin} 
                buttonText={signinText}
                isLoading={isLoading}
                disabled={isLoading}
                loaderMargLeft={"mr-3"}
                className="bg-slate-800 rounded-xl w-full h-12 xs:mt-16 mt-10 xs:mb-6 mb-4 
                text-white font-semibold flexCenter" 
            />
            <p className="text-slate-900 font-semibold">Don&apos;t have an account?&nbsp;
                <span 
                    onClick={() => setLoginState(true)} 
                    className="text-red-900 underline cursor-pointer">
                    Sign up
                </span>
            </p>
        </div>
    )
}

export default SignUp;
