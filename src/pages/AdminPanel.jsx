
import React, { useState, useEffect } from 'react';
import { Button, Form, Table, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [newCake, setNewCake] = useState({
    name: '',
    price: 0,
    description: '',
    imageURL: ''
  });
  const [updatedProduct, setUpdatedProduct] = useState({
    id: '',
    name: '',
    price: 0,
    description: '',
    imageURL: ''
  });

  const handleDelete = (e, id) => {
    e.preventDefault();
    axios.delete(`https://localhost:7024/api/Cake/${id}`)
      .then((res) => {
        console.log("Deleted");
        // Refresh the product list after deletion
        fetchProducts();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleUpdate = (cake) => {
    // Set the product details in the state for update
    setUpdatedProduct({
      id: cake.id,
      name: cake.name,
      price: cake.price,
      description: cake.description,
      imageURL: cake.imageURL
    });
  };

  const handleSubmitNewCake = (e) => {
    e.preventDefault();
    axios.post(`https://localhost:7024/api/Cake/`, newCake)
      .then((res) => {
        console.log("Product Added");
        // Refresh the product list after adding a new product
        fetchProducts();
        // Hide the add product form
        setShowAddProductForm(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSubmitUpdateProduct = (e) => {
    e.preventDefault();
    const putData = {
      name: updatedProduct.name,
      price: Number(updatedProduct.price),
      description: updatedProduct.description,
      imageURL: updatedProduct.imageURL
    }
    console.log(putData);
    axios.put(`https://localhost:7024/api/Cake/${updatedProduct.id}`, updatedProduct)
      .then((res) => {
        console.log("Updated");
        // Refresh the product list after update
        fetchProducts();
        alert("updated")
      })
      .catch((e) => {
        console.log(e);
        alert("not updated")
      });
  };

  const fetchProducts = () => {
    fetch('https://localhost:7024/api/Cake')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Failed to fetch products:', error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>
      <Row className="mt-5">
        <Col md={8}>
          <h2>Cake Management</h2>
        </Col>
        <Col md={4} className="text-right">
          <Button variant="dark" onClick={() => setShowAddProductForm(!showAddProductForm)}> Add Cake</Button>
        </Col>
      </Row>
      {showAddProductForm && (
        <Row className="mt-3">
          <Col>
            <Form onSubmit={handleSubmitNewCake}>
              <h3>Add New Product</h3>
              <Form.Group controlId="formNames">
                <Form.Label>Names</Form.Label>
                <Form.Control type="text" placeholder="Enter names" value={newCake.name} onChange={(e) => setNewCake({ ...newCake, name: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Enter price" value={newCake.price} onChange={(e) => setNewCake({ ...newCake, price: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="formDescriptions">
                <Form.Label>Descriptions</Form.Label>
                <Form.Control type="text" placeholder="Enter descriptions" value={newCake.description} onChange={(e) => setNewCake({ ...newCake, description: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="formImageUrl">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" placeholder="Enter image URL" value={newCake.imageURL} onChange={(e) => setNewCake({ ...newCake, imageURL: e.target.value })} />
              </Form.Group>
              <Button variant="dark" type="submit">
                Add Product
              </Button>
            </Form>
          </Col>
        </Row>
      )}
      <Row className="mt-3">
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((cake) => (
                <tr key={cake.id}>
                  <td>{cake.name}</td>
                  <td>{cake.price}</td>
                  <td>{cake.description}</td>
                  <td>
                    <Button variant="outline-dark" onClick={() => handleUpdate(cake)}>Update</Button>{' '}
                    <Button variant="outline-danger" onClick={(e) => handleDelete(e, cake.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      {updatedProduct.id && (
        <Row className="mt-3">
          <Col>
            <h3>Update Product</h3>
            <Form onSubmit={handleSubmitUpdateProduct}>
              <Form.Group controlId="formNames">
                <Form.Label>Names</Form.Label>
                <Form.Control type="text" placeholder="Enter names" value={updatedProduct.name} onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Enter price" value={updatedProduct.price} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="formDescriptions">
                <Form.Label>Descriptions</Form.Label>
                <Form.Control type="text" placeholder="Enter descriptions" value={updatedProduct.description} onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })} />
              </Form.Group>
              <Button variant="dark" type="submit">
                Update Product
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default AdminPanel;