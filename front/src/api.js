// import { useState } from "react";

// 

export default async function getTime() {
  return await api('get_time', {
    undefined
  });
}

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

