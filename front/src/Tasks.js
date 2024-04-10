
// промисы можно указать так а можно :
//export default function Tasks(props) {
//const{tasks, onRemoveClick, CheckedTask} = props;
// это одно и то же

 export default function Tasks({tasks, onRemoveClick, CheckedTask}) {
  const lis = tasks.map(t => (
    <li key={t.id} className="task">
      <input type="checkbox" className="task-completed" checked={t.completed} onChange={() => CheckedTask(t.id, t.completed)}/>
      <div className="task-text">{t.text}</div>
      <button className="btn-task-remove" onClick={() => onRemoveClick(t.id)}>x</button>
    </li>
  ))
  return (

      <ul className="tasks">
        {lis}
      </ul>
  )
}

