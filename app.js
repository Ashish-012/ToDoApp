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


// open the middle box when the plus button is clicked
createBox.addEventListener('click', createBoxFunc);

for(let i = 0; i< allFilters.length; i++){
    allFilters[i].addEventListener('click', chooseColor)
}

function chooseColor(e){
    let chosenColor = e.target.classList[0];
    botColor.style.backgroundColor = filterColours[chosenColor];
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
                            Enter your task here.
                            </div>
                            <div class = 'main-color'>
                                <div class="bot-box red active-filter"></div>
                                <div class="bot-box green"></div>
                                <div class="bot-box blue"></div>
                                <div class="bot-box grey"></div>
                            </div>
                            `
    
    bottomDiv.querySelector('.main-text').addEventListener('click', resetText);
    bottomDiv.querySelector('.main-text').addEventListener('keypress', keyPressed);
    let botColors = bottomDiv.querySelectorAll('.bot-box');
    for(let i = 0; i< botColors.length; i++){
        botColors[i].addEventListener('click', changeColor);
    }
    
    botColor.append(bottomDiv);
    
}

function keyPressed(e){
    
    if(e.key == "Enter"){
        console.log(e); 

        
        let typedData = e.target.innerText;
        let newNote = document.createElement('div');
        
        newNote.classList.add("notes");
        newNote.innerHTML = `<div class = "notesColor ${activeFilter}"></div>
                            <div class = "notesId">#S@mple</div>
                            <div class = "notesText">${typedData}</div>`;
        
        e.target.parentNode.remove();
        botColor.append(newNote);
        activeFilter = "red";
    }
}


function changeColor(e){
    selectedFilter = e.target.classList[1];
    if(activeFilter == selectedFilter){
        return;
    }
    activeFilter = selectedFilter;
    document.querySelector(".active-filter").classList.remove('active-filter');
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


