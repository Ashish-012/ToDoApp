let filterColours = {
    red : 'rgb(141, 36, 62)',
    green: 'rgb(29, 99, 29)',
    blue: 'rgb(25, 81, 119)',
    grey: 'rgb(83, 79, 79)'
};

let allFilters = document.querySelectorAll('.colours div');
let botColor = document.querySelector('.bottom');
let createBox = document.querySelector('.create');

let activeFilter = "red";


function loadNotes(){
    botColor.innerHTML = "";
    if(localStorage.getItem('createdNotes')){
        let allNotes = JSON.parse(localStorage.getItem('createdNotes'));
        for(let i=0; i< allNotes.length; i++){
            let {activeFilter, uniqueId, typedData} = allNotes[i];
            let newNote = document.createElement('div');
            newNote.classList.add("notes");
            newNote.innerHTML = `<div class = "notesColor ${activeFilter}"></div>
                                <div class = 'notesTop'>
                                    <div class = "notesId">#${uniqueId}</div>
                                    <div class = "delete"><i class="fas fa-trash" id = "${uniqueId}"></i> </div>
                                </div>
                                <div class = "notesText">${typedData}</div>`;
            
            newNote.querySelector('.delete i').addEventListener('click', deleteThisNote);
            // botColor.style.backgroundColor = filterColours[chosenColor];
            botColor.append(newNote);
        }
        
    }
}

function deleteThisNote(e){
    if(document.querySelector('.active-filter')){
        document.querySelector('.active-filter').classList.remove('active-filter');
        
    }
    let noteId = e.target.id;
    let createdNotes = JSON.parse(localStorage.getItem('createdNotes'));
    let modifiedNotes = createdNotes.filter(function(noteObject){
        if(noteObject.uniqueId != noteId){
            return true;
        } 
    });
    localStorage.setItem('createdNotes', JSON.stringify(modifiedNotes));
    loadNotes();
}

// to load all the previously added notes from localstorage
loadNotes();

// open the middle box when the plus button is clicked
createBox.addEventListener('click', createBoxFunc);


for(let i = 0; i< allFilters.length; i++){
    allFilters[i].addEventListener('click', chooseColor)
}



function chooseColor(e){

    if(e.target.classList.contains('active-filter')){
        e.target.classList.remove('active-filter');
        loadNotes();
        return;
    }
    let chosenColor = e.target.classList[0];
    if(document.querySelector('.active-filter')){
        document.querySelector('.active-filter').classList.remove('active-filter');
        
    }
    e.target.classList.add('active-filter');

    if(localStorage.getItem('createdNotes')){
        let createdNotes = JSON.parse(localStorage.getItem('createdNotes'));
        let filterColor = e.target.classList[0];
        let filteredNotes = createdNotes.filter(function(notesObject){
            return notesObject.activeFilter == filterColor;
        })

        filterNotes(filteredNotes);
    }

    

}

function filterNotes(filteredNotes){
    botColor.innerHTML = "";
    for(let i=0; i< filteredNotes.length; i++){
        let {activeFilter, uniqueId, typedData} = filteredNotes[i];
        let newNote = document.createElement('div');
        newNote.classList.add("notes");
        newNote.innerHTML = `<div class = "notesColor ${activeFilter}"></div>
                            <div class = 'notesTop'>
                            <div class = "notesId">#${uniqueId}</div>
                            <div class = "delete"><i class="fas fa-trash" id = "${uniqueId}"></i> </div>
                            </div>
                            <div class = "notesText">${typedData}</div>`;
        newNote.querySelector('.delete i').addEventListener('click', deleteThisNote);
        botColor.append(newNote);
    }
}
// function to create main box  
function createBoxFunc(e){
    let modal = document.querySelector(".bottom-container");
    if(modal){
        return;
    }
    let bottomDiv = document.createElement("div");
    bottomDiv.classList.add("bottom-container");
    bottomDiv.innerHTML = ` <div class = 'main-text' contenteditable="true" data-typed = "False">
                            Enter your note here.
                            </div>
                            <div class = 'main-color'>
                                <div class="close"><i class="fas fa-times"></i> </div>
                                <div class="bot-box red active-filter"></div>
                                <div class="bot-box green"></div>
                                <div class="bot-box blue"></div>
                                <div class="bot-box grey"></div>
                            </div>
                            `
    
    bottomDiv.querySelector('.main-text').addEventListener('click', resetText);
    bottomDiv.querySelector('.main-text').addEventListener('keypress', createNote);
    bottomDiv.querySelector('.close i').addEventListener('click', closeMainBox);
    let botColors = bottomDiv.querySelectorAll('.bot-box');
    for(let i = 0; i< botColors.length; i++){
        botColors[i].addEventListener('click', changeColor);
    }
    
    botColor.append(bottomDiv);
}

function closeMainBox(e){
    e.target.parentNode.parentNode.parentNode.remove();
}

function createNote(e){
    
    if(e.key == "Enter"){ 
   
        let typedData = e.target.innerText;
        let newNote = document.createElement('div');
        let uniqueId = uid();

        newNote.classList.add("notes");
        newNote.innerHTML = `<div class = "notesColor ${activeFilter}"></div>
                            <div class = 'notesTop'>
                                <div class = "notesId">#${uniqueId}</div>
                                <div class = "delete"><i class="fas fa-trash" id = "${uniqueId}"></i> </div>
                            </div>
                            <div class = "notesText">${typedData}</div>`;
        
        e.target.parentNode.remove();
        botColor.append(newNote);

        if(!localStorage.getItem('createdNotes')){
            let createdNotes = [];
            let notesObject = {};
            notesObject.activeFilter = activeFilter;
            notesObject.uniqueId = uniqueId;
            notesObject.typedData = typedData;
            createdNotes.push(notesObject);

            localStorage.setItem('createdNotes', JSON.stringify(createdNotes));
        }
        else{
            let createdNotes = JSON.parse(localStorage.getItem('createdNotes'));
            let notesObject = {};
            notesObject.activeFilter = activeFilter;
            notesObject.uniqueId = uniqueId;
            notesObject.typedData = typedData;
            createdNotes.push(notesObject);

            localStorage.setItem('createdNotes', JSON.stringify(createdNotes));
        }
        activeFilter = "red";
        loadNotes();
    }
}


function changeColor(e){
    selectedFilter = e.target.classList[1];
    if(activeFilter == selectedFilter){
        return;
    }
    activeFilter = selectedFilter;
    document.querySelector(".bot-box.active-filter").classList.remove('active-filter');
    e.target.classList.add('active-filter');

}

// function to reset the text inside the box
function resetText(e){
    if(e.target.getAttribute("data-typed") == "True"){
        return;
    }
    e.target.innerHTML = "";    // e.target.setAttribute("data_typed","False");
    e.target.setAttribute("data-typed", "True");
}


