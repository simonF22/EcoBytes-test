var firebaseConfig = {
  apiKey: "AIzaSyAx63lb5EgtLPCWlBHj3hSsv_tKERPF0MU",
  authDomain: "ecobytes-64eb4.firebaseapp.com",
  databaseURL: "https://ecobytes-64eb4-default-rtdb.firebaseio.com",
  projectId: "ecobytes-64eb4",
  storageBucket: "ecobytes-64eb4.appspot.com",
  messagingSenderId: "155345838376",
  appId: "1:155345838376:web:a18e15b3d798dfa965b01d",
  measurementId: "G-QFDQXG9TX5"
};

firebase.initializeApp(firebaseConfig);


// // ------------------------------------------------



      // display restaurants on customer homepage
const server = "https://ecobytes-64eb4-default-rtdb.firebaseio.com";
      
async function sendRequest(url, method, data){
  const options = {method};
  if(data){
    options.body = JSON.stringify(data);
    options.headers = {'Content-Type':'application/json'};
  }
  let response = await fetch(url, options);
  return response.json();
}


function convertObject(obj){
  let arr = [];
  if(obj === 'null'){
    return arr;
  }
  obj = JSON.parse(JSON.stringify(obj));
  for(let [key, val] of Object.entries(obj)){
    val.id = key;
    arr.push(val);
  }
  return arr;
}

// send request to restaurant_info
async function getRestaurants(){
  let restaurant = await sendRequest(`${server}/restaurant_info.json`, 'GET');
  restaurant = convertObject(restaurant);
  displayRestaurants(restaurant);
}

// renders all restaurants on the page
function displayRestaurants(restaurant){
let result = document.querySelector('#restaurantList'); 
result.innerHTML = '';

let html = '';
  for(let r of restaurant){  
    html += `
    <a href="selectedRestaurant.html?restid=${r.id}" class="card restaurant-card teal lighten-4">
      <div class="card-image restaurant-card-image">
        <img src="${r.logo} alt="${r.name}" title="${r.name}">
      </div>
      <div class="card-content">
        <h5>${r.name}</h5>
        <p><i class="tiny material-icons">local_dining</i>&nbsp Cuisine: ${r.cuisine}</p>
        <p><i class="tiny material-icons">pin_drop</i>&nbsp Address: ${r.address}, ${r.city}</p>
        <p><i class="tiny material-icons">access_time</i>&nbsp Closing Time: ${r.closing_time} </p>
        <p id="restId" style="display:none">${r.id}</p>
      </div>
    </a>      
    `;
  }
result.innerHTML = html; 
}

let result = document.querySelector('#restaurantList');
if (result){
  result.addEventListener ('load', getRestaurants());
}
