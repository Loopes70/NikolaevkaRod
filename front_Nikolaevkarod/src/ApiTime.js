
 
  export default async function getTime() {
    return await api('get_time');
  }
  
  async function api() {
    
    try {
      const resp = await fetch(`https://www.timeapi.io/api/Time/current/zone?timeZone=Asia/Tomsk`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json; charset=utf-8',
          'Content-Type': 'application/json; charset=utf-8',
        },
        // mode: 'no-cors',
      });
      const answer = await resp.json();
      return JSON.stringify(answer);
    } catch (er) {
      console.log(er);
      alert(`Ошибка: ${er.message}`);
      return null;
    }
  }
  
  