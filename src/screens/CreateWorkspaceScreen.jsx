import React from 'react'
import useForm from '../hooks/useForm.jsx'
import ENVIRONMENT from '../utils/constants/environment.js'
import { getAuthenticatedHeaders } from '../fetching/customHeaders.js'
import { useNavigate } from 'react-router-dom'

const CreateWorkspaceScreen = () => {

    const navigate = useNavigate()
    
    const {handleChangeInput, form_state} = useForm({name: ''})
    
    const handleCreateWorkspace = async (event) => {
        event.preventDefault()
        const response = await fetch(ENVIRONMENT.API_URL + '/api/workspace', {
            method: "POST",
            headers: getAuthenticatedHeaders(),
            body: JSON.stringify(form_state)
        })
        const data = await response.json()
        navigate('/home')
    }
  return (
    <div>
        <h1>Crear nuevo espacio de trabajo</h1>
        <form onSubmit={handleCreateWorkspace}>
            <div>
                <label htmlFor="name"></label>
                <input 
                    type="text" 
                    id='name' 
                    name='name' 
                    placeholder='nombre del workspace' 
                    onChange={handleChangeInput} 
                    value={form_state.name}
                />
            </div>
            <button type='submit'>Crear</button>
        </form>
    </div>
  )
}

export default CreateWorkspaceScreen