/* import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import ENVIRONMENT from '../utils/constants/environment'
import { getAuthenticatedHeaders } from '../fetching/customHeaders'








const WorkspaceScreen = () => {
    const {workspace_id, channel_id} = useParams()

    const {
        data: channel_data,
        loading: channel_loading,
        error: channel_error
    } = useFetch(ENVIRONMENT.API_URL + `/api/channel/${workspace_id}/${channel_id}`, {
        method: "GET",
        headers: getAuthenticatedHeaders()
    });

  return (
    <div>
        {
            channel_loading 
            ? <h2>Cargando...</h2> 
            : <ChannelsList channel_list={channel_data.data.channel}
            workspace_id={workspace_id}/>
        }
        <div>
            {
                channel_id 
                ? <Channel workspace_id={workspace_id} channel_id={channel_id}/>
                : <h2>Aun no has seleccionado ningun canal</h2>
            }
        </div>
    </div>
  )
}


const ChannelsList = ({channel_list, workspace_id}) => {

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            {
                channel_list.map(channel => {
                    return (
                        <Link 
                            key={channel._id} 
                            to={`/workspace/${workspace_id}/${channel._id}`}
                        >
                            #{channel.name}
                        </Link>
                    )
                })
            }
        </div>
    )
}

const Channel = ({workspace_id, channel_id}) => {
    const {
        data: channel_data, 
        error: channel_error, 
        loading: channel_loading
    } = useFetch(ENVIRONMENT.API_URL + `/api/channel/${workspace_id}/${channel_id}`, {
        method: "GET",
        headers: getAuthenticatedHeaders()
    })
    return (
        <div>
            {
                channel_loading 
                ? <h2>Cargando...</h2>
                : channel_data.data.messages.map(message => {
                    return (
                        <div key={message._id}>
                            <h4>Author: {message.sender.username}</h4>
                            <p>{message.content}</p>
                        </div>
                    )
                })
            }
        </div>
    )
} 

export default WorkspaceScreen  */

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import ENVIRONMENT from '../utils/constants/environment';
import { getAuthenticatedHeaders } from '../fetching/customHeaders';
import useForm from '../hooks/useForm';

const WorkspaceScreen = () => {
    const { workspace_id, channel_id } = useParams();
    console.log("workspace_id:", workspace_id);
    console.log("channel_id:", channel_id);

    const {
        data: channel_data,
        loading: channel_loading,
        error: channel_error
    } = useFetch(`${ENVIRONMENT.API_URL}/api/channel/${workspace_id}`, {
        method: "GET",
        headers: getAuthenticatedHeaders()
    });

    return (
        <div>
            {
                channel_loading 
                ? <h2>Cargando...</h2> 
                : (channel_data?.data?.channels ? (
                    <ChannelsList channel_list={channel_data.data.channels} workspace_id={workspace_id} />
                ) : (
                    <h2>No hay canales disponibles</h2> // 🔹 Evita el error si no hay canales
                ))
            }
            <div>
                {
                    channel_id 
                    ? <Channel workspace_id={workspace_id} channel_id={channel_id} />
                    : <h2>Aún no has seleccionado ningún canal</h2>
                }
            </div>
        </div>
    );
};

const ChannelsList = ({ channel_list, workspace_id }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {
                channel_list?.length > 0 ? (
                    channel_list.map(channel => (
                        <Link key={channel._id} to={`/workspace/${workspace_id}/${channel._id}`}>
                            #{channel.name}
                        </Link>
                    ))
                ) : (
                    <h3>No hay canales disponibles</h3> // 🔹 Evita el error si la lista está vacía
                )
            }
        </div>
    );
};

const Channel = ({ workspace_id, channel_id }) => {
    const {
        data: channel_data,
        error: channel_error,
        loading: channel_loading
    } = useFetch(`${ENVIRONMENT.API_URL}/api/channel/${workspace_id}/${channel_id}`, {
        method: "GET",
        headers: getAuthenticatedHeaders()
    });

    const {form_state, handleChangeInput} = useForm({content: ""})

    const handleSubmitNewMessage = async (e) => {
        e.preventDefault()
        const response = await fetch(ENVIRONMENT.API_URL + `/api/channel/${workspace_id}/${channel_id}/send-message`, {
            method: "POST",
            headers: getAuthenticatedHeaders(),
            body: JSON.stringify(form_state)
        })
        const responseData = await response.json()
        console.log(responseData)
    }

    return (
        <div>
            {channel_loading ? (
                <h2>Cargando...</h2>
            ) : channel_data?.data?.messages?.length > 0 ? (
                channel_data.data.messages.map(message => (
                    <div key={message._id}>
                        <h4>Author: {message.sender.username}</h4>
                        <p>{message.content}</p>
                    </div>
                ))
            ) : (
                <h3>No hay mensajes en este canal</h3>
            )}
            <form onSubmit={handleSubmitNewMessage}>
                <input type="text" placeholder='enviar mensajes' name='content' onChange={handleChangeInput} value={form_state.content}/>
                <button type='submit'>Enviar</button>
            </form>
        </div>
    );
};


export default WorkspaceScreen; 
