import React, { useContext } from 'react'
import ENVIRONMENT from '../utils/constants/environment.js'
import useForm from '../hooks/useForm'
import { Link, useNavigate } from 'react-router-dom'
import {AuthContext} from '../Context/AuthContext.jsx'


const LoginScreen = () => {

    const {login, isAuthenticatedState} = useContext(AuthContext)
    console.log('Autehnticated:',isAuthenticatedState)
    const navigate = useNavigate()
    const {form_state, handleChangeInput} = useForm({email:'', password:''})
    const url = new URLSearchParams(window.location.search)
    if(url.get('verified')){
        alert('cuenta verificada')
    }

    const handleSubmitForm = async (event) => {
        
        try{
            event.preventDefault()
            const response = await fetch(ENVIRONMENT.API_URL + '/api/auth/login',
                {
                    method: "POST",
                    headers:{
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(form_state)
                }
            )
            const data = await response.json()
            console.log(data)

            //sessionStorage.setItem('access_token', data.data.access_token)
            login(data.data.access_token)
            navigate('/home')
        }
        catch(error){
            console.error('Error al loguear', error)
        }
    }
    const errores = {
        email: [
        ],
        password: [
        ]
    }
    form_state.email && form_state.email.length > 30 && errores.email.push('has alcanzado el limite de caracteres(30)')
    form_state.email && form_state.email.length < 5 && errores.email.push('el minimo de caracteres es 5')
    form_state.password && form_state.password.length < 5 && errores.password.push('el minimo de caracteres es 5')

    return (
        <main className='auth-screen'>
            
            <form onSubmit={handleSubmitForm} className='auth-form'>
                <h1 className='title'>Login</h1>
                <div className='input-container'>
                    <label htmlFor="email">Ingresa tu Email:</label>
                    <input 
                    name='email' 
                    id='email' 
                    placeholder='joedoe@gmail.com' 
                    value={form_state.email}
                    onChange={handleChangeInput}
                    />
                    {
                        errores.email.map(
                            (error, index) => <p 
                            key={index} 
                            style={{color: 'red'}}
                            >
                                {error}
                            </p>
                        )
                    }
                </div>
                <div className='input-container'>
                    <label htmlFor="password">Ingresa tu Contraseña:</label>
                    <input 
                    name='password' 
                    id='password' 
                    value={form_state.password}
                    onChange={handleChangeInput}
                    />
                    {
                        errores.password.map(
                            (error, index) => <p 
                            key={index} 
                            style={{color: 'red'}}
                            >
                                {error}
                            </p>
                        )
                    }
                </div>
                <button 
                type='submit' 
                disabled={
                    errores.email.length || errores.password.length || !form_state.email || !form_state.password
                    }
                >
                    Iniciar Sesion
                </button>
                <span>Aun no tienes cuenta? <Link to={'/register'}>Registrate</Link></span>
                <Link to={'/forgot-password'}>olvide mi Contraseña</Link>
            </form>
        </main>
    )
}

export default LoginScreen