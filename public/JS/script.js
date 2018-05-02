//getting user details 
// const myUser = document.querySelector('#myUser').value;
// console.log(myUser);

// const getData = '/api' + myUser;
//////////////////////////////////////////////////////////////////////////////
//fetching from json
fetch('/api')
  .then(res => res.json()) // returns json
  .then(datas => {
    createDomTree(datas);
  });

///////////////////////////////////////////////////////////////////////////////
const createDom = (item) => {

  const myTaskDiv = document.createElement('div'),
    Title = document.createElement('h2'),
    Details = document.createElement('h4'),
    Time = document.createElement('h4'),
    goInside = document.createElement('button');

  myTaskDiv.className = 'card-body text-center';
  Title.innerHTML = item.title;
  Time.innerHTML = 'Time: ' + item.time;
  Details.innerHTML = 'Details: ' + item.details;
  goInside.innerHTML = 'View';

  myTaskDiv.appendChild(Title);
  myTaskDiv.appendChild(Details);
  myTaskDiv.appendChild(Time);
  myTaskDiv.appendChild(goInside);

  document.querySelector('#home').appendChild(myTaskDiv);

  // Empty row div before inserting the filtered values
  const createEmptyDom = (data) => {
    data.innerHTML = '';
  };
}

///////////////////////////////////////////////////////////////////////////////
const createDomTree = (jsons) => {
  for (let json of jsons) {
    createDom(json);
  }
}