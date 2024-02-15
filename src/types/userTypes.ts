interface User {
    _id?: string,
    name: string,
    email: string,
    password: string,
    image: string,
    createdAt: Date,
    updatedAt: Date,
}

interface UserTypeRedux {
    userData: null | User,
}

export type { User, UserTypeRedux }