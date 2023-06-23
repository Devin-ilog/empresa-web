import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchDepartamentos, fetchFuncionarios } from './service/api-client';
import Cabecalho from './components/Cabecalho';
import Departamentos from './components/Departamentos';
import CadastroFuncionario from './components/CadastroFuncionario';
import './App.css';

function App() {

  const [departamentosComFuncionarios, setDepartamentosComFuncionarios] = useState([]);
  const [mensagem, setMensagem] = useState('');

  function atualizarListas() {
    Promise.all([fetchDepartamentos(), fetchFuncionarios()])
      .then(dados => {
        const departamentos = dados[0];
        const funcionarios = dados[1];
        const dadosCompletos = departamentos.map(depto => {
          const funcsDoDepto = funcionarios.filter(f => f.codigoDepartamento === depto.codigo);
          return { ...depto, funcionarios: funcsDoDepto };
        });
        setDepartamentosComFuncionarios(dadosCompletos);
      })
      .catch(error => setMensagem( { texto: error.message, tipo: 'erro' } ));
  }

  useEffect(() => {
    atualizarListas();
  }, [])

  if ((!departamentosComFuncionarios || departamentosComFuncionarios.length === 0) && !mensagem) 
    return (<h1>Carregando dados...</h1>);


  return (
    <div className="App">
      <BrowserRouter>
        <div className="App">
          <Cabecalho />
          {
            mensagem && <h3 className={mensagem.tipo === 'erro' ? 'error-message' : 'info-message'}>{mensagem.texto}</h3>
          }
          <Routes>
            <Route path="/" element = { <Departamentos departamentos={departamentosComFuncionarios} fcAtualizar={atualizarListas} /> } />   
            <Route path="cadastro-funcionario" element = { <CadastroFuncionario departamentos={departamentosComFuncionarios} fcAtualizar={atualizarListas} /> } />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
