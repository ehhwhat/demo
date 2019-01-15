console.log("%c basic.js CALLED", "padding:15px;margin:5px;color: #333;border-left:5px solid green;");

window.onload = function(){

    // HOISTING
    // TEST START
    // FUNCTION WILL TAKE TWO PARAMETERS.
    // IF THE NUMBER OF PASSENGERS AND CAPACITY ARE EQUAL
    // WE SHOW ONE MESSAGE, IF THEY ARE NOT WE SHOW A
    // DIFFERENT ONE.
    function capacityStatus(numPassengers, capacity) {
        document.getElementById("capacityStatusResult").innerHTML = "";
        const noSeats = function(){
            document.getElementById("capacityStatusResult").innerHTML += "<span class='text-danger'><i class='fa fa-exclamation-triangle' aria-hidden='true'></i> Full up!</span>";
            return false;
        };
        const someSeats = function(){
            document.getElementById("capacityStatusResult").innerHTML += "<span class='text-success'><i class='fa fa-info-circle' aria-hidden='true'></i> There are <strong>" + (capacity - numPassengers) + "</strong> seats left.</span>";
            return true;
        };
        if(parseInt(numPassengers) >= parseInt(capacity)){
            // Call this
            noSeats();
        } else {
            // Call this
            someSeats();
        }
    }

    document.getElementById('capacityStatusSubmit').onclick = function(event) {
        event.preventDefault();
        let input1 = document.getElementById('capacityStatusInput1').value;
        let input2 = document.getElementById('capacityStatusInput2').value;
        capacityStatus(input1,input2);
    };


    // TEST START
    var countChar = function(string,letter) {
        document.getElementById("countCharResult").innerHTML = "";
        let letterCount = 0;
        for(var i = 0; i < string.length; i++){
            if(string.charAt(i).toUpperCase() == letter.toUpperCase()){
                letterCount++;
            }
        }
        document.getElementById("countCharResult").innerHTML += "There are <strong>" + letterCount + " " + letter + "'s</strong> in the sentence: <br/><small>" + string + "</small>";
        return letterCount;
    };

    document.getElementById('countCharSubmit').onclick = function(event) {
        event.preventDefault();
        let input1 = document.getElementById('countCharInput1').value;
        let input2 = document.getElementById('countCharInput2').value;
        countChar(input1,input2);
    };

};
