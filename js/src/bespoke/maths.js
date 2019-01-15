console.log("%c maths.js CALLED", "padding:15px;margin:5px;color: #333;border-left:5px solid green;");

window.onload = function(){

    function numberToSquareFunc(input){
        result = input * input;
        document.getElementById("numberToSquareResult").innerHTML += "<span class='text-success'>" +input+ "<sup>2</sup> = " +result+ ". </span>";
        return result;
    }

    document.getElementById('numberToSquareSubmit').onclick = function(event) {
        event.preventDefault();
        document.getElementById("numberToSquareResult").innerHTML = "Result: <span class='text-success'></span>";
        const value = document.getElementById('numberToSquare').value;
        numberToSquareFunc(value);
    };


    function numberToCubeFunc(input){
        result = input * input * input;
        document.getElementById("numberToCubeResult").innerHTML += "<span class='text-success'>" +input+ "<sup>3</sup> = " +result+ ". </span>";
        return result;
    }

    document.getElementById('numberToCubeSubmit').onclick = function(event) {
        event.preventDefault();
        document.getElementById("numberToCubeResult").innerHTML = "Result: <span class='text-success'></span>";
        const value = document.getElementById('numberToCube').value;
        numberToCubeFunc(value);
    };


    function numberCalcFunc(input1, device, input2){
        result = input1 + device + input2;
        const answer = eval(result);
        document.getElementById("numberCalcResult").innerHTML += "<span class='text-success'>" +result+ " = " +answer+ ". </span>";
        return answer;
    }

    document.getElementById('numberCalcSubmit').onclick = function(event) {
        event.preventDefault();
        document.getElementById("numberCalcResult").innerHTML = "Result: <span class='text-success'></span>";
        const value1 = document.getElementById('numberOne').value;
        const value2 = document.getElementById('numberDevice').value;
        const value3 = document.getElementById('numberTwo').value;
        numberCalcFunc(value1, value2, value3);
    };

};
