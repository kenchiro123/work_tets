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
        // trHTML += '<td><img width="50px" src="'+object['avatar']+'" class="avatar"></td>';
        trHTML += '<td>'+object['date']+'</td>';
        trHTML += '<td>'+object['foodname']+'</td>';
        trHTML += '<td>'+object['count_food']+'</td>';
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}
loadTable();

