import { Plant } from "./plants";

export class Role {
  name: any;
  level: number;
  constructor(level: number, role: string) {
    this.name = role;
    this.level = level;
  }
}
  
export const ROLES = {
  Guest: new Role(1, `Guest`),
  Subscriber: new Role(2, `Subscriber`),
  Editor: new Role(3, `Editor`),
  Moderator: new Role(4, `Moderator`),
  Administrator: new Role(5, `Administrator`),
  Developer: new Role(6, `Developer`),
  Owner: new Role(7, `Owner`),
}

export class User {
  id: any = ``;
  uid: string = ``;
  name: string = ``;
  index: number = 1;
  email: string = ``;
  created: string = ``;
  updated: string = ``;
  password?: string = ``;
  provider: string = `Firebase`;
  role: string = ROLES.Guest.name;
  level: number = ROLES.Guest.level;

  garden?: any[] = [];
  plants?: Plant[] = [];

  constructor(data: Partial<User>) {
    Object.assign(this, data);
    let now = new Date().toLocaleString();
    let currentTimeStampNoSpaces = now.replaceAll(` `, `_`).replaceAll(`,`, `_`).replaceAll(`/`, `_`).replaceAll(`:`, `_`);
    if (!this.name || this.name == ``) this.name = this.email.split(`@`)[0];
    if (!this.id || this.id == ``) this.id = `${this.index}_User_${this.name}_${currentTimeStampNoSpaces}_${this.uid}`;
    if (!this.created) this.created = now;
    if (!this.updated) this.updated = now;
  }
}