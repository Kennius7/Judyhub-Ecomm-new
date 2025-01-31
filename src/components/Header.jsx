import Navbar from "./Navbar";
import logo from "../assets/judyhub-logo02.png";
import { useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import { MainContext } from "../context/mainContext";
// import { capitalize } from "lodash"
import { MdMenuOpen } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom"
import Button from "./Button";
import { userIcon } from "../assets";



const Header = () => {

  const navigate = useNavigate();
  const menuRef = useRef(null);
  let cartItemNumber = 3;
  let DPPics = "";
  let name = "Kenny";
  let isLoggedIn = null;
  let isTokenExpired = false;
  const { menuOpened, setMenuOpened } = useContext(MainContext);

  const handleMenuClick = () => {
    menuRef.current.focus();
    setMenuOpened(!menuOpened);
}
  const handleBlur = () => setMenuOpened(false);


  return (
    <div className="flex flex-row justify-between items-center w-full sm:h-[60px] h-[70px] bg-slate-200/80 
      xs:px-2 px-1 fixed z-10 backdrop-blur-md">
      {/*Logo block*/}
      <div 
        onClick={()=>navigate("/")}
        className="cursor-pointer sm:w-[170px] sm:h-[50px] xs:w-[120px] xs:h-[50px] w-[150px] h-[45px] rounded-[4px] 
        flex justify-start ss:items-end items-center relative"
      >
        <img src={logo} alt="logo pics" className="w-full h-full"/>
      </div>

      {/* The Rest of the Header after the Logo */}
      <div className="w-full h-full flex xs:justify-between justify-end items-center">
        {/*Large Screen Nav Block*/}
        <div className="xs:flex hidden flex-1 justify-around items-center h-full">
          <Navbar containerStyles1="flex flex-row justify-center items-center w-full medium-15"/>
        </div>

        {/*Full Right Side Nav Block*/}
        <div className="h-full flex flex-col justify-center items-end">
          {/*Small Screen Right Side Nav Block*/}
          <div className="xs:hidden flex flex-row justify-end items-center mb-1">
            {/*Name Welcome block*/}
            <div className="font-medium font-sans md:text-[15px] ss:text-[13px] text-[13px] 
              text-secondaryBrown italic ss:px-2 px-1">
              { 
                  isLoggedIn !== null && !isTokenExpired 
                  ? "Hi, " + name?.split(" ")[0] 
                  : isLoggedIn !== null && isTokenExpired ? "Please sign in again!" 
                  : "Hi, Guest"  
              }
            </div>
            {/*Login Button Nav block*/}
            <NavLink to={"/login"} className={`flexCenter ml-2`}>
              <Button 
                buttonText={"Sign up"} 
                className={`xs:w-20 xs:h-8 w-16 h-6 rounded-[10px] bg-primaryGreen xs:text-[14px] 
                text-[12px] text-white shadow-[0px_0px_5px_0px_#0b1f139c]`} />
            </NavLink>
          </div>

          {/*Large Screen Right Side Nav Block*/}
          <div className="flexBetween mt-1">
            {/*Name Welcome block*/}
            <div className="xs:block hidden font-medium font-sans md:text-[15px] ss:text-[13px] text-[11px] 
              text-secondaryBrown italic ss:px-2 px-1">
              { 
                  isLoggedIn !== null && !isTokenExpired 
                  ? "Hi, " + name?.split(" ")[0] 
                  : isLoggedIn !== null && isTokenExpired ? "Please sign in again!" 
                  : "Hi, Guest"  
              }
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
            {/*Profile Pics block*/}
            <NavLink
              to={"/profile"} 
              className="flex justify-center items-center sm:w-8 sm:h-8 w-7 h-7 ring-1 ring-primaryGreen/80 
              rounded-full shadow-lg xs:mx-2 mx-2 bg-secondaryBrown"
            >
                <img 
                    src={ DPPics === "" || DPPics === undefined ? userIcon : DPPics } 
                    alt="profile pics" 
                    className="w-full h-full object-cover opacity-80"
                />
            </NavLink>
            {/*Login Button Nav block*/}
            <NavLink to={"/login"} className={`xs:block hidden`}>
              <Button 
                buttonText={"Sign up"} 
                className={`xs:w-20 xs:h-8 w-16 h-8 rounded-[20px] bg-primaryGreen xs:text-[14px] 
                text-[12px] text-white shadow-[0px_0px_5px_0px_#0b1f139c]`} />
            </NavLink>
            {/*Menu Icon Nav block*/}
            <div 
              onClick={handleMenuClick} 
              className="xs:hidden flex flex-row justify-center items-center w-7 h-7 ring-1 
              ring-slate-900/3 rounded-full mx-1 shadow-[0px_0px_5px_0px_#0b1f139c] cursor-pointer">
              { 
                !menuOpened 
                  ? <MdMenuOpen size={32} style={{ width: 50, height: 50 }} /> 
                  : <MdOutlineMenu size={32} style={{ width: 50, height: 50 }} /> 
              }
              {/*Mobile Screen Nav block*/}
              <div 
                onBlur={handleBlur}
                ref={menuRef}
                tabIndex={0}
                className=""
              >
                <Navbar 
                  containerStyles1={`fixed z-[4] top-[70px] xs:hidden flex flex-col justify-center items-end 
                    xs:w-[140px] xs:h-[160px] w-[140px] h-[210px] rounded-bl-[16px] bg-slate-200/80 xs:py-0 py-2
                    ${menuOpened ? "right-0" : "-right-[100%]" } transition-all duration-500`}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Header