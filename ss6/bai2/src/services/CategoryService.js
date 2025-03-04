import axios from "axios";

export const getAllCategories = async () => {
    try {
        const response = await axios.get("http://localhost:8080/categories");
        console.log(response);
        return response.data;
    }
    catch (error) {
        return error;
    }
}