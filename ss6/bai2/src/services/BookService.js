import axios from "axios";

export const getAllBooks = async () => {
    try {
        const response = await axios.get("http://localhost:8080/books");
        console.log(response);
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const saveBook = async (book) => {
    try {
        const response = await axios.post("http://localhost:8080/books", book);
        console.log(response);
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const deleteBook = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/books/${id}`);
        console.log(response);
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const updateBook = async (id, book) => {
    try {
        const response = await axios.put(`http://localhost:8080/books/${id}`, book);
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const getBookById = async (id) => {
    return await axios.get(`http://localhost:8080/books/${id}`);
};
