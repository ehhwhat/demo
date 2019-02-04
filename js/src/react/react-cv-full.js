console.log("%c react-cv-full.js CALLED", "padding:15px;margin:5px;color: #333;border-left:5px solid rebeccapurple;");


class App extends React.Component {

    constructor(){
        super();
        // Bind the this context to the handler function
        this.handler = this.handler.bind(this);
        this.state = {
            dataToUse: [
                { }
            ],
            isHidden: true,
            fullCV: false,
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

    toggleHidden () {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    toggleFullCV = () => {
        this.setState({ fullCV: !this.state.fullCV });
    };

    toggleDarkTheme = () => {
        this.setState({ darkTheme: !this.state.darkTheme });
    };

    componentWillMount() {
        console.log('%c componentWillMount', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        this.setState({showLoading:true});
        axios.get('https://cvdata-fe562.firebaseio.com/.json') // JSON File Path
            .then( response => {
                let array = $.map(response.data, function(value, index) {
                    return [value];
                });
                console.log('%c AXIOS', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
                console.log(array);
                console.log('%c AXIOS', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
                this.setState({dataToUse: array[0]});
                this.setState({showLoading:false});
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log('%c componentWillMount END', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
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
            <div className={this.state.showLoading ? 'loading-new' : 'loaded-new'} key="divWrapper">

                <nav className={this.state.darkTheme ? 'navbar navbar-expand-lg navbar-dark bg-dark fixed-top scrolling-navbar' : 'navbar navbar-expand-lg navbar-dark' +
                    ' bg-dark fixed-top scrolling-navbar'}>
                    <div className="container">
                        <a className="navbar-brand d-none d-sm-block" href="../index.html">
                            <i className="fa fa-home" aria-hidden="true"></i>
                        </a>
                        <a className="navbar-brand" href="#top">
                            <strong>BPK</strong>
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-content" aria-controls="navbar-content" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbar-content">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item d-block d-sm-none">
                                    <a className="nav-link" href="../index.html"><i className="fa fa-home" aria-hidden="true"></i></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#introduction">Introduction</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#skills">Skills</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#projects">Key projects</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#clients">Clients</a>
                                </li>
                                {this.state.fullCV &&
                                <li className="nav-item">
                                    <a className="nav-link" href="#interests">Interests</a>
                                </li>
                                }
                                {this.state.fullCV &&
                                <li className="nav-item">
                                    <a className="nav-link" href="#demo">Demo details</a>
                                </li>
                                }
                            </ul>
                            <ul className="navbar-nav ml-auto nav-flex-icons">
                                <li className="nav-item">
                                    <a href="#root" className={this.state.fullCV ? 'nav-link waves-effect waves-light' : 'nav-link waves-effect waves-light'} onClick={this.toggleFullCV}>
                                        {this.state.fullCV ? 'Show concise CV' : 'Show full CV'}
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#root" className={this.state.darkTheme ? 'nav-link waves-effect waves-light' : 'nav-link waves-effect waves-light'} onClick={this.toggleDarkTheme}>
                                        {this.state.darkTheme ? 'Default' : 'Night Mode'}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <main className={this.state.darkTheme ? 'bg-night-mode' : 'bg-white'} key="mainWrapper">

                    <div className="container-fluid py-5">

                        <div className="row">

                            <div id="introduction" className={this.state.fullCV ? 'container' : 'container'}>
                                <div className="row">
                                    <div className={this.state.fullCV ? 'col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3' : 'col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3'}>
                                        <div className="c001-basic-content">

                                            <Title dataFromParent={this.state.dataToUse} />

                                            {this.state.fullCV &&
                                                <p>
                                                    <Available dataFromParent={this.state.dataToUse}/><br/>
                                                    <Location dataFromParent={this.state.dataToUse}/><br/>
                                                    <LocationWanted dataFromParent={this.state.dataToUse}/><br/>
                                                    <span className="badge badge-pill badge-secondary animated bounceIn">ver 4.0</span>
                                                </p>
                                            }

                                            <Summary dataFromParent={this.state.dataToUse}  />

                                            {this.state.fullCV &&
                                                <div className="animated bounceIn">
                                                    <SummaryOfMe dataFromParent={this.state.dataToUse}/>
                                                </div>
                                            }

                                        </div>
                                    </div>
                                </div>
                                {this.state.fullCV &&
                                <div className="row">
                                    <div className="col-12">
                                        <div className="c006-image-block grid mb-5">
                                            <div className="grid-item wow fadeIn animated">
                                                <img  src="../../img/app/triathlon/self/norm.jpg" className="img-fluid grayscale" alt="Me" />
                                            </div>
                                            <div className="grid-item wow fadeIn animated">
                                                <img  src="../../img/app/triathlon/self/swim.jpg" className="img-fluid grayscale" alt="Swim" />
                                            </div>
                                            <div className="grid-item wow fadeIn animated">
                                                <img  src="../../img/app/triathlon/self/bike.jpg" className="img-fluid grayscale" alt="Bike" />
                                            </div>
                                            <div className="grid-item wow fadeIn animated">
                                                <img  src="../../img/app/triathlon/self/run.jpg" className="img-fluid grayscale" alt="Run" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>

                            <div className="container c004-divider">
                                <div className="row">
                                    <div className="col-md-12">
                                        <hr className="section-divider" />
                                    </div>
                                </div>
                            </div>

                            {this.state.fullCV &&
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                            <ThingsToNote dataFromParent={this.state.dataToUse.thingsToNote}/>
                                        </div>
                                    </div>
                                    <div className="row c004-divider">
                                        <div className="col-md-12">
                                            <hr className="section-divider" />
                                        </div>
                                    </div>
                                </div>
                            }

                            <div id="skills" className="container">
                                <div className="row">
                                    <div className={this.state.fullCV ? 'col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3' : 'col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3'}>
                                        <div className="c001-basic-content">
                                            <TitleH1 key="TitleH1Skills" dataFromParent="Skills"/>
                                            <TitleH2 key="TitleH2Skills" dataFromParent="Technologies, techniques and languages I have experience of or have built my career around"/>

                                            <TitleH3 key="TitleH3Skills" dataFromParent="Primary"/>
                                            <p className="">Core skills used on a daily basis over a good 10 years of career.</p>
                                            <Skills dataFromParent={this.state.dataToUse.primarySkills} dataFromParentViewType="alt" />
                                            {this.state.fullCV &&
                                                <div className="animated fadeIn">
                                                    <TitleH3 dataFromParent="Secondary"/>
                                                    <p className="">Skills used but not very regularly, maybe in a personal project or through my own learning.</p>
                                                    <Skills dataFromParent={this.state.dataToUse.secondarySkills} dataFromParentViewType="alt" />

                                                    <TitleH3 dataFromParent="Worked with"/>
                                                    <p className="">Skills / software used / techniques used / familiar with.</p>
                                                    <Skills dataFromParent={this.state.dataToUse.workedWithSkills} dataFromParentViewType="alt" />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="container c004-divider">
                                <div className="row">
                                    <div className="col-md-12">
                                        <hr className="section-divider" />
                                    </div>
                                </div>
                            </div>

                            <div id="projects" className="container">
                                <div className="row">
                                    <div className={this.state.fullCV ? 'col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3' : 'col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3'}>
                                        <TitleH1 key="TitleH1projects" dataFromParent="Key projects"/>
                                        <TitleH2 key="TitleH2projects" dataFromParent="Examples of work I`ve been involved in"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <KeyProjects dataFromParent={this.state.dataToUse} />
                                    </div>
                                </div>
                            </div>

                            <div className="container c004-divider">
                                <div className="row">
                                    <div className="col-md-12">
                                        <hr className="section-divider" />
                                    </div>
                                </div>
                            </div>

                            <div id="clients" className="container">
                                <div className="row">
                                    <div className={this.state.fullCV ? 'col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3' : 'col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3'}>
                                        <TitleH1 key="TitleH1Clients" dataFromParent="Clients"/>
                                        <TitleH2 key="TitleH2Clients" dataFromParent="Companies i have worked with"/>
                                        <p>A list of all the major companies i have worked with on various projects.</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <ClientsLogos dataFromParent={this.state.dataToUse} />
                                    </div>
                                </div>
                            </div>

                            <div className="container c004-divider">
                                <div className="row">
                                    <div className="col-md-12">
                                        <hr className="section-divider" />
                                    </div>
                                </div>
                            </div>

                            {this.state.fullCV &&
                            <div id="interests" className="container">
                                <div className="row my-5">
                                    <div className={this.state.fullCV ? 'col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3' : 'col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3'}>
                                        <TitleH1 key="TitleH1Interests" dataFromParent="Interests"/>
                                        <TitleH2 key="TitleH2Interests" dataFromParent="Any and everything i am into"/>
                                        <Interests dataFromParent={this.state.dataToUse}/>
                                    </div>
                                </div>
                            </div>
                            }

                        </div>

                    </div>

                    {this.state.fullCV &&
                    <div id="demo" className="container-fluid bg-secondary py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                    <TitleH1 key="TitleH1Demo" dataFromParent="Demo details"/>
                                    <TitleH2 key="TitleH2Demo" dataFromParent="Information on how this React demo works"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <DemoDetails />
                                </div>
                            </div>
                        </div>
                    </div>
                    }

                </main>

                <footer className={this.state.darkTheme ? 'page-footer font-small bg-dark' : 'page-footer font-small bg-dark'}>
                    <div className="footer-copyright text-center py-3">
                        <ul className="list-inline my-0">
                            <li className="list-inline-item"><a href="../index.html">Home</a></li>
                            <li className="list-inline-item"><a href="#root"><strong>React CV</strong></a></li>
                        </ul>
                    </div>
                </footer>
            </div>
        ]);
    }

}

class Title extends React.Component {
    render() {
        return ([
            <h1 className="display-4" key="titleName">{this.props.dataFromParent.name}</h1>,
            <h2 className="display-5 text-muted" key="titleJob">{this.props.dataFromParent.role}</h2>,
        ]);
    }
}

class SubTitle extends React.Component {
    render() {
        return ([
            <div className="text-center" key="SubTitle">
                <h2 className="display-3 mt-5 mb-2">{this.props.dataFromParent}</h2>
                <hr className="mb-4"/>
            </div>
        ]);
    }
}

class SubSubTitle extends React.Component {
    render() {
        return ([
            <h3 className="display-4 mt-2 mb-2" key="SubSubTitle">{this.props.dataFromParent}</h3>
        ]);
    }
}

class CardTitle extends React.Component {
    render() {
        return ([
            <h3 className="display-3 mt-2 mb-2" key="CardTitle">{this.props.dataFromParent}</h3>
        ]);
    }
}

class CardSubTitle extends React.Component {
    render() {
        return ([
            <h3 className="mt-5" key="CardSubTitle">{this.props.dataFromParent}</h3>
        ]);
    }
}

class TitleH1 extends React.Component {
    render() {
        return ([
            <h1 className="display-4" key="titleName">{this.props.dataFromParent}</h1>
        ]);
    }
}

class TitleH2 extends React.Component {
    render() {
        return ([
            <h2 className="display-5 text-muted" key="TitleH2">{this.props.dataFromParent}</h2>
        ]);
    }
}

class TitleH3 extends React.Component {
    render() {
        return ([
            <h3 className="mt-5" key="TitleH3">{this.props.dataFromParent}</h3>
        ]);
    }
}

class Available extends React.Component {
    render() {
        console.log('%c Available', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        console.log(this.props.dataFromParent.available);
        console.log('%c Available END', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        return ([
            <span className="animated bounceIn" key="available">Available from: <strong className="text-success">{this.props.dataFromParent.available}</strong></span>
        ]);
    }
}

class Location extends React.Component {
    render() {
        console.log('%c Location', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        console.log(this.props.dataFromParent.location);
        console.log('%c Location END', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        return ([
            <span className="animated bounceIn" key="Location">Based in: <strong>{this.props.dataFromParent.location}</strong></span>
        ]);
    }
}

class LocationWanted extends React.Component {
    render() {
        console.log('%c locationWanted', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        console.log(this.props.dataFromParent.locationWanted);
        console.log('%c locationWanted END', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        return ([
            <span className="animated bounceIn" key="LocationWanted">Roles in: <strong>{this.props.dataFromParent.locationWanted[0]}</strong>, <strong>{this.props.dataFromParent.locationWanted[1]}</strong> or <strong>{this.props.dataFromParent.locationWanted[2]}</strong></span>
        ]);
    }
}

class Summary extends React.Component {
    render() {
        console.log('%c Summary', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        console.log(this.props.dataFromParent.summary);
        console.log('%c Summary END', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        return ([
            <div key="Summary">
                <div className="" dangerouslySetInnerHTML={ { __html: this.props.dataFromParent.summary } }></div>
            </div>
        ]);
    }
}

class SummaryOfMe extends React.Component {
    render() {
        console.log('%c SummaryOfMe', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        console.log(this.props.dataFromParent.summaryOfMe);
        console.log('%c SummaryOfMe END', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        return ([
            <div key="SummaryOfMe">
                <span className="" dangerouslySetInnerHTML={ { __html: this.props.dataFromParent.summaryOfMe } }></span>
            </div>
        ]);
    }
}

class Skills extends React.Component {
    render() {
        console.log('%c Skills', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        console.log(this.props.dataFromParent);
        console.log('%c Skills END', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        let array = $.map(this.props.dataFromParent, function(value, index) {
            return [value];
        });

        if(this.props.dataFromParentViewType === "alt") {
            return (
                <ul className="">
                    {
                        array.map(function (item, i) {
                            return <li key={i} id={i} className="">{item}</li>
                        })
                    }
                </ul>
            )
        } else {
            return (
                <ul className="">
                    {
                        array.map(function (item, i) {
                            return <li key={i} id={i} className="">{item}</li>
                        })
                    }
                </ul>
            )
        }

    }
}

class Clients extends React.Component {
    render() {
        console.log('%c Clients', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        console.log(this.props.dataFromParent.clients);
        console.log('%c Clients END', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        let array = $.map(this.props.dataFromParent.clients, function(value, index) {
            return [value];
        });

        return (
            <tr>
                {
                    array.map(function (item, i) {
                        return <td key={i} id={i} className="">{item}</td>
                    })
                }
            </tr>
        )
    }
}

class ClientsLogos extends React.Component {
    render() {
        console.log('%c ClientsLogos', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        console.log(this.props.dataFromParent.clientLogos);
        console.log('%c ClientsLogos END', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        let array = $.map(this.props.dataFromParent.clientLogos, function(value, index) {
            return [value];
        });

        return (
            <div className="row text-center  justify-content-center">
                {
                    array.map(function (item, i) {
                        return <div key={i} id={i} className={"clientLogos col-6 col-md-2 wow fadeIn animated " +i+ "00"}><img className="mb-4" src={item} /></div>
                    })
                }
            </div>
        )
    }
}

class KeyProjects extends React.Component {

    constructor(){
        super();
        this.state = {
            showAll: false,
        };
    };

    toggleShowAll = () => {
        this.setState({ showAll: !this.state.showAll });
    };

    render() {
        console.log('%c KeyProjects', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        console.log(this.props.dataFromParent.projects);
        console.log('%c KeyProjects END', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');

        let array = $.map(this.props.dataFromParent.projects, function(value, index) {
            return [value];
        });

        let amountToShow = "";
        if(this.state.showAll === false) {
            amountToShow = 6;
        } else if(this.state.showAll === true) {
            amountToShow = 999999;
        }

        return (
            <div>
                <div className="card-columns keyProjects">
                    {
                        array.slice(0, amountToShow).map(function (item, i) {

                            let color = "";
                            if(item[0] === "Cashplus") {
                                color = "bg-cashplus";
                            } else if(item[0] === "npower") {
                                color = "bg-npower";
                            } else if(item[0] === "ICAEW") {
                                color = "bg-icaew";
                            } else if(item[0] === "Homeserve PLC" || "Homeserve HML") {
                                color = "bg-homeserve";
                            }  else {
                                color = "be-muted";
                            }

                            return <div className={"card c012-card my-3 animated fadeIn delay" +i+"00"} key={i} id={i}>
                                <div id={"proj-"+item[0]} className={"card-header " + color}>
                                    <h3 className="h3-responsive"><span dangerouslySetInnerHTML={ { __html: item[0] } }></span></h3>
                                    <h5 className="h5-responsive"><span dangerouslySetInnerHTML={ { __html: item[4] } }></span></h5>
                                </div>
                                <div className="card-body">
                                    <div dangerouslySetInnerHTML={ { __html: item[5] } }></div>
                                </div>
                                <div className="card-footer">
                                    <p>{item[2]} | {item[1]}</p>
                                </div>
                            </div>
                        })
                    }
                    <div className="text-center">
                        <button className={this.state.showAll ? 'btn btn-outline-dark waves-effect' : 'btn btn-outline-dark waves-effect'} onClick={this.toggleShowAll}>
                            {this.state.showAll ? 'Show less' : 'Show more'}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

class Interests extends React.Component {
    render() {
        console.log('%c Interests', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        console.log(this.props.dataFromParent.interests);
        console.log('%c Interests END', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');

        let array = $.map(this.props.dataFromParent.interests, function(value, index) {
            return [value];
        });

        return (
            <ul className="list-inline">
                {
                    array.map(function (item, i) {
                        return <li key={i} id={i} className="list-inline-item mr-3">{item}</li>
                    })
                }
            </ul>
        )
    }
}

class Links extends React.Component {

    render() {
        console.log('%c Links', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        console.log(this.props.dataFromParent);
        console.log('%c Links END', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');

        let array = $.map(this.props.dataFromParent, function(value, index) {
            return [value];
        });

        return (
            <ul className="list-inline">
                {
                    array.map(function (item, i) {
                        return <li key={i} id={i} className="list-inline-item"><a className="btn btn-primary" href={item[1]}>{item[0]}</a></li>
                    })
                }
            </ul>
        )
    }
}

class ThingsToNote extends React.Component {

    render() {
        console.log('%c ThingsToNote', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        console.log(this.props.dataFromParent);
        console.log('%c ThingsToNote END', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');

        return (
            <div className="c014-blockquote wow fadeIn">
                <blockquote className="">
                    <p className="lead">{this.props.dataFromParent}</p>
                </blockquote>
            </div>
        )
    }
}

class DemoDetails extends React.Component {

    constructor(){
        super();
        this.state = {
            data: [
                "Axios to pull json data to state of parent component",
                "Passing of parent data to child components using props, sometimes all data"
            ],
            general: [
                "Multiple components created using 'extends React.Component'",
                "Multiple use of same component with different data, see SubTitle or Skills",
                "Toggling of state to show and hide items, see KeyProjects",
                "Togging of className dependant upon state value",
                "Rendering of HTML from inside JSON using 'dangerouslySetInnerHTML_'",
                "Rendering child component within child component, see SubSubTitle inside DemoDetails"
            ],
            js: [
                ".map to return data to render()",
                ".slice to limit number of returned items (https://stackoverflow.com/questions/42374873/limit-items-in-a-map-loop)",
                "If statements to look at data from this.state"
            ],
            showAll: false,
        };
    };

    toggleShowAll = () => {
        this.setState({ showAll: !this.state.showAll });
    };

    render() {
        console.log('%c DemoDetails', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        console.log(this.state);
        console.log('%c DemoDetails END', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');

        return (
            <div className="row">
                {this.state.showAll &&
                <div className="col-12 col-sm-12 col-md-4 mb-5">
                    <div className="card c012-card animated fadeIn">
                        <div className="card-header">
                            <h3 className="h3-responsive">General</h3>
                        </div>
                        <div className="card-body">
                            {
                                this.state.general.map(function (item, i) {
                                    return <p key={i} id={i} className="">{item}</p>
                                })
                            }
                        </div>
                    </div>
                </div>
                }
                {this.state.showAll &&
                <div className="col-12 col-sm-12 col-md-4 mb-5">
                    <div className="card c012-card animated fadeIn">
                        <div className="card-header">
                            <h3 className="h3-responsive">Data related</h3>
                        </div>
                        <div className="card-body">
                            {
                                this.state.data.map(function (item, i) {
                                    return <p key={i} id={i} className="">{item}</p>
                                })
                            }
                        </div>
                    </div>
                </div>
                }
                {this.state.showAll &&
                <div className="col-12 col-sm-12 col-md-4 mb-5">
                    <div className="card c012-card animated fadeIn">
                        <div className="card-header">
                            <h3 className="h3-responsive">Javascript</h3>
                        </div>
                        <div className="card-body">
                            {
                                this.state.js.map(function (item, i) {
                                    return <p key={i} id={i} className="">{item}</p>
                                })
                            }
                        </div>
                    </div>
                </div>
                }
                <div className="col-12">
                    <div className="text-center">
                        <button className={this.state.showAll ? 'btn btn-outline-dark waves-effect' : 'btn btn-outline-dark waves-effect'} onClick={this.toggleShowAll}>
                            {this.state.showAll ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
            </div>

        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
