
export const fetchJson = async(url) => {
    let responseJson;
    
    await fetch(url, { mode: "cors" })
        .then(response => response.json())
        .then(htmlResponse => responseJson = htmlResponse)

    return responseJson;
}

export const fetchPost = async(url, body) => {

    const postRequest = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }

    
    try{
        const fetchResponse = await fetch(url, postRequest);
        const data = await fetchResponse.json();
        return data;
    }
    catch(error){
        console.error("Une erreur est survenue : %s", error);
    }
}

export const fetchDelete = async(url, name) => {
    const deleteRequest = {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
        }
    }

    try{
        const fetchResponse = await fetch(`${url}/${name}`, deleteRequest);
        const data = await fetchResponse.json();
        return data;
    }
    catch(error){
        console.error("Une erreur est survenue : %s", error);
    }
}

export const fetchPatch = async(url, id, body) => {
    const patchRequest = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }

    try{
        const fetchResponse = await fetch(`${url}/${id}`, patchRequest);
        const data = await fetchResponse.json();
        return data;
    }
    catch(error){
        console.error("Une erreur est survenue : %s", error);
    }
}