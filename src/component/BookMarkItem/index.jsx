import BookMarkItem from "./BookMarkItem";
import "./BookMarkItem.scss";

function BookMarkList({ data }) {
  return (
    <ul className="bookmark__body">
      {data.length > 0 &&
        data.map((item) => <BookMarkItem key={item._id} data={item} />)}
    </ul>
  );
}

export default BookMarkList;
