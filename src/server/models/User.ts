export interface User {
    UID: string,
    accountDetails: {
        name: string
        email: string,
    }
    accountCreated: string,
    active: boolean,
    accountPreferences: {
        darkMode: boolean
    }
}