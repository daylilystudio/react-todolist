import { Outlet } from "react-router-dom"
//image
import Logo from "../assets/image/logo.svg"

function Home() {
  return (
    <div id="loginPage">
      <div className="w-11/12 sm:w-96 py-10 mx-auto">
        <img className="w-full mb-2 opacity-75" src={Logo} alt="Logo" />
        <Outlet />
      </div>
    </div>
  )
}

export default Home