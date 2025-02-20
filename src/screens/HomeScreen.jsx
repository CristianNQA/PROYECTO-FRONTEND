import React from 'react'
import ENVIRONMENT from '../utils/constants/environment'
import { getAuthenticatedHeaders } from '../fetching/customHeaders'
import { useFetch } from '../hooks/useFetch.jsx'
import { Link } from 'react-router-dom'

const HomeScreen = () => {
    const { data: workspace_response, error: workspace_response_error, loading: workspace_loading } = useFetch(ENVIRONMENT.API_URL + '/api/workspace', {
        method: "GET",
        headers: getAuthenticatedHeaders()
    });

    // Si la API está cargando, mostrar un mensaje de carga
    if (workspace_loading) {
        return <h2>Cargando...</h2>;
    }

    // Si hay un error, mostrarlo en la UI
    if (workspace_response_error) {
        return <h2>Error al cargar los espacios de trabajo: {workspace_response_error.message}</h2>;
    }

    // Verificar que workspace_response y workspaces existen antes de acceder a ellos
    const workspaces = workspace_response?.data?.workspaces || [];

    return (
        <div>
            <h1>Bienvenido a la App</h1>

            <div>
                <h2>Tus espacios de trabajo</h2>
                <div>
                    {workspaces.length > 0 ? (
                        workspaces.map((workspace) => (
                            <div key={workspace._id}>
                                <h3>{workspace.name}</h3>
                                <Link to={`/workspace/${workspace._id}`}>Ir al workspace</Link>
                            </div>
                        ))
                    ) : (
                        <h3>Aún no creaste ningún espacio de trabajo</h3>
                    )}
                </div>
            </div>

            <div>
                {workspaces.length === 0 ? (
                    <>
                        <span>¿Aún no tienes espacios de trabajo?</span>
                        <Link to={'/workspace/new'}>Crear espacio de trabajo</Link>
                    </>
                ) : (
                    <>
                        <span>¿Quieres crear otro espacio de trabajo?</span>
                        <Link to={'/workspace/new'}>Crear espacio de trabajo</Link>
                    </>
                )}
            </div>
        </div>
    );
};



/* const HomeScreen = () => {
    const {data: workspace_response, error: workspace_response_error, loading: workspace_loading} = useFetch(ENVIRONMENT.API_URL + '/api/workspace',{
        method: "GET",
        headers: getAuthenticatedHeaders()
    }) 

    // 📌 Verifica la respuesta de la API en la consola
    console.log("Respuesta de la API:", workspace_response); 

    return (
        <div>
            <h1>Bienvenido a la App</h1>
            <div>
                <h2>Tus espacios de trabajo</h2>
                <div>
                    {
                        workspace_loading 
                        ? <h2>Cargando...</h2> 
                        : (
                            workspace_response.data.workspaces.length > 0 ?
                            workspace_response.data.workspaces.map((workspace) => {
                                return (
                                    <div key={workspace._id}>
                                        <h3>{workspace.name}</h3>
                                        <Link to={`/workspace/${workspace._id}`}>Ir al workspace</Link>
                                    </div>
                                )
                            } )
                            : <h3>aun no creaste ningun espacio de trabajo</h3>
                        )
                    }
                </div>
            </div>
            <div>
            {
                !(workspace_response.data.workspaces.find(workspace => workspace.length > 0)) 
                ? (
                    <>
                    <span>Aún no tienes espacios de trabajo?</span>
                    <Link to={'/workspace/new'}>Crear espacio de trabajo</Link>
                    </>
                ) : (
                    <span>¿Quieres crear otro espacio de trabajo?</span>
                )
            }
            </div>
        </div>
    )
}  */


export default HomeScreen