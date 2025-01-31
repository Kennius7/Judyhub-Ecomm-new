import { useNavigate } from "react-router-dom"



const AdminSection = () => {
    const navigate = useNavigate();
    const adminNavigate = () => navigate("/admin");

    return (
        <section className="h-[30px] bg-slate-200/80 px-2 fixed xs:top-[60px] top-[70px] 
            right-0 z-10 cursor-pointer backdrop-blur-md rounded-bl-[18px] flex justify-center 
            items-center transition-all duration-1000 fadeInAnimate">
            <button 
                onClick={adminNavigate} 
                className="pl-4 text-center text-[16px] text-secondaryBrown"
            >
                Admin access
            </button>
        </section>
    )
}

export default AdminSection

