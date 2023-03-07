import BookList from '../components/BookList'
import BookForm from '../components/BookForm'
import { useCollection } from '../hooks/useCollection';
import { useSelector } from 'react-redux';

export default function Home() {

  const {user} = useSelector(state=>state.auth)
  const {documents: books} = useCollection('books', ['uid', '==', user.uid] )
  return (
    <div>
      {books && <BookList books={books} />}
      <BookForm />
    </div>
  );
}
