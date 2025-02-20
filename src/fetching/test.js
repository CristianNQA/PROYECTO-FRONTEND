import ENVIRONMENT from "../utils/constants/environment"

const consulta_de_prueba = async () => {
    try{
      const response = await fetch(
        ENVIRONMENT.API_URL + '/api/status/ping',
        {
          method: "GET"
        }
      )
      console.log(response)
      //transformar la respuesta a json
      const data = await response.json()
      //responde con lo mismo del backend
      console.log(data)
    }
    catch (error) {
      console.error('Error al consultar', error)
    }
    
  }
  consulta_de_prueba()