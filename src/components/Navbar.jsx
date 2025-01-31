/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { navLinks } from "../constants/data";
import { capitalize } from "lodash";
import { useContext } from "react";
import { MainContext } from "../context/mainContext";
import { BiChevronLeft } from "react-icons/bi";


const Navbar = ({ containerStyles1 }) => {
    const { active, setActive } = useContext(MainContext);

    return (
        <nav className="w-full">
            <div className={containerStyles1}>
                {
                    navLinks.map((nav, index) => (
                        <NavLink 
                            key={index}
                            to={nav.link} 
                            className={`flex xs:justify-center justify-between items-center 
                            xs:px-3 px-2 xs:h-[35px] h-[30px] m-1 cursor-pointer hover:text-primaryGreen 
                            xs:w-fit w-full duration-500 transition-all xs:hover:border-b-4 hover:border-b-0 
                            hover:border-primaryGreen focus:outline-none focus:ring-0
                            ${active === capitalize(nav.name) 
                            ? "text-primaryGreen font-semibold" 
                            : "text-black font-normal title-text-shadow4"}`}
                            onClick={() => setActive(capitalize(nav.name))}
                        >
                            <div className="xs:hidden flex flex-row justify-center items-center ml-2 h-full">
                                <BiChevronLeft 
                                    size={20} 
                                    color={"#613207"} 
                                    style={{ width: 25, height: 25, opacity: 0.7 }}
                                    className={`rounded-full 
                                        ${ active === capitalize(nav.name)
                                            ? "animate-pulseBorder1" 
                                            : "animate-none"
                                        }`}
                                />
                            </div>
                            <div className="xs:text-[17px] text-[15px] my-[5px] h-full text-center flexCenter">
                                {capitalize(nav.name)}
                            </div>
                        </NavLink>
                    ))
                }
            </div>
        </nav>
    )
}

export default Navbar