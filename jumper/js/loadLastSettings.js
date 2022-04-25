// script for loading last values saved in local storage for name, character and shot

if (localStorage.getItem("nickname")) {
    document.getElementById("nickname").value = localStorage.getItem("nickname");
}

switch (localStorage.getItem("character")) {
    case 'blue':
        document.getElementById("character2").setAttribute("checked", "checked");
        break;
    case 'red':
        document.getElementById("character3").setAttribute("checked", "checked");
        break;
    case 'green':
        document.getElementById("character4").setAttribute("checked", "checked");
        break;
}

switch (localStorage.getItem("shot")) {
    case 'blue':
        document.getElementById("shot2").setAttribute("checked", "checked");
        break;
    case 'red':
        document.getElementById("shot3").setAttribute("checked", "checked");
        break;
    case 'green':
        document.getElementById("shot4").setAttribute("checked", "checked");
        break;
}