API состоит из 4 EndPoint'ов.
Все EndPoint'ы используют HTTP-метод POST.

1. Получить все задачи
/get_tasks

Запрос:
<пусто>

Ответ:
[
  {
    id: 1,
    text: "Поесть",
    completed: true
  },
  {
    id: 2,
    text: "Поспать",
    completed: false
  }
]

.\curl.exe -X POST 'http://localhost:13532/get_tasks'

2. Добавить новую задачу
/add_task

Запрос:
{
  text: "Play Football"
}

Ответ:
{
  id: 3,
  text: "Play Football",
  completed: false
}

.\curl.exe -X POST 'http://localhost:13532/add_task' -H 'Content-Type: application/json; charset=utf-8' -d '{\"text\": \"Play Football\"}'

3. Удалить задачу
/remove_task

Запрос:
{
  id: 1
}

Ответ:
{
  success: true
}

.\curl.exe -X POST 'http://localhost:13532/remove_task' -H 'Content-Type: application/json; charset=utf-8' -d '{\"id\": 1}'

4. Изменить статус выполненности
/change_task_status

Запрос:
{
  id: 1,
  completed: false
}

Ответ:
{
  error: 'Задача с id = 1 не найдена'
}
или
{
  success: true
}

.\curl.exe -X POST 'http://localhost:13532/change_task_status' -H 'Content-Type: application/json; charset=utf-8' -d '{\"id\": 1, \"completed\": false}'
