import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

class UpdateBook extends Component {
    render() {
        return (
            <>
                <Modal show={this.props.showUpdate}
                 onHide={this.props.closeModalFx}
                 >
                    <Modal.Header closeButton>
                        <Modal.Title>Update</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.props.updateBook}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Book Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Book Name" name="bookName" onChange={(e)=>this.props.updateBookName(e)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Description" name="description" onChange={this.props.updateDescription}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control type="text" placeholder="Image URL" name="image_url" onChange={this.props.updateImgUrl}/>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                             Update the Book
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeModalFx}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* <h1>hi</h1> */}
            </>
            
        )
    }
}

export default UpdateBook
