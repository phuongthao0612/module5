import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ClothingList from "./component/ClothingList";
import EditClothing from "./component/EditClothing";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ClothingList/>}/>
                <Route path="/clothings/edit/:id" element={<EditClothing/>}/>
            </Routes>
            <ToastContainer position="top-right" autoClose={2000}/>
        </Router>
    );
}

export default App;
