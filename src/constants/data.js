import FacebookIcon from "../assets/facebook1.svg";
import InstagramIcon from "../assets/instagram1.svg";
import YoutubeIcon from "../assets/youtube1.svg";
import TwitterIcon from "../assets/twitter1.svg";
import LinkedInIcon from "../assets/linkedin1.svg";


export const navLinks = [
    { name: "home", link: "/" },
    { name: "perfumes", link: "/perfumes" },
    { name: "clothes", link: "/clothes" },
    { name: "accessories", link: "/accessories" },
];

export const FOOTER_LINKS = [
    {
        title: "Learn More",
        links: [
            "About Us",
            "Categories",
            "Exchange Policy",
            "Order Now",
            "FAQ",
            "Privacy Policy",
        ],
    },
    {
        title: "Our Community",
        links: ["Terms and Conditions", "Special Offers", "Customer Reviews"],
    },
];

export const FOOTER_CONTACT_INFO = {
    title: "Contact us",
    links: [
        {label: "Contact Number", value: ["+234-7033325279", "+234-8055549979"]},
        {label: "Email Address", value: ["ogbogukenny@yahoo.com", "shinjinchu@gmail.com"]},
    ],
}

export const SOCIALS = {
    title: "Socials",
    links: [ FacebookIcon, InstagramIcon, YoutubeIcon, TwitterIcon, LinkedInIcon ],
}

