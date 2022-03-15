const sendData = (body, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts');

  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  xhr.addEventListener('load', () => {
    const data = JSON.parse(xhr.response);
    callback(data);
  });

  xhr.addEventListener('error', () => {
    console.log('error');
  });

  xhr.send(JSON.stringify(body));
};

export default sendData;
