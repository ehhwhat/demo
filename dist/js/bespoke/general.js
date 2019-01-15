
console.log("%c general.js CALLED", "padding:15px;margin:5px;color: #333;border-left:5px solid green;");

$(document).ready(function() {

    // SMOOTH SCROLL
    // WOW
    // TOOLTIPS
    // DATES
    // LAZY LOAD

    // ---------------
    // SMOOTH SCROLL
    // ---------------
    $('.smooth-scroll a').click(function() {
        let sectionTo = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(sectionTo).offset().top -100
        }, 1500);
    });

    // ---------------
    // WOW
    // ---------------
    new WOW().init();

    // ---------------
    // TOOLTIPS
    // ---------------
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    // ---------------
    // LAZY LOAD
    // ---------------
    let myLazyLoad = new LazyLoad({
        elements_selector: ".lazy"
    });

});
