import ApiStore from './ApiStore'
let PinStore = []

function getPins(){
    let targetUrl = ApiStore + '/api/santa/81335057-1944-4e9c-9c06-83d1d7ba5167';
    fetch(targetUrl)
      .then(response => response.json())
      .then(data => {
        PinStore.push(data)
      }).catch(error => alert('Sorry the service is down \n:(\nPlease try again later'));
  }

  getPins()

  export default PinStore