// import { useState } from "react";

export async function getTime() {
  return await api('get_time', {
    undefined
  });
}

export async function addTask(text) {
  return await api('add_task', {
    text: text,
  });
}

export async function removeTask(id) {
  return await api('remove_task', {
    id,
  });
}

export async function changeTaskStatus(id, completed) {
  return await api('change_task_status', {
    id,
    completed,
  });
}

export default async function getTasks() {
  return await api('get_tasks', undefined);
}
//

async function api(action, body) {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const resp = await fetch(`http://localhost:13532/${action}`, options);
    const answer = await resp.json();
    return answer;
  } catch (er) {
    console.log(er);
    alert(`Ошибка: ${er.message}`);
    return null;
  }
}

