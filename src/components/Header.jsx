import Navbar from "./Navbar";
import logo from "../assets/JudyHubLogo3.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdMenuOpen } from "react-icons/md";


const Header = () => {

  const navigate = useNavigate();
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <div className="flex flex-row justify-between items-center w-full h-[60px] bg-yellow-100 
      px-2">
      {/*Logo block*/}
      <div 
        onClick={()=>navigate("/")}
        className="cursor-pointer w-[70px] h-[60px]">
        <img src={logo} alt="logo pics" className="w-full h-full"/>
      </div>
      {/*Large Screen Nav Block*/}
      <div className="xs:flex flex-1 justify-around items-center hidden w-full">
        <Navbar 
          containerStyles1="flex flex-row justify-around items-center w-full"
          containerStyles2="border-2 border-yellow-300 rounded-[8px] w-[120px] h-[35px]"
        />
      </div>
      {/*Mobile Screen Nav block*/}
      <div className="fixed xs:hidden flex w-full bg-red-500">
        <Navbar 
          containerStyles1={`fixed z-1 top-[35px] flex flex-col justify-around items-start 
            h-[200px] transition-all duration-300 shadow-lg w-[140px] h-[160px] border-2 
            border-yellow-300 rounded-[8px] 
            ${menuOpened ? "right-[3%]" : "-right-[100%]" }`}
          containerStyles2={`flex flex-row justify-start items-center border-2 border-yellow-300/7 rounded-[8px] w-[95%] h-[35px] pl-2`}
        />
      </div>
      {/*Menu Icon Nav block*/}
      <div className="xs:hidden flex">
        <button onClick={() => setMenuOpened(!menuOpened)}>
          <MdMenuOpen size={32} />
        </button>
      </div>
    </div>
  )
}

export default Header