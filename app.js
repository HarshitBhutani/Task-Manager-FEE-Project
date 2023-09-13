const bodyEle = document.querySelector("body");
const submitDetails = document.querySelector("#submit-details");
showTasks();


// ==================SUBMIT TASK BUTTON =======================
submitDetails.addEventListener('click', function(e){
    let taskDetails = document.getElementById('input');
    let taskDate = document.getElementById('date');
    let taskDateValue= document.getElementById('date').value;
    let taskCategory = document.getElementById('category');

    let tasks = localStorage.getItem('tasks');
    if(tasks == null){
        tasksObj = [];
    }
    else{
        tasksObj = JSON.parse(tasks);
    }
    let currDate = new Date();
    let userDate = new Date(taskDateValue);
    let diff = (Math.floor((userDate-currDate) / (1000 * 60 * 60 * 24)));
    let mystatus ="Pending";
    console.log("diff: " , diff);
    if((userDate < currDate) || diff < 0){
        mystatus ="Overdue";
    }else{
        mystatus = "Pending";
    }
    let myObj = {
        taskText: taskDetails.value,
        taskDate: taskDate.value,
        taskCategory: taskCategory.options[taskCategory.selectedIndex].text,
        status: mystatus,
    }
    tasksObj.push(myObj)
    localStorage.setItem("tasks", JSON.stringify(tasksObj))
    
    taskDetails.value = ""
    // addTitleBox.value = ""
    console.log(tasksObj);
    e.preventDefault();
    showTasks();
})



// func to show elements from local storage
function showTasks(){
    let tasks = localStorage.getItem('tasks')
    if(tasks == null){
        tasksObj = [];
    }
    else{
        tasksObj = JSON.parse(tasks);
    }
    let html = `
    <tr id="table-headings">
    <th style="width:50%">Task</th>
    <th style="width: 30%;">Deadline</th> 
    <th style="width: 30%;">Category</th>
    <th style="width: 30%;">Status</th>
    <th style="width: 30%;"></th>
    <th style="width: 30%;"></th>
  </tr>         
    `;
    tasksObj.forEach(function(element, index){
    //     html+= `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
    //     <div class="card-body">
    //         <h5 class="card-title"> ${element.title}</h5>
    //         <p class="card-text"> ${element.text}</p>
    //         <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
    //     </div>
    // </div>
    //     `
    
    html +=`
         <tr class="${element.status} ${element.taskCategory}" id="row-${element.tasktext}" >
                           <td>${element.taskText}</td>
                           <td>${element.taskDate}</td>
                           <td>${element.taskCategory}</td>
                           <td>${element.status}</td>
                           <td><button class="btn btn-lg btn-success" id="${index}" onclick="completeTask(this.id)"><i class="fa fa-check-circle" aria-hidden="true"></i></button></td>
                           <td><button class="btn btn-danger" id="${index}" aria-label="Delete" onclick="deleteTask(this.id)"><i class="fa fa-trash-o" aria-hidden="true"></i></button></td>
                         </tr>`;
    })
    let table = document.getElementById('table')
    if(tasksObj.length!=0){
        table.innerHTML = html;
    }
    else{
        table.innerHTML += `nothing to show! Add a Task please`
    }

    const heading2 = document.getElementById("heading2");
    // const h3 = `${tasksObj.length}`;
    heading2.innerHTML= `Your tasks <br> ${tasksObj.length}`;
}



//func to delete a note
function deleteTask(index){
    console.log('I am deleting', index);
    let tasks = localStorage.getItem('tasks')
    if(tasks == null){
        tasksObj = [];
    }
    else{
        tasksObj = JSON.parse(tasks);
    }
    tasksObj.splice(index, 1)   //removes 1 element starting frm index1
    localStorage.setItem("tasks", JSON.stringify(tasksObj))
    showTasks()
}
function completeTask(index){
    let tasks = localStorage.getItem('tasks')
    if(tasks== null){
        tasksObj = [];
    }
    else{
        tasksObj = JSON.parse(tasks);
    }
    if(tasksObj[index].status==="Pending" || tasksObj[index].status==="Overdue"){
        tasksObj[index].status = "Completed";
        console.log(`task ${index} changed to "complete`);
    }
    localStorage.setItem("tasks", JSON.stringify(tasksObj));
    showTasks()
}


