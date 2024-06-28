import './App.css';
import Tabela from './Tabela';
import Formulario from './Formulario';
import { useEffect, useState } from 'react';

function App() {

  // Objeto Produto
  const produto ={
    codigo : 0,    // Padrão json e fielmente igual ao que está no back-end
    nome : '',
    marca : ''
  }

  // UseState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  //UseEffect
  useEffect(()=>{
    fetch("http://localhost:8080/listar")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido));
  }, []);

  // Obtendo os dados do formulário
  const aoDigitar = (e) => {
    setObjProduto({...objProduto, [e.target.name]:e.target.value});
  }

  // Cadastrar Produto
  const cadastrar = () => {
    fetch("http://localhost:8080/cadastrar", { // fetch sempre retorna um get, por isso precisei especificar abaixo
      method:'post',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-Type':'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido =>{
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        setProdutos([...produtos, retorno_convertido]);
        alert('Produto cadastrado com Sucesso!');
        limparFormulario();
      }
    })
  }

  // Alterar produto
  const alterar = () => {
    fetch("http://localhost:8080/alterar", { // fetch sempre retorna um get, por isso precisei especificar abaixo
      method:'put',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-Type':'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido =>{
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        // Mensagem
        alert('Produto alterado com Sucesso!');
        // Cópia do vetor de produtos
        let vetorTemp = [...produtos];

        // Índice
        let indice = vetorTemp.findIndex((p) => {
          return p.codigo === objProduto.codigo;
        });
    
        // Alterar produto do vetorTemp
        vetorTemp[indice] = objProduto;

        // Atualizar o vetor de produtos
        setProdutos(vetorTemp);

        limparFormulario();
      }
    })
  }

  // Remover Produto
  const remover = () => {
    fetch("http://localhost:8080/remover/" + objProduto.codigo, { // fetch sempre retorna um get, por isso precisei especificar abaixo
      method:'delete',
      headers:{
        'Content-Type':'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido =>{

      // Mensagem
      alert(retorno_convertido.mensagem);

      // Cópia do vetor de produtos
      let vetorTemp = [...produtos];

      // Índice
      let indice = vetorTemp.findIndex((p) => {
        return p.codigo === objProduto.codigo;
      });
  
      // Remover produto do vetorTemp
      vetorTemp.splice(indice, 1);

      // Atualizar o vetor de produtos
      setProdutos(vetorTemp);

      // Limpar formulário
      limparFormulario();
    })
  }

  // Limpar formulário
  const limparFormulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  // Selecionar Produto
  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  }

  // retorno
  return (
    
    <div>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objProduto} cancelar = {limparFormulario} remover={remover} alterar={alterar}/>
      <Tabela vetor={produtos} selecionar={selecionarProduto}/>
    </div>
  );
}

export default App;
