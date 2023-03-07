import { useParams } from "react-router-dom"
import { useCollection } from "../hooks/useCollection";

function SingleBook() {

  const {id} = useParams();
  console.log(id)
  const {documents: book} = useCollection('books', ['id', '==', id] )
  console.log(book);
  return (
    <div className="book-list">
      <ul>
          <li>
            {book ? `${book.id}` : 'Loading...'}
          </li>
      </ul>
    </div>
  )
}

export default SingleBook
