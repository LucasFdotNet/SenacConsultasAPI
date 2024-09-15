import api from "./api";

export const signinUser = ( form : {
    nome: string,
    email: string,
    cpf: string,
    telefone: string,
    endereco: string,
    dataNasc: string,
    senha: string
}) => {
    try {
        api.post("/Pacientes/register", form).then(res => console.log(res.data))
    } catch ( error) {
        console.error(error)
        throw error
    }
}

export const signupUser = async () => {

}