import { 
    FacebookIcon, InstagramIcon, YoutubeIcon, TwitterIcon, LinkedInIcon, 
    Shirts1, Shirts2, Shirts3, Shirts4, Shirts5, Shoes1, Shoes2 
} from "../assets";

export const navLinks = [
    { name: "home", link: "/" },
    { name: "perfumes", link: "/perfumes" },
    { name: "clothes", link: "/clothes" },
    { name: "skin care", link: "/skincare" },
    { name: "hair care", link: "/haircare" },
];

export const PopularProducts = [
    {
        id: 1,
        name: "Guchi Shirt",
        image: Shirts1,
        newPrice: "10,000",
        oldPrice: "15,000",
    },
    {
        id: 2,
        name: "Praddi Shirt",
        image: Shirts2,
        newPrice: "8,000",
        oldPrice: "12,000",
    },
    {
        id: 3,
        name: "Luichi Shirt",
        image: Shirts3,
        newPrice: "7,000",
        oldPrice: "10,000",
    },
    {
        id: 4,
        name: "Bendi Shirt",
        image: Shirts4,
        newPrice: "12,000",
        oldPrice: "17,000",
    },
    {
        id: 5,
        name: "Niccini Shirt",
        image: Shirts5,
        newPrice: "10,000",
        oldPrice: "14,000",
    },
    {
        id: 6,
        name: "Florini Shoes",
        image: Shoes1,
        newPrice: "20,000",
        oldPrice: "35,000",
    },
    {
        id: 7,
        name: "Gianni Shoes",
        image: Shoes2,
        newPrice: "17,000",
        oldPrice: "25,000",
    },
]

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

