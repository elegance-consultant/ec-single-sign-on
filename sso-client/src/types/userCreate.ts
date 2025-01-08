export interface UserCreate {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    enabled: boolean;
    creadentials: [
        {
            type: string;
            value: string;
            temporary: boolean;
        }
    ];
}