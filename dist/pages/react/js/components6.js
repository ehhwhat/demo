
// EXAMPLE 6
class BookShelf extends React.Component {

    constructor(){
        super();
        this.state = {
            showBooks: false,
            books: [
                {id: 1, title: "1984", author: "George. Orwell", rating: 5, body: "Best book ever.", cover: "https://www4.alibris-static.com/1984/isbn/9781328869333_l.jpg"},
                {id: 2, title: "Life of PI", author: "Yann Martell", rating: 4, body: "Love the ending.", cover: "http://cdn.collider.com/wp-content/uploads/life-of-pi-poster2.jpg"},
                {id: 3, title: "Lost city of Z", author: "David Grann", rating: 4, body: "Crazy stuff.", cover: "https://images-eu.ssl-images-amazon.com/images/I/51o-3-68PML.jpg"}
            ]
        };
    }

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
                        <h3>666</h3>
                        <p>
                            Same as <a href="#book-shelf-4">Example 4</a> but with a dynamic text button which will toggle the lists of books.
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
                <Book title={book.title}  author={book.author} rating={book.rating} body={book.body} cover={book.cover} key={book.id} grid={gridSize}/>
            );
        });

    }


    _getNumberOfBooksTitle(bookCount) {
        if(bookCount === 0) {
            return("books?");
        } else if (bookCount === 1) {
            return("book");
        } else {
            return("books");
        }
    }

    _handleClick() {
        this.setState({
            showBooks: !this.state.showBooks
        });
    }

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

}

class Book extends React.Component {
    render() {
        return (
            <div className={this.props.grid}>
                <div className="card mb-3">
                    <img className="card-img-top" src={this.props.cover} />
                    <div className="card-body">
                        <p className="card-title">{this.props.title}</p>
                        <hr className="invisible"/>
                        <p>{this.props.body}</p>
                        <p><small>{this.props.author} | {this.props.rating}</small></p>
                    </div>
                </div>
            </div>
        );
    }
}

class AddBookForm extends React.Component {
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

ReactDOM.render (
    <BookShelf />, document.getElementById('book-shelf-6')
);
