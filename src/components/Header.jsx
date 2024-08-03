import Navbar from "./Navbar";
import logo from "../assets/JudyHubLogo3.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdMenuOpen } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom"



const Header = () => {

  const navigate = useNavigate();
  const [menuOpened, setMenuOpened] = useState(false);
  let cartItemNumber = 10;

  return (
    <div className="flex flex-row justify-between items-center w-full h-[60px] bg-yellow-100 
      px-2">
      {/*Logo block*/}
      <div 
        onClick={()=>navigate("/")}
        className="cursor-pointer w-12 h-12 ring-1 ring-slate-700/1 rounded-full bg-slate-400/10">
        <img src={logo} alt="logo pics" className="w-full h-full"/>
      </div>
      {/*Large Screen Nav Block*/}
      <div className="xs:flex flex-1 justify-around items-center hidden w-full">
        <Navbar 
          containerStyles1="flex flex-row justify-around items-center w-full medium-15"
          containerStyles2="border-2 border-yellow-300 rounded-[8px] w-[120px] h-[35px]"
        />
      </div>
      {/*Mobile Screen Nav block*/}
      <div className="fixed xs:hidden flex w-full bg-red-500">
        <Navbar 
          containerStyles1={`fixed z-1 top-[70px] flex flex-col justify-around items-start 
            h-[200px] transition-all duration-300 shadow-lg w-[140px] h-[160px] rounded-[8px] 
            medium-15 ring-1 ring-slate-900/7
            ${menuOpened ? "right-[3%]" : "-right-[100%]" }`}
          containerStyles2={`flex flex-row justify-start items-center border-2 border-yellow-300/7 
            rounded-[8px] w-[95%] h-[35px] pl-2`}
        />
      </div>
      {/*Menu Icon Nav block*/}
      <div className="xs:hidden cursor-pointer flex flex-row justify-center items-center w-8 h-8 
        ring-1 ring-slate-900/3 rounded-full p-2">
        <button onClick={() => setMenuOpened(!menuOpened)}>
          { !menuOpened ? <MdMenuOpen size={24} /> : <MdOutlineMenu size={24} /> }
        </button>
      </div>
      <NavLink
        to={"/cart"} 
        className="relative flex justify-center items-center w-8 h-8 ring-1 ring-slate-900/3 rounded-full p-1" >
        <IoCartOutline size={32}/>
        <span className={`absolute z-2 left-5 bottom-5 w-5 h-5 p-1 bg-red-500 rounded-full 
          text-white text-center flex justify-center items-center 
          ${cartItemNumber >= 100 ? "text-[10px]" : "text-[12px]" }`}>
          {cartItemNumber}
        </span>
      </NavLink>
    </div>
  )
}

export default Header