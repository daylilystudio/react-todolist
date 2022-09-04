import { Outlet } from "react-router-dom"
//image
import Logo from "../assets/image/logo_lg.svg"
import Person from "../assets/image/person.svg"

function Home() {
  return (
    <div id="loginPage" className="bg-yellow">
    <div className="conatiner loginPage vhContainer">
      <div className="side">
        <img className="logoImg" src={Logo} alt="Logo" />
        <img className="d-m-n" src={Person} alt="workImg" />
      </div>
      <Outlet />
    </div>
  </div>
  )
}

export default Home