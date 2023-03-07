import { useState } from 'react'
import { useCollection } from '../hooks/useCollection'

export default function BookForm() {
  const [newBook, setNewBook] = useState('')
  const { addDocu } = useCollection('books');

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addDocu({title: newBook});
    setNewBook('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Add a new book title:</span>
        <input 
          required
          type="text"
          onChange={(e) => setNewBook(e.target.value)}
          value={newBook}
        />
      </label>
      <button>Add</button>
    </form>
  )
}
