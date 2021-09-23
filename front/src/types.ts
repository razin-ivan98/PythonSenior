
export type Role = "admin" | "user"

export type User = {
    verificationCode: string,
    name: string,
    id: string,
    role: Role,
    approved: boolean
}
