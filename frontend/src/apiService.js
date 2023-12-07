const baseUrl = 'http://localhost:8080';



export const getItems = () => {
    return fetch(`${baseUrl}/items`, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())

}
export const addItem = (itemData, username, password) => {
    // Omit the 'id' field from itemData
    const { id, ...dataWithoutId } = itemData;

    return fetch(`${baseUrl}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        },
        body: JSON.stringify(dataWithoutId),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response not ok');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error adding item:', error);
            throw error; 
        });
};
