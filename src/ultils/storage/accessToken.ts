export const readAccessToken = (): string | null => {
    try {
        const userData = localStorage.getItem('persist:user');
        if (!userData) {
            return null;
        }
        const parsedData = JSON.parse(userData || '{}');
        if (!parsedData.user) {
            return null;
        }
        const users = JSON.parse(parsedData.user || '{}');
        if (!users.accessToken) {
            return null;
        }
        return users.accessToken;
    } catch (error) {
        return null;
    }
};


export const writeAccessToken = (newAccessToken: string): void => {
    try {
        const userData = localStorage.getItem('persist:user');
        if (!userData) {
            throw new Error('User data not found in localStorage');
        }
        const parsedData = JSON.parse(userData || '{}');
        const users = JSON.parse(parsedData.user || '{}');
        users.accessToken = newAccessToken;
        parsedData.user = JSON.stringify(users);
        localStorage.setItem('persist:user', JSON.stringify(parsedData));
    } catch (error) {
        console.error('Error writing accessToken to localStorage:', error);
    }
};

