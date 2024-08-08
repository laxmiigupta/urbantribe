import './App.css'
import { ToastContainer } from "react-toastify"
import Router from './Router/Router'
import Newsingup from './Newsingup'

export default function App() {
  return (
    <>
      <div>
        <Router />
      </div>
      <ToastContainer />

      {/* <Newsingup/> */}
    </>
  )
}
