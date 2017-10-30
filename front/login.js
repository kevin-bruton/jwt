async function login () {
  const username = document.querySelector('[name="username"]').value;
  const password = document.querySelector('[name="password"]').value;
  const data =`Username: ${username}; Password: ${password}`;
  const result = await xhr.post('auth', `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
  // sessionStorage.token = result.token;
  // sessionStorage.token && (document.getElementById('loginstatus').innerHTML = 'Logged in');

  result.token && (document.cookie = 'token=' + result.token);
  getCookie('token') && (document.getElementById('loginstatus').innerHTML = 'Logged in');
  console.log('Cookie after login', getCookie('token'));
}

function setLoginStatus () {
  document.getElementById('loginstatus').innerHTML = getCookie('token')
    ?  'Logged in' : 'Not logged in';
  console.log('Cookie in setLoginStatus', getCookie('token'));
}

async function getUsers () {
  const users = await xhr.get('api/users');
  document.getElementById('users').innerHTML = JSON.stringify(users);
}

async function createUser() {
<<<<<<< HEAD
  const result = await xhr.post('api/users/create', 'username=ben.christie&password=ben&admin=false');
=======
  const result = await xhr.post('api/users/create', {username: 'ben.christie',password: 'ben',admin:false});
>>>>>>> 25c8b8e09097d919c9e59eed0c3daef084ec0b16
  document.getElementById('users').innerHTML = JSON.stringify(result);
}

function logout () {
  // sessionStorage.token = false;
  deleteCookie('token');
  document.getElementById('loginstatus').innerHTML = 'Not logged in';
}

const xhr = {
  get: function (url) {
    return new Promise(function(resolve,reject){
      const HTTP_OK = 200, HTTP_UNAUTH = 401;
      let xhr = new XMLHttpRequest();
  
      xhr.open('GET', url);
      xhr.setRequestHeader("Authorization", 'Bearer ' + getCookie('token'));
      xhr.send();
      xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE && (xhr.status >= 200 && xhr.status < 400)) {
            resolve(JSON.parse(xhr.response));
        } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === HTTP_UNAUTH) {
            resolve({ error: `You're not authorized` });
        } else if (xhr.readyState === XMLHttpRequest.DONE) {
            resolve({ error: 'Http state: ' + xhr.status });
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
      xhr.setRequestHeader("Authorization", 'Bearer ' + getCookie('token'));
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

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  if (exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  } else {
    document.cookie = cname + "=" + cvalue + ";path=/";
  }
}

function deleteCookie (name) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}