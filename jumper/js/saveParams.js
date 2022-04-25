// function for storing picked values from base formular
function store(){
    let nickname = document.getElementById("nickname");
    let shots = document.getElementsByName("shot");
    let characters = document.getElementsByName("character");

    localStorage.setItem("nickname", nickname.value);

    // control which shot is checked and save it
    for(let i=0;i<shots.length;i++){
        if(shots[i].checked){
            localStorage.setItem("shot", shots[i].value); // marking the required radio as checked
        }
    }

    // control which character is checked and save it
    for(let i=0;i<characters.length;i++){
        if(characters[i].checked){
            localStorage.setItem("character", characters[i].value); // marking the required radio as checked
        }
    }
}