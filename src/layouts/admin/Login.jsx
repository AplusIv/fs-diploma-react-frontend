// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../redux/slices/loginSlice";

import apiClient from "../../services/api";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // axios.defaults.withCredentials = true;

    try {
      await apiClient.get('/sanctum/csrf-cookie');
      const response = await apiClient.post('/login', {
        email: email,
        password: password
      });
      console.log(response)
      if (response.status === 204) {
        setError('');
        dispatch(setLoggedIn());
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);

      // Когда пользователь залогинен, но отсутствует запись в сессии
      if (error.response.status === 403 && error.response.data.message === "Already Authenticated") {
        console.log('сессия пользователя обновлена');
        dispatch(setLoggedIn());
        navigate('/');
      }
    }
  }

  /* const handleSubmit = (e) => {
    e.preventDefault();
    // axios.defaults.withCredentials = true;
    apiClient.get('/sanctum/csrf-cookie')
      .then(() => {
        apiClient.post('/login', {
          email: email,
          password: password
        }).then(response => {
          console.log(response)
          if (response.status === 204) {
            setError('');
            dispatch(setLoggedIn());
            navigate('/')
          }
        }).catch(err => {
          console.log(err);
          setError(err.response.data.message);

          // Когда пользователь залогинен, но отсутствует запись в сессии
          if (err.response.status === 403 && err.response.data.message === "Already Authenticated") {
            console.log('сессия пользователя обновлена');
            dispatch(setLoggedIn());
            navigate('/');
          }
        })
      }).catch(err => {
        console.log(err);
      });
  } */

  return (
    <main>
      <section className="login">
        <header className="login__header">
          <h2 className="login__title">Авторизация</h2>
        </header>
        <div className="login__wrapper">
          <form className="login__form" onSubmit={handleSubmit}>

            {/* @csrf */}

            <label className="login__label" htmlFor="email">
              E-mail
              <input
                className="login__input"
                type="email"
                placeholder="admin2@gmail.com"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="login__label" htmlFor="pwd">
              Пароль
              <input
                className="login__input"
                type="password"
                placeholder=""
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="text-center">
              <input
                value="Авторизоваться"
                type="submit"
                className="login__button"
              />
            </div>
            {/* <p>{email} + {password}</p> */}

            {error ? <p>{error}</p> : null}

          </form>
        </div>
      </section>
    </main>

  )
}

export default Login