// //SEARCH
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    // const dataTable = document.getElementById("table").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    const tableRows = document.getElementById("table").getElementsByTagName("tr");

    searchInput.addEventListener("keyup", function () {
        const searchText = searchInput.value.toLowerCase();

        for (let i = 1; i < tableRows.length; i++) {
            const rowData = tableRows[i].getElementsByTagName("td");
            let rowMatchesSearch = false;

            // for (let j = 0; j < rowData.length; j++) {
            //     const cellData = rowData[j].textContent.toLowerCase();
            //     if (cellData.includes(searchText)) {
            //         rowMatchesSearch = true;
            //         break;
            //     }
            // }
            const cellData = rowData[0].textContent.toLowerCase();
            if(cellData.includes(searchText)){
                rowMatchesSearch = true;
            }

            tableRows[i].style.display = rowMatchesSearch ? "" : "none";
        }
    });
});

// =============================FILTER Function====================================================

document.addEventListener("DOMContentLoaded", function () {
    const filterCategory = document.querySelector("#filterCategory");
    // const categoryChosen = category.options[category.selectedIndex].text;
    // filterCategory.addEventListener('change', filterItemsByCategory(filterCategory));
    filterCategory.addEventListener('change', function(){
        const category = document.getElementById("filterCategory").value;
    // const categoryChosen = category.options[category.selectedIndex].text;
    const tableRows = document.querySelector("#table").querySelectorAll("tr");

    for(let i=1; i< tableRows.length; i++){
        if((category===""  || category==="All Categories")){
            console.log("inside break");
            break;
        }
        console.log(`classlist:  ${tableRows[i].classList}`);
        // console.log("category chosen" + categoryChosen);
        console.log("category:" + category);
        if(tableRows[i].classList.contains(category)){
            console.log("inside do nothing");
            tableRows[i].style.display = "";
        }
        else{
            console.log("change display");
            tableRows[i].style.display = "none";
        }
    }
    });

})



//==============SORT FUNCTION======================
document.addEventListener('DOMContentLoaded', function () {
  
    const sortSelect = document.getElementById('sort');
    sortSelect.addEventListener('change', ()=> {
        const sortBy = sortSelect.value ;
        console.log("sort func called");
        console.log(sortBy);
        // sortTable(sortBy);
        const table = document.getElementById('table');
        const rows = Array.from(table.querySelectorAll('tr:not(:first-child)')); 
      
        rows.sort(function (a, b){
          if (sortBy === 'Date') {
            // console.log("sorting by date");
            // console.log(a);
            // console.log(b);
            // console.log("b :" + b.querySelector('td:nth-child(2)'));
            // console.log(`error:  ${a.querySelector('td:nth-child(2)').textContent}`);
            // console.log(`error:  ${b.querySelector('td:nth-child(2)').textContent}`);
    
            const dateA = a.querySelector('td:nth-child(2)').textContent;
            const dateB = b.querySelector('td:nth-child(2)').textContent;
            console.log(`cl: ${(a.querySelector('td:nth-child(2)').textContent).localeCompare(b.querySelector('td:nth-child(2)').textContent)}`);
            return dateA.localeCompare(dateB);
          } else if (sortBy === 'Category') {
            console.log("sorting by category");
            const categoryA = a.querySelector('td:nth-child(3)').textContent;
            const categoryB = b.querySelector('td:nth-child(3)').textContent;
            return categoryA.localeCompare(categoryB);
          } else if (sortBy === 'Status') {
            console.log("sorting by status");
            const statusA = a.querySelector('td:nth-child(4)').textContent;
            const statusB = b.querySelector('td:nth-child(4)').textContent;
            return statusA.localeCompare(statusB);
          }
        });
      
        table.innerHTML = `<tr id="table-headings">
        <th style="width:50%">Task</th>
        <th style="width: 30%;">Deadline</th> 
        <th style="width: 30%;">Category</th>
        <th style="width: 30%;">Status</th>
        <th style="width: 30%;"></th>
        <th style="width: 30%;"></th>
      </tr>`; // Clear the table
        rows.forEach(row => table.appendChild(row));
      })
    });

  
