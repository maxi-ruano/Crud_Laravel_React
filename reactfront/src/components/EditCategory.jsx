
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api';
const categoryEndpoint = `${endpoint}/categories`;

const EditCategory = ({ categoryId }) => {
  const [name, setName] = useState('');
  const [isCategoryUpdated, setIsCategoryUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();

  const updateCategory = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${categoryEndpoint}/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      let data = {}; 

      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
      }

      if (response.ok) {
        // Caso exitoso
        console.log(`Success message from server: ${data.message}`);
        setIsCategoryUpdated(true);
        setTimeout(() => window.location.reload(), 1500);


      } else {
        console.error(`HTTP error! Status: ${response.status}`);
        console.error(`Error message from server: ${data.error}`);
        setErrorMessage('Complete all fields.');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setErrorMessage('Error updating category. Please try again.');
    }
  };

  useEffect(() => {
    const getCategoryById = async () => {
      try {
        const response = await fetch(`${categoryEndpoint}/${categoryId}`);

        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status}`);
          return;
        }

        const data = await response.json();

        console.log('Response data:', data);

        if (data) {
          setName(data.name);
        } else {
          console.error('Empty or invalid JSON response.');
        }
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    getCategoryById();
  }, [categoryId]);

  return (
    // <div>
    //   <h3>Edit Category</h3>
    //   {isCategoryUpdated && (
    //     <p style={{ color: 'green' }}>Category updated successfully!</p>
    //   )}
    //   {errorMessage && (
    //     <p style={{ color: 'red' }}>{errorMessage}</p>
    //   )}
    //   <form onSubmit={updateCategory}>
    //     <div>
    //       <label>Name</label>
    //       <br></br>
    //       <input type="text" value={name} onChange={(e) => setName(e.target.value)}  />
    //     </div>
    //     <br></br>
    //     <button type="submit">Edit</button>
    //   </form>
    //   <br></br>
    // </div>
    <div className="container mt-3">
      <h3>Edit Category</h3>
      {isCategoryUpdated && (
        <p className="text-success">Category updated successfully!</p>
      )}
      {errorMessage && (
        <p className="text-danger">{errorMessage}</p>
      )}
      <form onSubmit={updateCategory}>
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Edit</button>
      </form>
    </div>
  );
};

export default EditCategory;
