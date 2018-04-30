
///////////////////////////////////////////////////////////////////////////////
const createDom = (item) => {

  const myTaskDiv = document.createElement('div'),
    Title = document.createElement('h3'),
    Details = document.createElement('h5'),
    Time = document.createElement('h5');

  Title.innerHTML = item.title;
  Time.innerHTML = 'Time: ' + item.time;
  Details.innerHTML = 'Details: ' + item.details;

  myTaskDiv.appendChild(Title);
  myTaskDiv.appendChild(Details);
  myTaskDiv.appendChild(Time);

  document.querySelector('#home').appendChild(myTaskDiv);

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
  fetch('/api/tasks')
    .then(res => res.json()) // returns json
    .then(datas => {
      createDomTree(datas);
      createSelect(datas);
    });
}