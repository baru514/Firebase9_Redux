import { useCollection } from "../hooks/useCollection";

export default function BookList({ books }) {

  const { delDocu } = useCollection('books');
  const handleDelete = async (id) => {
    await delDocu(id);
  }

  return (
    <div className="book-list">
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <span>{book.title}</span>
            <button className='del' onClick={()=>handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}