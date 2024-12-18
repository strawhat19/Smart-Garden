export class Role {
    id: any;
    name: any;
    role: any;
    level: number;
    constructor(role: string, level: number) {
        this.role = role;
        this.name = role;
        this.level = level;
        this.id = `${level}_${role}`;
    }
}

export const roles = [`Guest`, `Subscriber`, `Editor`, `Moderator`, `Administrator`, `Developer`, `Owner`];
export const ROLES = roles.map((role, roleIndex) => new Role(role, roleIndex + 1));

console.log(`Roles`, ROLES);