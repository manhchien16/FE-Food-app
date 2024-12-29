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


export const writeAccessToken = () => {
    try {

    } catch (error) {

    }
} 
