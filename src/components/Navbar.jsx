/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom"
import { navLinks } from "../constants/data"
import { capitalize } from "lodash"


const Navbar = ({ containerStyles1, containerStyles2 }) => {


    return (
        <nav className="w-full">
            <div className={containerStyles1}>
                {
                    navLinks.map((nav, index) => (
                        <NavLink 
                            key={index}
                            to={nav.link} 
                            className={containerStyles2}>
                            {capitalize(nav.name)}
                        </NavLink>
                    ))
                }
            </div>
        </nav>
    )
}

export default Navbar