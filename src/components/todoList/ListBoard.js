import { useState, useEffect } from "react"
import { useAuth } from '../../utils/Context'
import ListTags from './ListTags'
import Lists from './Lists'
import { getTodoList, postTodo, deleteTodo } from '../../utils/todoAPI'
import { sweetAlert, showToast } from '../../utils/sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//image
import Nodata from "../../assets/image/nodata.svg"

function ListBoard () {
  const [todoInput, setTodoInput] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [todoList, setTodoList] = useState([])
  const [loading, setLoading] = useState(false)
  const [waitDelete, setWaitDelete] = useState(false)
  const { token } = useAuth()

  useEffect(() => {
    setLoading(true)
    getTodoList(token).then(res => {
      setTodoList(res.data.todos)
      setLoading(false)
    }).catch(err => {
      showToast('取得待辦事項失敗', 'error')
      setLoading(false)
    })
  }, [])

  const handleSetTodoInput = (e) => {
    const { value } = e.target
    setTodoInput(value)
  }
  const handleSendTodoAPI = (e) => {
    e.preventDefault()
    if (todoInput.trim() === '' || todoInput === '') {
      sweetAlert('未輸入待辦事項', '是不是想偷懶', 'info')
      return
    }
    setLoading(true)
    postTodo(token, todoInput).then(res => {
      getTodoList(token).then(res => {
        setTodoList(res.data.todos)
        showToast('新增待辦事項成功', 'success')
        setLoading(false)
      }).catch(err => {
        showToast('取得待辦事項失敗', 'error')
        setLoading(false)
      })
      setTodoInput('')
    }).catch(err => {
      showToast('新增待辦事項失敗', 'error')
    })
  }

  const cleanFinishedTodo = async (e) => {
    e.preventDefault()
    setWaitDelete(true)
    const finishedTodo = todoList.filter(item => item.completed_at).map(item => {
      return new Promise(async resolve => {
        await deleteTodo(token, item.id)
        resolve()
      })
    })
    await Promise.all(finishedTodo)
    getTodoList(token).then(res => {
      setTodoList(res.data.todos)
      setWaitDelete(false)
      showToast('刪除已完成事項成功', 'success')
    }).catch(err => {
      console.log(err)
      setWaitDelete(false)
      showToast('刪除已完成事項失敗', 'error')
    })
  }
  return (
    <div className="conatiner todoListPage vhContainer">
      <div className="todoList_Content">
          <div className="inputBox">
              <input type="text" placeholder="請輸入待辦事項"
              onChange={ handleSetTodoInput } value={ todoInput } />
              <a href="#" onClick={ handleSendTodoAPI }>
                {
                  loading ? 
                  <div className="spinner-border spinner-border-sm text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  : <FontAwesomeIcon icon="fa-solid fa-plus" />
                }
              </a>
          </div>
          {
            todoList.length !== 0 ? (
              <div className="todoList_list">
              <ListTags filterType={ filterType } onFilterChange={ setFilterType } />
              <div className="todoList_items">
                  <Lists filterType={ filterType } todoList={ todoList }
                  onListChange={ setTodoList } />
                  <div className="todoList_statistics">
                    <p> { todoList.filter(item => item.completed_at).length } 個已完成項目</p>
                    <a href="#" onClick={ cleanFinishedTodo }>清除已完成項目
                      {
                        waitDelete ? 
                        <div className="spinner-border spinner-border-sm text-dark" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        : ''
                      }
                    </a>
                  </div>
              </div>
          </div>
            ) : 
            <div className="emptyBoard mt-16">
              <p className="mb-4 text-center">目前尚無待辦事項</p>
              <img src={Nodata} className="emptyImg w-full md:w-3/5 mx-auto" alt="" />
            </div>
          }
          
      </div>
    </div>
  )
}

export default ListBoard