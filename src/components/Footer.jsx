/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from "../constants/data";
import logo from "../assets/judyhub-logo02.png";



const Footer = () => {
    const margTop = "xs:mt-[12px] mt-[8px]";

    const FooterColumn = ({ title, children }) => {
        return (
            <div className={`flex justify-center items-start ${title === "Socials" ? "flex-row" : "flex-col"}`}>
                <h4 
                    className={`xs:text-[20px] text-[16px] font-sans font-semibold 
                    ${title === "Socials" ? "hidden" : "block"}`}
                >
                    {title}
                </h4>
                {children}
            </div>
        );
    }


    return (
        <footer>
            <div className="xs:px-4 px-1">
                <Link to={'/'}>
                    <div className="ss:w-[150px] ss:h-[50px] xs:w-[130px] xs:h-[40px] w-[110px] h-[40px] 
                        mb-[20px] ss:m-1 m-2">
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
                                                <li className="text-slate-500 xs:text-[14px] text-[12px] 
                                                    ss:mb-[16px] xs:mb-[8px] mb-[4px]">
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
                                        <div 
                                            className="flex ss:flex-row flex-col justify-center items-start 
                                            ss:mt-[16px] xs:mt-[8px] mt-[4px]"
                                        >
                                            <p className="text-slate-500 text-[14px]">
                                                {link.label}:&nbsp;&nbsp;
                                            </p> 
                                            <div className="text-slate-500 text-[14px] flex flex-col 
                                                justify-center items-start">
                                                {
                                                    link.value.map((value, index) => (
                                                        <p 
                                                            key={index} 
                                                            className="ss:text-[16px] text-[11px]"
                                                        >
                                                            {value}
                                                        </p>
                                                    ))
                                                }
                                            </div>
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
                    <p className="text-slate-400 text-[13px] text-center ss:mb-2 mb-1">
                        2024 Judyhub | All rights reserved &copy;
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer