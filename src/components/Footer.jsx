/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from "../constants/data";
import logo from "../assets/judyhub-logo02.png";



const Footer = () => {
    const margTop = "mt-[12px]";

    const FooterColumn = ({ title, children }) => {
        return (
            <div className={`flex justify-center items-start ${title === "Socials" ? "flex-row" : "flex-col"}`}>
                <h4 className={`text-[20px] font-sans font-semibold ${title === "Socials" ? "hidden" : "block"}`}>
                    {title}
                </h4>
                {children}
            </div>
        );
    }


    return (
        <>
            <footer>
                <div className="px-4">
                    <Link to={'/'}>
                        <div className="w-[200px] h-[70px] mb-[20px]">
                            <img src={logo} alt="logo" className="w-full h-full" />
                        </div>
                    </Link>
                    <div className="flex justify-between items-start">
                        {
                            FOOTER_LINKS.map((col) => (
                                <FooterColumn key={col.title} title={col.title}>
                                    <ul className={`${margTop}`}>
                                        {
                                            col.links.map((link, index) => (
                                                <Link to={'/'} key={index}>
                                                    <li className="text-slate-500 text-[14px] ss:mb-[16px] mb-[8px]">
                                                        {link}
                                                    </li>
                                                </Link>
                                            ))
                                        }    
                                    </ul>
                                </FooterColumn>
                            ))
                        }
                        <div>
                            <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                                {
                                    FOOTER_CONTACT_INFO.links.map((link) => (
                                        <Link to={'/'} key={link.label}>
                                            <div className="flex ss:flex-row flex-col justify-center items-start mt-[16px]">
                                                <p className="text-slate-500 text-[14px]">
                                                    {link.label}:&nbsp;&nbsp;
                                                </p> 
                                                <p className="text-slate-500 text-[14px] flex flex-col 
                                                    justify-center items-start">
                                                    {
                                                        link.value.map((value, index) => (
                                                            <div 
                                                                key={index} 
                                                                className="ss:text-[16px] text-[11px]"
                                                            >
                                                                {value}
                                                            </div>
                                                        ))
                                                    }
                                                </p>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </FooterColumn>
                        </div>
                    
                    </div>
                    <div className="ss:mt-0 mt-[30px]">
                            <FooterColumn title={SOCIALS.title}>
                                {
                                    SOCIALS.links.map((link, index) => (
                                        <Link to={'/'} key={index}>
                                            <div className="ss:w-7 ss:h-7 w-5 h-5 ss:mx-4 mx-2">
                                                <img src={link} alt="social media icons" className="w-full h-full" />
                                            </div>
                                        </Link>
                                    ))
                                }
                            </FooterColumn>
                    </div>
                    <div className="w-full border bg-gray-20 ss:my-[30px] my-[10px]"></div>
                    <div className="w-full flex justify-center items-center">
                        <p className="text-slate-400 text-[13px] text-center ss:mb-3 mb-1">
                            2024 Judyhub | All rights reserved &copy;
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer