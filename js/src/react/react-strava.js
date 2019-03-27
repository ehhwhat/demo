console.log("%c react-strava.js CALLED", "padding:15px;margin:5px;color: #333;border-left:5px solid rebeccapurple;");

class App extends React.Component {

    constructor(){
        super();
        // Bind the this context to the handler function
        this.handler = this.handler.bind(this);
        this.state = {
            dataToUse: [
                { }
            ],
            eventTypes: ['All','Swim','Ride','Run','Stats','Targets'],

            dataToUseEvent:"",
            dataToUseEventInitial:"",
            dataToUseEventNext:"",
            dataToUseEventNextInitial:"",
            dataToUseSessions:"",
            dataToUseSessionsInitial:"",
            dataToUseTime:"",
            dataToUseTimeInitial:"",
            dataToUseDistance:"",
            dataToUseDistanceInitial:"",
            dataToUseEventLatest:"",

            dataBlockItem1:"",
            dataBlockItem1Title:"",
            dataBlockItem1Measure:"",
            dataBlockItem1Compare:"",

            dataBlockItem2:"",
            dataBlockItem2Title:"",
            dataBlockItem2Measure:"",
            dataBlockItem2Compare:"",

            dataBlockItem3:"",
            dataBlockItem3Title:"",
            dataBlockItem3Measure:"",
            dataBlockItem3Compare:"",

            dataBlockItem4:"",
            dataBlockItem4Title:"",
            dataBlockItem4Measure:"",
            dataBlockItem4Compare:"",

            dataStats:"",
            dataTargets:"",
            dataTargetsCurrent:"",

            showButtons:false,

            isHidden: true,
            showLoading: true,
            showLoadingPre: true,
            darkTheme: false,
            messageShown: false
        };
    };

    // This method will be sent to the child component
    handler() {
        this.setState({
            messageShown: true
        });
    }

    // This method will be sent to the child component
    emptyData = () => {
        this.setState({dataToUseEvent: ""});
        this.setState({dataToUseEventNext: ""});

        this.setState({dataBlockItem1: ""});
        this.setState({dataBlockItem1Title: ""});
        this.setState({dataBlockItem1Measure: ""});
        this.setState({dataBlockItem1Compare: ""});

        this.setState({dataBlockItem2: ""});
        this.setState({dataBlockItem2Title: ""});
        this.setState({dataBlockItem2Measure: ""});
        this.setState({dataBlockItem2Compare: ""});

        this.setState({dataBlockItem3: ""});
        this.setState({dataBlockItem3Title: ""});
        this.setState({dataBlockItem3Measure: ""});
        this.setState({dataBlockItem3Compare: ""});

        this.setState({dataBlockItem4: ""});
        this.setState({dataBlockItem4Title: ""});
        this.setState({dataBlockItem4Measure: ""});
        this.setState({dataBlockItem4Compare: ""});

        this.setState({dataToUseEventLatest: null});
    };

