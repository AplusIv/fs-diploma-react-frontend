// import '../../sass/admin/normalize.css'
// import '../../sass/admin/styles.scss'
import '../../sass/admin/adminPageBackground.css'

import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <>
      <header className="page-header">
        <h1 className="page-header__title">Идём<span>в</span>кино</h1>
        <span className="page-header__subtitle">Администраторррская</span>
      </header>

      <Outlet/>
    </>
  )
}

export default RootLayout