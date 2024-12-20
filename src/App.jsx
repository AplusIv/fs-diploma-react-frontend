// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

// layouts
import RootLayout from "./layouts/admin/RootLayout"
import Home from "./layouts/admin/Home"
import Login from "./layouts/admin/Login"
import NotFound from "./pages/NotFound"
import ShowError from "./pages/ShowError"

import ClientRootLayout from "./layouts/client/ClientRootLayout"
import Index from "./layouts/client/Index"
// import Booking from "./layouts/client/Booking"
// import Booking from "./layouts/client/Booking"

import Buying from "./layouts/client/Buying"
import Payment from "./layouts/client/Payment"
import Ticket from "./layouts/client/Ticket"





// import { hallsLoader } from "./pages/HallManager"
import { loader } from "./services/loader"
import BigSpinner from "./pages/BigSpinner"
import { useCallback, useContext, useMemo, useState } from "react"

// тест
import Books from "./pages/Books"
import { isLoggedContext } from "./services/Context"
import HallsApi from "./pages/HallsApi"


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<ShowError />}>
        <Route index element={<Home />} loader={loader} />
        <Route path="login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="client" element={<ClientRootLayout />}>
        <Route index element={<Index />} loader={loader} />
      </Route>
      <Route path="buying" element={<ClientRootLayout />}>
        {/* <Route index element={<Booking/>} /> */}
        <Route index element={<Buying />} />
      </Route>
      <Route path="payment" element={<ClientRootLayout />}>
        <Route index element={<Payment />} />
      </Route>
      <Route path="ticket" element={<ClientRootLayout />}>
        <Route index element={<Payment />} />
      </Route>

      <Route path='books' element={<Books />} />
      <Route path='halls' element={<HallsApi />} />

    </>
  )
)

function App() {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('loggedIn') == 'true' || false);
  // const login = () => {
  //   setLoggedIn(!loggedIn);
  // }
  const login = useCallback(() => {
      setLoggedIn(!loggedIn);
    }, [loggedIn]);
  const contextValue = useMemo(() => ({ loggedIn, setLoggedIn }), [loggedIn]); // запоминает функцию ,не перерисовывает без изменения значений
  // const { data, setData } = useContext(isLoggedContext)

  // const [count, setCount] = useState(0)
  //   const [loggedIn, setLoggedIn] = useState(false);

  //   const login = () => {
  //     setLoggedIn(true);
  // };

  // const isLoggedContext = useContext(isLoggedContext)
  return (
    <isLoggedContext.Provider value={{...contextValue, login: login}}>
      <RouterProvider router={router} fallbackElement={<BigSpinner />} />
    </isLoggedContext.Provider>
    // <RouterProvider router={router} fallbackElement={<BigSpinner />}/>
    //   
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
  )
}

export default App