    eventTypeFunction = (eventType) => {
        console.log("%c Switch data ", "padding:5px 15px;margin:5px;color: #333;border-left:20px solid #000;font-weight:bold;");
        console.log("%c Event type: " + eventType, "padding:5px 15px;margin:5px;color: #333;border-left:20px solid #666;font-weight:bold;");

        this.setState({showLoading:true});

        this.emptyData();

        let array = this.state.dataToUse;
        // console.log('%c AXIOS', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        // console.log(array);
        // console.log('%c AXIOS', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');

        this.setState({dataToUseEvent: eventType});

        // ---------------
        // SESSIONS
        // ---------------
        let Sessions = array.filter(function (el) {
            return (el.type === eventType);
        });
        const SessionsTotal = Sessions.length;
        this.setState({dataBlockItem1: SessionsTotal});
        this.setState({dataBlockItem1Title: "Sessions"});
        this.setState({dataBlockItem1Measure: ""});

        // ---------------
        // HOURS
        // ---------------
        let trainingHoursTotal = array.filter(function (el) {
            return (el.type === eventType);
        }).map(function(el){
            return el.moving_time;
        });
        const trainingHoursTotalFinal = parseInt(trainingHoursTotal.reduce((a, b) => a + b, 0) / 3600);
        this.setState({dataBlockItem2: trainingHoursTotalFinal});
        this.setState({dataBlockItem2Title: "Time"});
        this.setState({dataBlockItem2Measure: "hrs"});

        // ---------------
        // DISTANCES
        // ---------------
        let trainingDistanceTotal = array.filter(function (el) {
            return (el.type === eventType);
        }).map(function(el){
            return el.distance;
        });
        // -------------------
        // DISTANCES TO KM
        // -------------------
        let trainingDistanceTotalKM = parseInt(trainingDistanceTotal.reduce((a, b) => a + b, 0) / 1000);
        this.setState({dataBlockItem3: trainingDistanceTotalKM});
        this.setState({dataBlockItem3Title: "Distance"});
        this.setState({dataBlockItem3Measure: "km"});

        // -------------------
        // LATEST ACTIVITY
        // -------------------
        let latestEntry = Sessions.slice(Sessions.length - 1,Sessions.length - 0).map(function(el){
            return el.name;
        });
        this.setState({dataToUseEventLatest: latestEntry});

        // Just for cycling virtual sessions
        if(eventType === "Ride") {
            // ---------------
            // CYCLE SESSIONS - VIRTUAL
            // ---------------
            let cycleVirtualSessions = array.filter(function (el) {
                return (el.type === "VirtualRide");
            });
            const cycleVirtualSessionsTotal = cycleVirtualSessions.length;
            this.setState({dataBlockItem1: (SessionsTotal+cycleVirtualSessionsTotal)});

            // ---------------
            // CYCLING HOURS - VIRTUAL
            // ---------------
            let cyclesVirtualTimeTotal = array.filter(function (el) {
                return (el.type === "VirtualRide");
            }).map(function(el){
                return el.moving_time;
            });
            const cyclesVirtualTimeTotalFinal = parseInt(cyclesVirtualTimeTotal.reduce((a, b) => a + b, 0) / 3600);
            this.setState({dataBlockItem2: (trainingHoursTotalFinal+cyclesVirtualTimeTotalFinal)});

            // ---------------
            // CYCLE DISTANCES - VIRTUAL
            // ---------------
            let cyclesVirtualDistanceTotal = array.filter(function (el) {
                return (el.type === "VirtualRide");
            }).map(function(el){
                return el.distance;
            });

            // -------------------
            // CYCLE DISTANCES TO KM - VIRTUAL
            // -------------------
            let cyclesVirtualDistanceTotalKM = parseInt(cyclesVirtualDistanceTotal.reduce((a, b) => a + b, 0) / 1000);
            this.setState({dataBlockItem3: (trainingDistanceTotalKM+cyclesVirtualDistanceTotalKM)});

            // -------------------
            // LATEST ACTIVITY
            // -------------------
            let cycleLatestEntry = cycleVirtualSessions.slice(cycleVirtualSessions.length - 1,cycleVirtualSessions.length - 0).map(function(el){
                return el.name;
            });
            this.setState({dataToUseEventLatest: cycleLatestEntry});

            console.log(cycleVirtualSessions);
        }

        // Just for running virtual sessions
        if(eventType === "Run") {
            // ---------------
            // Run SESSIONS - VIRTUAL
            // ---------------
            let runVirtualSessions = array.filter(function (el) {
                return (el.type === "VirtualRun");
            });
            const runVirtualSessionsTotal = runVirtualSessions.length;
            this.setState({dataBlockItem1: (SessionsTotal+runVirtualSessionsTotal)});

            // ---------------
            // Run HOURS - VIRTUAL
            // ---------------
            let runVirtualTimeTotal = array.filter(function (el) {
                return (el.type === "VirtualRun");
            }).map(function(el){
                return el.moving_time;
            });
            const runVirtualTimeTotalFinal = parseInt(runVirtualTimeTotal.reduce((a, b) => a + b, 0) / 3600);
            this.setState({dataBlockItem2: (trainingHoursTotalFinal+runVirtualTimeTotalFinal)});

            // ---------------
            // Run DISTANCES - VIRTUAL
            // ---------------
            let runVirtualDistanceTotal = array.filter(function (el) {
                return (el.type === "VirtualRun");
            }).map(function(el){
                return el.distance;
            });

            // -------------------
            // Run DISTANCES TO KM - VIRTUAL
            // -------------------
            let runVirtualDistanceTotalKM = parseInt(runVirtualDistanceTotal.reduce((a, b) => a + b, 0) / 1000);
            this.setState({dataBlockItem3: (trainingDistanceTotalKM+runVirtualDistanceTotalKM)});

            console.log(runVirtualSessions);
        }

        if(eventType === "All") {
            this.setState({dataToUseEvent: this.state.dataToUseEventInitial});
            this.setState({dataToUseEventNext: this.state.dataToUseEventNextInitial});
            this.setState({dataBlockItem1: this.state.dataToUseSessionsInitial});
            this.setState({dataBlockItem1Title: "Sessions"});
            this.setState({dataBlockItem2: this.state.dataToUseTimeInitial});
            this.setState({dataBlockItem2Title: "Time"});
            this.setState({dataBlockItem3: this.state.dataToUseDistanceInitial});
            this.setState({dataBlockItem3Title: "Distance"});

            // -------------------
            // LATEST ACTIVITY
            // -------------------
            let latestEntry = array.slice(array.length - 1,array.length - 0).map(function(el){
                return el.name;
            });
            this.setState({dataToUseEventLatest: latestEntry});
        }
        if(eventType === "Swim") {
            this.setState({dataToUseEventNext: "Ride"});
        }
        if(eventType === "Ride") {
            this.setState({dataToUseEventNext: "Run"});
        }
        if(eventType === "Run") {
            this.setState({dataToUseEventNext: "Stats"});
        }
        if(eventType === "Stats") {
            this.setState({dataToUseEvent: "Stats"});
            this.setState({dataToUseEventNext: "Targets"});
            this.setState({dataToUseEventLatest: null});
            this.setState({dataBlockItem1: this.state.dataStats[0]['weight']});
            this.setState({dataBlockItem1Title: "Weight"});
            this.setState({dataBlockItem1Measure: "lbs"});
            this.setState({dataBlockItem2: this.state.dataStats[0]['bodyfat']});
            this.setState({dataBlockItem2Title: "Bodyfat"});
            this.setState({dataBlockItem2Measure: "%"});
            this.setState({dataBlockItem3: this.state.dataStats[0]['vo2']});
            this.setState({dataBlockItem3Title: "VO2"});
            this.setState({dataBlockItem3Measure: "max"});
        }

        if(eventType === "Targets") {
            this.setState({dataToUseEvent: "Targets"});
            this.setState({dataToUseEventNext: "All"});
            this.setState({dataToUseEventLatest: null});

            // this.setState({dataBlockItem1: this.state.dataTargets[0]['weight']});
            // this.setState({dataBlockItem1Title: "Weight"});
            // this.setState({dataBlockItem1Measure: "lbs"});
            // this.setState({dataBlockItem1Compare: this.state.dataTargetsCurrent[0]['weight']});

            this.setState({dataBlockItem1: this.state.dataTargets[0]['swim']});
            this.setState({dataBlockItem1Title: "Swim"});
            this.setState({dataBlockItem1Measure: "s/100m"});
            this.setState({dataBlockItem1Compare: this.state.dataTargetsCurrent[0]['swim']});

            this.setState({dataBlockItem2: this.state.dataTargets[0]['ride']});
            this.setState({dataBlockItem2Title: "Ride"});
            this.setState({dataBlockItem2Measure: "W/kg"});
            this.setState({dataBlockItem2Compare: this.state.dataTargetsCurrent[0]['ride']});

            this.setState({dataBlockItem3: this.state.dataTargets[0]['run']});
            this.setState({dataBlockItem3Title: "Run"});
            this.setState({dataBlockItem3Measure: "HM"});
            this.setState({dataBlockItem3Compare: this.state.dataTargetsCurrent[0]['run']});

        }

        this.setState({showLoading:false});
        console.log(Sessions);
    };

