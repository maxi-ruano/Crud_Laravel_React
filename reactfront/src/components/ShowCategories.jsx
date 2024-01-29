import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryModal from './CategoryModal';


const ShowCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/categories/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Category deleted successfully!');
        setDeleteMessage('Product deleted successfully!');

        setIsDeleteModalOpen(false);
        fetchCategories();
      } else {
        console.error('Failed to delete category. HTTP error:', response.status);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const openDeleteModal = (id) => {
    console.log('openDeleteModal called with ID:', id);
    setCategoryIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setCategoryIdToDelete(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="container mt-4">
      <div className='d-flex justify-content-between align-items-center'>
        <h3 className="mb-3">Categories Dashboard</h3>
        {deleteMessage && (
        <div className="alert alert-success mt-3" role="alert" style={{ color: 'red' }}>
        {deleteMessage}
        </div>
      )}
        <Link to='/createCategory' className='btn btn-success btn-lg'>
          Create Category
        </Link>
      </div>
      <br></br>
      <ul className="list-group">
        {categories.map((category) => (
          <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{category.name}</span>
            <div>
              <Link to={`/editCategory/${category.id}`} className='btn btn-primary me-2'>
                Edit
              </Link>
              <button onClick={() => openDeleteModal(category.id)} className='btn btn-danger'>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <br></br>
      <Link to='/' className='btn btn-success btn-lg'>
          Back
        </Link>
      {isDeleteModalOpen && (
        <div className="modal" style={{ display: 'block', background: 'white' }}>
          <div className="modal-content">
            <p>
              Are you sure you want to delete the category with ID {categoryIdToDelete}?
            </p>
            <button onClick={() => deleteCategory(categoryIdToDelete)} className="btn btn-danger">
              Yes, Delete
            </button>
            <button onClick={closeDeleteModal} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
        
      )}
{(console.log('Before passing to CategoryModal, fetchCategories type:', typeof fetchCategories))};

 
    </div>
    
  );
};

export default ShowCategories;
