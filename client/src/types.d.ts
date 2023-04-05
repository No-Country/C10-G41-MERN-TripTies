export interface Users {
  username: string;
  email: string;
  password: string;
}

// useState Interface of Register Component
export interface FormState {
  newUser: Users;
  visibility: string;
  passwordType: string;
}

// Interface of Filter location
export interface Country {
  map(arg0: (e: any) => any): any;
  name: string;
}
