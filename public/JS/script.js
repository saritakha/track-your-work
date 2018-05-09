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
    Title = document.createElement('h1'),
    Details = document.createElement('h4'),
    Time = document.createElement('h4'),
    goInside = document.createElement('button'),
    myStatus = document.createElement('button');

  myTaskDiv.className = 'card-body text-center';
  Title.innerHTML = item.title;
  Time.innerHTML = 'Time: ' + item.time;
  Details.innerHTML = 'Details: ' + item.details;
  goInside.innerHTML = 'Go Inside';
  myStatus.innerHTML = 'Done';

  myTaskDiv.appendChild(Title);
  myTaskDiv.appendChild(Details);
  myTaskDiv.appendChild(Time);
  myTaskDiv.appendChild(goInside);
  myTaskDiv.appendChild(myStatus);

  document.querySelector('#home').appendChild(myTaskDiv);

  myStatus.addEventListener('click', () => {
    document.querySelector('#done').appendChild(myTaskDiv);
  });

  //////////////////////////////////////////////////////////////////////////
  // add event listeners to the buttons
  const modal = document.createElement('div'),
  mTitle = document.createElement('h1'),
  mDetails = document.createElement('h4'),
  x = document.createElement('button'),
  mTime = document.createElement('h4');

  mTitle.innerHTML = item.title;
  mTime.innerHTML = Time;
  mDetails.innerHTML = Details;
  
  modal.appendChild(mTitle);
  modal.appendChild(mDetails);
  modal.appendChild(mTime);
  modal.appendChild(x);

  myTaskDiv.appendChild(modal);

  goInside.addEventListener('click', (e) => {
    modal.style.display = "block";
  })

  x.addEventListener('click', () => {
    modal.style.display = "none";
  });
}

///////////////////////////////////////////////////////////////////////////////
const createDomTree = (jsons) => {
  for (let json of jsons) {
    createDom(json);
  }
}