import BookMarkItem from "./BookMarkItem";
import "./BookMarkItem.scss";
import { useSelector } from "react-redux";

function BookMarkList({ data }) {
  const { searchHotel } = useSelector((state) => state.data);
  return (
    <ul className="bookmark__body">
      {searchHotel.length > 0 &&
        searchHotel.map((item) => <BookMarkItem key={item._id} data={item} />)}
    </ul>
  );
}

export default BookMarkList;
