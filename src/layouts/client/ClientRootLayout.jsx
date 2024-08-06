// import '../../sass/client/normalize.css'
// import '../../sass/client/styles.scss'
import '../../sass/client/clientPageBackground.css'

import { Outlet } from "react-router-dom"

const ClientRootLayout = () => {
  return (
    <>
      <header className="page-header">
        <h1 className="page-header__title">Идём<span>в</span>кино</h1>
      </header>

      <Outlet/>
    </>

  )
}

export default ClientRootLayout