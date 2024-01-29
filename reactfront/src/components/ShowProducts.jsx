
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CategoryModal from './CategoryModal';

const endpoint = 'http://localhost:8000/api';

const ShowProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [orderBy, setOrderBy] = useState('id');
  const [orderDirection, setOrderDirection] = useState('asc');

  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts(currentPage);
  }, [currentPage, orderBy, orderDirection]);

  const getAllProducts = async (page) => {
    try {
      let url = `${endpoint}/products?per_page=10&page=${page}&order_by=${orderBy}&order_direction=${orderDirection}`;

      const response = await fetch(url);

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        return;
      }

      const data = await response.json();

      const filteredProducts = searchTerm
        ? data.data.filter((product) =>
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : data.data;

      setProducts(filteredProducts);
      setTotalPages(data.last_page);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = () => {
    getAllProducts(1);
  };


  const deleteProduct = async () => {
    try {
      if (productIdToDelete) {
        console.log('Deleting product with ID:', productIdToDelete);
  
        const response = await fetch(`${endpoint}/product/${productIdToDelete}`, {
          method: 'DELETE',
        });
  
        let data = {};
  
        try {
          data = await response.json();
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
        }
  
        if (response.ok) {
          if (data && data.message) {
            console.log(`Success message from server: ${data.message}`);
            setDeleteMessage(data.message);
          } else {
            console.log('Product deleted successfully!');
            setDeleteMessage('Product deleted successfully!');
          }
  
          setIsDeleteModalOpen(false);
          getAllProducts(currentPage);
        } else {
          console.error('Failed to delete product. HTTP error:', response.status);
  
          if (data && data.error) {
            console.error(`Error message from server: ${data.error}`);
            setDeleteErrorMessage(data.error);
          } else {
            console.error('No error message from server. Using generic message.');
            setDeleteErrorMessage('Error deleting product. Please try again.');
          }
  
          setTimeout(() => setDeleteErrorMessage(''), 3000);
        }
      }
    } catch (error) {
      console.error('Error deleting product:', error);
  
      setDeleteErrorMessage('Error deleting product. Please try again.');
      setTimeout(() => setDeleteErrorMessage(''), 3000);
    }
  };
  

  const openDeleteModal = (id) => {
    console.log('openDeleteModal called with ID:', id);
    setProductIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setProductIdToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const openCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const handleOrderByChange = (e) => {
    setOrderBy(e.target.value);
  };

  const handleOrderDirectionChange = (e) => {
    setOrderDirection(e.target.value);
  };

  return (
    <div>
      <div className="dashboard">
        <h2>Product Management Dashboard</h2>
        <br></br>
        {deleteMessage && (
          <div className="alert alert-success mt-3" role="alert" style={{ color: 'red' }}>
            {deleteMessage}
          </div>
        )}
        <Link to="/create" className="btn btn-success mx-2">
          Create Product
        </Link>
        <button onClick={openCategoryModal} className="btn btn-success">
          Categories
        </button>
      </div>
      <br></br>
      <div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <br></br>

      <div>
        <label htmlFor="orderBy">Order By:</label>
       
      <input
          type="text"
          id="orderBy"
          value={orderBy}
          onChange={handleOrderByChange}
          readOnly
          style={{ width: '150px' }}  
        />

        <label htmlFor="orderDirection">Order Direction:</label>
        <select id="orderDirection" value={orderDirection} onChange={handleOrderDirectionChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <br></br>

      <div>
        <div className="d-grid gap-2">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.category?.name || 'N/A'}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <Link to={`/edit/${product.id}`} className="btn btn-success">
                      Edit Product
                    </Link>
                    <button onClick={() => openDeleteModal(product.id)} className="btn btn-danger mx-2">
                      Delete
                    </button>
                    <button onClick={() => navigate(`/product/${product.id}`)} className="btn btn-primary">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
                >
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="modal" style={{ display: 'block', background: 'white' }}>
          <div className="modal-content">
            <p>
              Are you sure you want to delete the product with ID {productIdToDelete}?
            </p>
            <button onClick={deleteProduct} className="btn btn-danger">
              Yes, Delete
            </button>
            <button onClick={closeDeleteModal} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}

      {isCategoryModalOpen && (
        <CategoryModal
          isOpen={isCategoryModalOpen}
          onClose={closeCategoryModal}
          onSelectCategory={handleCategorySelect}
        />
      )}
    </div>
  );
};

export default ShowProducts;
