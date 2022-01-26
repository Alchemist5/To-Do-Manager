const input = document.querySelector('#to-do-input');
const btn = document.querySelector('.btn');
const toDoList = document.querySelector
('.to-do-list');
const listItems = document.querySelector('.list-items');
const listItem = document.querySelectorAll('.list-item')
const deleteBtn = document.querySelector('.fa');
const clearBtn = document.querySelector('button');

// window.onload = () => {
//     if(localStorage.getItem('Tasks') !== null) {
//         tasks = JSON.parse(localStorage.getItem('Tasks'));

//         tasks.forEach(item => {
//             listItems.innerHTML += `
                
//                     <li class= "list-item">${item} <i class="fa fa-times 2x"></i></li>
                
//             `
//         })
//     }
    
// }

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('Tasks') !== null) {
                tasks = JSON.parse(localStorage.getItem('Tasks'));
        
                tasks.forEach(item => {
                    listItems.innerHTML += `
                        
                            <li class= "list-item">${item} <i class="fa fa-times 2x"></i></li>
                        
                    `
                })
            }
            
})

btn.addEventListener('click', () => {

    if(input.value !== '') {
        const li = document.createElement('li');
        li.className = 'list-item';
        li.appendChild(document.createTextNode(input.value));

        const icon = document.createElement('i');
        icon.className = 'fa fa-times 2x';
        li.appendChild(icon);
        listItems.appendChild(li);

        addTasksToLocalStorage();

        input.value = ''
    
    } else {
        alert('Please enter a task')
    }
    
   
});

function addTasksToLocalStorage() {
    let tasks;
    if(localStorage.getItem('Tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('Tasks'))
    }

    tasks.push(input.value)

    localStorage.setItem('Tasks', JSON.stringify(tasks))
    alert('Task saved')
}

listItems.addEventListener('click', (e) => {
    // e.target == deleteBtn ? e.target.parentElement.remove() : false;
    if(e.target.className === 'fa fa-times 2x') {

        if(confirm('Are you sure?')) {
            e.target.parentElement.remove();
            console.log(e.target.previousSibling);
            UpdateLocalStorage(e.target.previousSibling);
        }
    
    }

    
})

function UpdateLocalStorage(deletedItem) {
    let tasks;
    if(localStorage.getItem !== null) {
        tasks = JSON.parse(localStorage.getItem('Tasks'))
    } else {
        tasks = []
    }

    tasks.forEach(function(task,index) {
        // deletedItem.textContent === task ? tasks.splice(index,1) : false;
        if(deletedItem.textContent === task) {
            tasks.splice(index,1) 
        }
    });

    localStorage.setItem('Tasks', JSON.stringify(tasks))
}

document.querySelector('#filter').addEventListener('keyup', (e) => {
    const text = e.target.value.toLowerCase();
    // console.log(text);
    document.querySelectorAll('.list-item').forEach(item => {
       const task = item.firstChild.textContent
       console.log(task);
    if(task.toLowerCase().indexOf(text) != -1) {
        item.style.display = 'block'
    } else {
        item.style.display = 'none'
    }
   })
})

clearBtn.addEventListener('click', () => {
    // listItems.innerHTML = '';

    while(listItems.firstChild) {
        listItems.removeChild(listItems.firstChild)
    }

    // localStorage.clear();
    localStorage.removeItem('Tasks')

    window.location.reload();
})