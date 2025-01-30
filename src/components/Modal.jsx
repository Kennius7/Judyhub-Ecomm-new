/* eslint-disable react/prop-types */
import { X_Icon } from "../assets";


const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;

    return (
        <div 
            onClick={onClose} 
            className="fixed top-0 left-0 z-[100] w-full h-full bg-slate-800/60 flexCenter"
        >
            <div 
                onClick={ e => e.stopPropagation() } 
                className="bg-white p-[20px] rounded-lg xs:max-w-[550px] max-w-[343px] xs:w-full w-[98%] 
                shadow-[0px_0px_5px_0px_#faf5aac2] fadeInAnimate"
            >
                <div className="w-full flexBetween">
                    <h2 className="xs:text-[22px] text-[17px] font-medium font-EncodeSans">
                        {title}
                    </h2>
                    <button onClick={onClose} className="flexCenter">
                        <img src={ X_Icon } alt="x icon" className="w-4 h-4 object-cover"/>
                    </button>
                </div>
                <div className="flex flex-col justify-center items-start">
                    <hr className="xs:w-[60%] w-[70%] border-[1px] border-slate-600"/>
                    { children }
                </div>
            </div>
        </div>
    )
}

export default Modal
