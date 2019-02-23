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
            weight:"",
            bodyfat:"",
            vo2:"",
            showButtons:false,

            isHidden: true,
            showLoading:true,
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

    // toggleButtons = () => {
    //     this.setState({ showButtons: !this.state.showButtons});
    // };

    // statsFunction = (stats) => {
    //     this.setState({showLoading:true});
    //
    //     this.setState({weight: "77"});
    //     this.setState({bodyfat: "10.5"});
    //     this.setState({vo2: "54"});
    //
    //     this.setState({dataToUse: []});
    //     this.setState({dataToUseEvent: "Stats"});
    //     this.setState({dataToUseEventNext: "All"});
    //     this.setState({dataToUseSessions: ""});
    //     this.setState({dataToUseTime: ""});
    //     this.setState({dataToUseDistance: ""});
    //
    //     this.setState({showLoading:false});
    //
    // };

    eventTypeFunction = (eventType) => {
        console.log('es6Function');
        console.log(eventType);
        this.setState({showLoading:true});
        axios.get('https://www.strava.com/api/v3/athlete/activities?after=1538355661&page=1&per_page=200&access_token=6c4884a4196ff4b71d3a58439c23a5adfadad027') // JSON File Path
            .then( response => {
                console.log(response.data);
                let array = this.state.dataToUse;
                console.log('%c AXIOS', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
                console.log(array);
                console.log('%c AXIOS', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');

                this.setState({dataToUseEvent: eventType});
                this.setState({weight: ""});
                this.setState({bodyfat: ""});

                // ---------------
                // SESSIONS
                // ---------------
                let Sessions = array.filter(function (el) {
                    return (el.type === eventType);
                });
                const SessionsTotal = Sessions.length;
                this.setState({dataToUseSessions: SessionsTotal});
                console.log("%c Total Sessions: " + SessionsTotal, "padding:5px 15px;margin:5px;color: #333;border-left:15px solid salmon;font-weight:bold;");

                // ---------------
                // HOURS
                // ---------------
                let trainingHoursTotal = array.filter(function (el) {
                    return (el.type === eventType);
                }).map(function(el){
                    return el.moving_time;
                });
                const trainingHoursTotalFinal = parseInt(trainingHoursTotal.reduce((a, b) => a + b, 0) / 3600);
                this.setState({dataToUseTime: trainingHoursTotalFinal});

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
                this.setState({dataToUseDistance: trainingDistanceTotalKM});


                // Just for cycling virtual sessions
                if(eventType === "Ride") {
                    console.log('need to add virtual stuff');
                    // ---------------
                    // CYCLE SESSIONS - VIRTUAL
                    // ---------------
                    let cycleVirtualSessions = array.filter(function (el) {
                        return (el.type === "VirtualRide");
                    });
                    const cycleVirtualSessionsTotal = cycleVirtualSessions.length;
                    this.setState({dataToUseSessions: (SessionsTotal+cycleVirtualSessionsTotal)});

                    // ---------------
                    // CYCLING HOURS - VIRTUAL
                    // ---------------
                    let cyclesVirtualTimeTotal = array.filter(function (el) {
                        return (el.type === "VirtualRide");
                    }).map(function(el){
                        return el.moving_time;
                    });
                    const cyclesVirtualTimeTotalFinal = parseInt(cyclesVirtualTimeTotal.reduce((a, b) => a + b, 0) / 3600);
                    this.setState({dataToUseTime: (trainingHoursTotalFinal+cyclesVirtualTimeTotalFinal)});

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
                    this.setState({dataToUseDistance: (trainingDistanceTotalKM+cyclesVirtualDistanceTotalKM)});
                }

                if(eventType === "All") {
                    this.setState({dataToUseEvent: this.state.dataToUseEventInitial});
                    this.setState({dataToUseSessions: this.state.dataToUseSessionsInitial});
                    this.setState({dataToUseTime: this.state.dataToUseTimeInitial});
                    this.setState({dataToUseDistance: this.state.dataToUseDistanceInitial});
                    this.setState({dataToUseEventNext: this.state.dataToUseEventNextInitial});
                    this.setState({weight: ""});
                    this.setState({bodyfat: ""});
                    this.setState({vo2: ""});
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
                    this.setState({weight: "77"});
                    this.setState({bodyfat: "10.5"});
                    this.setState({vo2: "54"});
                    this.setState({dataToUseEvent: "Stats"});
                    this.setState({dataToUseEventNext: "All"});
                    this.setState({dataToUseSessions: ""});
                    this.setState({dataToUseTime: ""});
                    this.setState({dataToUseDistance: ""});
                }

                this.setState({showLoading:false});

            })
            .catch(function (error) {
                console.log(error);
            });
    };

    toggleDarkTheme = () => {
        this.setState({ darkTheme: !this.state.darkTheme });
    };

    componentWillMount() {
        //console.log('%c componentWillMount', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        this.setState({showLoading:true});
        // axios.get('https://www.strava.com/api/v3/athlete/activities?after=1538355661&page=1&per_page=200&access_token=6c4884a4196ff4b71d3a58439c23a5adfadad027') // JSON File Path
        //     .then( response => {
        //         console.log(response.data);
        //         let array = $.map(response.data, function(value, index) {
        //             return [value];
        //         });
        //         console.log('%c AXIOS', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        //         console.log(array);
        //         console.log('%c AXIOS', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        //
        //         this.setState({dataToUse: array});
        //         this.setState({dataToUseEvent: "All"});
        //         this.setState({dataToUseEventInitial: "All"});
        //         this.setState({dataToUseEventNext: "Swim"});
        //         this.setState({dataToUseEventNextInitial: "Swim"});
        //
        //         // ---------------
        //         // SESSIONS
        //         // ---------------
        //         let Sessions = array.filter(function (el) {
        //             return el;
        //         });
        //         const SessionsTotal = Sessions.length;
        //         this.setState({dataToUseSessions: SessionsTotal});
        //         this.setState({dataToUseSessionsInitial: SessionsTotal});
        //
        //         // ---------------
        //         // HOURS
        //         // ---------------
        //         let trainingHoursTotal = array.map(function(el){
        //             return el.moving_time;
        //         });
        //         const trainingHoursTotalFinal = parseInt(trainingHoursTotal.reduce((a, b) => a + b, 0) / 3600);
        //         this.setState({dataToUseTime: trainingHoursTotalFinal});
        //         this.setState({dataToUseTimeInitial: trainingHoursTotalFinal});
        //
        //         // ---------------
        //         // DISTANCES
        //         // ---------------
        //         let trainingDistanceTotal = array.map(function(el){
        //             return el.distance;
        //         });
        //
        //         // -------------------
        //         // DISTANCES TO KM
        //         // -------------------
        //         let trainingDistanceTotalKM = parseInt(trainingDistanceTotal.reduce((a, b) => a + b, 0) / 1000);
        //         this.setState({dataToUseDistance: trainingDistanceTotalKM});
        //         this.setState({dataToUseDistanceInitial: trainingDistanceTotalKM});
        //
        //         setTimeout(() => {
        //             this.setState({showLoading:false});
        //         }, 150);
        //
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        axios.all([axios.get(`https://www.strava.com/api/v3/athlete/activities?after=1538355661&page=1&per_page=200&access_token=6c4884a4196ff4b71d3a58439c23a5adfadad027`),
            axios.get(`https://www.strava.com/api/v3/athlete/activities?after=1538355661&page=2&per_page=200&access_token=6c4884a4196ff4b71d3a58439c23a5adfadad027`)])
            .then(axios.spread((firstResponse, secondResponse) => {
                console.log(firstResponse.data);
                console.log(secondResponse.data);

                let firstData = firstResponse.data;
                let secondData = secondResponse.data;
                let allData = firstData.concat(secondData);

                let array = $.map(allData, function(value, index) {
                    return [value];
                });

                this.setState({dataToUse: array});
                this.setState({dataToUseEvent: "All"});
                this.setState({dataToUseEventInitial: "All"});
                this.setState({dataToUseEventNext: "Swim"});
                this.setState({dataToUseEventNextInitial: "Swim"});
                this.setState({weight: ""});
                this.setState({bodyfat: ""});
                this.setState({vo2: ""});

                // ---------------
                // SESSIONS
                // ---------------
                let Sessions = array.filter(function (el) {
                    return el;
                });
                const SessionsTotal = Sessions.length;
                this.setState({dataToUseSessions: SessionsTotal});
                this.setState({dataToUseSessionsInitial: SessionsTotal});

                // ---------------
                // HOURS
                // ---------------
                let trainingHoursTotal = array.map(function(el){
                    return el.moving_time;
                });
                const trainingHoursTotalFinal = parseInt(trainingHoursTotal.reduce((a, b) => a + b, 0) / 3600);
                this.setState({dataToUseTime: trainingHoursTotalFinal});
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
                this.setState({dataToUseDistance: trainingDistanceTotalKM});
                this.setState({dataToUseDistanceInitial: trainingDistanceTotalKM});

                setTimeout(() => {
                    this.setState({showLoading:false});
                }, 150);

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
        console.log('%c render', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        console.log(this.state.dataToUse);
        console.log('%c render END', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        // This is what the user will see on screen
        // Some basic markup
        // We pass from the parent component to the child component the state so they can use this data as well
        return ([

                <main className={this.state.darkTheme ? '' : ''} key="mainWrapper">

                    <div className={this.state.showLoading ? 'loader-wrapper loading-new-reverse' : 'loader-wrapper loaded-new-reverse'}>
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>

                    <div className={`background blurred ${this.state.dataToUseEvent}`}>&nbsp;</div>
                    <div className={`background-mask ${this.state.dataToUseEvent}`}>&nbsp;</div>

                    <EventHeader dataFromParent={this.state.dataToUseEvent} loadingState={this.state.showLoading} />
                    <div className={"data-wrapper"}>
                        <DataBlock title="Sessions" dataFromParent={this.state.dataToUseSessions} loadingState={this.state.showLoading} />
                        <DataBlock title="Time" measure={"hrs"} dataFromParent={this.state.dataToUseTime} loadingState={this.state.showLoading} />
                        <DataBlock title="Distance" measure="km" dataFromParent={this.state.dataToUseDistance} loadingState={this.state.showLoading} />

                        <DataBlock title="Weight" measure="KG" dataFromParent={this.state.weight} loadingState={this.state.showLoading} />
                        <DataBlock title="Bodyfat" measure="%" dataFromParent={this.state.bodyfat} loadingState={this.state.showLoading} />
                        <DataBlock title="VO2" position={"point3"} measure="max" dataFromParent={this.state.vo2} loadingState={this.state.showLoading} />
                    </div>
                    <EventHeaderNext dataFromParent={this.state.dataToUseEventNext} loadingState={this.state.showLoading} eventTypeFunction={this.eventTypeFunction} />

                    <Dots dataFromParent={this.state.dataToUseEvent} loadingState={this.state.showLoading} />

                    <ThumbButtons loadingState={this.state.showLoading} eventTypeFunction={this.eventTypeFunction} />



                    <div className={`background All d-none`}>&nbsp;</div>
                    <div className={`background Swim d-none`}>&nbsp;</div>
                    <div className={`background Ride d-none`}>&nbsp;</div>
                    <div className={`background Run d-none`}>&nbsp;</div>

                </main>
        ]);
    }

}

class TitleH3 extends React.Component {
    render() {
        if (!this.props.dataFromParent.companyName) {
            return null;
        } else {
            return ([
                <h3 key="h3" className={this.props.loadingState ? 'h3-responsive loading-new' : 'h3-responsive loaded-new'}>{this.props.dataFromParent.companyName}</h3>
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
                <h3 key="EventHeader" className={this.props.loadingState ? `display-3 text-white mt-0 mb-0 loading-new event-header ${this.props.dataFromParent}` : `display-3 text-white mt-0 mb-0 loaded-new event-header ${this.props.dataFromParent}`}>{this.props.dataFromParent}</h3>
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
                    <h3 onClick={() => properties.eventTypeFunction(this.props.dataFromParent)} className={"display-3 text-white mt-0 mb-0 event-header-next"} >{this.props.dataFromParent}</h3>
                </div>
            ]);
        }
    }
}

class DataBlock extends React.Component {
    render() {
        if (!this.props.dataFromParent) {
            return null;
        } else {
            return ([
                <div key="DataBlock" className={this.props.loadingState ? `c007-data-block loading-new text-white ${this.props.title} ${this.props.position}` : `c007-data-block loaded-new text-white animated fadeInUp ${this.props.title} ${this.props.position}`}>
                    <p className="display-4 dataPoint mt-0 mb-0">{this.props.dataFromParent}{this.props.measure}</p>
                    <p className="mt-0 mb-0"><strong>{this.props.title}</strong></p>
                </div>
            ]);
        }
    }
}

class Dots extends React.Component {
    render() {
        if (!this.props.dataFromParent) {
            return null;
        } else {
            return ([

                <ul key="Dots" className={this.props.loadingState ? `dots ${this.props.dataFromParent} loading-newOFF` : `dots ${this.props.dataFromParent} loaded-newOFF`}>
                    <li>&nbsp;</li>
                    <li>&nbsp;</li>
                    <li>&nbsp;</li>
                    <li>&nbsp;</li>
                    <li>&nbsp;</li>
                </ul>
            ]);
        }
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
            <div className={"thumbButtons"}>
                <a className="thumbButtons--default thumbButtons--default__more animated fadeIn" onClick={this.toggleButtons}>
                    {this.state.showButtons &&
                    <i className="fa fa-minus"></i>
                    }
                    {!this.state.showButtons &&
                    <i className="fa fa-plus"></i>
                    }
                </a>
                {this.state.showButtons &&
                <div>
                    <Buttons eventTypeFunction={properties.eventTypeFunction} />
                </div>
                }
            </div>
        ]);
    }
}

class Buttons extends React.Component {
    render() {
        let properties = this.props;
        let eventTypes = ['All','Swim','Ride','Run','Stats'];
        return ([
            <ul key={"Buttons"}>
                <li>
                    <a href={"#"} onClick={() => properties.eventTypeFunction('All')}
                       className="thumbButtons--default thumbButtons--default__all animated fadeIn"
                       title="All">All</a>
                </li>
                <li>
                    <a href={"#"} onClick={() => properties.eventTypeFunction('Swim')}
                       className="thumbButtons--default thumbButtons--default__swim animated fadeIn"
                       title="Swim">Swim</a>
                </li>
                <li>
                    <a href={"#"} onClick={() => properties.eventTypeFunction('Ride')}
                       className="thumbButtons--default thumbButtons--default__bike animated fadeIn"
                       title="Ride">Ride</a>
                </li>
                <li>
                    <a href={"#"} onClick={() => properties.eventTypeFunction('Run')}
                       className="thumbButtons--default thumbButtons--default__run animated fadeIn"
                       title="Run">Run</a>
                </li>
                <li>
                    <a href={"#"} onClick={() => properties.eventTypeFunction('Stats')}
                       className="thumbButtons--default thumbButtons--default__stats animated fadeIn"
                       title="Stats">Stats</a>
                </li>
                {/*{*/}
                    {/*eventTypes.map(function (item, i) {*/}
                        {/*return (<li>*/}
                            {/*<a href={"#"} onClick={() => properties.eventTypeFunction({item})}*/}
                               {/*className={`thumbButtons--default thumbButtons--default__${item} animated fadeIn`}*/}
                               {/*title="Stats">{item}</a>*/}
                        {/*</li>)*/}
                    {/*})*/}
                {/*}*/}
            </ul>
        ]);
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
