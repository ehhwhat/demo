console.log("%c ajax-static.js CALLED", "padding:15px;margin:5px;color: #333;border-left:5px solid aqua;");

// standard click event
$(".ajaxStaticData").click(function () {

    const buttonClicked = this;
    const buttonData = $(this).data('box');
    const parent = $(this).parent().parent();

    // then add .chip to show dynamic data attr from specific button
    parent.find('.card-footer').append(buttonData);

    // use ajax to grab this specific html file
    // if successful find this specific class and inject the html inside
    // also append the url for the .html file with 'queryString:' and then the data attr from the button clicked
    // wrapped in IF statement to demo what happens if file not found.

    if($(this).attr('id') === 'ajaxStaticData4') {
        let htmlFile = 'WILLNOTBEFOUND.html';
    } else {
        let htmlFile = 'ajax_data.html';
    }

    $.ajax(htmlFile, {
        context:buttonClicked,
        data: {"queryString": $(this).data('box')},
        timeout: 3000,
        success: function (response) {
            $(this).parent().parent().find('.inject-here').html(response).slideDown();
            $(this).remove();
        },
        // Error callback which takes a number of parameters
        error: function(request, errorType, errorMessage){
            console.log('Error: ' +errorType+ '. Reason: ' +errorMessage);
            $(this).parent().parent().removeClass('bg-light').addClass('bg-danger');
            $(this).remove();
        },
        beforeSend: function(){

        },
        complete: function(){

        }
    });


});
