
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Update = ({ show, handleClose, todoId, fetchData }) => {
    const [values, setValues] = useState({
        title: '',
        file: '',
        description: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (todoId) {
            axios.get(`http://localhost:5000/api/todos/${todoId}`)
                .then(res => {
                    setValues(res.data);
                })
                .catch(err => console.error(err));
        }
    }, [todoId]);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/todos/${todoId}`, values)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Update Successful!',
                    text: 'Your data has been updated successfully.',
                    confirmButtonText: 'OK',
                }).then(() => {
                    handleClose();
                    fetchData();
                    navigate('/');
                });
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: 'There was an error updating your data.',
                    confirmButtonText: 'OK',
                });
            });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleUpdate}>
                    <div className='mb-2'>
                        <label htmlFor='title'>Title:</label>
                        <input
                            type='text'
                            name='title'
                            className='form-control'
                            placeholder='Enter your title'
                            value={values.title}
                            onChange={(e) => { setValues({ ...values, title: e.target.value }) }}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='description'>Description:</label>
                        <textarea
                            name='description'
                            className='form-control'
                            placeholder='Enter your description'
                            value={values.description}
                            onChange={(e) => { setValues({ ...values, description: e.target.value }) }}
                        ></textarea>
                    </div>
                    <Button variant="success" type="submit">
                        Update
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default Update;
