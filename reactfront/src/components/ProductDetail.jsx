import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      const response = await fetch(`http://localhost:8000/api/product/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProductDetail();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  


  return (
    // <div>
    //      <div className="dashboard">
    //     <h2>Product Detail Dashboard</h2>
    //   </div>
    //   <br></br>
    //      <Link to='/create' className='btn btn-success btn-lg text-white mx-2'>
    //       Create Product
    //     </Link>

    //   <Link to={`/edit/${product.id}`} className='btn btn-info'>
    //               Edit
    //             </Link>
    //             <br></br><br></br>
                
    //   <p>Description: {product.description}</p>
    //   <p>Price: {product.price}</p>
    //   <p>Stock: {product.stock}</p>
    //   <p>CategoryID : {product.category_id}</p>
   
    // </div>
    <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="dashboard mb-4">
                                <h2 className="text-center">Detalle del Producto</h2>
                            </div>
                            <div className="mb-3">
                                <Link to="/create" className="btn btn-success btn-lg text-white mx-2">
                                    Crear Producto
                                </Link>
                                <Link to={`/edit/${product.id}`} className="btn btn-info">
                                    Editar
                                </Link>
                            </div>
                            <div>
                                <p><strong>Descripción:</strong> {product.description}</p>
                                <p><strong>Precio:</strong> {product.price}</p>
                                <p><strong>Stock:</strong> {product.stock}</p>
                                <p><strong>Categoría ID:</strong> {product.category_id}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default ProductDetail;
