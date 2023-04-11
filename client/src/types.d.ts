export interface Users {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  photo: string;
}

// useState Interface of Register Component
export interface FormState {
  newUser: Users;
  visibility: string;
  passwordType: string;
}

interface Chat {
  name: string;
  avatar: string;
}

export interface ChatProps {
  chat: Chat;
  setChat: Dispatch<SetStateAction<Chat>>;
}

// Interface of Filter location
export interface Country {
  map(arg0: (e: any) => any): any;
  name: string;
}
