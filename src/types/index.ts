

export type LoginData = {
    email: string,
    password: string
}

export type RegisterData ={
    name: string,
    lastname: string,
    username: string,
    email: string,
    password: string
}

export type RegisterRecipe = {
    name: string,
    description: string,
    is_private: boolean,
    ingredients: string,
    file: File[]
}

export type PublicRecipe = {
    id: number,
    name: string,
    description: string,
    ingredients: string,
    image: string,
    user_id: number,
    user_name: string,
    user_username: string,
    user_email: string
}

export type BackendRecipes = {
    recipes: PublicRecipe[]
}