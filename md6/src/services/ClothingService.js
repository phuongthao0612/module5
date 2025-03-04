import axios from "axios";

export const getAllClothings = async () => {
    try {
        const response = await axios.get("http://localhost:8080/clothings");
        console.log(response);
        return response.data;
    }
    catch (error) {
        return error;
    }
}
export const updateClothing = async (id, clothing) => {
    try {
        const response = await axios.put(`http://localhost:8080/clothings/${id}`, clothing);
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const getClothingById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/clothings/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};