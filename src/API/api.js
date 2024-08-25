import Cookies from 'js-cookie';
import config from '../config/enviornment';

const headers = {
    'Accept': 'application/json',
    'content-Type': 'application/json',
    'token': Cookies.get('token')
}
const api_link = config.env === 'prod' ? `${config.api_link_prod}/api/` : `${config.api_link_local}/api`;

export async function getRequest(route){
    try {
        const response = await fetch(`${api_link}/${route}`, {
            method: 'GET',
            dataType: 'json',
            headers: headers,
            credentials: 'include'
        });
    
        const resData = response.json();
        return resData;
    } catch (error) {
        console.error('Error in Get Request');
        console.error(`Error in ${route}`);
        console.error(error);
    }
}

export async function postRequest(route, body){
    try {
        const response = await fetch(`${api_link}/${route}`, {
            method: 'POST',
            dataType: 'json',
            headers: headers,
            body: JSON.stringify(body),
            credentials: 'include'
        });
        
        const resData = await response.json();
        return resData;
    } catch (error) {
        console.error('Error in Post Request');
        console.error(`Error in ${route}`);
        console.error(error);
    }
}

export async function putRequest(route, body){
    try {
        const response = await fetch(`${api_link}/${route}`, {
            method: 'PUT',
            dataType: 'json',
            headers: headers,
            body: JSON.stringify(body),
            credentials: 'include'
        });
    
        const resData = response.json();
        return resData;
    } catch (error) {
        console.error('Error in Put Request');
        console.error(`Error in ${route}`);
        console.error(error);
    }
}

export async function patchRequest(route, body) {
    try {
        const response = await fetch(`${api_link}/${route}`, {
            method: 'PATCH',
            dataType: 'json',
            headers: headers,
            body: JSON.stringify(body),
            credentials: 'include'
        });
    
        const resData = response.json();
        return resData;
    } catch (error) {
        console.error('Error in Put Request');
        console.error(`Error in ${route}`);
        console.error(error);
    }
}

export async function deleteRequest(route, body){
    try {
        const response = await fetch(`${api_link}/${route}`, {
            method: 'DELETE',
            dataType: 'json',
            headers: headers,
            body: JSON.stringify(body),
            credentials: 'include'
        });
    
        const resData = response.json();
        return resData;
    } catch (error) {
        console.error('Error in Delete Request');
        console.error(`Error in ${route}`);
        console.error(error);
    }
}