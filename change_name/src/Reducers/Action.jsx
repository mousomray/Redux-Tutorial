import axios from 'axios';

// Fetch Name 
export const fetchName = () => {
    return async (dispatch) => {
        try {
            const apiurl = 'https://jsonplaceholder.typicode.com/users'
            const response = await axios.get(apiurl);
            const result = response.data;
            dispatch({ type: "UPDATE_NAME", payload: result[1].name });
        } catch (error) {
            console.error('Error fetching data:', error);

        }
    }
}


