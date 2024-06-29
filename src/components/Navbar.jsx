import { NavLink } from "react-router-dom"

const Navbar = () => {
    
    // const links = [
    //     { menLink: "/men" },
    //     { womenLink: "/women" },
    //     { kidLink: "/kids" }
    // ]

    return (
        <nav>
            <div className="flex flex-row justify-around items-center w-full">
                <NavLink to={"/"}>
                    Home
                </NavLink>
                <NavLink to={"/men"}>
                    Men
                </NavLink>
                <NavLink to={"/women"}>
                    Women
                </NavLink>
                <NavLink to={"/kids"}>
                    Kids
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar