//Search bar

function filterNames() {

  //get input element
   let inputGroupName = document.getElementById("inputGroupName");
  //get values of input
   let filterValue = inputGroupName.value.toUpperCase();
  //get names
   let tablename = document.getElementById("names");
   let tablevalue = tablename.getElementsByTagName("tr");
  //loop through tablevalues
  for ( let i = 0; i < tablevalue.length; i++) {
    let td = tablevalue[i].getElementsByTagName("td")[0];
    if (td) {
      let txt = td.textContent;
      if (txt.toUpperCase().indexOf(filterValue) > -1) {
        tablevalue[i].style.display = "";
      } else {
        tablevalue[i].style.display = "none";
      }
    }
  }
}

//moving left and right

let ButtonRight = document.getElementById("scrollPageRight");
let ButtonLeft = document.getElementById("scrollPageLeft");

ButtonRight.onclick = function () {
  document.getElementById("selectGroupsId").scrollLeft += 50;
};
ButtonLeft.onclick = function () {
  document.getElementById("selectGroupsId").scrollLeft -= 50;
};

//sidebar
function showMenu() {
  let element = document.getElementById("sidebar");
  element.classList.toggle("hide");
}


//sorting

function sortTableByGroupName(table, column, asc = true) {
  // checking if asc or not
  const dirModifier = asc ? 1 : -1;
  // single tbody in case we have many tbody in a table
  const tBody = table.tBodies[0];
  // converts the data into arry form list
  const rows = Array.from(tBody.querySelectorAll("tr"));

  // sort each row
  const sortedRows = rows.sort((a, b) => {
    const aColText = a.querySelector("td").textContent.trim();
    const bColText = b.querySelector("td").textContent.trim();

    // if td1 > td2 then multiply by 1 to dirModifier to remain as it is and if not then multiply by -1 for desending
    return aColText > bColText ? 1 * dirModifier : -1 * dirModifier;
  });

  //   remove all the existing trs from the table
  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  //   Now adding trs back in the table after sorting
  tBody.append(...sortedRows);

  //   remember the sorting order
  table
    .querySelectorAll("th")
    .forEach((th) => th.classList.remove("th-sort-asc", "th-sort-desc"));
  //   toggle between the sort classes
  table.querySelector("th").classList.toggle("th-sort-asc", asc);
  table.querySelector("th").classList.toggle("th-sort-desc", !asc);
}

let whichSort = document.getElementById("sorting");
// calling the function on click to trigger the sorting
whichSort.addEventListener("click", function () {
  // gets the element to check which class is implemented on it
  let checkOrder = document.getElementsByTagName("th")[0];
  let currentIsAscending = checkOrder.classList.contains("th-sort-asc");
  let tableElement = document.querySelector("table");
  sortTableByGroupName(tableElement, 1, !currentIsAscending);
});


