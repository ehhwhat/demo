console.log("%c react-projects.js CALLED", "padding:15px;margin:5px;color: #333;border-left:5px solid rebeccapurple;");

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

    toggleHeader = () => {
        this.setState({showLoading:true});
        axios.get('https://projects-b37dc.firebaseio.com/.json') // JSON File Path
            .then( response => {
                let array = $.map(response.data, function(value, index) {
                    return [value];
                });
                this.setState({dataToUse: array[0]});
                this.setState({showLoading:false});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    toggleSearch = () => {
        this.setState({showLoading:true});
        axios.get('https://projects-b37dc.firebaseio.com/.json') // JSON File Path
            .then( response => {
                let array = $.map(response.data, function(value, index) {
                    return [value];
                });
                this.setState({dataToUse: array[1]});
                this.setState({showLoading:false});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    togglePartnerPortal = () => {
        this.setState({showLoading:true});
        axios.get('https://projects-b37dc.firebaseio.com/.json') // JSON File Path
            .then( response => {
                let array = $.map(response.data, function(value, index) {
                    return [value];
                });
                this.setState({dataToUse: array[2]});
                this.setState({showLoading:false});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    toggleTransactionEnrichment = () => {
        this.setState({showLoading:true});
        axios.get('https://projects-b37dc.firebaseio.com/.json') // JSON File Path
            .then( response => {
                let array = $.map(response.data, function(value, index) {
                    return [value];
                });
                this.setState({dataToUse: array[3]});
                this.setState({showLoading:false});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    toggleHomeserveUSA = () => {
        this.setState({showLoading:true});
        axios.get('https://projects-b37dc.firebaseio.com/.json') // JSON File Path
            .then( response => {
                let array = $.map(response.data, function(value, index) {
                    return [value];
                });
                this.setState({dataToUse: array[4]});
                this.setState({showLoading:false});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    toggleHomeserveSpain = () => {
        this.setState({showLoading:true});
        axios.get('https://projects-b37dc.firebaseio.com/.json') // JSON File Path
            .then( response => {
                let array = $.map(response.data, function(value, index) {
                    return [value];
                });
                this.setState({dataToUse: array[5]});
                this.setState({showLoading:false});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    toggleHomeserveHML = () => {
        this.setState({showLoading:true});
        axios.get('https://projects-b37dc.firebaseio.com/.json') // JSON File Path
            .then( response => {
                let array = $.map(response.data, function(value, index) {
                    return [value];
                });
                this.setState({dataToUse: array[6]});
                this.setState({showLoading:false});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    toggleNpower = () => {
        this.setState({showLoading:true});
        axios.get('https://projects-b37dc.firebaseio.com/.json') // JSON File Path
            .then( response => {
                let array = $.map(response.data, function(value, index) {
                    return [value];
                });
                this.setState({dataToUse: array[7]});
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
        console.log('%c componentWillMount', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
        this.setState({showLoading:true});
        axios.get('https://projects-b37dc.firebaseio.com/.json') // JSON File Path
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
            <div className={this.state.showLoading ? 'loading-newOFF' : 'loaded-newOFF'} key="divWrapper">

                <nav className={this.state.darkTheme ? 'navbar navbar-expand-lg navbar-dark bg-dark fixed-top scrolling-navbar' : 'navbar navbar-expand-lg navbar-dark bg-dark fixed-top scrolling-navbar'}>
                    <div className="container">
                        <a className="navbar-brand d-none d-sm-block" href="../index.html">
                            <i className="fa fa-home" aria-hidden="true"></i>
                        </a>
                        <a className="navbar-brand" href="#top">
                            <strong>Projects</strong>
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-content" aria-controls="navbar-content" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbar-content">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item d-block d-sm-none">
                                    <a className="nav-link" href="../index.html"><i className="fa fa-home" aria-hidden="true"></i></a>
                                </li>
                                <li className="nav-item"><span className="navbar-text">ICAEW</span></li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={this.toggleHeader}>1</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={this.toggleSearch}>2</a>
                                </li>
                                <li className="nav-item"><span className="navbar-text">Cashplus</span></li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={this.togglePartnerPortal}>1</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={this.toggleTransactionEnrichment}>2</a>
                                </li>
                                <li className="nav-item"><span className="navbar-text">Homeserve</span></li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={this.toggleHomeserveUSA}>1</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={this.toggleHomeserveSpain}>2</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={this.toggleHomeserveHML}>3</a>
                                </li>
                                <li className="nav-item"><span className="navbar-text">npower</span></li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={this.toggleNpower}>1</a>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto nav-flex-icons">
                                <li className="nav-item">
                                    <a href="#root" className={this.state.fullCV ? 'nav-link waves-effect waves-light' : 'nav-link waves-effect waves-light'} onClick={this.toggleFullCV}>
                                        {this.state.fullCV ? 'Show concise CV' : 'Show full CV'}
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#root" className={this.state.darkTheme ? 'nav-link waves-effect waves-light' : 'nav-link waves-effect waves-light'} onClick={this.toggleDarkTheme}>
                                        {this.state.darkTheme ? 'Default' : 'Accessible'}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <main className={this.state.darkTheme ? 'bg-accessible' : 'bg-white'} key="mainWrapper">

                    <div className={this.state.showLoading ? 'loader-wrapper loading-new2' : 'loader-wrapper loaded-new2'}>
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>

                    <div className="container-fluid c002-image-content-cta pt-5">
                        <div className="row">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                        <Logo dataFromParent={this.state.dataToUse} loadingState={this.state.showLoading} />
                                        <TitleH3 dataFromParent={this.state.dataToUse} loadingState={this.state.showLoading} />
                                        <TitleH4 dataFromParent={this.state.dataToUse} loadingState={this.state.showLoading} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ProjectImage dataFromParent={this.state.dataToUse} loadingState={this.state.showLoading}  />
                        <div className="row">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                        <ProjectDescription dataFromParent={this.state.dataToUse} loadingState={this.state.showLoading} />
                                        <ProjectRole dataFromParent={this.state.dataToUse} loadingState={this.state.showLoading} />
                                        <ProjectTech dataFromParent={this.state.dataToUse} loadingState={this.state.showLoading} />
                                        <ProjectMeta dataFromParent={this.state.dataToUse} loadingState={this.state.showLoading} />
                                        <ProjectLink dataFromParent={this.state.dataToUse} loadingState={this.state.showLoading} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container c004-divider ">
                        <div className="row">
                            <div className="col-md-12">
                                <hr className="section-divider" />
                            </div>
                        </div>
                    </div>
                </main>


                <footer className="page-footer font-small mdb-color lighten-1">
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

class Logo extends React.Component {
    render() {
        return ([
            <div key="logo" className={this.props.loadingState ? 'c002-image-content-cta__image c002-image-content-cta__image--vertical loading-new' : 'c002-image-content-cta__image c002-image-content-cta__image--vertical loaded-new'}><img className="" src={this.props.dataFromParent.companyLogo} alt="???" /></div>
        ]);
    }
}

class TitleH3 extends React.Component {
    render() {
        return ([
            <h3 key="h3" className={this.props.loadingState ? 'h3-responsive loading-new' : 'h3-responsive loaded-new'}>{this.props.dataFromParent.companyName}</h3>
        ]);
    }

}

class TitleH4 extends React.Component {
    render() {
        return ([
            <h4 className={this.props.loadingState ? 'h4-responsive loading-new' : 'h4-responsive loaded-new'}>{this.props.dataFromParent.projectName} &nbsp;</h4>
        ]);
    }
}

class ProjectImage extends React.Component {
    render() {
        return ([
            <div className={this.props.loadingState ? 'loading-new' : 'loaded-new'}>
                <div className={`row c002-image-content-cta__background-${this.props.dataFromParent.companyNameAlt} py-5 mb-5`}>
                    <div className="col-12 col-md-8 offset-md-2 text-center">
                        <img key="image" className="img-fluid rounded z-depth-2" src={this.props.dataFromParent.projectImage} alt="???" />
                    </div>
                </div>
            </div>
        ]);
    }
}

class ProjectDescription extends React.Component {
    render() {
        return ([
            <div key="description" className={this.props.loadingState ? 'loading-new' : 'loaded-new'} dangerouslySetInnerHTML={ { __html: this.props.dataFromParent.projectDescription } }></div>
        ]);
    }
}

class ProjectRole extends React.Component {
    render() {
        return ([
            <div key="role" className={this.props.loadingState ? 'loading-new' : 'loaded-new'}>
                <h6><strong>My role:</strong></h6>
                <div dangerouslySetInnerHTML={ { __html: this.props.dataFromParent.projectRole } }></div>
            </div>
        ]);
    }
}

class ProjectDate extends React.Component {
    render() {
        return ([
            <span className={this.props.loadingState ? 'loading-new' : 'loaded-new'}>{this.props.dataFromParent.projectDate}</span>
        ]);
    }
}

class ProjectLocation extends React.Component {
    render() {
        return ([
            <span className={this.props.loadingState ? 'loading-new' : 'loaded-new'}>{this.props.dataFromParent.projectLocation}</span>
        ]);
    }
}

class ProjectMeta extends React.Component {
    render() {
        return ([
            <div key="meta" className={this.props.loadingState ? 'loading-new' : 'loaded-new'}>
                <h6><strong>Other:</strong></h6>
                <p><span>{this.props.dataFromParent.projectLocation}</span> | <span>{this.props.dataFromParent.projectDate}</span></p>
            </div>
        ]);
    }
}

class ProjectTech extends React.Component {
    render() {
        let array = $.map(this.props.dataFromParent.projectTech, function(value, index) {
            return [value];
        });

        return (
            <div key="tech" className={this.props.loadingState ? 'loading-new' : 'loaded-new'}>
                <h6><strong>Tech used:</strong></h6>
                <ul className="list-inline">
                    {
                        array.map(function (item, i) {
                            return <li key={i} id={i} className="list-inline-item">{item}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

class ProjectLink extends React.Component {
    render() {
        return ([
            <div className={this.props.loadingState ? 'c002-image-content-cta__button loading-new' : 'c002-image-content-cta__button loaded-new'}>
                <a className="btn btn-outline-dark waves-effect" href={this.props.dataFromParent.projectHref} title={"View " + this.props.dataFromParent.projectName}>{"View " + this.props.dataFromParent.projectName} <i className="fa fa-arrow-right"></i></a>
            </div>
            ]);
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
