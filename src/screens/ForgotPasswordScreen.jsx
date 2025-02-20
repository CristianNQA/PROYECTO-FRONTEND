import React from 'react'
import useForm from '../hooks/useForm'
import ENVIRONMENT from '../utils/constants/environment'

const ForgotPasswordScreen = () => {
  const {form_state, handleChangeInput} = useForm({email:''})
  const handleSubmitForgotPassword = async (e) => {
    try{
      e.preventDefault()
      const response = await fetch(ENVIRONMENT.API_URL + '/api/auth/forgot-password',{
        method: "POST", 
        headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(form_state)
        })
      const data = await response.json()
      if(data.ok){
        alert('se envio el mail de verificacion')
      }
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <div>
      <h1>reestablecer mi Contraseña</h1>
      <p>vamos a enviarte un correo para que sigas los pasos de recuperion</p>
      <form onSubmit={handleSubmitForgotPassword}>
        <label htmlFor="email">Ingresa el Email registrado:</label>
        <input placeholder='ejemplo@gmail.com' name='email' id='email' onChange={handleChangeInput}/>
        <button>enviar correo</button>
      </form>
    </div>
  )
}

export default ForgotPasswordScreen