    toggleDarkTheme = () => {
        this.setState({ darkTheme: !this.state.darkTheme });
    };

    componentWillMount() {
        //console.log('%c componentWillMount', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        this.setState({showLoading:true});

        axios.all([
            axios.get(`https://www.strava.com/api/v3/athlete/activities?after=1538355661&page=1&per_page=200&access_token=6c4884a4196ff4b71d3a58439c23a5adfadad027`),
            axios.get(`https://www.strava.com/api/v3/athlete/activities?after=1538355661&page=2&per_page=200&access_token=6c4884a4196ff4b71d3a58439c23a5adfadad027`),
            axios.get(`https://triathlon-information.firebaseio.com/.json`)
        ])
            .then(axios.spread((firstResponse, secondResponse, thirdResponse) => {
                //console.log(firstResponse.data);
                //console.log(secondResponse.data);
                //console.log(thirdResponse.data);

                let firstData = firstResponse.data;
                let secondData = secondResponse.data;
                let allData = firstData.concat(secondData);
                let thirdData = thirdResponse.data;

                let array = $.map(allData, function(value, index) {
                    return [value];
                });

                this.setState({dataToUse: array});
                this.setState({dataToUseEvent: "All"});
                this.setState({dataToUseEventInitial: "All"});
                this.setState({dataToUseEventNext: "Swim"});
                this.setState({dataToUseEventNextInitial: "Swim"});


                // ---------------
                // SESSIONS
                // ---------------
                let Sessions = array.filter(function (el) {
                    return el;
                });
                const SessionsTotal = Sessions.length;
                this.setState({dataBlockItem1: SessionsTotal});
                this.setState({dataBlockItem1Title: "Sessions"});
                this.setState({dataBlockItem1Measure: ""});
                this.setState({dataToUseSessionsInitial: SessionsTotal});

                // ---------------
                // HOURS
                // ---------------
                let trainingHoursTotal = array.map(function(el){
                    return el.moving_time;
                });
                const trainingHoursTotalFinal = parseInt(trainingHoursTotal.reduce((a, b) => a + b, 0) / 3600);
                this.setState({dataBlockItem2: trainingHoursTotalFinal});
                this.setState({dataBlockItem2Title: "Time"});
                this.setState({dataBlockItem2Measure: "hrs"});
                this.setState({dataToUseTimeInitial: trainingHoursTotalFinal});

                // ---------------
                // DISTANCES
                // ---------------
                let trainingDistanceTotal = array.map(function(el){
                    return el.distance;
                });

                // -------------------
                // DISTANCES TO KM
                // -------------------
                let trainingDistanceTotalKM = parseInt(trainingDistanceTotal.reduce((a, b) => a + b, 0) / 1000);
                this.setState({dataBlockItem3: trainingDistanceTotalKM});
                this.setState({dataBlockItem3Title: "Distance"});
                this.setState({dataBlockItem3Measure: "km"});
                this.setState({dataToUseDistanceInitial: trainingDistanceTotalKM});

                // -------------------
                // LATEST ACTIVITY
                // -------------------
                let latestEntry = array.slice(array.length - 1,array.length - 0).map(function(el){
                    return el.name;
                });
                this.setState({dataToUseEventLatest: latestEntry});

                // ---------------
                // STATS
                // ---------------
                const filteredStats = Object.keys(thirdData)
                    .filter(key => ['stats'].includes(key))
                    .reduce((obj, key) => {
                        obj[key] = thirdData[key];
                        return obj;
                    }, {});
                console.log(filteredStats);
                let filteredStatsArray = $.map(filteredStats, function(value, index) {
                    return [value];
                });
                console.log(filteredStatsArray);
                this.setState({dataStats: filteredStatsArray});

                // ---------------
                // TARGETS
                // ---------------
                const filteredTargets = Object.keys(thirdData)
                    .filter(key => ['targets'].includes(key))
                    .reduce((obj, key) => {
                        obj[key] = thirdData[key];
                        return obj;
                    }, {});
                console.log(filteredTargets);
                let filteredTargetsArray = $.map(filteredTargets, function(value, index) {
                    return [value];
                });
                this.setState({dataTargets: filteredTargetsArray});

                // ---------------
                // TARGETS CURRENT
                // ---------------
                const filteredTargetsCurrent = Object.keys(thirdData)
                    .filter(key => ['targetsCurrent'].includes(key))
                    .reduce((obj, key) => {
                        obj[key] = thirdData[key];
                        return obj;
                    }, {});
                console.log(filteredTargetsCurrent);
                let filteredTargetsCurrentArray = $.map(filteredTargetsCurrent, function(value, index) {
                    return [value];
                });
                this.setState({dataTargetsCurrent: filteredTargetsCurrentArray});

                // ---------------
                // LOADING
                // ---------------
                this.setState({showLoadingPre:false});
                setTimeout(() => {
                    this.setState({showLoading:false});
                }, 2000);

            }))
            .catch(function (error) {
                console.log(error);
            });

        //console.log('%c componentWillMount END', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
    }

