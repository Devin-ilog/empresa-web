import axios from "axios";

const BASE_URL = 'http://localhost:8080/api';

export async function fetchDepartamentos() {
    try {
        const resp = await axios.get(BASE_URL + '/departamentos');
        const dados = resp.data;
        return dados;
    } catch (error) {
        tratarErro(error);
    }
}

export async function fetchFuncionarios() {
    try {
        const resp = await axios.get(BASE_URL + '/funcionarios');
        const dados = resp.data;
        return dados;
    } catch (error) {
        tratarErro(error);
    }
}

export async function createFuncionario(funcionario) {
    try {
        const resp = await axios.post(BASE_URL + '/funcionarios', funcionario);
        const incluido = resp.data;
        return incluido;
    } catch (error) {
        tratarErro(error);
    }
}


function tratarErro(error) {
    // console.log('Erro na chamada da API', error);
    if (!error.response)
        throw new Error(error.message);
    if (error.response.status === 500) {
        throw new Error('Erro no servidor!');
    } else if (error.response.status >= 400 && error.response.status <= 499 
            && error.response.data.erros) {
        const erros = error.response.data.erros; // error.response.data tem o atributo 'erros' colocado pela API
        console.log('erros da api', erros);
        const msg = erros.length <= 1 ? erros : erros.join(' | ');
        throw new Error(msg);  
    } else {
        throw new Error(error.response.data);
    } 
}