import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { isLoggedContext } from "../services/Context";
import apiClient from "../services/api";

const HallsApi = () => {
    const [hallsApi, setHallsApi] = useState([]);

    const { loggedIn, setLoggedIn } = useContext(isLoggedContext)
    console.log(loggedIn, setLoggedIn);



    useEffect(() => {
        apiClient.get('/api/halls') // вся проблема из-за заголовков и креденшиалов
        // axios.get('http://127.0.0.1:8000/api/book')
        // axios({
        //     method: 'get',
        //     url: 'http://localhost:8000/api/book',
        //     headers: { 'Accept': 'application/json' },
        //     // withCredentials: true,
        //     withXSRFToken: true
        // })
            // axios.get('http://localhost:8000/api/book')
            .then(response => {
                setHallsApi(response.data)
            })
            .catch(error => console.error(error));
    }, []);
    // const bookList = hallsApi.map((book) =>
    //     <li key={book.id}>{book.id}: {book.title},    {book.rows}</li>
    // );
    const bookList = hallsApi;
    if (loggedIn) {
        return (
            <ul>{bookList}</ul>
        );
    }
    return (
        <div>You are not logged in.</div>
    );
}

export default HallsApi