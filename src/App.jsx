
import './App.css'
import FormInfo from './components/Form/FormInfo'
import LoginForm from './components/loginFom/LoginForm'
import Counter from './components/Counter/Counter'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from './components/Layout/Layout'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashPage from './components/DashboardPage/DashPage'
function App() {

  return (
    <>
     <ToastContainer />
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Layout/>}>
      <Route path='' element={<FormInfo/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/dashboard' element={<DashPage/>}/>
      </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
