const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
let tasks = require('./data.json');
// let time = require('./time.json');


const app = express();
app.use(cors());
app.use(bodyParser.json({strict: false}));

let nextId = getFirstId();

app.post('/get_tasks', (req, res) => {
  res.json(tasks);
});



app.post('/get_time', async (req, res) => {
 const apiTime = await api()
 res.json(apiTime)
console.log(apiTime)
});

app.post('/add_task', async (req, res) => {
  const body = req.body;
  const todo = {
    id: nextId,
    text: body.text,
    completed: false,
  };
  tasks.push(todo);
  await save();
  nextId++;
  res.json(todo);
});

app.post('/remove_task', async (req, res) => {
  const body = req.body;
  const id = body.id;

  tasks = tasks.filter(x => x.id !== id);
  await save();

  res.json({
    success: true,
  });
});

app.post('/change_task_status', async (req, res) => {
  const body = req.body;
  const {id, completed} = body;
  const t = tasks.find(x => x.id === id);
  if (!t) {
    res.json({
      error: `Задача с id = ${id} не найдена`,
    });
    return;
  }
  t.completed = completed;
  await save();
  res.json({
    success: true,
  });
});

const port = 13532;
app.listen(port, () => {
  console.log(`Бекенд успешно запущен на порту ${port}`);
});


function getFirstId() {
  let id = 0;
  for (const todo of tasks) {
    if (todo.id > id) {
      id = todo.id;
    }
  }
  return id + 1;
}

async function save() {
  const json = JSON.stringify(tasks);
  return await writeAsync('data.json', json);
}

function writeAsync(filePath, data) {
  return new Promise((res, rej) => {
    fs.writeFile(filePath, data, function(er) {
      if (er) {
        rej(er);
      } else {
        res();
      }
    });
  });
}

async function api() {
    
  try {
    const resp = await fetch(`https://www.timeapi.io/api/Time/current/zone?timeZone=Asia/Tomsk`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    const answer = await resp.json();
    console.log(answer)
    return answer;

  } catch (er) {
    console.log(er);
    alert(`Ошибка: ${er.message}`);
    return null;
  }
}