    componentDidMount() {
        // Before the initial render of the component lets get the data using axios
        // We will then convert to an array for easier manipulation
        // We will then set the state of this component to this array

    }

    render() {
        //console.log('%c render', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        return ([
            <main className={this.state.darkTheme ? 'theme-dark' : 'theme-light'} key="mainWrapper">
                <Loader dataFromParent={this.state.showLoadingPre} loadingState={this.state.showLoading} />
                <Backgrounds dataFromParent={this.state.dataToUseEvent} />

                <p className="version-number">v32</p>
                <EventHeader dataFromParent={this.state.dataToUseEvent} loadingState={this.state.showLoading} />
                <div className={"data-wrapper"}>
                    <DataBlock title={this.state.dataBlockItem1Title} position={"point1"} measure={this.state.dataBlockItem1Measure} dataFromParent={this.state.dataBlockItem1} dataToCompare={this.state.dataBlockItem1Compare} loadingState={this.state.showLoading} />
                    <DataBlock title={this.state.dataBlockItem2Title} position={"point2"} measure={this.state.dataBlockItem2Measure} dataFromParent={this.state.dataBlockItem2} dataToCompare={this.state.dataBlockItem2Compare} loadingState={this.state.showLoading} />
                    <DataBlock title={this.state.dataBlockItem3Title} position={"point3"} measure={this.state.dataBlockItem3Measure} dataFromParent={this.state.dataBlockItem3} dataToCompare={this.state.dataBlockItem3Compare} loadingState={this.state.showLoading} />
                    <DataBlock title={this.state.dataBlockItem4Title} position={"point4"} measure={this.state.dataBlockItem4Measure} dataFromParent={this.state.dataBlockItem4} dataToCompare={this.state.dataBlockItem4Compare} loadingState={this.state.showLoading} />
                    <LatestEvent dataFromParent={this.state.dataToUseEventLatest} loadingState={this.state.showLoading} />
                </div>
                <EventHeaderNext dataFromParent={this.state.dataToUseEventNext} loadingState={this.state.showLoading} eventTypeFunction={this.eventTypeFunction} />

                <DotsNew
                    dataFromParent={this.state.dataToUseEvent}
                    eventTypes={this.state.eventTypes}
                    loadingState={this.state.showLoading}
                    darkTheme={this.state.darkTheme}
                />

                <ThumbButtons loadingState={this.state.showLoading} eventTypes={this.state.eventTypes} eventTypeFunction={this.eventTypeFunction} />

                {/*<ThemeToggle loadingState={this.state.showLoading} darkTheme={this.state.darkTheme} toggleDarkTheme={this.toggleDarkTheme} />*/}

                <div className={`background All d-none`}>&nbsp;</div>
                <div className={`background Swim d-none`}>&nbsp;</div>
                <div className={`background Ride d-none`}>&nbsp;</div>
                <div className={`background Run d-none`}>&nbsp;</div>
            </main>
        ]);
    }

}

