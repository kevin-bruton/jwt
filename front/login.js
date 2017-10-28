async function login () {
  const username = document.querySelector('[name="username"]').value;
  const password = document.querySelector('[name="password"]').value;
  const data =`Username: ${username}; Password: ${password}`;
  console.log(data);
  const result = await xhr.post('http://localhost:3000/auth', `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
  sessionStorage.token = result.token;
  sessionStorage.token && (document.getElementById('loginstatus').innerHTML = 'Logged in');
  document.cookie = 'token=' + result.token;
  console.log(result);
}

function setLoginStatus () {
  document.getElementById('loginstatus').innerHTML = sessionStorage.token === 'false'
    ? 'Not logged in' : 'Logged in';
}

async function getUsers () {
  const users = await xhr.get('http://localhost:3000/api/users');
  document.getElementById('users').innerHTML = JSON.stringify(users);
}

function logout () {
  sessionStorage.token = false;
  document.getElementById('loginstatus').innerHTML = 'Not logged in';
}

const xhr = {
  get: function (url) {
    return new Promise(function(resolve,reject){
      const HTTP_OK = 200, HTTP_UNAUTH = 401;
      let xhr = new XMLHttpRequest();
  
      xhr.open('GET', url);
      xhr.setRequestHeader("x-access-token", sessionStorage.token);
      xhr.send();
      xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE && (xhr.status >= 200 && xhr.status < 400)) {
            resolve(JSON.parse(xhr.response));
        } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === HTTP_UNAUTH) {
            resolve({ error: `You're not authorized` });
        } else if (xhr.readyState === XMLHttpRequest.DONE) {
            resolve({ error: 'Unknown http state: ' + xhr.status });
        }
      };
    });
  },
  post: function (url, data) {
    return new Promise(function(resolve,reject){
       const HTTP_OK = 200, HTTP_UNAUTH = 401;
       let xhr = new XMLHttpRequest(),
          response;
  
      xhr.open('POST', url);
      xhr.setRequestHeader("x-access-token", sessionStorage.token);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(data);
      xhr.onreadystatechange = () => {
          if (xhr.readyState == XMLHttpRequest.DONE && (xhr.status >= 200 && xhr.status < 400)) {
              response = JSON.parse(xhr.response);
              resolve(response);
          } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === HTTP_UNAUTH) {
              resolve({ error: `You're not authorized` });
          } else if (xhr.readyState === XMLHttpRequest.DONE) {
              resolve({ error: 'Unknown http state: ' + xhr.status });
          }
      };
    });
  } 
};

