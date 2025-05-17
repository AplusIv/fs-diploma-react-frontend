import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/api";
import { setLoggedOut } from "../../redux/slices/loginSlice";

const Logout = () => {
  const loginRedux = useSelector(state => state.loginReducer.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    apiClient.post('/logout').then(response => {
      console.log({response});      
      if (response.status === 204) {
        dispatch(setLoggedOut());
        navigate('/login');
      }
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    loginRedux ? <button type="button" className="conf-step__button conf-step__button-warning" onClick={logout} >Выйти</button> : null
  )
}

export default Logout