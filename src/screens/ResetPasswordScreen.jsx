import React from 'react'
import useForm from '../hooks/useForm'
import ENVIRONMENT from '../utils/constants/environment'

const ResetPasswordScreen = () => {
    const url = new URLSearchParams(window.location.search)
    const reset_token = url.get('reset_token')
    const {form_state, handleChangeInput} = useForm({password: ''})
    const handleSubmitResetPassword = async (e) => {
        try{
            e.preventDefault()
            const response = await fetch(`${ENVIRONMENT.API_URL}/api/auth/reset-password?reset_token=${reset_token}`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': ENVIRONMENT.API_KEY
                },
                body: JSON.stringify(form_state)
        })
        const data = await response.json()
        }
        catch(error){
            console.error(error)
        }
    }
    return (
    <div>
        <h1>Elige una nueva contraseña</h1>
        <form onSubmit={handleSubmitResetPassword}>
            <label htmlFor="password">nueva contraseña:</label>
            <input type="password" name='password' id="password" placeholder='*********' onChange={handleChangeInput}/>
            <button>enviar</button>
        </form>
    </div>
  )
}

export default ResetPasswordScreen