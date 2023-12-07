const baseUrl = 'http://localhost:8080';



export const getItems = () => {
    return fetch(`${baseUrl}/items`, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())

}
export const addItem = (itemData, authToken) => {
    console.log('authToken:', authToken);
    const { id, ...dataWithoutId } = itemData;

    return fetch(`${baseUrl}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`, 
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

export const loginUser = (credentials) => {
    return fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error logging in:', error);
            throw error;
        });
};

export const registerUser = (userData) => {
    return fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error registering user:', error);
            throw error;
        });
};
