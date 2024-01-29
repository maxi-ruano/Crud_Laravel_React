import React, { useState, useEffect } from 'react';
import CreateCategory from './CreateCategory'; 
import EditCategory from './EditCategory'; 

const CategoryModal = ({ isOpen, onClose, onSelectCategory  }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);

useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/categories');
        const data = await response.json();
        setCategories(data);
    

      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  const handleCategorySelect = (categoryId) => {

    setSelectedCategoryId(categoryId);
  };

  const openCreateCategoryModal = () => {
    setIsCreateCategoryOpen(true);
  };

  const closeCreateCategoryModal = () => {
    setIsCreateCategoryOpen(false);
  };

  const openEditCategoryModal = () => {
    setIsEditCategoryOpen(true);
  };

  const closeEditCategoryModal = () => {
    setIsEditCategoryOpen(false);
  };
  


  
  
  const onDeleteCategory = async (categoryId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `You won't be able to revert this!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });
  
      if (!result.isConfirmed) {
        return; 
      }
  
      const response = await fetch(`http://localhost:8000/api/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      let data = {}; 
  
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
      }
  
      if (response.ok) {
        console.log(`Success message from server: ${data.message}`);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Category deleted successfully!',
        });
        fetchUpdatedCategories();
      } else {
       
        console.error(`HTTP error! Status: ${response.status}`);
        console.error(`Error message from server: ${data.error}`);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Error deleting category. Please try again.',
        });
      }
    } catch (error) {
      
      console.error('Error deleting category:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Error deleting category. Please try again.',
      });
    }
  };
  
  
  const fetchUpdatedCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categories');
      const data = await response.json();
      setCategories(data);
  
    } catch (error) {
      console.error('Error fetching updated categories:', error);
    }
  };
  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none', background: 'white' }}>
      <div className="modal-content">
      <div className="mt-3">
          <button onClick={openCreateCategoryModal} className="btn btn-success">
            Create Category
          </button>

        </div>

        <br></br>


<ul className="list-group">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`list-group-item ${selectedCategoryId === category.id ? 'active' : ''}`}
            onClick={() => handleCategorySelect(category.id)}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span>{category.name}</span>
              <div>
                
                <button onClick={() => openEditCategoryModal(category.id)} className="btn btn-primary mx-2">
                  Edit Category
                </button>
                <button onClick={() => onDeleteCategory(category.id)} className="btn btn-danger">
                  Delete Category
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
{/* 
        <button onClick={onClose} className="btn btn-secondary mt-3">
          Close
        </button> */}
        <button
  onClick={onClose}
  className="btn btn-secondary mt-3"
  style={{ width: '10%', marginLeft: '45%' }}
>
  Close
</button>

      </div>
<br></br>
  
      {isCreateCategoryOpen && <CreateCategory onClose={closeCreateCategoryModal} />}

{(console.log(selectedCategoryId))}
     
      {isEditCategoryOpen && <EditCategory categoryId={selectedCategoryId} onClose={closeEditCategoryModal} />}
    </div>
  );
};

export default CategoryModal;
