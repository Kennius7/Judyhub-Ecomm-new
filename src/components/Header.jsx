import Navbar from "./Navbar";
import logo from "../assets/JudyHub Logo1.png";
import { useNavigate } from "react-router-dom";


const Header = () => {

const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-between items-center w-full bg-yellow-100 px-2">
        <div className="cursor-pointer" onClick={()=>navigate("/")}>
            <img src={logo} alt="logo pics" className="w-16 h-16"/>
        </div>
        <div className="flex-1">
            <Navbar/>
        </div>
        <div className="">
            Buttons
        </div>
    </div>
  )
}

export default Header