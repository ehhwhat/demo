
// EXAMPLE 8
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
            books: [
                {id: 1, title: "1984", author: "George. Orwell", rating: 5, body: "Best book ever.", cover: "https://www4.alibris-static.com/1984/isbn/9781328869333_l.jpg"},
                {id: 2, title: "Life of PI", author: "Yann Martell", rating: 4, body: "Love the ending.", cover: "http://cdn.collider.com/wp-content/uploads/life-of-pi-poster2.jpg"},
                {id: 3, title: "Lost city of Z", author: "David Grann", rating: 4, body: "Crazy stuff.", cover: "https://images-eu.ssl-images-amazon.com/images/I/51o-3-68PML.jpg"}
            ]
        };
        console.log(this.state);

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
                    <div className="col">
                        <h3>Example 8, adding and removing</h3>
                        <p>
                            ???
                        </p>
                        <hr className="invisible" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-3">
                        <AddBookForm addBook={this._addBook.bind(this)}/>
                    </div>
                    <div className="col-sm-12 text-center">
                        <p><span className="badge badge-pill badge-primary">{books.length} {this._getNumberOfBooksTitle(books.length)}</span></p>
                        <button className="btn btn-primary btn-lg mb-4" onClick={this._handleClick.bind(this)}>{bookButtonText}</button>
                    </div>
                    <div className="col-12">
                        {bookNodes}
                    </div>
                    <div className="col-sm-12 text-center">
                        <hr className="invisible" />
                        <ul className="list-inline">
                            <li className="list-inline-item"><strong>Component/s:</strong> <code>BookShelf</code>, <code>Book</code></li>
                            <li className="list-inline-item"><strong>Data:</strong> <code>array</code></li>
                            <li className="list-inline-item"><strong>Methods:</strong> <code>_getBooks()</code>, <code>_getNumberOfBooksTitle()</code></li>
                        </ul>
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
                <Book title={book.title}  author={book.author} rating={book.rating} body={book.body} cover={book.cover} key={book.id} grid={gridSize} onDelete={this._deleteBook.bind(this)}/>
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
        console.log(book);
        this.setState({books: this.state.books.concat([book])});
        console.log(this.state);
    }

    // METHOD
    // USED BY BookShelf CLASS
    _deleteBook(book){
        // $.ajax({
        //     method: "DELETE",
        //     url:"api/books.json/${book.id}"
        // });

        const books = [...this.state.books];
        console.log(books);
        const bookIndex = books.indexOf(book);
        console.log(bookIndex);
        books.splice(bookIndex, 1);
        this.setState({books});
    }

    // LIFECYCLE METHOD
    // THIS METHOD WILL TRIGGER _fetchBooks BEFORE ANY render() IS CALLED
    // FETCH BOOKS FROM SERVER BEFORE THE COMPONENT IS RENDERED
    componentWillMount(){
        //this._fetchBooks();
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
                <div className="card mb-3">
                    <img className="card-img-top" src={this.props.cover} />
                    <div className="card-body">
                        <p className="card-title">{this.props.title}</p>
                        <hr className="invisible"/>
                        <p>{this.props.body}</p>
                        <p><small>{this.props.author} | {this.props.rating} | {this.props.id}</small></p>
                        <a href="#" className="btn btn-danger" onClick={this._handleDelete.bind(this)}>Delete</a>
                    </div>
                </div>
            </div>
        );
    }

    _handleDelete(event) {
        event.preventDefault();
        if(confirm("Are you sure?")) {
            this.props.onDelete(this.props.book);
            console.log(this.props.book);
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
                <div className="card mb-3">
                    <div className="card-body">
                        <form onSubmit={this._handleSubmit.bind(this)}>
                            <div className="form-group">
                                <label >Title</label>
                                <input type="text" className="form-control"  placeholder="Enter title" ref={(input) => this._title = input} />
                            </div>
                            <div className="form-group">
                                <label>Author</label>
                                <input type="text" className="form-control" placeholder="Enter author" ref={(input) => this._author = input} />
                            </div>
                            <div className="form-group">
                                <label >Body</label>
                                <input type="text" className="form-control"  placeholder="Enter body" ref={(input) => this._body = input} />
                            </div>
                            <div className="form-group">
                                <label>Rating</label>
                                <input type="number" className="form-control" placeholder="Rating" ref={(input) => this._rating = input} />
                            </div>
                            <div className="form-group">
                                <label>Img url</label>
                                <input type="text" className="form-control" placeholder="Img url" ref={(input) => this._imgurl = input} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
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
    <BookShelf />, document.getElementById('book-shelf-8')
);
