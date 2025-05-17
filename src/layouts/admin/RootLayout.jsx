// import '../../sass/admin/normalize.css'
// import '../../sass/admin/styles.scss'
import { useEffect } from 'react';
import '../../sass/admin/adminPageBackground.css'

import { Outlet, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { setStateByStorageData } from '../../redux/slices/loginSlice';
import Logout from './Logout';

const RootLayout = () => {
  const loginRedux = useSelector(state => state.loginReducer.loggedIn);
  console.log({ loginRedux });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setStateByStorageData()); // синхронизация с хранилищем при перезагрузке

    if (!loginRedux) {
      // Redirect the user back to /login route
      navigate("/login", { replace: true });
    }
  }, [loginRedux]);

  return (
    <>
      <header className="page-header">
        <h1 className="page-header__title">Идём<span>в</span>кино</h1>
        <span className="page-header__subtitle">Администраторррская</span>
        <div className="logout-container" style={{ width: '972px', margin: '0 auto' }}>
          <Logout />
        </div>
      </header>

      <Outlet />
    </>
  )
}

export default RootLayout