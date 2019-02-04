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
            dataAll: [
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

    toggleProject = projectNumber => () => {
        console.log('toggleProject');
        console.log(projectNumber);
        this.setState({showLoading:true});
        axios.get('https://projects-b37dc.firebaseio.com/.json') // JSON File Path
            .then( response => {
                let array = $.map(response.data, function(value, index) {
                    return [value];
                });
                this.setState({dataToUse: array[projectNumber]});
                this.setState({showLoading:false});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    toggleProjectID = projectName => () => {
        this.setState({showLoading:true});
        axios.get('https://projects-b37dc.firebaseio.com/.json') // JSON File Path
            .then( response => {
                let array = $.map(response.data, function(value, index) {
                    return [value];
                });
                let dataIndex = array.filter(obj => {
                    return obj.id === projectName
                });
                this.setState({dataToUse: dataIndex[0]});
                this.setState({showLoading:false});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    es6Function = (projectName) => {
        console.log(projectName);
        this.setState({showLoading:true});
        axios.get('https://projects-b37dc.firebaseio.com/.json') // JSON File Path
            .then( response => {
                let array = $.map(response.data, function(value, index) {
                    return [value];
                });
                let dataIndex = array.filter(obj => {
                    return obj.id === projectName
                });
                this.setState({dataToUse: dataIndex[0]});
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
        axios.get('https://projects-b37dc.firebaseio.com/.json') // JSON File Path
            .then( response => {
                let array = $.map(response.data, function(value, index) {
                    return [value];
                });
                console.log('%c AXIOS', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
                console.log(array);
                console.log('%c AXIOS', 'color: #61C155; font-weight: bold;background:#fff;border-left:5px solid #61C155;padding:15px 30px;');
                this.setState({dataToUse: array[0]});
                this.setState({dataAll: array});
                this.setState({showLoading:false});
            })
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
            <div className={this.state.showLoading ? 'loading-newOFF' : 'loaded-newOFF'} key="divWrapper">

                <nav className={this.state.darkTheme ? 'navbar navbar-expand-lg navbar-dark bg-dark fixed-top scrolling-navbar' : 'navbar navbar-expand-lg' +
                    ' navbar-dark bg-dark fixed-top scrolling-navbar'}>
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
                                <li className="nav-item">
                                    <a className="nav-link" href="#clients">Clients</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#projects">Projects</a>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto nav-flex-icons">
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

                    <div className={this.state.showLoading ? 'loader-wrapper loading-new-reverse' : 'loader-wrapper loaded-new-reverse'}>
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>

                    <a className="btn btn-outline-secondary waves-effect z-depth-2 ProjectItemsVerticalButton" href="#clients" title="Up">
                        <i className="fa fa-arrow-up"></i>
                    </a>

                    <div id="clients" className="container-fluid pt-5">
                        <div className="row">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                        <div className="c001-basic-content">
                                            <h1 className="display-4">Clients</h1>
                                            <h2 className="display-5 text-muted">Companies I`ve worked with previously</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                        <ProjectItemsVertical dataFromParent={this.state.dataAll} loadingState={this.state.showLoading} someMethod={this.toggleProjectID} es6Function={this.es6Function} />
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

                    <div id="projects" className="container-fluid c002-image-content-cta">
                        <div className="row">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                        <div className="c001-basic-content">
                                            <h1 className="display-4">Projects</h1>
                                            <h2 className="display-5 text-muted">Examples of work I`ve been involved in</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="projectLogo" className="row">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                        <Logo dataFromParent={this.state.dataToUse} loadingState={this.state.showLoading} imgClass="test" />
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
        if (!this.props.dataFromParent.companyLogo) {
            return null;
        } else {
            return ([
                <div key="logo" className={this.props.loadingState ? `c002-image-content-cta__image ${this.props.imgClass} loading-new` : `c002-image-content-cta__image ${this.props.imgClass} loaded-new`}>
                    <img className="rounded" src={this.props.dataFromParent.companyLogo} alt={this.props.dataFromParent.companyName} />
                </div>
            ]);
        }
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

class TitleH4 extends React.Component {
    render() {
        if (!this.props.dataFromParent.projectName) {
            return null;
        } else {
            return ([
                <h4 key="h4" className={this.props.loadingState ? 'h4-responsive loading-new' : 'h4-responsive loaded-new'}>{this.props.dataFromParent.projectName} &nbsp;</h4>
            ]);
        }
    }
}

class ProjectImage extends React.Component {
    render() {
        if (!this.props.dataFromParent.projectImage) {
            return null;
        } else {
            return ([
                <div key="projectImage" className={this.props.loadingState ? 'loading-new' : 'loaded-new'}>
                    <div className={`row c002-image-content-cta__background-${this.props.dataFromParent.companyNameAlt} py-5 mb-5`}>
                        <div className="col-12 col-md-8 offset-md-2 text-center">
                            <img key="image" className="img-fluid rounded z-depth-2" src={this.props.dataFromParent.projectImage} alt="???" />
                        </div>
                    </div>
                </div>
            ]);
        }
    }
}

class ProjectDescription extends React.Component {
    render() {
        if (!this.props.dataFromParent.projectDescription) {
            return null;
        } else {
            return ([
                <div key="description" className={this.props.loadingState ? 'loading-new' : 'loaded-new'} dangerouslySetInnerHTML={ { __html: this.props.dataFromParent.projectDescription } }></div>
            ]);
        }
    }
}

class ProjectRole extends React.Component {
    render() {
        if (!this.props.dataFromParent.projectRole) {
            return null;
        } else {
            return ([
                <div key="role" className={this.props.loadingState ? 'loading-new' : 'loaded-new'}>
                    <h6><strong>My role:</strong></h6>
                    <div dangerouslySetInnerHTML={ { __html: this.props.dataFromParent.projectRole } }></div>
                </div>
            ]);
        }
    }
}

class ProjectMeta extends React.Component {
    render() {
        if (!this.props.dataFromParent.projectLocation) {
            return null;
        } else {
            return ([
                <div key="meta" className={this.props.loadingState ? 'loading-new' : 'loaded-new'}>
                    <h6><strong>Other:</strong></h6>
                    <p><span>{this.props.dataFromParent.projectLocation}</span> | <span>{this.props.dataFromParent.projectDate}</span></p>
                </div>
            ]);
        }
    }
}

class ProjectTech extends React.Component {
    render() {
        if (!this.props.dataFromParent.projectTech) {
            return null;
        } else {
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
}

class ProjectLink extends React.Component {
    render() {
        if (!this.props.dataFromParent.projectHref) {
            return null;
        } else {
            return ([
                <div key="projectLink" className={this.props.loadingState ? 'c002-image-content-cta__button loading-new' : 'c002-image-content-cta__button loaded-new'}>
                    <a className="btn btn-outline-dark waves-effect" href={this.props.dataFromParent.projectHref} title={"View " + this.props.dataFromParent.projectName}>{"View " + this.props.dataFromParent.projectName} <i className="fa fa-arrow-right"></i></a>
                </div>
            ]);
        }
    }
}

class ProjectItemsVertical extends React.Component {
    render() {
        let properties = this.props;
        let objArray = this.props.dataFromParent;
        let arrayResult = objArray.reduce(function(newArray, item) {
            newArray.push([item.id, item.companyName, item.projectNameAlt, item.companyLogo]);
            return newArray;
        }, []);
        return (
            <div id="ProjectItemsVertical" key="ProjectItemsVertical" className={this.props.loadingState ? 'c003-stepper loading-new' : 'c003-stepper loaded-new'}>
                <ul className="stepper stepper-vertical">
                    {
                        arrayResult.map(function (item, i) {
                            return  <li key={i} className="">
                                <a href="#projects" onClick={() => properties.es6Function(item[0])}><span className="circle bg-white"><img src={item[3]} className="circle img-fluid" /></span><span className="label text-left"><strong className="">{item[1]}</strong><br/><small>{item[2]}</small></span></a>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
