import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [produto, setProduto] = useState([]);
  const [erro, setErro] = useState(null);
  useEffect(() => {
    var btn = document.getElementById('btnCarregaDadosDoProduto')
    var codigoBarras = document.getElementById('codigo')
    function buscaProdutoPeloCodigoDeBarras(codigo){
      codigo = codigoBarras.value
      fetch(`http://localhost:5000/api/produtos/${codigo}`).then((res) => {
        if(!res.ok){
          throw new Error("Erro ao obter dados do produto")
        }
        return res.json()
      }).then((data) => {
        console.log(data.produto)
        setProduto(data.produto)
      }).catch((error) => {
        console.log("Erro interno ao obter dados do produto")
      })
    }
    btn.addEventListener('click', buscaProdutoPeloCodigoDeBarras)

  },[])
  return (
    <div className="App">
      <input type='text' placeholder='Digite o código de barras do produto para pesquisar' id='codigo' />
      <button id='btnCarregaDadosDoProduto' className='btnCarregaDadosDoProduto'>
        Buscar Produto
      </button>
      {
        produto && (
          <div>
            <h1>{produto.nome}</h1>
            <span>{produto.sku}</span>
            <h2>R$: {Number(produto.precoVenda).toFixed(2)}</h2>
          </div>
        )
      }
    </div>
  );
}

export default App;