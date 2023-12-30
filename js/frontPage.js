//----------- click on nav bar to scroll func ------------

//grab our navbar items that have links to somewhere else in page
let navbarElementsArray = document.querySelectorAll('.navbar a');
// Add scroll to elements in navbarArray
navbarElementsArray.forEach(addScroll);

//function that adds scroll to certain in page
function addScroll(docQ) {
    //add event listern
    docQ.addEventListener('click', function(e) {
        //override html behavior with this, prevent its defualt funct
        e.preventDefault();
        //grab our target, the href 
        var target = this.getAttribute("href");
        document.querySelector(target).scrollIntoView({
            //make the scroll smooth and scroll to the end 
            behavior : "smooth",
            block : "center",
        })
    })
}

//---------make about section texts pop out when clicked-------------

var tabLinks = document.querySelectorAll('.tabLinks');
var tabContents = document.querySelectorAll('.tabContent');

//function that changes HTML so that tab is displayed and underlined
function openTab(tabName) {
    //check if button is already clicked
    var alreadyClicked = (document.querySelector(tabName).classList[1] == "active");

    tabLinks.forEach(link => link.classList.remove("active"));
    tabContents.forEach(content => content.classList.remove("active"))
    //if not already clicked, we display underline and text
    if (!alreadyClicked) {
        event.currentTarget.classList.add("active");
        document.querySelector(tabName).classList.add("active");
    }
}

//---------make project sections turn up when hovered------------
var projectSections = document.querySelectorAll('.scrollBarSection');

//will make fully opaque
function revealFully(projectName) {
    var hoveredProject = document.querySelector(projectName).classList;
    hoveredProject.add("active");
}

//reset to default where translucent
function hide(projectName) {
    var unhovered = document.querySelector(projectName).classList;
    unhovered.remove("active");
}