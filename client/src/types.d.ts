export interface Users {
  username?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  photoUser?: string;
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
  photoUser?: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
}

export interface Message {
  message: string;
}

// export interface Chat {
//   name: string;
//   avatar: string;
//   id: string;
// }

export interface Conversation {
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
  photoUser?: string;
  portrait?: string;
  birthday?: string | null;
  profile?: object;
  description?: string;
}

export interface putUser {
  user: {
    username?: string;
    email?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
    photoUser?: string;
  },
  profile: Profile
}

type TagsItem = {
  _id: string;
  number: number;
  posts: any[];
  tag: string;
};

export type Tags = {
  tags: TagsItem[];
};
