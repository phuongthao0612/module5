import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./component/BookList";
import AddBook from "./component/AddBook";
import EditBook from "./component/EditBook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books/create" element={<AddBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
        </Routes>
          <ToastContainer position="top-right" autoClose={2000} />
      </Router>
  );
}

export default App;
