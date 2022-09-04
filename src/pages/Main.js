import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import ListBoard from '../components/todoList/ListBoard'
import { useAuth, useUserName } from "../utils/Context"
import { checkLogIn } from '../utils/todoAPI'
import { showToast } from '../utils/sweetalert'
//image
import Logo from "../assets/image/logo.svg"

function ListPage () {
  let navigate = useNavigate()
  const { token, setToken } = useAuth()
  const { userName } = useUserName()
  useEffect(() => {
    checkLogIn(token).catch(err => {
      console.log(err)
      showToast('請重新登入', 'warning')
      navigate('/', { replace: true })
    })
  }, [])

  const logOut = () => {
    setToken(null)
    showToast('您已登出', 'success')
  }

  return (
    <div id="todoListPage" className="bg-half">
    <nav>
        <img className="w-60" src={Logo} alt="" />
        <ul className="flex items-center">
          <li className="todo_sm mr-6"><span>{ userName }的代辦</span></li>
          <li><button onClick={ logOut }>登出</button></li>
        </ul>
    </nav>
    <ListBoard />
  </div>
  )
}

export default ListPage