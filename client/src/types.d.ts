export interface Users {
    username: string;
    email: string;
    password: string;
}

// useState Interface of Register Component
export interface FormState {
    newUser: Users,
    visibility: string,
    passwordType: string,
  }