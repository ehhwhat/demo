console.log("%c objects.js CALLED", "padding:15px;margin:5px;color: #333;border-left:5px solid green;");



    // AN OBJECT
    // With some key:value properties and a method to change color
    const cubeObject = {
        width:50,
        length:50,
        height:50,
        name:"Box",
        color:"black",
        changeColor: function(color){
            this['color'] = color;
        },
        changeSize: function(size){
            this['width'] = size;
            this['length'] = size;
            this['height'] = size;
        }
    };

    // Lets print these to the page
    document.getElementById("basicResult").innerHTML += "<span id='basicResultSize'>Show me this objects size: " +cubeObject.width+ " x " +cubeObject.length+ " x " +cubeObject.height+ "</span><br/>";
    document.getElementById("basicResult").innerHTML += "<span id='basicResultColor'>Show me this objects color: " +cubeObject.color+ "</span>";

    // Function to fire when input changes
    // Grab values chosen by user and update object
    // Build styles using values from the object
    function buildCube() {
        console.log('changed');
        // Color
        let newColor = document.getElementById("colorPicker").value;
        cubeObject.changeColor(newColor);
        document.getElementById("basicResultColor").innerHTML = "Show me this objects color: " +cubeObject.color+"";

        // Size
        let newSize = document.getElementById("sizePicker").value;
        cubeObject.changeSize(newSize);
        document.getElementById("basicResultSize").innerHTML = "Show me this objects color: " +cubeObject.width+ " x " +cubeObject.length+ " x " +cubeObject.height+ "";

        // Build cube
        document.getElementById("cube").setAttribute("style","width:"+(cubeObject.width * 2)+"px;");
        document.getElementById("back").setAttribute("style","transform: translateZ(-"+cubeObject.width+"px) rotateY(180deg); background-color: "+cubeObject.color+"!important; width:"+(cubeObject.width * 2)+"px;height:"+(cubeObject.width * 2)+"px;");
        document.getElementById("right").setAttribute("style","transform: rotateY(-270deg) translateX("+cubeObject.width+"px); background-color: "+cubeObject.color+"!important; width:"+(cubeObject.width * 2)+"px;height:"+(cubeObject.width * 2)+"px;");
        document.getElementById("left").setAttribute("style","transform: rotateY(270deg) translateX(-"+cubeObject.width+"px); background-color: "+cubeObject.color+"!important; width:"+(cubeObject.width * 2)+"px;height:"+(cubeObject.width * 2)+"px;");
        document.getElementById("top").setAttribute("style","transform: rotateX(-90deg) translateY(-"+cubeObject.width+"px); background-color: "+cubeObject.color+"!important; width:"+(cubeObject.width * 2)+"px;height:"+(cubeObject.width * 2)+"px;");
        document.getElementById("bottom").setAttribute("style","transform: rotateX(90deg) translateY("+cubeObject.width+"px); background-color: "+cubeObject.color+"!important; width:"+(cubeObject.width * 2)+"px;height:"+(cubeObject.width * 2)+"px;");
        document.getElementById("front").setAttribute("style","transform: translateZ("+cubeObject.width+"px); background-color: "+cubeObject.color+"!important; width:"+(cubeObject.width * 2)+"px;height:"+(cubeObject.width * 2)+"px;");

        document.getElementById("wrap").setAttribute("style","height:"+(cubeObject.width * 3)+"px;");
    }


