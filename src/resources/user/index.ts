import { Resource } from 'rest-hooks';

interface User {
  id: number | undefined
  email: string
  first_name: string
  last_name: string
  avatar: string
}

export default class UserResource extends Resource {
  readonly data: User[] = []
  readonly page: number | undefined = undefined
  readonly per_page: number | undefined = undefined
  readonly total: number | undefined = undefined
  readonly total_pages: number | undefined = undefined

  pk() {
    console.log(this)
    return this.page;
  }

  static urlRoot = 'https://reqres.in/api/users?delay=3?page=';
}