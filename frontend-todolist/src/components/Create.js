
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Create = () => {
    const [values, setValues] = useState({
        title: '',
        file: null,
        description: '',
        priority: 'medium'
    });
    const [fileUrl, setFileUrl] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleFileChange = (e) => {
        setValues({ ...values, file: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('file', values.file);
        formData.append('description', values.description);
        formData.append('priority', values.priority);

        axios.post('http://localhost:5000/api/todos', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            console.log(res);
            Swal.fire({
                icon: 'success',
                title: 'Submission Successful!',
                text: 'Your data has been submitted successfully.',
                confirmButtonText: 'OK',
            }).then(() => {
                setFileUrl(`http://localhost:3000/uploads/${res.data.file}`); // Assuming res.data.file contains the filename
                navigate('/');
            });
        })
        .catch((err) => {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'There was an error submitting your data.',
                confirmButtonText: 'OK',
            });
        });
    };

    return (
        <div className='d-flex w-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 rounded'>
                <h1>Add a todo</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <label htmlFor='title'>Title:</label>
                        <input type='text' name='title' className='form-control' placeholder='Enter your title'
                            onChange={handleChange} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='file'>File:</label>
                        <input type='file' name='file' className='form-control' placeholder='Please select File'
                            onChange={handleFileChange} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='description'>Description:</label>
                        <textarea name='description' className='form-control' placeholder='Enter your description'
                            onChange={handleChange}></textarea>
                    </div>
                    <button className='btn btn-success'>Submit</button>
                    <Link to="/" className="btn btn-primary ms-3">Back</Link>
                </form>
                {fileUrl && (
                    <div className="mt-3">
                        <h3>Uploaded File:</h3>
                        <img src={fileUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Create;

