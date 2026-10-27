export interface UserData {
   email: string;
   isAdmin: boolean;
}

export interface UserCredentials {
   idToken: string;
   refreshToken: string;
   expiresIn: number;
   localId: string;
}
