
import React, { useState } from 'react';

const endpoint = 'http://localhost:8000/api/categories';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const store = async (e) => {
    e.preventDefault();
    console.log({ name });

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
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
        console.log(`Success message from server: ${data.message}`);
        setSuccessMessage('Category created successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        setTimeout(() => window.location.reload(), 1500);
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
        console.error(`Error message from server: ${data.error}`);
        setErrorMessage('Complete all fiels');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setErrorMessage('Complete all fiels');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    // <div>
    //   <h3>Create Category</h3>
    //   {successMessage && (
    //     <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>
    //   )}
    //   {errorMessage && (
    //     <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>
    //   )}

    //   <form onSubmit={store}>
    //     <div>
    //       <label>Name</label>
    //       <input type="text" value={name} onChange={(e) => setName(e.target.value)}  />
    //     </div>
    //     <button type="submit">Create</button>
    //   </form>
    // </div>
    <div className="container mt-3">
    <h3>Create Category</h3>
    {successMessage && (
      <div className="alert alert-success" role="alert">
        {successMessage}
      </div>
    )}
    {errorMessage && (
      <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
    )}

    <form onSubmit={store}>
      <div className="mb-3">
        {/* <label htmlFor="categoryName" className="form-label">Name</label> */}
        <label htmlFor="categoryName" className="col-sm-2 col-form-label">Name</label>
        <div className="col-sm-10">
        <input
          type="text"
          className="form-control"
          id="categoryName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Create</button>
    </form>
  </div>
  );
};

export default CreateCategory;

