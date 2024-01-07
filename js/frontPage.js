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
if (!isTouchDevice()) {
    var projectSections = document.querySelectorAll('.scrollBarSection');

    //will make fully opaque
    function revealFully(projectName) {
        var hoveredProject = document.querySelector(projectName).classList;
        hoveredProject.add("active");
    }

    //reset to default where translucent
    function hide(projectName) {
        var unhovered = document.querySelector(projectName).classList;
        var projImg = document.querySelector(projectName).querySelector('#projImg');
        unhovered.remove("active");
        //readd transDuration for nice looks
        projImg.style.transitionDuration ="0.3s";
    }

    //--------make proj img follow mouse -------
    projectSections.forEach(sect => sect.addEventListener('mousemove', function(e) {
        //get our projImg to edit its css and the left & top of mouse
        var projImg = sect.querySelector('#projImg');

        //abs pos of cursor in website
        let left = e.offsetX;
        //mouse pos rel to container
        let top = e.offsetY;

        //rel position of element within parent container
        var rectTop = sect.offsetTop;

        var yPos = top + rectTop;

        //handle edge case where child container comes in contact with mouse
        if (e.target != sect) {
            top = e.offsetY + e.target.offsetTop;
            yPos = top;
            left = e.offsetX + e.target.offsetLeft;
        }

        //edge case if we are at last element, we restrict that the image extends the overflow 
        var lastSection = document.querySelector('#portfolio');
        //conditional to see if image has no gone into over flow
        if ((sect == lastSection) && (yPos + projImg.offsetHeight + 20 > lastSection.offsetTop + lastSection.offsetHeight)) {
            //we then get the difference the image is leaking past the total height of the scrollbar to get its proper pos
            var diffy = (yPos + projImg.offsetHeight + 10) - (lastSection.offsetTop + lastSection.offsetHeight);
            yPos = yPos-diffy;
        }

        //add to css
        projImg.style.left = left + 10 + 'px';
        projImg.style.top = yPos + 10 + 'px';
        //remove transDuration so image doesn't lag everywhere
        projImg.style.transitionDuration = "0s";
    })) 
}

//---------funct to detect mobile --------
function isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0));
  }