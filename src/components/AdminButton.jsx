import { useNavigate } from "react-router-dom"



const AdminSection = () => {
    const navigate = useNavigate();
    const adminNavigate = () => {
        navigate("/admin");
        console.log("Routed...");
    }

    return (
        <section className="h-[30px] bg-white/80 px-2 fixed top-[60px] right-0 z-10 cursor-pointer
            backdrop-blur-md rounded-bl-[18px] flex justify-center items-center">
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

