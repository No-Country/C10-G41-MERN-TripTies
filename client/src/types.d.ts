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

  interface Chat {
    name: string;
    avatar: string;
};

export interface ChatProps {
    chat: Chat;
    setChat: Dispatch<SetStateAction<Chat>>;
};