class Backgrounds extends React.Component {
    render() {
        if (!this.props.dataFromParent) {
            return null;
        } else {
            return ([
                <div key={"Backgrounds"}>
                    <div className={`background blurred ${this.props.dataFromParent}`}>&nbsp;</div>
                    <div className={`background-mask ${this.props.dataFromParent}`}>&nbsp;</div>
                </div>
            ]);
        }
    }
}

class Loader extends React.Component {
    render() {
        if (!this.props.loadingState) {
            return null;
        } else {
            return ([
                <div key={"Loader"} className={this.props.dataFromParent ? 'loader-wrapper' : 'loader-wrapper animated fadeOut delay-1s'}>
                    <div className={this.props.dataFromParent ? 'loader-shape triangle' : 'loader-shape triangle animated fadeOut'}>
                        <svg viewBox="0 0 86 80">
                            <polygon points="43 8 79 72 7 72"></polygon>
                        </svg>
                    </div>
                </div>
            ]);
        }
    }
}

class EventHeader extends React.Component {
    render() {
        if (!this.props.dataFromParent) {
            return null;
        } else {
            return ([
                <h3 key="EventHeader" className={this.props.loadingState ? `display-3 text-color mt-0 mb-0 loading-new event-header ${this.props.dataFromParent}` : `display-3 text-color mt-0 mb-0 loaded-new event-header ${this.props.dataFromParent}`}>{this.props.dataFromParent}</h3>
            ]);
        }
    }
}

class EventHeaderNext extends React.Component {
    render() {
        let properties = this.props;
        if (!this.props.dataFromParent) {
            return null;
        } else {
            return ([
                <div key="EventHeaderNext" className={this.props.loadingState ? `loading-new ${this.props.dataFromParent}` : `loaded-new animated fadeInRight ${this.props.dataFromParent}`}>
                    <h3 onClick={() => properties.eventTypeFunction(this.props.dataFromParent)} className={"display-3 text-color mt-0 mb-0 event-header-next"} >{this.props.dataFromParent}</h3>
                </div>
            ]);
        }
    }
}

