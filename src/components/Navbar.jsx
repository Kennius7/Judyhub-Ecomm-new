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
                            className={`
                                ${
                                    window.innerWidth >= 620 
                                        ? "px-3 h-[35px] m-2 flex justify-end items-center cursor-pointer hover:text-primaryGreen duration-300 transition-all hover:border-b-4 hover:border-primaryGreen focus:outline-none focus:ring-0"
                                        : "flex justify-end items-center w-full h-[30px] px-2 ss:text-[18px] text-[15px]"
                                } 
                                ${active === capitalize(nav.name) ? "text-primaryGreen font-bold" : "text-black font-normal title-text-shadow4"}`}
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