import { Photo } from './Photo';
export interface User {
    id: number;
    userName: string;
    knownAs: string;
    age: number;
    gender: string;
    created: Date;
    lastActive: Date;
    photoUrl: string;
    City: string;
    Country: string;
    Interests?: string;
    Introduction?: string;
    LookingFor?: string;
    photos?: Photo[];
}

