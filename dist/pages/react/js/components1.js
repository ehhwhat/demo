
// GENERAL NOTES
// REACT uses component based architecture.
// A REACT component is basically a JS function which will return some HTML
// REACT uses a virtual DOM to make changes before applying them to the actual page DOM/
// REACT uses diffing to check the virtual DOM with the actual DOM and then to apply changes
// Every time we write a new REACT component we use it by writing an element named after the component class

// JSX is just another way of writing JS with a transpile step
// JSX = Javascript XML
// Code written in curly braces {} is seen as literal JS and allows use to use JS within JSX

// ***** *****
// EXAMPLE 1
// ***** *****

// BookShelf will be our ROOT component, almost a wrapper for everything else.
// Our component BookShelf is a JS class that inherits from the React.Component base class.
// Component names are written in upper camel case
class BookShelf extends React.Component {
    // Every component needs a render() function
    render() {
        return (
            // I will return some markup which will house my book shelf
            // Headings, text, markup for grid layout as well.
            // Here i will also reference my other REACT component class called Book using <Book />
            // This reference will then pull in whatever is returned by the Book class.
            // To show 2 books (which happen to be identical) i have used the component class twice
            <div>
                <div className="row">
                    <div className="col ">
                        <h3>Static</h3>
                        <p>In this example all data is hardcoded. <span className="text-danger">To add a different book i would need to create a new REACT component for each one.</span></p>
                        <hr className="invisible" />
                    </div>
                </div>
                <div className="row">
                    <Book />
                    <Book />
                    <div className="col-sm-12 text-center">
                        <hr className="invisible" />
                        <ul className="list-inline">
                            <li className="list-inline-item"><strong>Component/s:</strong> <code>BookShelf</code>, <code>Book</code></li>
                            <li className="list-inline-item"><strong>Data:</strong> Hardcoded and static</li>
                            <li className="list-inline-item"><strong>Methods:</strong> </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

class Book extends React.Component {
    render() {
        return (
            <div className="col-6 col-sm-6 col-md-4 col-lg-2">
                <div className="card mb-3">
                    <img className="card-img-top" src="https://www4.alibris-static.com/1984/isbn/9781328869333_l.jpg" />
                    <div className="card-body">
                        <p className="card-title">1984</p>
                        <hr className="invisible"/>
                        <p>Best book ever.</p>
                        <p><small>George Orwell | 5</small></p>
                    </div>
                </div>
            </div>
        );
    }
}

// React.DOM.render is used to inject the components on our HTML page
// It takes 2 arguments
// component variable, target container
ReactDOM.render (
    <BookShelf />, document.getElementById('book-shelf-1')
);
