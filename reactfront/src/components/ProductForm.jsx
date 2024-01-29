
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api';
const productEndpoint = `${endpoint}/product`;
const categoriesEndpoint = `${endpoint}/categories`;

const ProductForm = () => {
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isProductCreated, setIsProductCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(categoriesEndpoint);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();

    
    if (id) {
      loadProductData();
    }
  }, [id]); 
  const loadProductData = async () => {
    try {
      const response = await fetch(`${productEndpoint}/${id}`);
      const data = await response.json();

      
      setDescription(data.description);
      
      setPrice(data.price);
      setStock(data.stock);
      setSelectedCategory(String(data.category_id || ''));
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  
  const storeOrUpdateProduct = async (e) => {
    e.preventDefault();

    const method = id ? 'PUT' : 'POST'; 
    const url = id ? `${productEndpoint}/${id}` : productEndpoint;

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description, price, stock, category_id: selectedCategory }),
        });

        let data = {};

        try {
            data = await response.json();
        } catch (jsonError) {
            console.error('Error parsing JSON:', jsonError);
        }

        if (response.ok) {
            console.log(`Success message from server: ${data.message}`);
            setIsProductCreated(true);

            setTimeout(() => {
                setIsProductCreated(false);
                navigate('/products');
            }, 3000);
        } else {
            console.error(`HTTP error! Status: ${response.status}`);
            console.error(`Error message from server: ${data.error}`);
            setErrorMessage('Complete all fields');

        }
    } catch (error) {
        console.error('Error during fetch:', error);
    }
};

  return (
    // <div>
    //   <h3>{id ? 'Edit Product' : 'Create Product'}</h3>
    //   {errorMessage && (
    //     <p style={{ color: 'red' }}>{errorMessage}</p>
    //   )}
    //   {isProductCreated && <p style={{ color: 'green' }}>{id ? 'Product updated successfully!' : 'Product created successfully!'}</p>}
    //   <form onSubmit={storeOrUpdateProduct}>
    //     <div>
    //       <label>Description</label>
    //       <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
    //     </div>
    //     <div>
    //       <label>Price</label>
    //       <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}  />
    //     </div>
    //     <div>
    //       <label>Stock</label>
    //       <input type="text" value={stock} onChange={(e) => setStock(e.target.value)} />
    //     </div>
    //     <div>
    //       <label>Category</label>
    //       <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} >
    //         <option value="">Select a category</option>
    //         {categories.map((category) => (
    //           <option key={category.id} value={category.id}>
    //             {category.name}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //     <button type="submit">{id ? 'Update' : 'Create'}</button>
    //   </form>
    // </div>
    <div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-6">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title text-center">{id ? 'Editar Producto' : 'Crear Producto'}</h3>
                    {errorMessage && (
                        <p className="text-danger text-center mb-3">{errorMessage}</p>
                    )}
                    {isProductCreated && (
                        <p className="text-success text-center mb-3">
                            {id ? 'Producto actualizado exitosamente!' : 'Producto creado exitosamente!'}
                        </p>
                    )}
                    <form onSubmit={storeOrUpdateProduct}>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descripción</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Precio</label>
                            <input
                                type="text"
                                className="form-control"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="stock" className="form-label">Stock</label>
                            <input
                                type="text"
                                className="form-control"
                                id="stock"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Categoría</label>
                            <select
                                className="form-select"
                                id="category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">Selecciona una categoría</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">
                                {id ? 'Actualizar' : 'Crear'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default ProductForm;
