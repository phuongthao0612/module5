import axios from "axios";

export const getAllTypes = async () => {
    try {
        const response = await axios.get("http://localhost:8080/types");
        console.log(response);
        return response.data;
    }
    catch (error) {
        return error;
    }
}