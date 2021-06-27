let filterColours = {
    red : 'rgb(141, 36, 62)',
    green: 'rgb(29, 99, 29)',
    blue: 'rgb(25, 81, 119)',
    grey: 'rgb(83, 79, 79)'
};

let allFilters = document.querySelectorAll('.colours div');
let botColor = document.querySelector('.bottom');
let createBox = document.querySelector('.create');


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
                                <div class="red bot-box"></div>
                                <div class="green bot-box"></div>
                                <div class="blue bot-box"></div>
                                <div class="grey bot-box"></div>
                            </div>
                            `
    
    bottomDiv.querySelector('.main-text').addEventListener('click', resetText);
    botColor.append(bottomDiv);
    
}

// function to reset the text inside the box
function resetText(e){
    if(e.target.getAttribute("data-typed") == "True"){
        return;
    }
    e.target.innerHTML = "";    // e.target.setAttribute("data_typed","False");
    e.target.setAttribute("data-typed", "True");
}


