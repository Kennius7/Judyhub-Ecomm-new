import Navbar from "./Navbar";
import logo from "../assets/JudyHubLogo3.png";
import { useNavigate } from "react-router-dom";


const Header = () => {

const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-between items-center w-full h-[60px] bg-yellow-100 px-2">
        <div 
          onClick={()=>navigate("/")}
          className="cursor-pointer w-[70px] h-[60px]">
            <img src={logo} alt="logo pics" className="w-full h-full"/>
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