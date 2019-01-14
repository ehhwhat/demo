
// CV
// CREATE A WRAPPER CLASS TO CONTAIN ALL THE COMPONENT
// CREATE COMPONENTS FOR EACH PART OF CV
//      SUMMARY
//      KEY SKILLS
//      JOB HISTORY
//      EDUCATION
//      INTERESTS
// PULL DATA FROM EXTERNAL JSON

// ******************************
// CLASS
// ******************************

class CV extends React.Component {
    // Every component needs a render() function
    render() {
        return (
            <div>

                <div className="row justify-content-md-center my-5">
                    <Intro />
                </div>

                <div className="row justify-content-md-center my-5">
                    <div className="col-sm-12">
                        <img src="https://scontent-lht6-1.xx.fbcdn.net/v/t31.0-8/11953423_10206666496356629_8716699617165165740_o.jpg?oh=855aa6ec03641b707b1b2602d494a8be&oe=5AFFF4C5" alt="..." className=" mx-auto d-block" />
                    </div>
                </div>

                <div className="row justify-content-md-center my-5">
                    <Summary />
                </div>

                <div className="row justify-content-md-center my-5">
                    <KeySkills />
                </div>

                <div className="row justify-content-md-center my-5">
                    <OtherSkills />
                </div>

                <div className="row my-5">
                    <div className="col-sm-12">
                        <h3 className="display-4">Work experience</h3>
                    </div>
                    <WorkExp id="1" company="HomeServe PLC" position="Front End Web Developer" date="05/2016 - 12/2017" location="London." body="Worked on a number of different territories as a member of the Global Digital and Technology team, responsibilities ranged from Front End Web Development (using Handlebars.JS and SASS, JS) to identifying new components to be built in Sitecore CMS, management of own workload using Jira and creating documentation for other developers in Confluence." />
                    <WorkExp id="2" company="HomeServe HML" position="Front End Web Developer" date="05/2014 - 05/2016" location="Birmingham." body="Designed and built a number of responsive applications whilst at Homeserve, Make a claim online, a new intranet as well as a new homepage for the customer facing website. All fully responsive and mobile first. I also created a style guide for the website going forward which can be used by other developers or external agencies. The team worked as Agile in two week iterations." />
                    <WorkExp id="3" company="Npower" position="Senior Front End Web Developer" date="06/2011 - 04/2014" location="Birmingham." body="Recoded most of the npower.com website, built templates not only for developer use but also for business owners to contribute content. Created microsites, worked on responsive templates, mobile only layouts, implemented a knowledge base system which was then also used for live chat functionality across npower.com.I was also solely responsible for the setting up of the Operations workflow system for any business as usual requests, this was done through an existing tool called RightNow. Required the development of workspaces, workflows, admin and end user accounts, custom rules, custom email, custom look and feel. It was very well received by the senior management team and is now being used by multiple teams across the Digital department.Other responsibilities as Senior were to report on KPI data and other useful team information as well as distribute work throughout the team, both to Front End Developer and Back End Developers (All done using the workflow system i created)." />
                </div>

                <div className="row justify-content-md-center my-5">
                    <div className="col-sm-12">
                        <img src="https://scontent-lht6-1.xx.fbcdn.net/v/t31.0-8/15585018_10210467993671686_5420721020780601276_o.jpg?oh=ea4938943a0890c514aef3cbfc0fde03&oe=5B0750EF" alt="..." className=" mx-auto d-block" />
                    </div>
                </div>

                <div className="row justify-content-md-center my-5">
                    <Education />
                </div>

                <div className="row justify-content-md-center my-5">
                    <Interests />
                </div>

            </div>
        )
    }


}

class Intro extends React.Component {
    render() {
        return (
            <div className="col-sm-12 col-md-9 text-center">
                <h1 className="display-2">Benjamin Kenny</h1>
                <p className="lead">Front End Web Developer specialising in HTML, CSS (SASS), JS (Jquery).</p>
                <ul className="list-inline">
                    <li className="list-inline-item"><a href="mailto:ehhwhat@gmail.com">ehhwhat@gmail.com</a></li>
                    <li className="list-inline-item"><a href="http://www.ehhwhat.co.uk">http://www.ehhwhat.co.uk</a></li>
                    <li className="list-inline-item"><a href="https://github.com/ehhwhat/coding">https://github.com/ehhwhat/coding</a></li>
                    <li className="list-inline-item text-success">Available immediately</li>
                </ul>
            </div>
        );
    };
}

