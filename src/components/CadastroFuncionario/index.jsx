import { useRef, useState } from 'react';
import { createFuncionario } from '../../service/api-client';
import './styles.css'

export default function CadastroFuncionario({ departamentos, fcAtualizar }) {

  const [mensagem, setMensagem] = useState('');
  const cpfRef = useRef();
  const nomeRef = useRef();
  const deptoRef = useRef();

  function handleCadastrar() {
    const cpf = cpfRef.current.value;
    const nome = nomeRef.current.value;
    const depto = deptoRef.current.value;
    if (!cpf || !nome || !depto) {
      setMensagem( { texto: 'Campos obrigatórios não preenchidos!', tipo: 'erro' } );
      return;
    }
    
    const novo = { cpf, nome, codigoDepartamento: depto };
    createFuncionario(novo)
      .then(resp => setMensagem( { texto: 'Funcionário de CPF ' + cpf + ' incluído!', tipo: 'info' } ))
      .then(resp => fcAtualizar())
      .then(resp => {
        cpfRef.current.value = '';
        nomeRef.current.value = '';
        deptoRef.current.value = '';
      })
      .catch(error => setMensagem( { texto: error.message, tipo: 'erro' } ));
  }

  return (
    <section className='cadastro-container'>
      <h2>Cadastro de Novo Funcionário</h2>
      {
        mensagem && <h3 className={mensagem.tipo === 'erro' ? 'error-message' : 'info-message'}>{mensagem.texto}</h3>
      }
      <div className='form-cadastro'>
        <div className='form-grupo'>
          <label htmlFor='input-cpf'>CPF:</label>
          <input type='text' id='input-cpf' ref={cpfRef} placeholder='CPF do funcionario'/>
        </div>
        <div className='form-grupo'>
          <label htmlFor='input-nome'>Nome:</label>
          <input type='text' id='input-nome' ref={nomeRef} placeholder='Nome do funcionario'/>
        </div>
        <div className='form-grupo'>
          <label htmlFor='input-depto'>Depto:</label>
          <select ref={deptoRef}>
            <option value={''}>Selecione...</option>
            {
              departamentos.map( depto => <option key={depto.codigo} value={depto.codigo}>{depto.descricao}</option>)
            }
          </select>
        </div>
        <button onClick={handleCadastrar}>Cadastrar</button>
      </div>
    </section>
  )
}