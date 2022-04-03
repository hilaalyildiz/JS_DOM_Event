//UI vars

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

loadItems();

// call event listeners
eventListeners();
function eventListeners(){
    // submit event 
    form.addEventListener('submit',addNewItem);

    // delete an item 
    taskList.addEventListener('click',deleteItem);

    // delete all items 
    btnDeleteAll.addEventListener('click',btnDeleteAllItems);
}

function loadItems(){
    items = getItemsFromLS();
    items.forEach(function(item){
        createItem(item);
    })
}

function getItemsFromLS(){
    if(localStorage.getItem('items')===null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

// set ıtem to local storage
function setItemToLS(text){
    items=getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON,stringify(items));
}

function createItem(text){
     // create li 
     const li = document.createElement('li');
     li.className='list-group-item list-group-item-secondary';
     li.appendChild(document.createTextNode(text));
     
     // create a 
     const a = document.createElement('a');
     a.classList= 'delete-item float-right';
     a.setAttribute('href','#');
     a.innerHTML='<i class="fas fa-times"></i>';
 
     // add a to li 
     li.appendChild(a)
 
     // add li to ul
     taskList.appendChild(li);
 
}

// add new item 
function addNewItem(e){
    e.preventDefault();

    if(input.value ==='')
    {
        alert('add new item');
    }

    //create item
    createItem(input.value);
   
    // sabe to local storage
    setItemToLS(input.value);

    // clear input 
    input.value='';

}

// delete an item 
function deleteItem(e){
    if(e.target.className === 'fas fa-times'){
        e.target.parentElement.parentElement.remove();
    }

    e.preventDefault();
}

function deleteAllItems(e){
    if(confirm('Are you sure?')){
        taskList.childNodes.forEach(function(item){
            if(item.nodeType===1){
               item.remove();
            }
        });
    }
    e.preventDefault();
}