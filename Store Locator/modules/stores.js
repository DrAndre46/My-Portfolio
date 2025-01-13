import { refreshMarkers } from "./markers.js";
import { getMap } from "./map.js";

const storeListContainer = document.querySelector('#stores-list');
let stores = [];

// Funzione per importare gli stores
function setStores(storesList) {
  stores = storesList;
}

let filterParams = {
  category: 'all',
  searchTerm: ''
}

function setFilter(filter, value) {
  updateFilterParam(filter, value);
  let filteredStores = applyFilter();
  updateStoreList(filteredStores);
  let map = getMap();
  refreshMarkers(map, filteredStores)
}

function updateFilterParam(filter, value) {
  filterParams = {
    ...filterParams,
    [filter]: value
  }
}

function applyFilter() {
  let filteredStores = stores;
  if(filterParams.category !== 'all') {
    filteredStores = filteredStores.filter(
      store => store.categories.includes(filterParams.category)
    );
  }
  if(filterParams.searchTerm !== '') {
    filteredStores = filteredStores.filter(
      store => 
        store.name.toLowerCase().includes(filterParams.searchTerm) || 
        store.address.toLowerCase().includes(filterParams.searchTerm)
    )
  }
  return filteredStores;
}

/* MODIFICHE AL DOM */
function updateStoreList(stores) {
  storeListContainer.innerHTML = '';
  stores.forEach(store => {
    let storeDetailsContainer = document.createElement('div');
    storeDetailsContainer.classList.add('store');
    storeDetailsContainer.addEventListener('click', () => {
      console.log('zoom sulla mappa');
    });
  
    let name = document.createElement('h3');
    name.textContent = store.name;
    let address = document.createElement('p');
    address.textContent = store.address;
    let email = document.createElement('p');
    email.textContent = store.email;
    let phone = document.createElement('p');
    phone.textContent = store.phone;
    let link = document.createElement('a');
    link.textContent = 'Directions';
    link.href = `https://www.google.com/maps?saddr=My+Location&daddr=${store.coords.lat},${store.coords.lng}`;
    link.target = '_blank';
    storeDetailsContainer.appendChild(name);
    storeDetailsContainer.appendChild(address);
    storeDetailsContainer.appendChild(phone);
    storeDetailsContainer.appendChild(email);
    storeDetailsContainer.appendChild(link);
    storeListContainer.appendChild(storeDetailsContainer);
  })
}

export {setStores, updateStoreList, setFilter}