import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate(); 
    const [error, setError] = useState(null);


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch((error) => {
        console.error('Error al analizar la respuesta JSON:', error);
      });

      console.log(data);
      if (response.ok) {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Inicio de sesión exitoso',
          icon: 'success',
      });
 
        navigate('/products'); 

        


      }
      else {
        setError(data.error || 'Hubo un problema al iniciar sesión');
      }
      
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    


    <div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-6">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title text-center">Iniciar Sesión</h2>
                    {error && <p className="text-danger text-center mb-3">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico:</label>
                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña:</label>
                            <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default Login;
