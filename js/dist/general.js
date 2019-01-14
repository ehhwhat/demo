
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
    // Dates and days
    // ---------------
    function timelineDay() {
        console.log("%c .", "color:white;padding:20px;margin-bottom:5px;background:url('https://cdn0.iconfinder.com/data/icons/sport-2-android-l-lollipop-icon-pack/24/stopwatch-32.png') no-repeat;background-position-y:bottom;");
        console.log("%c timelineDay CALLED", "padding:10px 15px;margin:5px;color: #333;border-left:5px solid thistle;");

        const animatedEffect = 'animated flipInX';

        let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        // year, month, day
        let firstDate = new Date(2018,09,00);
        let secondDate = new Date();

        let diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        $('<style>.current-line::after{left:'+(diffDays / 2.5 + 0)+'%!important;border-color:#42a5f5!important;}</style>').appendTo('head');
        $('.totalTrainingDays').html(diffDays).addClass(animatedEffect);

        console.log("%c Days of training: "+diffDays, "padding:5px 15px;margin:5px;color: #333;border-left:15px solid thistle;font-weight:bold;");

        console.log("%c timelineDay END", "padding:10px 15px;margin:5px;color: #333;border-left:5px solid thistle;");
    }

    timelineDay();

    // ---------------
    // Switches
    // ---------------
    $('input[type=radio][name=sessionsVsDistances]').change(function() {
        if (this.value == 'sessions') {
            $('.showOnSessions').show();
            $('.showOnDistances').hide();
            $('.showOnTimes').hide();
        }
        else if (this.value == 'distances') {
            $('.showOnSessions').hide();
            $('.showOnDistances').show();
            $('.showOnTimes').hide();
        }
        else if (this.value == 'times') {
            $('.showOnDistances').hide();
            $('.showOnSessions').hide();
            $('.showOnTimes').show();
        }
    });

    // ---------------
    // LAZY LOAD
    // ---------------
    let myLazyLoad = new LazyLoad({
        elements_selector: ".lazy"
    });

});
