console.log("%c react-dynamic.js CALLED", "padding:15px;margin:5px;color: #333;border-left:5px solid rebeccapurple;");

// EXAMPLE 4
class BookShelf extends React.Component {
    render() {
        const books = this._getBooks();
        return (
            <div className="">
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <p><span className="badge badge-pill badge-default">{books.length} {this._getNumberOfBooksTitle(books.length)}</span></p>
                    </div>
                    {books}
                </div>
            </div>
        )
    }

    _getBooks() {
        // Fake object / array of books
        const booksList = [
            {id: 1, title: "1984", author: "George. Orwell", rating: 5, body: "Best book ever.", cover: "https://www4.alibris-static.com/1984/isbn/9781328869333_l.jpg"},
            {id: 2, title: "Life of PI", author: "Yann Martell", rating: 4, body: "Love the ending.", cover: "http://cdn.collider.com/wp-content/uploads/life-of-pi-poster2.jpg"},
            {id: 3, title: "Lost city of Z", author: "David Grann", rating: 4, body: "Crazy stuff.", cover: "https://images-eu.ssl-images-amazon.com/images/I/51o-3-68PML.jpg"},
            {id: 4, title: "In the heart of the sea", author: "Nathaniel Philbrick", rating: 4, body: "This is the book that got me started.", cover: "https://www.booktopia.com.au/http_coversbooktopiacomau/big/9780008126834/in-the-heart-of-the-sea.jpg"},
            {id: 5, title: "I, Robot", author: "Isaac Asimov", rating: 4, body: "Nothing like the film.", cover: "https://img.sfbook.com/books/large/i-robot.jpg"},
            {id: 6, title: "Les Mis", author: "Victor Hugo", rating: 5, body: "Long but so worth it.", cover: "https://i.pinimg.com/originals/c0/79/d1/c079d16ae2be38a69f4a4edddc27ff2c.jpg"},
            {id: 7, title: "2001", author: "Arthur C. Clarke", rating: 4, body: "Amazing.", cover: "https://thequantumcretin.files.wordpress.com/2013/10/2001-a-space-odyssey-by-daniel-norris.jpg"},
            {id: 8, title: "Cicero", author: "Robert Harris", rating: 4, body: "Obsessed with Rome now.", cover: "https://www.deadgoodbooks.co.uk/wp-content/uploads/2015/09/9780099474197.jpg"}
        ];



        return booksList.map((book) => {

            const booksListLength = booksList.length;
            let gridSize = "col-sm-12 dynamic1";
            if(booksListLength === 0) {
                console.log('No books?');
            } else if (booksListLength <= 3) {
                gridSize = "col-6 col-sm-4 col-md-4 col-lg-4 dynamic2";
            } else if (booksListLength === 4) {
                gridSize = "col-6 col-sm-6 col-md-3 col-lg-3 dynamic3";
            } else {
                gridSize = "col-6 col-sm-6 col-md-3 col-lg-2 dynamic4";
            }

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
}

class Book extends React.Component {
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
                    </div>
                    <div className="card-footer">
                        <p><small>{this.props.rating} stars</small></p>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render (
    <BookShelf />, document.getElementById('book-shelf-4')
);
