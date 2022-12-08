import { AiFillHome } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md"

const items = [
    {
        icon: AiFillHome,
        path: "/",
        name: "home"
    },
    {
        icon: MdLocationOn,
        path: "/location",
        name: "location"
    },
    {
        icon: FaSearch,
        path: "/search",
        name: "search"
    },
    {
        icon: BsFillBookmarkFill,
        path: "/bookmark",
        name: "bookmark"
    },
];

export default items;