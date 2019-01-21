console.log("%c react-inline.js CALLED", "padding:15px;margin:5px;color: #333;border-left:5px solid rebeccapurple;");

// EXAMPLE 2
class BookShelf extends React.Component {
    render() {
        return (
            <div className="">
                <div className="row">
                    <Book id="1" title="1984" author="George Orwell" rating="5" body="Best book ever." cover="https://www4.alibris-static.com/1984/isbn/9781328869333_l.jpg" />
                    <Book id="2" title="Life of PI" author="Yann Martell" rating="4" body="Love the ending." cover="http://cdn.collider.com/wp-content/uploads/life-of-pi-poster2.jpg" />
                    <Book id="3" title="Lost city of Z" author="David Grann" rating="4" body="Crazy stuff." cover="https://images-eu.ssl-images-amazon.com/images/I/51o-3-68PML.jpg" />
                </div>
            </div>
        )
    }

}

class Book extends React.Component {
    render() {
        return (
            <div className="col-6 col-sm-4">
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
    <BookShelf />, document.getElementById('book-shelf-2')
);
