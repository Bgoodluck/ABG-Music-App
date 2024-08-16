// import React, {  useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';  
// import { toast } from 'react-toastify'; 
// import 'react-toastify/dist/ReactToastify.css';




// const AuthPage = () => {

//     const url = "http://localhost:4000"


//     const [isRegister, setIsRegister] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: ''
//     });
//     const navigate = useNavigate();

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         try {
//             const endpoint = isRegister ? `${url}/api/user/register` : `${url}/api/user/login`;
//             const response = await axios.post(endpoint, formData);
            
//             if (response.data.success) {
//                 if (isRegister) {
//                     toast.success('Registration successful! You can now log in.');
//                 } else {
//                     toast.success('Login successful! Welcome back.');
//                 }
//                 console.log(response.data.message);
//                 navigate('/'); // Redirect to home page or another page
//             } else {
//                 toast.error(response.data.message || 'An error occurred');
//                 console.error(response.data.message);
//             }
//         } catch (error) {
//             toast.error('Error during API call');
//             console.error('Error during API call:', error);
//         }
//     };

//     return (
//         <div className='w-full max-w-sm mx-auto p-4'>
//             <button
//                 className='bg-gray-800 text-white px-4 py-2 rounded mb-4'
//                 onClick={() => setIsRegister(!isRegister)}
//             >
//                 {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
//             </button>
//             <h2 className='text-2xl font-bold mb-4'>{isRegister ? 'Register' : 'Login'}</h2>
//             <form onSubmit={handleSubmit} className='space-y-4'>
//                 {isRegister && (
//                     <div>
//                         <label className='block text-gray-700'>Name</label>
//                         <input
//                             type='text'
//                             name='name'
//                             value={formData.name}
//                             onChange={handleInputChange}
//                             className='w-full p-2 border border-gray-300 rounded text-black'
//                             required
//                         />
//                     </div>
//                 )}
//                 <div>
//                     <label className='block text-gray-700'>Email</label>
//                     <input
//                         type='email'
//                         name='email'
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         className='w-full p-2 border border-gray-300 rounded text-black'
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label className='block text-gray-700'>Password</label>
//                     <input
//                         type='password'
//                         name='password'
//                         value={formData.password}
//                         onChange={handleInputChange}
//                         className='w-full p-2 border border-gray-300 rounded text-black'
//                         required
//                     />
//                 </div>
//                 <button
//                     type='submit'
//                     className='bg-blue-500 text-white px-4 py-2 rounded'
//                 >
//                     {isRegister ? 'Register' : 'Login'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AuthPage;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';  
// import { toast } from 'react-toastify'; 
// import 'react-toastify/dist/ReactToastify.css';

// const AuthPage = () => {
//     const url = "http://localhost:4000";
//     const [isRegister, setIsRegister] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: ''
//     });
//     const navigate = useNavigate();

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         try {
//             const endpoint = isRegister ? `${url}/api/user/register` : `${url}/api/user/login`;
//             const response = await axios.post(endpoint, formData);
            
//             if (response.data.success) {
//                 const { token, userId } = response.data; // Adjust based on actual response structure

//                 // Store token and userId in localStorage
//                 localStorage.setItem('token', token);
//                 localStorage.setItem('userId', userId);
//                 console.log(localStorage);

//                 if (isRegister) {
//                     toast.success('Registration successful! You can now log in.');
//                 } else {
//                     toast.success('Login successful! Welcome back.');
//                 }

//                 navigate('/'); // Redirect to home page or another page
//             } else {
//                 toast.error(response.data.message || 'An error occurred');
//                 console.error(response.data.message);
//             }
//         } catch (error) {
//             toast.error('Error during API call');
//             console.error('Error during API call:', error);
//         }
//     };

//     return (
//         <div className='w-full max-w-sm mx-auto p-4'>
//             <button
//                 className='bg-gray-800 text-white px-4 py-2 rounded mb-4'
//                 onClick={() => setIsRegister(!isRegister)}
//             >
//                 {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
//             </button>
//             <h2 className='text-2xl font-bold mb-4'>{isRegister ? 'Register' : 'Login'}</h2>
//             <form onSubmit={handleSubmit} className='space-y-4'>
//                 {isRegister && (
//                     <div>
//                         <label className='block text-gray-700'>Name</label>
//                         <input
//                             type='text'
//                             name='name'
//                             value={formData.name}
//                             onChange={handleInputChange}
//                             className='w-full p-2 border border-gray-300 rounded text-black'
//                             required
//                         />
//                     </div>
//                 )}
//                 <div>
//                     <label className='block text-gray-700'>Email</label>
//                     <input
//                         type='email'
//                         name='email'
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         className='w-full p-2 border border-gray-300 rounded text-black'
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label className='block text-gray-700'>Password</label>
//                     <input
//                         type='password'
//                         name='password'
//                         value={formData.password}
//                         onChange={handleInputChange}
//                         className='w-full p-2 border border-gray-300 rounded text-black'
//                         required
//                     />
//                 </div>
//                 <button
//                     type='submit'
//                     className='bg-blue-500 text-white px-4 py-2 rounded'
//                 >
//                     {isRegister ? 'Register' : 'Login'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AuthPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const AuthPage = () => {
    const url = "http://localhost:4000";
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const endpoint = isRegister ? `${url}/api/user/register` : `${url}/api/user/login`;
            const response = await axios.post(endpoint, formData);
            
            if (response.data.success) {
                const { token, userId, name } = response.data; 
    
                if (!userId) {
                    console.error('userId is missing in the response');
                    return;
                }
    
                // Store token and userId in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                localStorage.setItem('name', name); // Optionally store the user's name
                console.log('Stored data:', localStorage);
    
                if (isRegister) {
                    toast.success('Registration successful! You can now log in.');
                } else {
                    toast.success('Login successful! Welcome back.');
                }
    
                navigate('/'); 
            } else {
                toast.error(response.data.message || 'An error occurred');
                console.error(response.data.message);
            }
        } catch (error) {
            toast.error('Error during API call');
            console.error('Error during API call:', error);
        }
    };

    return (
        <div className='w-full max-w-sm mx-auto p-4'>
            <button
                className='bg-gray-800 text-white px-4 py-2 rounded mb-4'
                onClick={() => setIsRegister(!isRegister)}
            >
                {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
            </button>
            <h2 className='text-2xl font-bold mb-4'>{isRegister ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                {isRegister && (
                    <div>
                        <label className='block text-gray-700'>Name</label>
                        <input
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleInputChange}
                            className='w-full p-2 border border-gray-300 rounded text-black'
                            required
                        />
                    </div>
                )}
                <div>
                    <label className='block text-gray-700'>Email</label>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        className='w-full p-2 border border-gray-300 rounded text-black'
                        required
                    />
                </div>
                <div>
                    <label className='block text-gray-700'>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleInputChange}
                        className='w-full p-2 border border-gray-300 rounded text-black'
                        required
                    />
                </div>
                <button
                    type='submit'
                    className='bg-blue-500 text-white px-4 py-2 rounded'
                >
                    {isRegister ? 'Register' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default AuthPage;
