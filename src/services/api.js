import axios from 'axios';
 
const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    withXSRFToken: true, // второй заход на исправления ошибок/ сработало!
});
 
export default apiClient;