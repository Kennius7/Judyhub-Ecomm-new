/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { navLinks } from "../constants/data";
import { capitalize } from "lodash";
import { useContext } from "react";
import { MainContext } from "../context/mainContext";


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
                            className={`flex xs:px-3 px-2 xs:h-[35px] h-[30px] xs:text-[18px] 
                            text-[15px] m-2 justify-center items-center cursor-pointer hover:text-primaryGreen 
                            duration-300 transition-all hover:border-b-4 hover:border-primaryGreen 
                            focus:outline-none focus:ring-0
                            ${active === capitalize(nav.name) 
                            ? "text-primaryGreen font-bold" 
                            : "text-black font-normal title-text-shadow4"}`}
                            onClick={() => setActive(capitalize(nav.name))}
                        >
                            {capitalize(nav.name)}
                        </NavLink>
                    ))
                }
            </div>
        </nav>
    )
}

export default Navbar