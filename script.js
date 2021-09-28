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

function debounce(func, timeout = 1000) {
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



// pagination

//get table element
let tableElement = document.querySelector("table");
// tbody in case we have many tbody in a html
let tableBody = tableElement.tBodies[0];
// The data into array form list
let tr = Array.from(tableBody.querySelectorAll("tr"));
//get ul element
let ul = document.querySelector("ul");
//pushing all the elements from tr to arrayTr for further processing
let arrayTr = [];
for (let i = 1; i < tr.length; i++) {
  arrayTr.push(tr[i]);
}

//limit has been set to five so it will show only 5 elements at a time
let limit = 5;

//displaying table element till its limit
function displayTable(limit) {
  tableBody.innerHTML = "";
  for (let i = 0; i < limit; i++) {
    tableBody.appendChild(arrayTr[i]);
  }

  buttonGereration(limit);
}


function buttonGereration(limit) {
  const noftr = arrayTr.length;
  if (noftr <= limit) {
    ul.style.display = "none";
  } else {
    ul.style.display = "flex";
    //no of page = no of table row/limit
    let nofPage = Math.ceil(noftr / limit);
    //at first it will show page 1 as default
    updatepage(1);

    for (let i = 1; i <= nofPage; i++) {
      let li = document.createElement("li");
      li.className = "list";
      let a = document.createElement("a");
      a.href = "#";
      a.setAttribute("data-page", i);
      a.setAttribute("id", i);
      a.setAttribute("class", "activeClass");
      li.appendChild(a);
      a.innerText = i;
      ul.insertBefore(li, document.getElementById("tableList").childNodes[3]);
      a.onclick = (e) => {
        let x = e.target.getAttribute("data-page");
        //onclick the page will get updated
        updatepage(x);
        a.classList.add("active");
        tableBody.innerHTML = "";
        x--;
        let start = limit * x;
        let end = start + limit;
        let page = arrayTr.slice(start, end);

        for (let i = 0; i < page.length; i++) {
          let item = page[i];
          tableBody.appendChild(item);
        }
      };
    }
  }
  // showing count
  let z = 0;
  function nextElement() {
    if (this.id == "nextId") {
      //console.log(z);
      z == arrayTr.length - limit ? (z = 0) : z / limit + 1 == nofPage ? z : (z += limit);
      //console.log("next",z);
    }
    if (this.id == "prevId") {
      //console.log(z);
      z == 0 ? arrayTr.length - limit : (z -= limit);
      console.log("pre",z);
    }
    //update the page according to z value
    updatepage(z / limit + 1);
    tableBody.innerHTML = "";
    for (let i = z; i < z + limit; i++) {
      if (arrayTr[i] != null) {
        tableBody.appendChild(arrayTr[i]);
      } else {
        break;
      }
    }
  }

  document.getElementById("prevId").onclick = nextElement;
  document.getElementById("nextId").onclick = nextElement;
}

displayTable(5);

// goto

function onChangeGoToPage(go) {
  var noftr = arrayTr.length;
  var nofPage = Math.ceil(noftr / limit);
  console.log(go, nofPage);
  //if statement for if the pageno is valid then goto otherwise so invalid in console
  if (go <= nofPage && go > 0) {
    var goto = go - 1;
    updatepage(go);

    if (nofPage < goto) {
      console.log("invalid go to");
      return;
    }
    let offset = goto * limit;
    tableBody.innerHTML = "";
    for (let i = offset; i < offset + limit; i++) {
      if (arrayTr[i] != null) {
        tableBody.appendChild(arrayTr[i]);
      } else {
        break;
      }
    }
  }
}

const GoToPage = debounce((go) => onChangeGoToPage(go));

function updatepage(go) {

  let spanvalue1 = document.getElementById("goto_lower");
  spanvalue1.textContent = (go * limit + 1 - limit);

  let spanvalue2 = document.getElementById("goto_upper");
  spanvalue2.textContent = (go * limit);

}