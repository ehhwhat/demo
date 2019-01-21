console.log("%c react-addremove.js CALLED", "padding:15px;margin:5px;color: #333;border-left:5px solid rebeccapurple;");

// EXAMPLE 7
// ******************************
// CLASS
// ******************************
class BookShelf extends React.Component {

    // CONSTRUCTOR
    // ???
    constructor(){
        super();
        this.state = {
            showBooks: false,
            // TO BE POPULATED LATER FROM REMOTE SERVER DATA
            books: []
        };
    }

    // RENDER
    // WHAT WE WILL RETURN
    // ???
    render() {
        const books = this._getBooks();

        let bookNodes;
        let bookButtonText = "Show books";
        if(this.state.showBooks) {
            bookNodes = <div className="row">{books}</div>;
            bookButtonText = "Hide books";
        }

        return (
            <div className="">
                <div className="row">
                    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                        <AddBookForm addBook={this._addBook.bind(this)}/>
                    </div>
                    <div className="col-sm-12 text-center">
                        <p><span className="badge badge-pill badge-default">{books.length} {this._getNumberOfBooksTitle(books.length)}</span></p>
                        <button className="btn btn-outline-default waves-effect" onClick={this._handleClick.bind(this)}>{bookButtonText}</button>
                    </div>
                    <div className="col-12">
                        {bookNodes}
                    </div>
                    <div className="col-12 text-danger invisible">
                        <div className="row">
                            <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                <ul className="">
                                    <li className=""><strong>Component/s:</strong> <code>&lt;BookShelf /&gt;</code>, <code>&lt;Book /&gt;</code></li>
                                    <li className=""><strong>Data:</strong> Array</li>
                                    <li className=""><strong>Methods:</strong> <code>_getBooks()</code>, <code>_getNumberOfBooksTitle()</code>, <code>_handleClick.bind</code></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // METHOD
    // USED BY BookShelf CLASS
    _getBooks() {
        const booksListLength = this.state.books.length;
        let gridSize = "col-sm-12";
        if(booksListLength === 0) {
            console.log('No books?');
        } else if (booksListLength <= 3) {
            gridSize = "col-6 col-sm-4 col-md-4 col-lg-4";
        } else if (booksListLength === 4) {
            gridSize = "col-6 col-sm-6 col-md-3 col-lg-3";
        } else {
            gridSize = "col-6 col-sm-6 col-md-3 col-lg-2";
        }

        return this.state.books.map((book) => {
            return (
                <Book title={book.title}  author={book.author} rating={book.rating} body={book.body} cover={book.cover} key={book.id} grid={gridSize} onDelete={this._deleteBook.bind(this)} />
            );
        });
    }

    // METHOD
    // USED BY BookShelf CLASS
    _getNumberOfBooksTitle(bookCount) {
        if(bookCount === 0) {
            return("books?");
        } else if (bookCount === 1) {
            return("book");
        } else {
            return("books");
        }
    }

    // METHOD
    // USED BY BookShelf CLASS
    _handleClick() {
        this.setState({
            showBooks: !this.state.showBooks
        });
    }

    // METHOD
    // USED BY BookShelf CLASS
    _addBook(title, author, body, rating, cover){
        const book = {
            id: this.state.books.length +1,
            title,
            author,
            body,
            rating,
            cover
        };
        this.setState({books: this.state.books.concat([book])});
    }

    // METHOD
    // USED BY BookShelf CLASS
    _deleteBook(book){
        $.ajax({
            method: "DELETE",
            url:"api/books.json/${book.id}"
        });
        const books = [...this.state.books];
        const bookIndex = books.indexOf(book);
        books.splice(bookIndex, 1);
        this.setState({books});
    }

    // LIFECYCLE METHOD
    // THIS METHOD WILL TRIGGER _fetchBooks BEFORE ANY render() IS CALLED
    // FETCH BOOKS FROM SERVER BEFORE THE COMPONENT IS RENDERED
    componentWillMount(){
        this._fetchBooks();
        console.log('componentWillMount');
    }

    // LIFECYCLE METHOD
    // THIS METHOD WILL TRIGGER WHEN THE COMPONENT IS RENDERED
    // THIS METHOD CONTROLS POLLING OF DATA
    // IT WILL LOOK TO SERVER FOR NEW DATA EVERY 6SECS
    // STORE TIMER AS OBJECT PROPERTY IN _timer
    componentDidMount(){
        console.log('componentDidMount');
        //this._timer = setInterval(() => this._fetchBooks(), 6000);
        //setInterval(() => console.log('polling?'), 6000);
    }

    // LIFECYCLE METHOD
    // THIS METHOD WILL TRIGGER _fetchBooks BEFORE ANY render() IS CALLED
    // FETCH BOOKS FROM SERVER BEFORE THE COMPONENT IS RENDERED
    componentWillUnmount(){
        console.log('componentWillUnmount');
        clearInterval(this._timer);
    }

    // METHOD
    // USED BY BookShelf CLASS
    // GRABS BOOKS DATA FROM REMOTE SERVER USING JQUERY
    // => BINDS this TO OUR CLASS, this REFERS TO BookShelf
    _fetchBooks(){
        // $.ajax({
        //     method:"GET",
        //     url:"api/books",
        //     success: (books) => {
        //         this.setState({books})
        //     }
        // });
        $.ajax({
            method:"GET",
            dataType : 'json',
            url:"api/books.json",
            success: (books) => {
                this.setState({books});
            }
        });
    }

}

// ******************************
// CLASS
// ******************************
class Book extends React.Component {
    // RENDER
    // WHAT WE WILL RETURN
    // ???
    render() {
        return (
            <div className={this.props.grid}>
                <div className="card c012-card my-3 animated fadeIn">
                    <img className="card-img-top" src={this.props.cover} />
                    <div className="card-header">
                        <h3 className="h3-responsive">{this.props.author}</h3>
                        <h5 className="h5-responsive">{this.props.title}</h5>
                    </div>
                    <div className="card-body">
                        <p>{this.props.body}</p>
                        <a href="#" className="btn btn-outline-danger waves-effect" onClick={this._handleDelete.bind(this)}>Delete</a>
                    </div>
                    <div className="card-footer">
                        <p><small>{this.props.rating} stars</small></p>
                    </div>
                </div>
            </div>
        );
    }

    _handleDelete(event) {
        event.preventDefault();
        if(confirm("Are you sure?")) {
            this.props.onDelete(this.props.book);
        }
    }
}

// ******************************
// CLASS
// ******************************
class AddBookForm extends React.Component {
    // RENDER
    // WHAT WE WILL RETURN
    // ???
    render() {
        return (
            <div className="">
                <div className="card c012-card my-3 animated fadeIn">
                    <div className="card-header">
                        <h3 className="h3-responsive">Add books</h3>
                        <h5 className="h5-responsive">Read a new book? You can add it to your list here</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this._handleSubmit.bind(this)}>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label >Title of book</label>
                                        <input type="text" className="form-control"  placeholder="Enter title" ref={(input) => this._title = input} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label>Author of book</label>
                                        <input type="text" className="form-control" placeholder="Enter author" ref={(input) => this._author = input} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label >Review of book</label>
                                        <input type="text" className="form-control"  placeholder="Enter Review" ref={(input) => this._body = input} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label>Rating</label>
                                        <input type="number" className="form-control" placeholder="Rating" ref={(input) => this._rating = input} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label>Book cover url</label>
                                        <input type="text" className="form-control" placeholder="Book cover url" ref={(input) => this._imgurl = input} />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-outline-default waves-effect">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    // METHOD
    // USED BY AddBookForm CLASS
    // ???
    // PREVENT DEFAULT PAGE REFRESH ON SUBMIT
    _handleSubmit(event) {
        event.preventDefault();

        let title = this._title;
        let author = this._author;
        let body = this._body;
        let rating = this._rating;
        let cover = this._imgurl;

        this.props.addBook(title.value, author.value, body.value, rating.value, cover.value);
    }
}

// ******************************
// RENDER
// CALL BOOKSHELF CLASS
// TARGET TO INJECT IN TO
// ******************************
ReactDOM.render (
    <BookShelf />, document.getElementById('book-shelf-7')
);

