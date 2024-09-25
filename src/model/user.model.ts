import { User, UserRole } from "../entity/user";

// Prevent projects from being in the token
export class JWTUser {
    id?: number;
    name?: string;
    surname?: string;
    email?: string;
    role?: UserRole;

    hydrate(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.surname = user.surname;
        this.email = user.email;
        this.role = user.role;

        return this;
    }
}
