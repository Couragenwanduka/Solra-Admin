export interface User {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
  }
  
export interface UserResponse {
   
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response: any;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }