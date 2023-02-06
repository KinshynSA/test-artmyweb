export async function getUsers({
    page
}){
    return await fetch(`https://gorest.co.in/public/v1/users/?page=${page}&per_page=20`)
    .then(async (response) => {
        let result = await response.json();
        return [result, null];
    })
    .catch(error => {
        console.log('error',error)
        return [null, error];
    })
}

export async function getUser({
    userId
}){
    return await fetch(`https://gorest.co.in/public/v1/users/${userId}`)
    .then(async (response) => {
        let result = await response.json();
        return [result, null];
    })
    .catch(error => {
        console.log('error',error)
        return [null, error];
    })
}


export async function putUser(user){
    return await fetch(`https://gorest.co.in/public/v1/users/${user.id}`, {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer 4f00089f8fab6c5e336fe1ee0a265abc22365dd16d68495d801e6f0b83cd3c68'
        },
        body: JSON.stringify(user),
    })
    .then(async (response) => {
        let result = await response.json();
        return [result, null];
    })
    .catch(error => {
        console.log('error',error)
        return [null, error];
    })
}