import { useEffect, useState } from 'react';
import Header from './Header';
import Tasks from './Tasks';

// обращаемся к функциям в файле api.js - getTasks там указана по умолчанию,
// остальные в фигурные скобки
import getTasks, { addTask, changeTaskStatus, getTime, removeTask, } from './api';
import displayMsg from './util';
// import getTime from './ApiTime';



function App() {
  // импользуем setы (хук useState) для измененея состояния данных на странице
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [time, setTime] = useState('----')

  // Вызываем один раз при момощи хука useEffect функцию загрузки с бекенда
  useEffect(() => {
    get();
  }, [])

  // Функция чтения данных из бекенда
  async function get () {
    const an = await getTasks();
    if (!an || an.error) {
      return;
    }
  //Т.к. данные возвращаются в виде матрицы сразу вызываем нужный useEffect
    setTasks(an);
  }

  // Функция изменения состояния галочки
  async function Checked(id, completed) {
    const answer = await changeTaskStatus(id, !completed)
    if (!answer || answer.error) {
      return;
    }
    // используем перерисовку через загрузку данных с бекенда)
    get();
  }

  // Чтение данных из textarea
  const changingValueTextArea = (event) => {
    const newText =  event.target.value;
    setText(newText);
  }

  // Добавление новой задачи
  async function addNewTask() {
    const newTask = {
      text: text,
      completed: false,
    };

    // провеорка текста - обрезка пробелов
    const checkingText = text.trim();
    if (!checkingText){
      setText('');
      return;
    }
    const answer = await addTask(checkingText)

    // выдергиваем id из бекенда
    newTask.id = answer.id++;

    if (!answer || answer.error) {
      return;
    }

    // добавляем сформированную задачу в конец массива задач
    setTasks([...tasks, newTask]);
    setText('');
    console.log(displayMsg('кто?'));
  }

  // Удаление задачи
  async function remove(id) {
    const answer = await removeTask(id);
    if (!answer || answer.error) {
      return;
    }

    // используем фильтр для удаления задачи по id
    setTasks(tasks.filter(t => t.id !== id));
  }

  async function removeAllTask () {
    setTasks([]);
    
  }

  async function get_time () {

    const tic = await getTime();
    if (!tic || tic.error) {
      return;
    }
    setTime(JSON.stringify(tic))
    console.log(JSON.stringify(tic))
  }

  return (
    <>
      {/* <Header />
      <button className="btn-remove-all-task" onClick={removeAllTask}>Удалить все задачи</button> */}
      <button className="main" onClick={get_time}>Запросить данные с сайта timeapi.io о времни в Томске</button>
      <div  className="main">
        Данные: 
      </div>
      <div  className="main">
      {time} 
      </div>
      {/* <div className="main">
        <div className="new-task-block">
          <textarea value={text} placeholder='Добавьте задачу' onChange={changingValueTextArea}  className="ta"/>
          <button className="btn-add-task" onClick={addNewTask}>Добавить задачу</button>
        </div>
        <div className="task-block">
        <h1 className="tasks-block-heading">Список задач</h1>
          <Tasks tasks={tasks} onRemoveClick={remove} CheckedTask={Checked}/>
        </div>
      </div> */}
    </>
  );
}

export default App;