var orig_data = [];
function press() {
  if (firstInput()) display();
  else console.log("DATA error");
}
function firstInput() {
  let pid = document.getElementById("pid").value.toUpperCase();
  let pname = document.getElementById("pname").value;
  let pprice = document.getElementById("pprice").value;
  data = { id: pid, name: pname, price: pprice };
  console.log("Got data");
  console.log(data);
  afterdelete(); 
  if (Unique(data)) {
    orig_data.push(data);
  } else {
    console.log("error");
    return true;
  }
  return true;
}
function Unique(data) {
  console.log("check unique");
  if (orig_data.length < 1) {
    return true;
  }
  for (let i of orig_data) {
    console.log(i);
    if (i["id"] == data["id"]) {
      console.log("Duplicate data");
      console.log(data);
      console.log(i);
      return false;
    }
  }
  return true;
}
function display() {
  let table = document.getElementById("out_table");
  table.innerHTML = `<tr>
  <th class="text_right">Product ID</th>
  <th>Product Name</th>
  <th>Product Price</th>
</tr>`;
  for (let i = 0; i < orig_data.length; i++) {
    newItem = `<tr>
    <td class="text_right">${orig_data[i]["id"]}</td>
    <td>${orig_data[i]["name"]}</td>
    <td>USD ${orig_data[i]["price"]}</td>
    <td><a href="#" onclick="edit(${orig_data[i]["id"]})">Edit</a></td>
    <td><a href="#" onclick="del(${orig_data[i]["id"]})">Delete</a></td>
    </tr>`;
    table.innerHTML += newItem;
  }
}
function edit(id) {
  console.log("Editing " + id);
  let curr;
  for (let i = 0; i < orig_data.length; i++) {
    if (orig_data[i]["id"] == id) {
      curr = orig_data[i];
    }
  }
  document.getElementById("pid").value = curr["id"];
  document.getElementById("pid").readOnly = true;
  document.getElementById("pname").value = curr["name"];
  document.getElementById("pprice").value = curr["price"];
  document.getElementById("update_button").hidden = false;  
  document.getElementById("add_button").hidden = true;     
}
function delete(id) {
  console.log("Deleting " + id);
  temp = [];
  for (let i = 0; i < orig_data.length; i++) {
    if (orig_data[i]["id"] != id) {
      temp.push(orig_data[i]);
    }
  }
  orig_data = temp; 
  display();
}
function update(id) {
  let pid = document.getElementById("pid").value.toUpperCase();
  let pname = document.getElementById("pname").value;
  let pprice = document.getElementById("pprice").value;
  data = { id: pid, name: pname, price: pprice };
  for (let i = 0; i < orig_data.length; i++) {
    if (orig_data[i]["id"] == pid) {
      orig_data[i]["name"] = pname;
      orig_data[i]["price"] = pprice;
    }
  }
  document.getElementById("update_button").hidden = true;
  document.getElementById("add_button").hidden = false;
  document.getElementById("pid").readOnly = false;
  display();
  afterdelete();
}
function afterdelete() {
  document.getElementById("pid").value = "";
  document.getElementById("pname").value = "";
  document.getElementById("pprice").value = "";
}s
