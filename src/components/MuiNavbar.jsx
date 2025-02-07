/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { 
    AppBar, Toolbar, Typography, IconButton, Badge, Avatar, 
    Drawer, List, ListItem, ListItemText, Box 
} from "@mui/material";
import { ShoppingCart, Menu } from "@mui/icons-material";
import { userIcon, logoSvg } from "../assets";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../context/mainContext";
import { NavLink } from "react-router-dom";
import { navLinks } from "../constants/data";
import { capitalize } from "lodash";



const Navbar = () => {
    // const [mobileOpen, setMobileOpen] = useState(false);
    // const cartItemCount = 3;
    const navigate = useNavigate();
    const { 
        menuOpened, setMenuOpened, profileFormData, isLoggedIn, 
        isTokenExpired, pathAccess, active, setActive, cartItemNumber
    } = useContext(MainContext);
    const { name, profilePics } = profileFormData;

    const handleDrawerToggle = () => { setMenuOpened(!menuOpened) };

    const drawer = (
        <List sx={{ 
                width: 200, 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                alignItems: "center" 
            }}
        >
            <ListItem 
                component="div" 
                sx={{ 
                    width: "100%", 
                    display: "flex", 
                    flexDirection: "row", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" sx={{ fontStyle: "italic" }}>
                    {
                        isLoggedIn !== null && !isTokenExpired 
                        ? "Hi, " + name?.split(" ")[0] 
                        : isLoggedIn !== null && isTokenExpired ? "Please sign in again!" 
                        : "Hi, Guest" 
                    }
                </Typography>

                {/* Profile Avatar */}
                <Avatar
                    alt="Guest"
                    src={profilePics}
                    onClick={() => navigate("/profile")}
                    sx={{
                        display: { xs: "flex", sm: "none" },
                        flexDirection:  "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 38,
                        height: 38, 
                        cursor: "pointer",
                    }}
                />
            </ListItem>

            {/* Mobile Navigation Section */}
            <ListItem 
                component="div" 
                sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}
            >
                {
                    navLinks.map((nav, index) => (
                        <NavLink 
                            key={index} 
                            to={pathAccess ? nav.link : "/"} 
                            onClick={() => setActive(capitalize(nav.name))} 
                            className={`flex justify-start items-center cursor-pointer text-[17px] font-EncodeSans
                                duration-500 transition-all focus:outline-none focus:ring-0 my-2
                                ${active === capitalize(nav.name) 
                                ? "text-primaryGreen font-semibold" 
                                : "text-secondaryBrown font-normal title-text-shadow4"}`}
                        >
                            <Typography variant="h6">
                                { capitalize(nav.name) }
                            </Typography>
                        </NavLink>
                    ))
                }
            </ListItem>

            {/* Login Button */}
            <ListItem 
                component="div" 
                onClick={()=>navigate("/login")} 
                sx={{ width: "96%" }}
                className='xs:hidden block font-semibold text-secondaryBrown bg-primaryGreen/50 rounded-md'
            >
                <Typography variant="h6">
                    Sign in
                </Typography>
            </ListItem>

            <ListItem 
                component="div" 
                sx={{ top: 310, right: 10 }}>
                <IconButton color="inherit">
                    <Badge badgeContent={cartItemNumber} color="error">
                        <ShoppingCart 
                            className="animate-pulseBorder1 !important" 
                            sx={{ width: 30, height: 30, borderRadius: "51%" }} 
                        />
                    </Badge>
                </IconButton>
            </ListItem>

        </List>
    );

    return (
        <>
            <AppBar 
                position="fixed" 
                sx={{ background: "#0db915", zIndex: 10, opacity: 0.9 }} 
                className="backdrop-blur-md !important"
            >
                <Toolbar sx={{ 
                        width: "100%",
                        display: "flex", 
                        flexDirection: "row", 
                        justifyContent: "space-between", 
                        alignItems: "center" 
                    }}
                >

                     {/* Logo Block */}
                    <Avatar
                        alt="Judyhub logo"
                        src={logoSvg}
                        onClick={()=>navigate("/")}
                        sx={{ 
                            width: window.innerWidth > 768 ? 55 : 
                            window.innerWidth < 768 && window.innerWidth > 480 ? 45 : 40,
                            height: window.innerWidth > 768 ? 55 : 
                            window.innerWidth < 768 && window.innerWidth > 480 ? 45 : 40, 
                            cursor: "pointer", padding: "4px"
                        }}
                    />

                     {/* Navigation Links */}
                    <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
                        {
                            navLinks.map((nav, index) => (
                                <NavLink 
                                    key={index} 
                                    to={pathAccess ? nav.link : "/"} 
                                    onClick={() => setActive(capitalize(nav.name))} 
                                    className={`flex justify-center items-center px-2 cursor-pointer 
                                        hover:text-secondaryBrown duration-500 transition-all 
                                        xs:hover:border-b-4 hover:border-b-0 hover:border-secondaryBrown 
                                        focus:outline-none focus:ring-0
                                        ${active === capitalize(nav.name) 
                                        ? "text-secondaryBrown font-semibold" 
                                        : "text-white font-normal title-text-shadow4"}`}
                                >
                                    <Typography variant="h6">
                                        { capitalize(nav.name) }
                                    </Typography>
                                </NavLink>
                            ))
                        }
                    </Box>


                    {/* From Login to Mobile Menu Button Section */}
                    <div className="flexCenter gap-x-4">
                        {/* Login Button */}
                        <button 
                            onClick={()=>navigate("/login")} 
                            className='xs:block hidden text-white bg-secondaryBrown px-5 py-[6px] rounded-md shadow-md 
                            hover:bg-gray-200'>
                            Sign in
                        </button>

                        {/* Welcome Text */}
                        <Typography variant="h6" sx={{ display: { xs: "none", sm: "flex" }, flexGrow: 1 }}>
                            { 
                                isLoggedIn !== null && !isTokenExpired 
                                ? "Hi, " + name?.split(" ")[0] 
                                : isLoggedIn !== null && isTokenExpired ? "Please sign in again!" 
                                : "Hi, Guest"  
                            }
                        </Typography>

                        {/* Profile Avatar */}
                        <Avatar
                            alt="Guest"
                            src={profilePics}
                            onClick={()=>navigate("/profile")}
                            sx={{ 
                                width: window.innerWidth > 768 ? 40 : 
                                window.innerWidth < 768 && window.innerWidth > 480 ? 40 : 35,
                                height: window.innerWidth > 768 ? 40 : 
                                window.innerWidth < 768 && window.innerWidth > 480 ? 40 : 35, 
                                cursor: "pointer",
                            }}
                        />

                        {/* Cart Icon */}
                        <IconButton
                            color="inherit"
                            sx={{ display: { xs: "none", sm: "inline-flex" } }}
                        >
                            <Badge badgeContent={cartItemNumber} color="error">
                                <ShoppingCart 
                                    className="animate-pulseBorder !important" 
                                    sx={{ width: 35, height: 35, borderRadius: "51%" }} 
                                />
                            </Badge>
                        </IconButton>

                        {/* Mobile Menu Button */}
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ display: { sm: "none" }, width: 35, height: 35, marginLeft: "1px" }}
                            onClick={handleDrawerToggle}
                        >
                            <Menu sx={{ width: 35, height: 35 }} />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer anchor="right" open={menuOpened} onClose={handleDrawerToggle}>
                {drawer}
            </Drawer>
        </>
    );
};

export default Navbar;
