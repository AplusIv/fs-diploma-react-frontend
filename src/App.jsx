// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useNavigate } from "react-router-dom"

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
import { useCallback, useContext, useEffect, useMemo, useState } from "react"

// тест
import Books from "../reserve/Books"
import HallsApi from "./pages/HallsApi"
import MovieList from "./layouts/client/MovieList"

// context
import { isLoggedContext } from "./services/Context"
import { orderContext } from "./services/OrderContext"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <Route path="/" element={<RootLayout />} errorElement={<ShowError />}> */}
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} loader={loader} />
        <Route path="login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="client" element={<ClientRootLayout />}>
        {/* <Route index element={<Index />} loader={loader} /> */}
        {/* route params */}
        <Route path="schedule" element={<Index />}>
          <Route path=":date" element={<MovieList />} loader={loader} />
        </Route>
      </Route>
      <Route path="buying" element={<ClientRootLayout />}>
        {/* <Route index element={<Booking/>} /> */}
        <Route index element={<Buying />} />
      </Route>
      <Route path="payment" element={<ClientRootLayout />}>
        <Route index element={<Payment />} />
      </Route>
      <Route path="ticket" element={<ClientRootLayout />}>
        <Route index element={<Ticket />} />
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
  console.log(loggedIn);
   
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

  // order context
  const [order, setOrder] = useState({});
  const orderContextValue = useMemo(() => ({ order, setOrder }), [order]); // запоминает функцию ,не перерисовывает без изменения значений
  return (
    <isLoggedContext.Provider value={{...contextValue, login: login}}>
      <orderContext.Provider value={orderContextValue}>
        <RouterProvider router={router} fallbackElement={<BigSpinner />} />
      </orderContext.Provider>
    </isLoggedContext.Provider>
    // <isLoggedContext.Provider value={{...contextValue, login: login}}>
    //   <RouterProvider router={router} fallbackElement={<BigSpinner />} />
    // </isLoggedContext.Provider>
    // 
    // <RouterProvider router={router} fallbackElement={<BigSpinner />}/>
    //   
    //   
    // </>
  )
}

export default App
