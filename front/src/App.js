import { useEffect, useState } from 'react';
import Header from './Header';
import getTime from './api';

function App() {

  const [time, setTime] = useState('----')

  useEffect(() => {
   // get_time();
  }, [])


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
      <Header />
      <div className="main">
        <div className="hi-box">
          <span>Создадим наше</span>
          <span>общее древо</span>
          <span>вместе</span>
        </div>
      </div>
    </>
  );
}

export default App;