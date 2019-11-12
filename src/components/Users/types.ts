export interface UserInterface {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
}

export  interface UsersInterface {
  data?: UserInterface[]
}
