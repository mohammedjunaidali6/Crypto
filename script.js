// Login page

function handle(e){
  if(e.keyCode === 13 ){
      btnClick("loginsubmit");
  }
}

// crypto page API fetch

const tbody = document.getElementById("bodydata");
var APIHIT = 1;
var hrArr = [];
var dayArr = [];
var weekArr = [];


const getBTC = async () => {

  fetch(new Request("https://api.livecoinwatch.com/coins/list"), {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
      "x-api-key": "a4c75585-1604-4b98-bfe0-f70811c62424",
    }),
    body: JSON.stringify({
      currency: "USD",
      sort: "rank",
      order: "ascending",
      offset: 0,
      limit: 100,
      meta: true,
    }),
  }).then(res => res.json()).then(data => {
      if(APIHIT === 1){
      var count = 0;
          
         data.forEach(e=>{
              tbody.innerHTML+=`
              <tr>
              <td>${e.rank}</td>
             <td><a href="https://coinmarketcap.com/currencies/${e.name}/">${e.name}</a></td>
              <td style="display:flex;"><img class="me-2" height="40px" width="40px" src="${e.png32}"><b style="font-size:13px;">${e.code}</b></td>
              <td>$${e.rate.toFixed(2)}</td>
              <td>$${(e.volume/1000000000).toFixed(2)} B</td>
              <td>$${(e.cap/1000000000).toFixed(2)} B</td>
              <td>${e.delta.hour.toFixed(3)}</td>
              <td>${e.delta.day.toFixed(3)}</td>
              <td>${e.delta.week.toFixed(3)}</td>
              </tr>

              `;
             
              hrArr[count] = e.delta.hour;
              dayArr[count] = e.delta.day;
              weekArr[count] = e.delta.week;

              count++;
        } )   
          APIHIT++;
          
      }
      
      else{
          var count = 0;
          data.forEach((e) =>{
            tbody.rows[count].getElementsByTagName("td")[3].innerText = `$${e.rate.toFixed(2)}`;
            tbody.rows[count].getElementsByTagName("td")[4].innerText = `$${(e.volume/1000000000).toFixed(2)} B`;
            tbody.rows[count].getElementsByTagName("td")[5].innerText = `$${(e.cap/1000000000).toFixed(2)} B`;
              
            if(hrArr[count] > e.delta.hour){
              tbody.rows[count].getElementsByTagName("td")[6].innerHTML = `<span style='color:red'><img src="./images/red-triangle-pointed-down_1f53b.png" height="9px" /> ${e.delta.hour.toFixed(3)}</span>`;
            }
            else{
              tbody.rows[count].getElementsByTagName("td")[6].innerHTML =  `<span style='color:green'><img src="./images/icons8-triangle-arrow-24.png" height="9px" /> ${e.delta.hour.toFixed(3)}</span>`;
            }

            if(dayArr[count] > e.delta.day){
              tbody.rows[count].getElementsByTagName("td")[7].innerHTML = `<span style='color:red'><img src="./images/red-triangle-pointed-down_1f53b.png" height="9px" /> ${e.delta.day.toFixed(3)}`;
            }
            else{
              tbody.rows[count].getElementsByTagName("td")[7].innerHTML = `<span style='color:green'><img src="./images/icons8-triangle-arrow-24.png" height="9px" /> ${e.delta.day.toFixed(3)}`;
            }
      
           if(weekArr[count] > e.delta.week){
               tbody.rows[count].getElementsByTagName("td")[8].innerHTML = `<span style='color:red'><img src="./images/red-triangle-pointed-down_1f53b.png" height="9px" /> ${e.delta.week.toFixed(3)}`;
           }
           else{
               tbody.rows[count].getElementsByTagName("td")[8].innerHTML = `<span style='color:green'><img src="./images/icons8-triangle-arrow-24.png" height="9px" /> ${e.delta.week.toFixed(3)}`;
           }
              
           count++;
          })
          APIHIT++;
      }
  });

}

setInterval(function () {
getBTC();
}, 1000);


// function ff(cp){
//   if(Math.round(cp)>=0){
//     return `<i class="fa-solid fa-caret-up"></i> ${cp}`;
//   }
//   else{
//     return `<i class="fa-solid fa-caret-down"></i> ${cp}`;
//   }
// }
  
// Search Functionality

function myFunction() {
  var input, filter, table, tr, td, i, txtValue, noResult;
  input = document.getElementById("searchbox");
  filter = input.value.toUpperCase();
  table = document.getElementById("bodydata");
  tr = table.getElementsByTagName("tr");


  noResult = document.querySelector('#noresults')

  let found  = false;


  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        found = true
      } else {
        tr[i].style.display = "none";
      }    
  }
  if(found){
    noResult.innerHTML=''
  } else {
    noResult.innerHTML='No Results Found'
  }
}
                   //Button Functionality  

function btnClick(id){
    if (id === "signup") {
      location.replace("./signup.html");
    }
    else if (id === "login") {
      location.replace("./login.html");
    }
    else if (id === "loginsubmit") {
      var password = document.getElementById("password").value;
      var email = document.getElementById("email").value;
  
      if (email == "ram@gmail.com" && password == "Ram@123") {
          location.replace("./index.html");
      } else {
          alert("Please enter valid username/password");
      }
    }
    else if (id === "cancel") {
      location.replace("./index.html");
    }
    else if (id === "signupsubmit") {
      alert("Please fill all the fields")
    }
}

// Filtering
function rangeclick(){

  var minValue = document.getElementById('minvalue').value;
  var maxValue = document.getElementById('maxvalue').value;

  if(parseInt(maxValue) < parseInt(minValue)){
    alert('second field must be big');
  }

  else if(minValue !='' && maxValue !=''){
  var noResult = document.querySelector('#noresults')
  let found  = false;
  

  var table = document.getElementById("bodydata");
  var tr = table.getElementsByTagName("tr");
  for(let i=0;i<table.rows.length;i++){
    tdPrice = tr[i].getElementsByTagName("td")[3].innerText;
    tdPrice=parseInt(tdPrice.slice(1,tdPrice.length));
  
    if((tdPrice >= minValue) && (tdPrice <= maxValue)){
      // console.log(tdPrice)
      tr[i].style.display = "";
        found = true;
      } else {
        tr[i].style.display = "none";
      }    
  }
  if(found){
    noResult.innerHTML=''
  } else {
    noResult.innerHTML='No Results Found'
  }
  
}

else{
  alert('Fill all the filelds');
}
}
// loading part

//   $(window).load(function(){
//     $("#loader").fadeOut(1000);
//   })


