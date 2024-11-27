/* eslint-disable react/prop-types */


const Button = ({ buttonText, btnGradColor1="#0db915", btnGradColor2="#064709", className, onClick }) =>

    <button 
        style={{ background: `linear-gradient(180deg, ${btnGradColor1}, ${btnGradColor2})` }} 
        onClick={onClick}
        className={className}>
        {buttonText}
    </button>


export default Button

