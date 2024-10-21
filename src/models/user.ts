import { v4 as uuidv4 } from 'uuid';

export interface User {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

export const users: User[] = [];

export const addUser = (username: string, age: number, hobbies: string[]): User => {
    const newUser: User = {
        id: uuidv4(),
        username,
        age,
        hobbies,
    };
    users.push(newUser);
    return newUser;
};
