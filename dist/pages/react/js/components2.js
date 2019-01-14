
// EXAMPLE 2
class BookShelf extends React.Component {
    render() {
        return (
            <div className="">
                <div className="row">
                    <div className="col">
                        <h3>Inline properties</h3>
                        <p>In this example i will pass in data from inline properties.</p>
                        <hr className="invisible" />
                    </div>
                </div>
                <div className="row">
                    <Book id="1" title="1984" author="George Orwell" rating="5" body="Best book ever." cover="https://www4.alibris-static.com/1984/isbn/9781328869333_l.jpg" />
                    <Book id="2" title="Life of PI" author="Yann Martell" rating="4" body="Love the ending." cover="http://cdn.collider.com/wp-content/uploads/life-of-pi-poster2.jpg" />
                    <Book id="3" title="Lost city of Z" author="David Grann" rating="4" body="Crazy stuff." cover="https://images-eu.ssl-images-amazon.com/images/I/51o-3-68PML.jpg" />
                    <div className="col-sm-12 text-center">
                        <hr className="invisible" />
                        <ul className="list-inline">
                            <li className="list-inline-item"><strong>Component/s:</strong> <code>BookShelf</code>, <code>Book</code></li>
                            <li className="list-inline-item"><strong>Data:</strong> Inline <code>properties</code></li>
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

ReactDOM.render (
    <BookShelf />, document.getElementById('book-shelf-2')
);
