
console.log("%c data.js CALLED", "padding:15px;margin:5px;color: #333;border-left:5px solid green;");

$(document).ready(function() {

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
    // Initial page settings
    // ---------------
    $('.showOnDistances').hide();
    $('.showOnTimes').hide();

    // ---------------
    // Getting the data
    // ---------------
    $.getJSON("https://www.strava.com/api/v3/athlete/activities?after=1538355661&page=1&per_page=150&access_token=6c4884a4196ff4b71d3a58439c23a5adfadad027&callback=?", function(data) {
        console.log("%c .", "color:white;padding:20px;margin-bottom:5px;background:url('https://cdn4.iconfinder.com/data/icons/essential-app-2/16/cloud-storage-online-data-32.png') no-repeat;background-position-y:bottom;");
        console.log("%c getJSON CALLED", "padding:10px 15px;margin:5px;color: #333;border-left:5px solid gold;");
        //console.log(data);
        console.log("%c Data items found: " + data.length, "padding:5px 15px;margin:5px;color: #333;border-left:15px solid gold;font-weight:bold;");

        // Today's date
        // Will have to change to day of event at some point
        endDate = new Date().getTime();
        // October 1st
        startDate = new Date("2018-10-01T00:00:00.000Z").getTime();
        result = data.filter(d => {
            let time = new Date(d.start_date_local).getTime();
            return (startDate < time && time < endDate);
        });

        console.log("%c Data items found since start of training: " + result.length, "padding:5px 15px;margin:5px;color: #333;border-left:15px solid gold;font-weight:bold;");
        console.log(result);

        handleGeneral(result);
        handleSwims(result);
        handleCycles(result);
        handleRuns(result);
        //handleJsonResponse(result);
        console.log("%c getJSON END", "padding:10px 15px;margin:5px;color: #333;border-left:5px solid gold;");
    });

    function handleGeneral(data) {
        console.log("%c .", "color:white;padding:20px;margin-bottom:5px;background:url('https://cdn0.iconfinder.com/data/icons/sport-2-android-l-lollipop-icon-pack/24/skydiving-32.png') no-repeat;background-position-y:bottom;");
        console.log("%c handleGeneral CALLED", "padding:10px 15px;margin:5px;color: #333;border-left:5px solid grey;");

        const animatedEffect = 'animated flipInX';

        // ---------------
        // WEIGHT SESSIONS
        // ---------------
        let weightSessions = data.filter(function (el) {
            return (el.type === "WeightTraining");
        });
        const weightSessionsTotal = weightSessions.length;
        $('.totalWeightSessions').html(weightSessionsTotal).addClass(animatedEffect);

        // ---------------
        // WEIGHT HOURS
        // ---------------
        let weightTimeTotal = data.filter(function (el) {
            return (el.type === "WeightTraining");
        }).map(function(el){
            return el.moving_time;
        });
        const weightTimeTotalFinal = parseInt(weightTimeTotal.reduce((a, b) => a + b, 0) / 3600);
        $('.totalWeightTime').html(weightTimeTotalFinal+'hrs').addClass(animatedEffect);

        // ---------------
        // GYM CARDIO SESSIONS
        // ---------------
        let gymCardioSessions = data.filter(function (el) {
            return (el.type === "Workout");
        });
        const gymCardioSessionsTotal = gymCardioSessions.length;
        $('.totalGymCardioSessions').html(gymCardioSessionsTotal).addClass(animatedEffect);

        // ---------------
        // GYM CARDIO HOURS
        // ---------------
        let gymCardioTimeTotal = data.filter(function (el) {
            return (el.type === "Workout");
        }).map(function(el){
            return el.moving_time;
        });
        const gymCardioTotalFinal = parseInt(gymCardioTimeTotal.reduce((a, b) => a + b, 0) / 3600);
        $('.totalGymCardioTime').html(gymCardioTotalFinal+'hrs').addClass(animatedEffect);

        // ---------------
        // TRAINING SESSIONS
        // ---------------
        let trainingSessionsTotal = data.length;
        $('.totalTrainingSessions').html(trainingSessionsTotal).addClass(animatedEffect);

        // ---------------
        // TRAINING HOURS
        // ---------------
        let trainingHoursTotal = data.map(function(el){
            return el.moving_time;
        });
        const trainingHoursTotalFinal = parseInt(trainingHoursTotal.reduce((a, b) => a + b, 0) / 3600);
        $('.totalTrainingTime').html(trainingHoursTotalFinal+'hrs').addClass(animatedEffect);

        // ---------------
        // TRAINING DISTANCES
        // ---------------
        let trainingDistanceTotal = data.map(function(el){
            return el.distance;
        });

        // -------------------
        // TRAINING DISTANCES TO KM
        // -------------------
        let trainingDistanceTotalKM = trainingDistanceTotal.reduce((a, b) => a + b, 0);
        $('.totalTrainingKM').html(parseInt((trainingDistanceTotalKM / 1000))+'km').addClass(animatedEffect);

        // -------------------
        // LATEST ACTIVITY
        // -------------------
        console.log(result[result.length - 1]);
        let latestEntry = data.slice(data.length - 1,data.length - 0).map(function(el){
            return el.name;
        });
        $('.latestEntry').html(latestEntry).addClass(animatedEffect);
        //console.log(latestEntry);
        console.log("%c Latest entry : " + latestEntry, "padding:5px 15px;margin:5px;color: #333;border-left:15px solid grey;font-weight:bold;");

        console.log(weightSessions);
        console.log(gymCardioSessions);
        console.log("%c handleGeneral END", "padding:10px 15px;margin:5px;color: #333;border-left:5px solid grey;");
    }

    function handleRuns(data) {
        console.log("%c .", "color:white;padding:20px;margin-bottom:5px;background:url('https://cdn0.iconfinder.com/data/icons/sport-2-android-l-lollipop-icon-pack/24/walking-32.png') no-repeat;background-position-y:bottom;");
        console.log("%c handleRuns CALLED", "padding:10px;margin:5px;color: #333;border-left:5px solid rebeccapurple;");

        const animatedEffect = 'animated flipInX';

        // ---------------
        // RUN SESSIONS
        // ---------------
        let runSessions = data.filter(function (el) {
            return (el.type === "Run");
        });
        const runSessionsTotal = runSessions.length;
        console.log("%c Total run: " + runSessionsTotal, "padding:5px 15px;margin:5px;color: #333;border-left:15px solid rebeccapurple;font-weight:bold;");
        $('.totalRunSessions').html(runSessionsTotal).addClass(animatedEffect);

        // ---------------
        // RUN DISTANCES
        // ---------------
        let runsDistanceTotal = data.filter(function (el) {
            return (el.type === "Run");
        }).map(function(el){
            return el.distance;
        });
        // console.log('runsDistanceTotal');
        // console.log(runsDistanceTotal.reduce((a, b) => a + b, 0));

        // -------------------
        // RUN DISTANCES TO KM
        // -------------------
        let runsDistanceTotalKM = runsDistanceTotal.reduce((a, b) => a + b, 0);
        console.log("%c Total run distance in KM: " + parseInt((runsDistanceTotalKM / 1000)), "padding:5px 15px;margin:5px;color: #333;border-left:15px solid rebeccapurple;font-weight:bold;");
        $('.totalRunKM').html(parseInt((runsDistanceTotalKM / 1000))+'km').addClass(animatedEffect);

        // ---------------
        // RUNNING HOURS
        // ---------------
        let runsTimeTotal = data.filter(function (el) {
            return (el.type === "Run");
        }).map(function(el){
            return el.moving_time;
        });
        const runsTimeTotalFinal = parseInt(runsTimeTotal.reduce((a, b) => a + b, 0) / 3600);
        console.log("%c Total run time in HR: " + runsTimeTotalFinal, "padding:5px 15px;margin:5px;color: #333;border-left:15px solid rebeccapurple;font-weight:bold;");
        $('.totalRunTime').html(runsTimeTotalFinal+'hrs').addClass(animatedEffect);

        // ---------------
        // RUNNING PACE AVG
        // ---------------
        let runsRacesOnly = data.filter(function (el) {
            return (el.type === "Run");
        }).filter(function (el) {
            return (el.workout_type === 1);
        });

        let runsRacesOnlyMoving = runsRacesOnly.map(function(el){
            return el.moving_time;
        });
        let runsRacesOnlyMovingTotal = parseInt(runsRacesOnlyMoving.reduce((a, b) => a + b, 0) / runsRacesOnlyMoving.length);

        let runsRacesOnlyDistance = runsRacesOnly.map(function(el){
            return el.distance;
        });
        let runsRacesOnlyDistanceTotal = parseInt(runsRacesOnlyDistance.reduce((a, b) => a + b, 0) / runsRacesOnlyDistance.length);
        let runsPaceAvg = parseFloat((runsRacesOnlyMovingTotal / 60) / runsRacesOnlyDistanceTotal * 1000).toFixed(2);
        $('.runsPaceAvg').html(runsPaceAvg+'mins / km').addClass(animatedEffect);


        // ---------------
        // RUNNING DISTANCE LONGEST
        // ---------------
        let runsDistanceFurthest = parseInt(Math.max.apply(Math, runsDistanceTotal) / 1000);
        console.log("%c Longest run distance in KM: " + runsDistanceFurthest, "padding:5px 15px;margin:5px;color: #333;border-left:15px solid rebeccapurple;font-weight:bold;");
        $('.runsDistanceFurthest').html(runsDistanceFurthest+'km').addClass(animatedEffect);

        console.log(runSessions);
        console.log("%c handleRuns END", "padding:10px 15px;margin:5px;color: #333;border-left:5px solid rebeccapurple;");
    }

    function handleCycles(data) {
        console.log("%c .", "color:white;padding:20px;margin-bottom:5px;background:url('https://cdn0.iconfinder.com/data/icons/sport-2-android-l-lollipop-icon-pack/24/time_trial_biking-32.png') no-repeat;background-position-y:bottom;");
        console.log("%c handleCycles CALLED", "padding:10px 15px;margin:5px;color: #333;border-left:5px solid cyan;");

        const animatedEffect = 'animated flipInX';

        // ---------------
        // CYCLE SESSIONS - VIRTUAL
        // ---------------
        let cycleVirtualSessions = data.filter(function (el) {
            return (el.type === "VirtualRide");
        });
        const cycleVirtualSessionsTotal = cycleVirtualSessions.length;
        console.log("%c Total virtual cycle: " + cycleVirtualSessionsTotal, "padding:5px 15px;margin:5px;color: #333;border-left:15px solid cyan;font-weight:bold;");

        // ---------------
        // CYCLE DISTANCES - VIRTUAL
        // ---------------
        let cyclesVirtualDistanceTotal = data.filter(function (el) {
            return (el.type === "VirtualRide");
        }).map(function(el){
            return el.distance;
        });

        // -------------------
        // CYCLE DISTANCES TO KM - VIRTUAL
        // -------------------
        let cyclesVirtualDistanceTotalKM = cyclesVirtualDistanceTotal.reduce((a, b) => a + b, 0);
        console.log("%c Total cycle virtual distance in KM: " + parseInt((cyclesVirtualDistanceTotalKM / 1000)), "padding:5px 15px;margin:5px;color: #333;border-left:15px solid cyan;font-weight:bold;");
        $('.totalCycleVirtualKM').html(parseInt((cyclesVirtualDistanceTotalKM / 1000))+'km').addClass(animatedEffect);

        // ---------------
        // CYCLING HOURS - VIRTUAL
        // ---------------
        let cyclesVirtualTimeTotal = data.filter(function (el) {
            return (el.type === "VirtualRide");
        }).map(function(el){
            return el.moving_time;
        });
        const cyclesVirtualTimeTotalFinal = parseInt(cyclesVirtualTimeTotal.reduce((a, b) => a + b, 0) / 3600);
        console.log("%c Total cycle virtual time in HR: " + cyclesVirtualTimeTotalFinal, "padding:5px 15px;margin:5px;color: #333;border-left:15px solid cyan;font-weight:bold;");
        $('.totalCycleVirtualTime').html(cyclesVirtualTimeTotalFinal+'hrs').addClass(animatedEffect);


        // ---------------
        // CYCLE SESSIONS
        // ---------------
        let cycleSessions = data.filter(function (el) {
            return (el.type === "Ride");
        });
        const cycleSessionsTotal = cycleSessions.length;
        console.log("%c Total cycle: " + cycleSessionsTotal, "padding:5px 15px;margin:5px;color: #333;border-left:15px solid cyan;font-weight:bold;");
        $('.totalCycleSessions').html(cycleSessionsTotal + cycleVirtualSessionsTotal).addClass(animatedEffect);

        // ---------------
        // CYCLE DISTANCES
        // ---------------
        let cyclesDistanceTotal = data.filter(function (el) {
            return (el.type === "Ride");
        }).map(function(el){
            return el.distance;
        });

        // -------------------
        // CYCLE DISTANCES TO KM
        // -------------------
        let cyclesDistanceTotalKM = cyclesDistanceTotal.reduce((a, b) => a + b, 0);
        console.log("%c Total cycle distance in KM: " + parseInt((cyclesDistanceTotalKM / 1000)), "padding:5px 15px;margin:5px;color: #333;border-left:15px solid cyan;font-weight:bold;");
        $('.totalCycleKM').html(parseInt((cyclesDistanceTotalKM / 1000) + (cyclesVirtualDistanceTotalKM / 1000))+'km').addClass(animatedEffect);

        // ---------------
        // CYCLING HOURS
        // ---------------
        let cyclesTimeTotal = data.filter(function (el) {
            return (el.type === "Ride");
        }).map(function(el){
            return el.moving_time;
        });
        const cyclesTimeTotalFinal = parseInt(cyclesTimeTotal.reduce((a, b) => a + b, 0) / 3600);
        console.log("%c Total cycle time in HR: " + cyclesTimeTotalFinal, "padding:5px 15px;margin:5px;color: #333;border-left:15px solid cyan;font-weight:bold;");
        $('.totalCycleTime').html((cyclesTimeTotalFinal + cyclesVirtualTimeTotalFinal)+'hrs').addClass(animatedEffect);



        // ---------------
        // CYCLING WATTS AVG
        // ---------------
        let cyclesWattAvg = data.filter(function (el) {
            return (el.type === "Ride");
        }).filter(function (el) {
            return (el.workout_type === 12);
        }).map(function(el){
            return el.average_watts;
        });
        let cyclesWattAvgFinal = parseInt(cyclesWattAvg.reduce((a, b) => a + b, 0) / cyclesWattAvg.length);
        console.log("%c Average cycle watts: " + cyclesWattAvgFinal, "padding:5px 15px;margin:5px;color: #333;border-left:15px solid cyan;font-weight:bold;");
        $('.cyclesWattAvg').html(cyclesWattAvgFinal+'watts').addClass(animatedEffect);

        // ---------------
        // CYCLING DISTANCE LONGEST
        // ---------------
        let cyclesDistanceFurthest = parseInt(Math.max.apply(Math, cyclesDistanceTotal) / 1000);
        $('.cyclesDistanceFurthest').html(cyclesDistanceFurthest+'km').addClass(animatedEffect);
        console.log("%c Longest cycle distance in KM: " + cyclesDistanceFurthest, "padding:5px 15px;margin:5px;color: #333;border-left:15px solid cyan;font-weight:bold;");

        console.log(cycleSessions);
        console.log(cycleVirtualSessions);
        console.log("%c handleCycles END", "padding:10px 15px;margin:5px;color: #333;border-left:5px solid cyan;");
    }

    function handleSwims(data) {
        console.log("%c .", "color:white;padding:20px;margin-bottom:5px;background:url('https://cdn0.iconfinder.com/data/icons/sport-2-android-l-lollipop-icon-pack/24/swimming-32.png') no-repeat;background-position-y:bottom;");
        console.log("%c handleSwims CALLED", "padding:10px 15px;margin:5px;color: #333;border-left:5px solid salmon;");

        const animatedEffect = 'animated flipInX';

        // ---------------
        // SWIM SESSIONS
        // ---------------
        let swimSessions = data.filter(function (el) {
            return (el.type === "Swim");
        });
        const swimSessionsTotal = swimSessions.length;
        console.log("%c Total swim: " + swimSessionsTotal, "padding:5px 15px;margin:5px;color: #333;border-left:15px solid salmon;font-weight:bold;");
        $('.totalSwimSessions').html(swimSessionsTotal).addClass(animatedEffect);

        // ---------------
        // SWIM DISTANCES
        // ---------------
        let swimDistanceTotal = data.filter(function (el) {
            return (el.type === "Swim");
        }).map(function(el){
            return el.distance;
        });
        //console.log('swimDistanceTotal');
        //console.log(swimDistanceTotal);

        // -------------------
        // SWIM DISTANCES TO KM
        // -------------------
        let swimDistanceTotalKM = swimDistanceTotal.reduce((a, b) => a + b, 0);
        console.log("%c Total swim distance in KM: " + parseInt((swimDistanceTotalKM / 1000)), "padding:5px 15px;margin:5px;color: #333;border-left:15px solid salmon;font-weight:bold;");
        $('.totalSwimKM').html(parseInt((swimDistanceTotalKM / 1000))+'km').addClass(animatedEffect);

        // ---------------
        // SWIM HOURS
        // ---------------
        let swimTimeTotal = data.filter(function (el) {
            return (el.type === "Swim");
        }).map(function(el){
            return el.moving_time;
        });
        const swimTimeTotalFinal = parseInt(swimTimeTotal.reduce((a, b) => a + b, 0) / 3600);
        console.log("%c Total swim time in HR: " + swimTimeTotalFinal, "padding:5px 15px;margin:5px;color: #333;border-left:15px solid salmon;font-weight:bold;");
        $('.totalSwimTime').html(swimTimeTotalFinal+'hrs').addClass(animatedEffect);

        // ---------------
        // SWIM DISTANCE LONGEST
        // ---------------
        let swimDistanceFurthest = parseInt(Math.max.apply(Math, swimDistanceTotal));
        console.log("%c Longest swim distance in M: " + swimDistanceFurthest, "padding:5px 15px;margin:5px;color: #333;border-left:15px solid salmon;font-weight:bold;");
        $('.swimsDistanceFurthest').html(swimDistanceFurthest+'m').addClass(animatedEffect);

        // ---------------
        // SWIM PACE AVG
        // ---------------
        let swimSessionsMoving = swimSessions.map(function(el){
            return el.moving_time;
        });
        let swimSessionsMovingTotal = parseInt(swimSessionsMoving.reduce((a, b) => a + b, 0) / swimSessionsMoving.length);
        //console.log('swimSessionsMovingTotal');
        //console.log(swimSessionsMovingTotal);

        let swimSessionsDistance = swimSessions.map(function(el){
            return el.distance;
        });
        //console.log('swimSessionsDistance');
        //console.log(swimSessionsDistance);

        let swimSessionsDistanceTotal = parseInt(swimSessionsDistance.reduce((a, b) => a + b, 0) / swimSessionsDistance.length);
        //console.log('swimSessionsDistanceTotal');
        //console.log(swimSessionsDistanceTotal);

        let swimPaceAvg = parseFloat((swimSessionsMovingTotal) / swimSessionsDistanceTotal * 1000).toFixed(2);
        //console.log('swimPaceAvg');
        //console.log(swimPaceAvg);

        console.log(swimSessions);
        console.log("%c handleSwims END", "padding:10px 15px;margin:5px;color: #333;border-left:5px solid salmon;");
    }

    // ---------------
    // TO BE SORTED
    // ---------------
    // function handleJsonResponse(data) {
    //     //json has data because we called it after the async "promise" is resolved
    //     console.log(data);
    //
    //     var runs = data.filter(function (el) {
    //         return (el.type === "Run");
    //     });
    //     console.log(runs);
    //     console.log("Runs:  " + runs.length);
    //     $('.totalRuns').html(runs.length);
    //
    //     var runsDistance = data.filter(function (el) {
    //         return (el.type === "Run");
    //     }).map(function(el){
    //         return el.distance;
    //     });
    //     console.log('runsDistance');
    //     console.log(runsDistance);
    //
    // }

    // ---------------
    // Getting the data
    // ---------------
    // $.getJSON("https://www.strava.com/api/v3/athlete/activities?after=1538355661&page=1&per_page=150&access_token=6c4884a4196ff4b71d3a58439c23a5adfadad027&callback=?", function(data) {
    //     console.log("%c getJSON2 CALLED", "padding:10px 15px;margin:5px;color: #333;border-left:5px solid orange;");
    //     console.log(data);
    //     console.log("%c getJSON2 END", "padding:10px 15px;margin:5px;color: #333;border-left:5px solid orange;");
    // });

});
