/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { Loader } from "@mantine/core"



const Button = ({ 
    buttonText, btnGradColor1="#0db915", btnGradColor2="#064709", className, 
    onClick, isLoading=false, loaderColor="#fff" 
}) =>

    <button 
        style={{ background: `linear-gradient(180deg, ${btnGradColor1}, ${btnGradColor2})` }} 
        onClick={onClick}
        className={className}>
        <div>
            { buttonText }
        </div>
        {   
            isLoading && (
                <div className={`flexCenter`}>
                    {/* <Loader size="xs" variant="bars" color={loaderColor} /> */}
                    <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            )
        }
    </button>


export default Button

