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