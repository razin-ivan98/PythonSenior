
export type Role = "admin" | "user"

export type User = {
    name: string,
    id: string,
    role: Role
}
