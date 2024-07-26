import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Read = () => {
    const [data, setData] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/todos/${id}`)
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const handleEdit = () => {
        navigate(`/update/${id}`);
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 rounded'>
                <h2>Detail of Todo</h2>
                <div className='mb-2'>
                    <strong className='text-gray'>Title: {data.title}</strong>
                </div>
                <div className='mb-2'>
                    <strong className='text-gray'>File: {data.file}</strong>
                </div>
                <div className='mb-2'>
                    <strong className='text-gray'>Description: {data.description}</strong>
                </div>
                <button onClick={handleEdit} className='btn btn-success'>Edit</button>
                <button onClick={handleBack} className='btn btn-primary ms-3'>Back</button>
            </div>
        </div>
    );
};

export default Read;
