import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './myFavoriteBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';
import FormModal from './FormModal';
import UpdateBook from './updateBook';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showBooks: false,
      showModal: false,
      bookName: '',
      description: '',
      image_url: '',
      showUpdate: false,
      index: 0,
    }
  }

  componentDidMount = async () => {
    const books = await axios.get('http://localhost:3001/books', { params: { email: this.props.auth0.user.email } })
    console.log('books', books.data)
    this.setState({
      books: books.data,
      showBooks: true
    });
  }

  handleShowModal = () => {
    this.setState({
      showModal: true
    })
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false
    })
  }

  updateBookName = (event) => {
    this.setState({
      bookName: event.target.value,

    })
    console.log('y',this.state.bookName);

  }
  updateDescription = (event) => {
    this.setState({

      description: event.target.value

    })
    console.log(this.state.description);
  }
  updateImgUrl = (event) => {
    this.setState({
      image_url: event.target.value
    })
    console.log(this.state.image_url);
  }

  addBooks = async (event) => {
    event.preventDefault();

    const bookFormData = {
      name: this.state.bookName,
      description: this.state.description,
      image_url: this.state.image_url,
      email: this.props.auth0.user.email
    }

    const newBooks = await axios.post('http://localhost:3001/addBooks', bookFormData)

    this.setState({
      books: newBooks.data,
      showModal: false
    })
  }

  deleteBook = async (index) => {
    const email = {
      email: this.props.auth0.user.email
    }

    let newBooks = await axios.delete(`http://localhost:3001/deleteBook/${index}`, { params: email })

    this.setState({
      books: newBooks.data
    })
  }

  updateBook = async (e) => {

    const liberyData = {
      name: this.state.bookName,
      description: this.state.description,
      image_url: this.state.image_url,
      email: this.props.auth0.user.email

    }

    let updatesBook = await axios.put(`http://localhost:3001/updateBook/${this.state.index}`, liberyData)
    this.setState({
      books: updatesBook.data
    })


  }
  updateModal = (idx) => {
    const choosenBook = this.state.books.filter((val, index) => {
      return idx === index;
    })

    console.log('before', choosenBook);
    this.setState({
      showUpdate: true,
      index: idx,
      name: choosenBook[0].name,
      description: choosenBook[0].description,
      image_url: choosenBook[0].image_url
    })

    // console.log('after', choosenBook[0]);
  }




  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>

        <Button variant="primary" onClick={this.handleShowModal}>➕</Button>


        {this.state.showModal && <FormModal closeModalFx={this.handleCloseModal} showModal={this.state.showModal} updateBookName={this.updateBookName} updateDescription={this.updateDescription} updateImgUrl={this.updateImgUrl} addBooks={this.addBooks} />}

        {this.state.showBooks &&

          <CardColumns>

            {this.state.books.map((item, idx) => {
              return (
                <div key={idx}>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={item.image_url} style={{ width: '15rem', height: '16rem', margin: 'auto' }} />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text style={{ overflow: 'auto', height: '5rem' }}>
                        {item.description}
                      </Card.Text>
                      <Button variant="primary" onClick={() => this.deleteBook(idx)}>🗑️</Button>
                      <Button variant="primary" onClick={()=>this.updateModal(idx)}>🆙➕</Button>

                    </Card.Body>
                  </Card>
                 
                </div>
              )
            })
            }

          </CardColumns>
        }

        {this.state.showUpdate &&

        <UpdateBook
        showUpdate={this.state.showUpdate}
            closeModalFx={this.handleCloseModal} showModal={this.updateModal} updateBookName={this.updateBookName} updateDescription={this.updateDescription} updateImgUrl={this.updateImgUrl} updateBook={this.updateBook}
          /> 
         }
      </Jumbotron>
    )
  }
}


export default withAuth0(MyFavoriteBooks);