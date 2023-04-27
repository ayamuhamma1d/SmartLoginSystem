var span = document.getElementById("showName")

display()

function display() {
    var loggedUser = JSON.parse(localStorage.getItem("userLogin"));
    console.log(loggedUser);
    span.innerHTML = ` ${loggedUser}`;

}