class Summary extends React.Component {
    render() {
        return (
            <div className="col-sm-12 col-md-9">
                <h3 className="display-4">Summary</h3>
                <p>
                    I am a Front End Web Developer with a BSc in Information Systems with Multimedia from the University of Central England.
                    I have over 10 years of development experience, with a mix of permanent roles and contract work.
                    My most recent role involved building responsive components and templates for SiteCore CMS using handlebarsJS for HTML markup, SASS for CSS styling and a mix of vanilla Javascript and Jquery, all within an Agile working environment.
                </p>
                <p>Easy to work with, laid back and can get along with anyone, hardworking, motivated and capable of working alone (projects such as a team workflow system at npower) or as part of a wider team (worked on numerous projects with BA’s, PM’s, DOT NETTER's and Designers across npower and HomeServe, such as new responsive homepages).</p>
            </div>
        );
    }
}

class KeySkills extends React.Component {
    render() {
        const skills = this._getSkills();
        return (
            <div className="col-sm-12 col-md-9">
                <h3 className="display-4">Skills and experience</h3>
                <table className="table">
                    <thead className="">
                        <tr>
                            <th scope="col">Skills (with alternate aka's)</th>
                            <th scope="col">Years experience</th>
                        </tr>
                    </thead>
                    <tbody>
                    {skills}
                    </tbody>
                </table>
            </div>
        );
    }

    _getSkills() {

        // Fake object / array of books
        const skillsList = [
            {id: 1, skills: "HTML, HTML5, XHTML, Hypertext Markup Language, Semantic, Accessibility, W3C", years: "10"},
            {id: 2, skills: "CSS2, CSS3, Cascading Style Sheets, LESS and SASS CSS pre processing", years: "10"},
            {id: 3, skills: "Adobe Photoshop, Design, JPG, PNG, GIF, Adobe Creative Cloud", years: "10"},
            {id: 4, skills: "Javascript, JavaScript, Js, JS, Jquery, JQUERY, Jquery UI, Jquery Mobile", years: "6"},
            {id: 5, skills: "CMS, Content Management Systems, Oracle UCM, Wordpress, Sitecore", years: "10"},
            {id: 6, skills: "Browser testing, Internet Explorer, Firefox, Chrome, Safari, Opera", years: "10"},
            {id: 7, skills: "Device testing, mobile, tablet, desktop", years: "6"},
            {id: 8, skills: "Responsive techniques, Mobile First, Mobile websites, Mobile ready", years: "6"},
            {id: 9, skills: "Development Frameworks, Grid systems, Twitter Bootstrap, Jquery library", years: "6"},
            {id: 10, skills: "Task automation with NodeJS and Gulp", years: "2"},
            {id: 11, skills: "PHP editing, Wordpress customisation, RightNow customisation", years: "4"},
            {id: 12, skills: "SEO, Search Engine Optimisation, analytics, Google analytics", years: "10"}
        ];
        return skillsList.map((skill) => {
            return (
                <Skill skills={skill.skills}  years={skill.years} key={skill.id} />
            );
        });

    }
}

class OtherSkills extends React.Component {
    render() {
        const skills = this._getSkills();
        return (
            <div className="col-sm-12 col-md-9">
                <h3 className="display-4">Other experience</h3>
                <table className="table">
                    <thead className="">
                    <tr>
                        <th scope="col">Experience of</th>
                        <th scope="col">Years experience</th>
                    </tr>
                    </thead>
                    <tbody>
                    {skills}
                    </tbody>
                </table>
            </div>
        );
    }

    _getSkills() {
        // Fake object / array of books
        const skillsList = [
            {id: 1, skills: "Usability testing, A/B tests, Multivariate testing, User experience, UX", years: "4"},
            {id: 2, skills: "DOTNET integration, Microsoft .Net integration, .Net integration, MVC framework integration with HTML and CSS", years: "10"},
            {id: 3, skills: "Working in an Agile environment", years: "5"},
            {id: 4, skills: "Documentation and task tracking, Jira, Confluence", years: "3"}
        ];
        return skillsList.map((skill) => {
            return (
                <Skill skills={skill.skills}  years={skill.years} key={skill.id} />
            );
        });
    }
}

class Skill extends React.Component {
    render() {
        return (
            <tr id={this.props.id}>
                <th scope="row">{this.props.skills}</th>
                <td>{this.props.years}</td>
            </tr>
        );
    }
}

class WorkExp extends React.Component {
    render() {
        return (
            <div className="col-sm-12 ">
                <div className="card mb-5">
                    <div className="card-header bg-light">
                        <p className=""><strong>{this.props.position}</strong> | <span className="">{this.props.company}</span></p>
                    </div>
                    <div className="card-body">
                        <hr className="invisible"/>
                        <p>{this.props.body}</p>
                        <p><small>{this.props.location} | {this.props.date}</small></p>
                    </div>
                </div>
            </div>
        );
    }
}

class Education extends React.Component {
    render() {
        return (
            <div className="col-sm-12 col-md-9">
                <h3 className="display-4">Education</h3>
                <ul className="list-inline">
                    <li className="list-inline-item"><strong>Course:</strong> BSc Information systems with Multimedia.</li>
                    <li className="list-inline-item"><strong>Location:</strong> Birmingham City University.</li>
                    <li className="list-inline-item"><strong>Date:</strong> 2004 - 2007.</li>
                    <li className="list-inline-item"><strong>Grade:</strong> 1st</li>
                </ul>
            </div>
        );
    }
}

class Interests extends React.Component {
    render() {
        return (
            <div className="col-sm-12 col-md-9">
                <h3 className="display-4">Interests</h3>
                <p>
                    Football, golf, gym, cycling, cinema, DIY, photography, travel and attempting to learn French, i’ve also become obsessed with reading a lot of books lately.
                    I also maintain my own personal website showcasing my work and occasionally writing the odd development based blog post which you can find here http://www.ehhwhat.co.uk.
                </p>
            </div>
        );
    }
}

// React.DOM.render is used to inject the components on our HTML page
// It takes 2 arguments
// component variable, target container
ReactDOM.render (
    <CV />, document.getElementById('cvTarget')
);
