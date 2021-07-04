

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
    wStatus = document.createElement('button'),
    goInside = document.createElement('button'),
    myStatus = document.createElement('button');
    

  myTaskDiv.className = 'card-body text-center';
  Title.innerHTML = item.title;
  Time.innerHTML = 'Time: ' + moment(item.time).format("DD-MM-YYYY");
  Details.innerHTML = 'Details: ' + item.details;
  goInside.innerHTML = 'Go Inside';
  myStatus.innerHTML = 'Done';
  wStatus.innerHTML = '';
  wStatus.style.backgroundColor = "red";
  wStatus.style.width= "100%";

  myTaskDiv.appendChild(Title);
  myTaskDiv.appendChild(wStatus);
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

  goInside.addEventListener('click', (e) => {
    document.getElementById('modal').style.display = "block";
    document.getElementById('title').innerHTML = item.title;
    document.getElementById('details').innerHTML = 'Details: ' + item.details;
  })

  myStatus.addEventListener('click', (e) => {
    wStatus.style.backgroundColor = "green";
  })

  document.getElementById('cancel').addEventListener('click', () => {
    document.getElementById('modal').style.display = "none";
  });

  const deleteF = document.getElementById('delete');

  // delete function for deleting 
  const tryDel = (e) => {
    e.preventDefault();
    console.log(deleteF.dataset.id)
    fetch('/tasks/'+deleteF.dataset.id, {
      method: 'DELETE'
    }).then(() => {
      window.location.href= '/users/undone';
    })
  }

  //deletebutton and s stying
  deleteF.addEventListener('click', tryDel);
  deleteF.setAttribute('data-id', item._id);
  deleteF.style.backgroundColor = "#e0596b";
  deleteF.style.width = '100%';

}

///////////////////////////////////////////////////////////////////////////////
const createDomTree = (jsons) => {
  for (let json of jsons) {
    createDom(json);
  }
}