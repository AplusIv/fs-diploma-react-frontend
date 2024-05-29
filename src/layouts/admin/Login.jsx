// import axios from "axios";
import { useState } from "react"
import apiClient from "../../services/api";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        })
    });
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
              placeholder="admin@gmail.com" 
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
        </form>
      </div>
    </section>
  </main>
  
  )
}

export default Login