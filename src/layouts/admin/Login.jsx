// import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";

import { createContext, useContext, useState } from "react"
import apiClient from "../../services/api";
import { isLoggedContext } from "../../services/Context";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "../../redux/slices/loginSlice";

const Login = () => {
  // const [toHome, setToHome] = useState(false); // необязательно для глобального контекста

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');


  /* const { loggedIn, setLoggedIn, login } = useContext(isLoggedContext);
  console.log(loggedIn, setLoggedIn, login); */

  const loginRedux = useSelector(state => state.loginReducer.loggedIn);
  console.log({loginRedux});

  const dispatch = useDispatch();


  const navigate = useNavigate();


  // const login = () => {
  //   setLoggedIn(!loggedIn);
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.defaults.withCredentials = true;
    apiClient.get('/sanctum/csrf-cookie')
      .then(response => {
        apiClient.post('/login', {
          email: email,
          password: password
        }).then(response => {
          console.log(response)
          if (response.status === 204) {
            // login(); // если основной запрос 302 -> залогиниться
            // sessionStorage.setItem('loggedIn', true);
            // console.log('пользователь авторизован');

            // setToHome(true);

            setError('');

            // console.log({ loggedIn });
            dispatch(setLoggedIn());
            navigate('/')
          }
        }).catch(err => {
          console.log(err);

          setError(err.response.data.message);

          // Когда пользователь залогинен, но отсутствует запись в сессии
          if (err.response.status === 403 && err.response.data.message === "Already Authenticated") {
            console.log('сессия пользователя обновлена');
            /* login(); // если основной запрос 302 -> залогиниться
            sessionStorage.setItem('loggedIn', true); */
            dispatch(setLoggedIn());
            navigate('/');
          }
        })
      }).catch(err => {
        console.log(err);
        // console.log({err});  
      });
  }

  // if (toHome === true) {
  //   return redirect('http://localhost:5173/api/books');
  // }

  if (loginRedux === true) {
    // return redirect('http://localhost:5173/api/books');
    console.log('пользователь авторизован, можно перенаправлять на главную');
  }

  return (


    <main>
      <section className="login">
        <header className="login__header">
          <h2 className="login__title">Авторизация</h2>
        </header>
        <div className="login__wrapper">
          {/* <form className="login__form" action="http://127.0.0.1:8000/login" method="POST" acceptCharset="utf-8"> */}
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
            <p>{email} + {password}</p>

            {error ? <p>{error}</p> : null}

          </form>
        </div>
      </section>
    </main>

  )
}

export default Login