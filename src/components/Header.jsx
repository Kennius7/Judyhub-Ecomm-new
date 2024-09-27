import Navbar from "./Navbar";
import logo from "../assets/JudyHubLogo3.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { capitalize } from "lodash"
import { MdMenuOpen } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom"



const Header = () => {

  const navigate = useNavigate();
  const [menuOpened, setMenuOpened] = useState(false);
  let cartItemNumber = 10;
  const [logState, setLogState] = useState(false);
  const [logText, setLogText] = useState("login");
  const handleLogStateText = () => {
    if (!logState) {
      setLogState(true);
      setLogText("login");
    } else {
      setLogState(false);
      setLogText("logout");
    }
  }

  return (
    <div className="flex flex-row justify-between items-center w-full h-[60px] bg-yellow-100 px-2">
      {/*Logo block*/}
      <div 
        onClick={()=>navigate("/")}
        className="cursor-pointer w-12 h-12 ring-1 ring-slate-700/1 rounded-full bg-slate-400/10">
        <img src={logo} alt="logo pics" className="w-full h-full"/>
      </div>
      <div className="flex-1 flex justify-end items-center">
        {/*Large Screen Nav Block*/}
        <div className="xs:flex flex-1 justify-around items-center hidden w-full">
          <Navbar 
            containerStyles1="flex flex-row justify-center items-center w-full medium-15"
            containerStyles2="px-3 h-[35px] m-2 flex justify-end items-center"
          />
        </div>
        {/*Mobile Screen Nav block*/}
        <div className="fixed xs:hidden flex w-full bg-red-500">
          <Navbar 
            containerStyles1={`fixed z-1 top-[70px] flex flex-col justify-around items-start h-[200px] transition-all 
              duration-300 w-[140px] h-[160px] rounded-[8px] medium-15 ${menuOpened ? "right-[3%]" : "-right-[100%]" }`}
            containerStyles2={`flex justify-end items-center border-b-2 border-yellow-300/7 w-full h-[35px] px-2`}
          />
        </div>
        {/*Menu Icon Nav block*/}
        <div className="xs:hidden cursor-pointer flex flex-row justify-center items-center w-8 h-8 ring-1 
          ring-slate-900/3 rounded-full p-2 shadow-lg mx-2">
          <button onClick={() => setMenuOpened(!menuOpened)}>
            { !menuOpened ? <MdMenuOpen size={24} /> : <MdOutlineMenu size={24} /> }
          </button>
        </div>
        {/*Cart Icon Nav block*/}
        <NavLink
          to={"/cart"} 
          className="relative flex justify-center items-center w-8 h-8 ring-1 ring-slate-900/3 rounded-full 
          p-1 mr-2 shadow-lg"
        >
          <IoCartOutline size={32}/>
          <span className={`absolute z-2 left-5 bottom-5 w-5 h-5 p-1 bg-primaryGreen rounded-full 
            text-white text-center flex justify-center items-center 
            ${cartItemNumber >= 100 ? "text-[10px]" : "text-[12px]" }`}>
            {cartItemNumber}
          </span>
        </NavLink>
        {/*Login Button Nav block*/}
        <NavLink to={logText} >
          <button onClick={handleLogStateText}
            className="xs:w-20 xs:h-8 w-16 h-8 rounded-[20px] bg-primaryGreen 
            xs:text-[14px] text-[12px] text-white">
            {capitalize(logText)}
          </button>
        </NavLink>
      </div>
    </div>
  )
}

export default Header