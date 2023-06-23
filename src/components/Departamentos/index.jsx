import './styles.css';

export default function Departamentos({ departamentos }) {
  return (
    <section className='departamentos-container'>
      <h2>Departamentos</h2>
      <div className='lista-departamentos'>
        {
          departamentos.map( depto => 
            <div key={depto.codigo}>
              <h4 className='depto-titulo'>{depto.codigo} - {depto.descricao}</h4>
              <ul>
                {
                  depto.funcionarios.map(func => <li key={func.cpf}>{func.cpf} - {func.nome}</li>)
                }
              </ul>
            </div>
          )
        }
      </div>
    </section>
  )
}