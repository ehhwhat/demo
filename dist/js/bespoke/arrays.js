console.log("%c arrays.js CALLED", "padding:15px;margin:5px;color: #333;border-left:5px solid green;");

window.onload = function(){

    // Needed for the date picker
    //$('#weightDate').pickdate({max: true,min: -10});

    // Create a fake array of data
    let weightArray = [];

    // Create a function so we can fire the data grab on page load and on a button click
    function getData() {
        // Use a for loop to iterate through each of the array items for as long as the length of the array
        // Find specific element in DOM and add the required HTML.
        // Conversion of data to change weight. Use math.round to remove decimals.
        for(let i = 0; i < weightArray.length; i++) {
            const weightInKG = weightArray[i][1];
            const weightInPounds = Math.round(weightInKG * 2.2);
            document.getElementById("weightTableBody").innerHTML += "<tr><td>" +weightArray[i][0]+ "</td><td>" +weightArray[i][1]+ "</td><td>" +weightInPounds+ "</td></tr>";
        }
    }

    // Create click event.
    // Start by removing the HTML inside our table body, basically resetting the table.
    // Get the 2 new values and push to our already existing nested array
    // Fire our getData() function again which will now use the updated array items
    document.getElementById('weightSubmit').onclick = function(event) {
        event.preventDefault();
        document.getElementById("weightTableBody").innerHTML = "";
        let newWeightDate = document.getElementById("weightDate").value;
        let newWeight = Math.round(parseInt(document.getElementById("weightInput").value));
        weightArray.push([newWeightDate,newWeight]);
        getData();
    };

    // On window load fire our getData() function
    window.onload = function() {
        getData();
    };




    let favBooksArray = [];

    // WHEN USER CLICKS BUTTON
    // START BY EMPTYING TABLE AND CODE BLOCK SO WE DONT REPEAT ENTRIES
    // GRAB VALUES FOR BOOK TITLE AND BOOK SCORE
    // PUSH TO ARRAY
    // ITERATE THROUGH ARRAY 1 BY 1
    // UPDATE HTML FOR TABLE AND CODE BLOCK TO SHOW UPDATED ARRAY ITEMS
    // PASS NESTED ARRAY ITEM AT INDEX 0 TO ONE PLACE
    // PASS NESTED ARRAY ITEM AT INDEX 1 TO ANOTHER
    // FINISH BY CLEARING THE TWO BOOK INPUTS

    document.getElementById('bookSubmit').onclick = function(event) {
        event.preventDefault();
        document.getElementById("tableBody").innerHTML = "";
        document.getElementById("code").innerHTML = "";
        let newBook = document.getElementById('bookInput').value;
        let newBookScore = document.getElementById('bookReviewInput').value;
        favBooksArray.push([newBook,newBookScore]);
        for (let i = 0; i < favBooksArray.length; i++) {
            document.getElementById("tableBody").innerHTML += "<tr><td>"+favBooksArray[i][0]+"</td><td>"+favBooksArray[i][1]+"</td></tr>";
            document.getElementById("code").innerHTML +="The value in cell " + i + " is " + favBooksArray[i]+"<br/>";
        }

        // Empty values to allow another book to be added
        document.getElementById("bookInput").value = "";
        document.getElementById("bookInput").focus();
        document.getElementById("bookReviewInput").value = "";

    };


};
