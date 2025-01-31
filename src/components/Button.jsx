/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { Loader } from "@mantine/core"



const Button = ({ 
    buttonText, btnGradColor1="#0db915", btnGradColor2="#064709", className, 
    onClick, isLoading=false, loaderColor="#fff", disabled=false, loaderMargLeft="mr-0"
}) =>

    <button 
        style={{ 
            background: `linear-gradient(180deg, ${btnGradColor1}, ${btnGradColor2})`, 
            transition: "background 1s ease-in-out" 
        }} 
        onClick={onClick}
        disabled={disabled}
        className={className}>
        <div className={`${loaderMargLeft}`}>
            { buttonText }
        </div>
        {   
            isLoading && (
                <div className={`flexCenter`}>
                    {/* <Loader size="xs" variant="bars" color={loaderColor} /> */}
                    <div 
                        style={{ borderColor: loaderColor }} 
                        className="w-5 h-5 border-4 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )
        }
    </button>


export default Button

