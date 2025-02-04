import { useContext, useState } from "react";
import { Edit, Save, Upload } from "lucide-react";
import { MainContext } from "../context/mainContext";
import { userIcon } from "../assets";



const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { profileFormData, DPPics } = useContext(MainContext);
    const { name, email } = profileFormData;
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john@example.com",
        address: "123 Main St, New York, USA",
        profilePic: "https://via.placeholder.com/100",
    });

    const [orders] = useState([
        { id: "001", date: "2024-01-10", total: "$120.00", status: "Shipped" },
        { id: "002", date: "2024-02-05", total: "$45.50", status: "Processing" },
    ]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUser(prev => ({ ...prev, profilePic: imageUrl }));
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-slate-400">
            {/* Profile Card */}
            <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4">
                <div className="relative">
                    <div className="w-20 h-20 bg-secondaryBrown rounded-full overflow-hidden 
                        ring-1 ring-primaryGreen/80">
                        <img 
                            src={ DPPics === "" || DPPics === undefined ? userIcon : DPPics }
                            alt="Profile" 
                            className="w-full h-full border opacity-80" 
                        />
                    </div>
                    {isEditing && (
                        <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer">
                            <Upload size={16} />
                            <input type="file" className="hidden" onChange={handleProfilePicChange} />
                        </label>
                    )}
                </div>
                <div>
                    {isEditing ? (
                        <input 
                            name="name"
                            value={name}
                            onChange={handleChange}
                            className="text-xl font-bold border rounded-md p-1"
                        />
                    ) : (
                        <h2 className="text-xl font-bold">{name}</h2>
                    )}
                    <p className="text-gray-500">{email}</p>
                    {isEditing ? (
                        <input 
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                            className="border rounded-md p-1"
                        />
                    ) : (
                        <p className="text-gray-500">{user.address}</p>
                    )}
                </div>
                <button 
                    onClick={() => setIsEditing(!isEditing)} 
                    className="ml-auto bg-blue-500 text-white px-3 py-1 rounded-md flex items-center gap-2"
                >
                    {isEditing ? <Save size={18} /> : <Edit size={18} />}
                    {isEditing ? "Save" : "Edit"}
                </button>
            </div>

            {/* Order History Table */}
            <h3 className="mt-6 text-lg font-semibold">Order History</h3>
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                        <tr className="text-left text-sm font-semibold">
                            <th className="p-3">Order ID</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} className="border-t text-sm">
                                <td className="p-3">{order.id}</td>
                                <td className="p-3">{order.date}</td>
                                <td className="p-3">{order.total}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 text-xs rounded-md 
                                        ${order.status === "Shipped" ? "bg-green-200 text-green-700" : "bg-yellow-200 text-yellow-700"}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Profile;
