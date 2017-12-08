var $ = function (id) {

    const RECYCLE_BIN_ID = "recycleBin";
    const FULL_RECYCLE_BIN_IMG_PATH = "images/full.png";
    var recyleBin = document.getElementById(RECYCLE_BIN_ID);

    if (id) {

        // return a new $ object if scope is window
        if (window === this) {
            return new $(id);
        }

        var self = this;

        // find element by id
        self.obj = document.getElementById(id);

        // by default element is not clicked yet
        self.isClicked = false;

        // default init for cursor's click position on element (left-top)
        self.clickPositionOnDiv = {x: 0, y: 0};

        // adding listener on mousedown
        self.obj.addEventListener("mousedown", function (e) {
            var clickedElement = this;

            // if element is not draggable not add mosemove listener
            if (clickedElement.draggable === false) return;

            // set $ element isClicked true if it's draggable
            self.isClicked = true;

            // calculate postion of cursor relative to the clicked element
            self.clickPositionOnDiv.x = e.clientX - clickedElement.offsetLeft;
            self.clickPositionOnDiv.y = e.clientY - clickedElement.offsetTop;

            // without this browser doesn't allow to fire 'mouseup' event
            event.preventDefault();

            document.addEventListener("mousemove", mousemoveHandler);
            document.addEventListener("mouseup", mouseupHandler);

            function mousemoveHandler(e) {
                // if element is clicked then update its coordinates according to mouse move
                if (self.isClicked) {
                    // subtracting e.g.clickPositionOnDiv.x from mouse coordinates, for positioning the cursor to the exact place where occurs mousedown, not to the top-left of the clicked element
                    // here self is $ element
                    self.style({
                        "left": e.clientX - self.clickPositionOnDiv.x + "px",
                        "top": e.clientY - self.clickPositionOnDiv.y + "px"
                    });
                }
            }

            function mouseupHandler(e) {
                // if mouseup after mousedown, then the element no more updates its position on mousemove
                self.isClicked = false;

                // if selected element is not a recycle bin
                if (self.obj !== recyleBin) {

                    // checking if mouseup is on recyleBin element or not
                    if (e.target === recyleBin) {
                        // remove element
                        clickedElement.parentNode.removeChild(clickedElement);
                        // change recycle bin image to be full
                        recyleBin.setAttribute("src", FULL_RECYCLE_BIN_IMG_PATH);
                    }
                }

                // on mouseup event removing evenetListeners for mousemove and mouseup
                document.removeEventListener("mousemove", mousemoveHandler);
                document.removeEventListener("mouseup", mouseupHandler);
            }

            return clickedElement;
        });

        return self;
    } else {
        return "not valid selector";
    }
};

$.prototype = {
    setDraggable: function (state) {
        this.obj.draggable = state;
        return this;
    },
    style: function (styleParams) {
        for (key in styleParams) {
            this.obj.style[key] = styleParams[key];
        }
        return this;
    }
};




$("myDiv").style({
    "border": "2px solid black",
    "width": "100px",
    "height": "100px",
    "top": "100px",
    "border-radius": "50%",
    "position": "absolute",
    "background-color": "yellow"
})
    .setDraggable(true);

$("myDiv1").style({
    "border": "2px solid black",
    "width": "100px",
    "height": "100px",
    "left": "100px",
    "top": "300px",
    "border-radius": "50%",
    "position": "absolute",
    "background-color": "pink"
})
    .setDraggable(true);

$("myDiv2").style({
    "border": "2px solid black",
    "width": "100px",
    "height": "100px",
    "top": "500px",
    "border-radius": "50%",
    "position": "absolute",
    "background-color": "blue"
})
    .setDraggable(true);

$("myDiv3").style({
    "border": "2px solid black",
    "width": "100px",
    "height": "100px",
    "left": "600px",
    "top": "300px",
    "border-radius": "50%",
    "position": "absolute",
    "background-color": "grey"
})
    .setDraggable(true);

$("myDiv4").style({
    "border": "2px solid black",
    "width": "100px",
    "height": "100px",
    "left": "400px",
    "top": "100px",
    "border-radius": "50%",
    "position": "absolute",
    "background-color": "red"
})
    .setDraggable(true);

$("myDiv5").style({
    "border": "2px solid black",
    "width": "100px",
    "height": "100px",
    "left": "800px",
    "top": "40px",
    "border-radius": "50%",
    "position": "absolute",
    "background-color": "green"
})
    .setDraggable(true);

$("recycleBin").style({
    "width": "100px",
    "height": "100px",
    "left": "700px",
    "top": "500px",
    "position": "absolute"
})
    .setDraggable(true);

