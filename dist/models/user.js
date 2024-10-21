import { v4 as uuidv4 } from 'uuid';
export const users = [];
export const addUser = (username, age, hobbies) => {
    const newUser = {
        id: uuidv4(),
        username,
        age,
        hobbies,
    };
    users.push(newUser);
    return newUser;
};
