import ENVIRONMENT from "../utils/constants/environment.js"

export const getAuthenticatedHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
        'x-api-key': ENVIRONMENT.API_KEY
    }
}