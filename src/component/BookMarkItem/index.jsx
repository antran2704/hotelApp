import BookMarkItem from "./BookMarkItem";
import "./BookMarkItem.scss";

function BookMarkList() {
  return (
    <ul className="bookmark__body">
        <BookMarkItem />
        <BookMarkItem />
        <BookMarkItem />
        <BookMarkItem />
        <BookMarkItem />
        <BookMarkItem />
    </ul>
  );
}

export default BookMarkList;
