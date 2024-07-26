import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Update from './Update';
const Home = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [markedIds, setMarkedIds] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [ showSelect, setShowSelect] = useState(false);
  const [priority, setPriority] = useState("");
  const [modalShow, setModalShow] = useState(false);
    const [selectedTodoId, setSelectedTodoId] = useState(null);

    const handleEditClick = (id) => {
        setSelectedTodoId(id);
        setModalShow(true);
    };

    const handleClose = () => {
        setModalShow(false);
        setSelectedTodoId(null);
    };
  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);
  
  useEffect(() => {
    fetchData();
  }, []);
console.log("showSelect",showSelect);
  const fetchData = () => {
    axios.get('http://localhost:5000/api/todos')
    .then((res)=> {
      console.log("data", res.data);
      setData(res.data)
    }).catch((error) => {
      console.error(error)
    })
  }

  const handleDragStart = (e, todo) => {
    setDraggedItem(todo);
    setShowSelect(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const updatedData = [...data];
    const draggedItemIndex = updatedData.findIndex(item => item.id === draggedItem.id);
    const itemToMove = updatedData[draggedItemIndex];
    updatedData.splice(draggedItemIndex, 1);
    updatedData.splice(index, 0, itemToMove);
    
    setData(updatedData);
    setDraggedItem(null);
  };
  
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this todo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/api/todos/${id}`)
          .then(res => {
            const updatedData = data.filter(item => item.id !== id);
            setData(updatedData);
            Swal.fire(
              'Deleted!',
              'The todo has been deleted.',
              'success'
            ).then(() => {
              // Refresh data or navigate after deletion
              axios.get('http://localhost:5000/api/todos')
                .then(res => setData(res.data))
                .catch(err => console.error(err));
            });
          })
          .catch(err => {
            console.log(err);
            Swal.fire(
              'Error!',
              'There was an error deleting the todo.',
              'error'
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'The todo was not deleted :)',
          'info'
        );
      }
    });
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleCheckboxChange = (id) => {
    if (markedIds.includes(id)) {
      setMarkedIds(markedIds.filter(markedId => markedId !== id));
    } else {
      setMarkedIds([...markedIds, id]);
    }
  };
  const filteredData = data.filter((d) =>
    d.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleMarkAsCompleted = () => {
    const updatedData = data.map((todo) => {
      if (markedIds.includes(todo._id)) {
        return { ...todo, status: "completed" };
      } else {
        return todo;
      }
    });
    setData(updatedData);
  };
  const handlePriorityChange = (event) => {
    const updatedData = data.map((todo) => {
      if (markedIds.includes(todo._id)) {
        return { ...todo, mark: event.target.value };
      } else {
        return todo;
      }
    });
    setData(updatedData);
    setPriority("marked");
  };
  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
      <h1> List of Todos</h1>
      <div className='w-75 rounded bg-white border shadow p-4'>

        <div className='d-flex justify-content-end'>
        <select
            className="btn btn-primary me-2"
            onChange={handlePriorityChange}
            value={priority}
          >
            <option value="">Select Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button className='btn btn-success me-2' onClick={handleMarkAsCompleted}>Mark as completed</button>
          <Link to="/create" className='btn btn-success'>Add New Todo</Link>
        </div>

        <br />
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearch}
          className="form-control mb-3"
        />

        <table className='table table-striped'>
          <thead>
            <tr>
              <td></td>
              <td>ID</td>
              <td>TITLE</td>
              <td>FILE</td>
              <td>DESCRIPTION</td>
              <td>PRIORITY</td>
              <td>MARK</td>
              <td>ACTION</td>
            </tr>
          </thead>
          <tbody>
            {
              filteredData.map((d, i) => (
                <tr 
                  key={d._id} 
                  draggable 
                  onDragStart={(e) => handleDragStart(e, d)} 
                  onDragOver={(e) => handleDragOver(e)} 
                  onDrop={(e) => handleDrop(e, i)}
                >
                     <td>
                    <input
                      type="checkbox"
                      checked={markedIds.includes(d._id)}
                      onChange={() => handleCheckboxChange(d._id)}
                    />
                  </td>
                  <td>{i+1}</td>
                  <td>{d.title}</td>
                  <td><img src="{d.file}" alt='images'/></td>
                  <td>{d.description}</td>
                  <td>{d.mark}</td>
                  <td>{d.status}</td>
                  <td>
                    <Link to={`/read/${d._id}`} className='btn btn-sm btn-primary me-2'>Read</Link>
                    <button className='btn btn-sm btn-primary me-2' onClick={() => handleEditClick(d._id)}>Edit</button>
                    <button onClick={e => handleDelete(d._id)} className='btn btn-sm btn-danger me-2'>Delete</button>

                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <Update show={modalShow} handleClose={handleClose} todoId={selectedTodoId} fetchData={fetchData} />
    </div>
  )

}

export default Home;