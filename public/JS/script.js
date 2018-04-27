"use strict";

///////////////////////////////////////////////////////////////////////////////
const createDom = (item) => {
  // all the things are inside a div
  const gallery = document.createElement('div');
  const Title = document.createElement('h3');
  const cancel = document.createElement('button');
  const times = document.createElement('h5');
  const edit = document.createElement('button');

  Title.innerHTML = item.title;
  fullImage.style.backgroundColor= "#578bc6";
  fullImage.style.width = '100%';
  times.innerHTML = 'Time: ' + item.time;

  // delete function for deleting 
  const tryDel = (e) => {
    e.preventDefault();
    console.log(cancel.dataset.id)
    fetch(cancel.dataset.id, {
      method: 'DELETE'
    }).then(() => {
      window.location.href= '/';
    })
  }

  //deletebutton and s stying
  cancel.innerHTML = 'Delete';
  cancel.addEventListener('click', tryDel);
  cancel.setAttribute('data-id', item._id);
  cancel.style.backgroundColor = "#e0596b";
  cancel.style.width = '100%';

  //edit
  edit.innerHTML = 'Edit';
  edit.href = "/edit/"+item._id;
  edit.style.backgroundColor = "#6dbc7a";
  edit.style.width = '100%';

  edit.addEventListener('click', () => {
    window.location.href = "/update/"+item._id;

  });
  
  //style to image
  img.style.width = '100%';

  // adding all the child to parent
  gallery.appendChild(Title);
  gallery.appendChild(edit);
  gallery.appendChild(cancel);

  document.querySelector('#home').appendChild(gallery);

  //////////////////////////////////////////////////////////////////////////
  // add event listeners to the buttons
  const modal = document.querySelector('.modal');

  const x = document.querySelector('.cancel');
  x.addEventListener('click', () => {
    modal.style.display = "none";
  });
}

// Empty row div before inserting the filtered values
const createEmptyDom = (data) => {
  data.innerHTML = '';
};

///////////////////////////////////////////////////////////////////////
const createSelect = (jsons) => {
  //sorting by titile
  for (let item of jsons) {
    const selection = document.querySelector('.select');
    const option = document.createElement('option');
    option.text = item.title;
    selection.appendChild(option);

    selection.addEventListener('change', () => {
      const selected = selection.selectedIndex;
      let selectedValue = selection[selected].value;
      const filteredData = jsons.filter((item) => {
        if (selectedValue) {
          return item.title === selectedValue;
        } else {
          return true;
        }
      });
      const myContainer = document.querySelector('#home');
      createEmptyDom(myContainer);
      createDomTree(filteredData);
    });
  }
}

///////////////////////////////////////////////////////////////////////////////
const createDomTree = (jsons) => {
  for (let json of jsons) {
    createDom(json);
  }
}


//////////////////////////////////////////////////////////////////////////////
//fetching from json
fetch('/api')
  .then(res => res.json()) // returns json
  .then(datas => {
    createDomTree(datas);
    createSelect(datas);
  });

