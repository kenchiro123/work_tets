function loadTable() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/foods");
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var trHTML = ''; 
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        trHTML += '<tr>'; 
        trHTML += '<td>'+object['id']+'</td>';
        trHTML += '<td><img width="50px" src="'+object['avatar']+'" class="avatar"></td>';
        trHTML += '<td>'+object['foodname']+'</td>';
        trHTML += '<td>'+object['count_food']+'</td>';
        trHTML += '<td>'+object[ 'date']+'</td>';
        trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox('+object['id']+')">Edit</button>';
        trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete('+object['id']+')">Del</button></td>';
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}
loadTable();



function showrepordCreateBox() {
  var trHTML = ''; 
  trHTML += '<td>'+object['id']+'</td>';
  trHTML += '<td><img width="50px" src="'+object['avatar']+'" class="avatar"></td>';
  trHTML += '<td>'+object['foodname']+'</td>';
  trHTML += '<td>'+object['count_food']+'</td>';
  trHTML += '<td>'+object['date']+'</td>';
  trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox('+object['id']+')">Edit</button>';
  trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete('+object['id']+')">Del</button></td>';
  trHTML += "</tr>";
  Swal.fire({
    
    title: 'Create food',
    html: 'You can use <b>bold text</b>, ' +
    '<a href="//sweetalert2.github.io">links</a> ' +
    'and other HTML tags'
    
    
  })
}

function showUserCreateBox() {
  Swal.fire({
    title: 'Create food',
    html:
      '<input id="id" class="swal2-input" placeholder="ID อาหาร">' +
      '<input id="foodname" class="swal2-input" placeholder="ชื่ออาหาร">' +
      '<input  type="number" id="count_food" class="swal2-input" style="margin-top: 0.5rem; font-size: 1.6rem; placeholder="จำนวนอาหาร">' +
      '<input type="date"id="date" class="swal2-input" style="margin-top: 0.5rem; font-size: 1.6rem; placeholder="วันที่สั่งอาหาร">' +
      '<input id="avatar" class="swal2-input" placeholder="รูปอาหาร">',
    focusConfirm: false,
    preConfirm: () => {
      userCreate();
    }
  })
}


function userCreate() {
  const id = document.getElementById("id").value;
  const foodname = document.getElementById("foodname").value;
  const count_food = document.getElementById("count_food").value;
  const date = document.getElementById("date").value;
  const avatar = document.getElementById("avatar").value;
    
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/foods/create");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    "id": id, "foodname": foodname, "count_food": count_food, "date": date, "avatar": avatar
  }));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    }
  };
}


function userDelete(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:3000/foods/delete");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    "id": id
  }));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    } 
  };
}

function showUserEditBox(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/foods/"+id);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      const food = objects['food'];
      console.log(food);
      Swal.fire({
        title: 'Edit food',
        html:
          '<input id="id" class="swal2-input" placeholder="First" value="'+food['id']+'" disabled>' +
          '<input id="foodname" class="swal2-input" placeholder="First" value="'+food['foodname']+'">' +
          '<input type="number" id="count_food" class="swal2-input" placeholder="Last" value="'+food['count_food']+'">' +
          '<input type="date" id="date" class="swal2-input" placeholder="Username" value="'+food['date']+'">' +
          '<input id="avatar" class="swal2-input" placeholder="Avatar" value="'+food['avatar']+'">',
        focusConfirm: false,
        preConfirm: () => {
          userEdit();
        }
      })
    }
  };
}

function userEdit() {
  const id = document.getElementById("id").value;
  const foodname = document.getElementById("foodname").value;
  const count_food = document.getElementById("count_food").value;
  const date = document.getElementById("date").value;
  const avatar = document.getElementById("avatar").value;
    
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:3000/foods/update");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    "id": id, "foodname": foodname, "count_food": count_food, "date": date,"avatar": avatar
  }));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    }
  };
}
