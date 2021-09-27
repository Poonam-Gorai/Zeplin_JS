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
  for (let i = 0; i < tablevalue.length; i++) {
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

//debounce

function debounce(func, timeout = 1000){
  let timer;
  return (...args) => {
  clearTimeout(timer);
  timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
  }
  const waitForInput = debounce(() => filterNames());


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
  // direction modifier - checking if asc or not
  const dirModifier = asc ? 1 : -1;
  // tbody in case we have many tbody in a html
  const tBody = table.tBodies[0];
  // The data into array form list
  const rows = Array.from(tBody.querySelectorAll("tr"));

  // sort each row
  const sortedRows = rows.sort((a, b) => {
    //console.log(a);
    //console.log(b);
    //get the text content from the column
    const aColText = a.querySelector("td").textContent.trim();
    const bColText = b.querySelector("td").textContent.trim();

    //console.log(aColText);
    //console.log(bColText);

    // if td1 > td2 then 1 times direction Modifier to remain same and if not then -1 times the direction modifier for desending
    return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
  });

  //   Remove all the existing trs from the table
  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  //Re-adding the newly sorted rows
  tBody.append(...sortedRows);

  //   Remember how the column is currently sorted.
  table.querySelectorAll("th").forEach((th) => th.classList.remove("th-sort-asc", "th-sort-desc"));
  //   class toggle between
  table.querySelector("th").classList.toggle("th-sort-asc", asc);
  table.querySelector("th").classList.toggle("th-sort-desc", !asc);
}

let Sort = document.getElementById("sorting");
// adding event listener
Sort.addEventListener("click", function () {
 
  let tableElement = document.querySelector("table");
  let checkOrder = document.getElementsByTagName("th")[0];
  let currentIsAscending = checkOrder.classList.contains("th-sort-asc");
  
  sortTableByGroupName(tableElement, 1, !currentIsAscending);
});


