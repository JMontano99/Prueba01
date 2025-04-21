export class BasicUser {
  name: string;
  age: number;
  phone: string;
  constructor() {
    this.name = '';
    this.age = 0;
    this.phone = '';
  }
}

export class User extends BasicUser {
  id: number;
  constructor() {
    super();
    this.id = 0;
  }
}
