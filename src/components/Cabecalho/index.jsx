import { Link } from 'react-router-dom';
import './styles.css';

export default function Cabecalho() {
  return (
    <header>
        <div className="nome-app">SAPATO CORPORATION</div>
        <nav>
            <ul>
                <li><Link to='/'>Departamentos</Link></li>
                <li><Link to='cadastro-funcionario'>Cadastro Funcionário</Link></li>
            </ul>
        </nav>
    </header>
  )
}