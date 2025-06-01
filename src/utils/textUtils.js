import { IoHomeSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { FaBarcode } from "react-icons/fa6";
import { GrDocumentConfig } from "react-icons/gr";
import { MdInventory2 } from "react-icons/md";
import { PiPackageFill } from "react-icons/pi";
export const navbar_context = {
    links: [
        {
            title: "DashBoard",
            path: "/",
            icon: <IoHomeSharp style={{ width: "20px" }} />
        },
        {
            title: "Register User",
            path: "/register",
            icon: <FaUserPlus style={{ width: "20px" }} />
        },
        {
            title: "Sticker Generator",
            path: "/sticker-generator",
            icon: <FaBarcode style={{ width: "16px" }} />
        },
        {
            title: "Inventory",
            path: "/inventory",
            icon: <MdInventory2 style={{ width: "20px" }} />
        },
        {
            title: "Dispatch",
            path: "/dispatch",
            icon: <PiPackageFill style={{ width: "22px" }} />
        },
        {
            title: "Admin Config",
            path: "/admin-config",
            icon: <GrDocumentConfig style={{ width: "19px" }} />
        },
    ]
}   