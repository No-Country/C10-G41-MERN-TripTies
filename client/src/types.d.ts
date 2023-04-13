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

export interface UserLogin {
  username?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
}

interface Chat {
  name: string;
  avatar: string;
}
interface Message {
  message: string;
}

interface Chat {
  name: string;
  avatar: string;
  id: string;
}

interface Conversation {
  title: string;
  participantId: string;
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

// Interface edit Profile
export interface Profile {
  first_name?: string;
  last_name?: string;
  email?: string;
  photo?: string;
  portrait?: string;
  birthday?: string;
  profile?: object;
  description?: string;
}