class DataBlock extends React.Component {
    constructor(){
        super();
        this.state = {
            updating: true,
        };
    };
    render() {
        if (!this.props.dataFromParent) {
            return null;
        } else if (this.props.dataToCompare) {
            return ([
                <div key="DataBlock" className={this.props.loadingState ? `c007-data-block text-color loading-new ${this.props.title} ${this.props.position}` : `c007-data-block text-color loaded-new ${this.props.title} ${this.props.position}`}>
                    <p className="display-4 dataPoint mt-0 mb-0">{this.props.dataFromParent}<small>{this.props.measure}</small></p>
                    <p className="mt-0 mb-0">{this.props.dataToCompare}<small>{this.props.measure}</small></p>
                    <p className="mt-0 mb-0"><strong>{this.props.title}</strong></p>
                </div>
            ]);
        } else {
            return ([
                <div key="DataBlock" className={this.props.loadingState ? `c007-data-block text-color loading-new ${this.props.title} ${this.props.position}` : `c007-data-block text-color loaded-new ${this.props.title} ${this.props.position}`}>
                    <p className="display-4 dataPoint mt-0 mb-0">{this.props.dataFromParent}<small>{this.props.measure}</small></p>
                    <p className="mt-0 mb-0"><strong>{this.props.title}</strong></p>
                </div>
            ]);
        }
    }
}

class DotsNew extends React.Component {
    render() {
        let properties = this.props;
        const eventTypes = this.props.eventTypes;
        const listItems = eventTypes.map((event) =>
            <li key={`keyDotsNew${event}`} className={`keyDotsNew${event}`}></li>
        );
        return (
            <div className={properties.loadingState ? `loading-new` : `loaded-new`}>
                <ul key="DotsNew" className={properties.darkTheme ? `dots theme-dark ${this.props.dataFromParent}` : `dots theme-light ${this.props.dataFromParent}`}>{listItems}</ul>
            </div>
        );
    }
}

class ThumbButtons extends React.Component {
    constructor(){
        super();
        this.state = {
            showButtons:false,
        };
    };
    toggleButtons = () => {
        this.setState({ showButtons: !this.state.showButtons});
    };
    render() {
        let properties = this.props;
        return ([
            <div key={"thumbButtons"} className={this.props.loadingState ? `thumbButtons loading-new` : `thumbButtons loaded-new`}>
                <a key={"ThumbButtonsTrigger"} className="thumbButtons--default thumbButtons--default__more animated fadeIn text-color" onClick={this.toggleButtons}>
                    {this.state.showButtons &&
                    <i className="fa fa-minus"></i>
                    }
                    {!this.state.showButtons &&
                    <i className="fa fa-plus"></i>
                    }
                </a>
                {this.state.showButtons &&
                <div key={"ThumbButtonsWrapper"}>
                    <Buttons eventTypeFunction={properties.eventTypeFunction} eventTypes={this.props.eventTypes} />
                </div>
                }
            </div>
        ]);
    }
}

class Buttons extends React.Component {
    render() {
        let properties = this.props;
        const eventTypes = this.props.eventTypes;
        const listItems = eventTypes.map((event) =>
            <li key={`key${event}`}>
                <a href={`#${event}`}
                   onClick={() => properties.eventTypeFunction(event)}
                   className={`thumbButtons--default thumbButtons--default__${event} animated fadeIn text-color`}
                   title="{event}">
                    {event}
                </a>
            </li>
        );
        return (
            <ul className={"thumbButtons--list"}>{listItems}</ul>
        );
    }
}

class ThemeToggle extends React.Component {
    render() {
        let properties = this.props;
        return (
            <div key={"ThemeToggle"} className={this.props.loadingState ? `loading-new` : `loaded-new`}>
                <button className={properties.darkTheme ? 'theme-toggle theme-dark text-color' : 'theme-toggle theme-light text-color'} onClick={properties.toggleDarkTheme}>
                    {properties.darkTheme ? 'Light' : 'Dark'}
                </button>
            </div>
        );
    }
}

class LatestEvent extends React.Component {
    render() {
        if (!this.props.dataFromParent) {
            return null;
        } else {
            return ([
                <div key={'LatestEvent'} className={this.props.loadingState ? `latest-event loading-new` : `latest-event loaded-new`}>
                    <p className={"text-color"}><strong>Latest:</strong> {this.props.dataFromParent}</p>
                </div>
            ]);
        }
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
