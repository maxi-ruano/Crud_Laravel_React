

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     _token: window.csrfToken,
//     name: '',
//     email: '',
//     password: '',
//     password_confirmation: '',
//   });

//   const [formErrors, setFormErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Validar longitud de la contraseña y actualizar errores
//     if (name === 'password' && value.length < 6) {
//       setFormErrors({ ...formErrors, password: 'La contraseña debe tener al menos 6 caracteres.' });
//     } else {
//       setFormErrors({ ...formErrors, password: '' });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Verificar si hay errores antes de enviar el formulario
//       if (Object.values(formErrors).some((error) => error)) {
//         return;
//       }

//       const response = await fetch('http://localhost:8000/api/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer ' + formData._token,
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json().catch((error) => {
//         console.error('Error al analizar la respuesta JSON:', error);
//       });

//       console.log(data);

//       if (response.ok) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Registro exitoso',
//           text: 'Tu cuenta ha sido creada con éxito.',
//         }).then(() => {
//           // Redirige a la ruta deseada (por ejemplo, /login)
//           navigate('/');
//         });
//       }
//     } catch (error) {
//       console.error('Error al enviar la solicitud:', error);
//     }
//   };

//   return (
//     // <div>
//     //   <h2>Registrarse</h2>
//     //   <form onSubmit={handleSubmit}>
//     //     <label>
//     //       Nombre:
//     //       <input type="text" name="name" value={formData.name} onChange={handleChange} />
//     //     </label>
//     //     <br />
//     //     <label>
//     //       Correo Electrónico:
//     //       <input type="email" name="email" value={formData.email} onChange={handleChange} />
//     //     </label>
//     //     <br />
//     //     <label>
//     //       Contraseña:
//     //       <input type="password" name="password" value={formData.password} onChange={handleChange} />
//     //     </label>
//     //     {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}
//     //     <br />
//     //     <label>
//     //       Confirmar Contraseña:
//     //       <input
//     //         type="password"
//     //         name="password_confirmation"
//     //         value={formData.password_confirmation}
//     //         onChange={handleChange}
//     //       />
//     //     </label>
//     //     <br />
//     //     <button type="submit">Registrarse</button>
//     //   </form>
//     // </div>
//     <div className="container mt-5">
//     <div className="row justify-content-center">
//       <div className="col-md-6">
//         <div className="card">
//           <div className="card-body">
//             <h2 className="card-title text-center">Registrarse</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="name" className="form-label">Nombre:</label>
//                 <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="email" className="form-label">Correo Electrónico:</label>
//                 <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="password" className="form-label">Contraseña:</label>
//                 <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
//                 {formErrors.password && <p className="text-danger">{formErrors.password}</p>}
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="password_confirmation" className="form-label">Confirmar Contraseña:</label>
//                 <input type="password" className="form-control" id="password_confirmation" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} />
//               </div>
//               <div className="text-center">
//                 <button type="submit" className="btn btn-primary">Registrarse</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    _token: window.csrfToken,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validar longitud de la contraseña y actualizar errores
    if (name === 'password' && value.length < 6) {
      setFormErrors({ ...formErrors, password: 'La contraseña debe tener al menos 6 caracteres.' });
    } else if (name === 'email') {
      // Validar formato de correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(value);
      setFormErrors({ ...formErrors, email: isValidEmail ? '' : 'Ingrese un correo electrónico válido.' });
    } else {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verificar si hay errores antes de enviar el formulario
      if (Object.values(formErrors).some((error) => error)) {
        return;
      }

      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + formData._token,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch((error) => {
        console.error('Error al analizar la respuesta JSON:', error);
      });

      console.log(data);

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Tu cuenta ha sido creada con éxito.',
        }).then(() => {
          // Redirige a la ruta deseada (por ejemplo, /login)
          navigate('/');
        });
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
              <h2 className="card-title text-center">Registrarse</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nombre:</label>
                  <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo Electrónico:</label>
                  <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                  {formErrors.email && <p className="text-danger">{formErrors.email}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña:</label>
                  <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
                  {formErrors.password && <p className="text-danger">{formErrors.password}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password_confirmation" className="form-label">Confirmar Contraseña:</label>
                  <input type="password" className="form-control" id="password_confirmation" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Registrarse</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
