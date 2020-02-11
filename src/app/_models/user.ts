export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    token?: string;
}

export class User implements IUser {
    id: string;
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    token?: string;
}
