console.log("%c ajax-json.js CALLED", "padding:15px;margin:5px;color: #333;border-left:5px solid aqua;");

$('.demo1').on('click',function(){

    // Start by emptying the existing content so pulled data isn't duplicated
    // Hide all demo containers and then show this one.
    $('#injectHere').empty();
    $(this).attr('disabled','disabled').addClass('disabled');
    $('.demo-container').css('display','none');
    $('#demoOneContainer').css('display','block');

    $.getJSON("http://ehhwhat.co.uk/testing/json/goodreadsJSON.json", function (data) {
        let dataLength = data.length;

        // The each function takes two parameters
        // The first is the collection we want to iterate through
        // The second is a function that is going to be called on each object
        $.each(data, function (i, item) {
            if(i >= 1 ) {
                setTimeout(function() {
                    $('#demoOneContainer .booksnumber').html(i);
                    $("<div class='col-6 col-sm-4 col-md-3 col-lg-3'>" +
                        "<div class='card c012-card my-5 animated fadeIn'>" +
                            "<img class='card-img-top' src='"+data[i].FIELD32+"' />" +
                            "<div class='card-header'>" +
                                "<h3 class='h3-responsive'>"+data[i].FIELD3+"</h3>" +
                            "</div>" +
                            "<div class='card-body'>" +
                                "<p>" + data[i].FIELD2 + "</p><p>" + data[i].FIELD8 + " stars</p>" +
                            "</div>" +
                            "<div class='card-footer'>" +
                                "<p class='my-0'>"+data[i].FIELD15+" | <small>"+data[i].FIELD1+"</small></p>" +
                            "</div>" +
                        "</div>" +
                    "</div>").prependTo('#injectHere');
                }, 50 * i);
            }
        });

        setTimeout(function() {
            $('#progress1').slideUp('slow');
        }, (dataLength * 50));


    });
});

$('.demo2').on('click',function(){

    // Start by emptying the existing content so pulled data isn't duplicated
    // Hide all demo containers and then show this one.
    $('#records_table3 thead').empty();
    $('#records_table3 tbody').empty();
    $(this).attr('disabled','disabled').addClass('disabled');
    $('.demo-container').css('display','none');
    $('#demoTwoContainer').css('display','block');

    $.getJSON("http://ehhwhat.co.uk/testing/json/goodreadsJSON.json", function (data) {
        let dataLength = data.length;

        $('<tr>').html("<td>" + data[0].FIELD1 + "</td><td>" + data[0].FIELD2 + "</td><td>" + data[0].FIELD3 + "</td><td>" + data[0].FIELD8 + "</td><td>" + data[0].FIELD15 + "</td>").appendTo('#records_table3 thead');

        $.each(data, function (i, item) {
            if(i >= 1) {
                setTimeout(function() {
                    $('#demoTwoContainer .booksnumber').html(i);
                    $('<tr class="animated fadeIn">').html("<td>" + data[i].FIELD1 + "</td><td>" + data[i].FIELD2 + "</td><td>" + data[i].FIELD3 + "</td><td>" + data[i].FIELD8 + "</td><td>" + data[i].FIELD15 + "</td>").prependTo('#records_table3 tbody');
                }, 50 * i);
            }
        });

        setTimeout(function() {
            $('#progress2').slideUp('slow');
        }, (dataLength * 50));

    });

});

$('.demo3').on('click',function(){

    // Start by emptying the existing content so pulled data isn't duplicated
    // Hide all demo containers and then show this one.
    $('#demo3 ul').empty();
    $(this).attr('disabled','disabled').addClass('disabled');
    $('.demo-container').css('display','none');
    $('#demoThreeContainer').css('display','block');

    $.getJSON("http://ehhwhat.co.uk/testing/json/goodreadsJSON.json", function (data) {
        let dataLength = data.length;

        $.map(data, function(item, i){
            if(i >= 1) {
                setTimeout(function() {
                    $('#demoThreeContainer .booksnumber').html(i);
                    var itemWrapper = $('<li class="list-inline-item animated fadeIn">' + data[i].FIELD2 + ' <span class="text-secondary">&bull;</span></li>');
                    $('#demo3 ul').append(itemWrapper);
                    return itemWrapper;
                }, 50 * i);
            }
        });

        setTimeout(function() {
            $('#progress3').slideUp('slow');
        }, (dataLength * 50));

    });

});
