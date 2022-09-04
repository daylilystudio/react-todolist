function ListTags (props) {
  const { filterType, onFilterChange } = props
  const tabs = [
    { key: 'all', title: '全部' },
    { key: 'wait', title: '待完成' },
    { key: 'active', title: '已完成' }
  ]
  const cssSet = (type) => {
    return filterType === type ? 'active' : ''
  }

  return (
    <ul className="todoList_tab">
      { tabs.map(tab => {
        return (
          <li key={ tab.key } className="cursor-pointer">
            <a className={ cssSet(tab.key) }
            onClick={ () => onFilterChange(tab.key) }>
              { tab.title }
            </a>
          </li>
        )
      }) }
    </ul>
  )
}

export default ListTags