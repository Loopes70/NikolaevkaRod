

function wait(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000)
  });
}

export default async function displayMsg({msg}) {
  // msgEl.style.display = 'block';
  // await wait(3);
  // msgEl.style.display = '';
  return(
    <div className="msg">
      {msg}
    </div>
  )
}
