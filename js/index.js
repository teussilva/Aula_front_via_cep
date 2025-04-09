import { dadosCep } from '../js/dados.js'

const botaoPesquisar = document.getElementById('pesquisar')

function getValidarDados(){
    let cep = document.getElementById('input-cep')
    if(cep.value == '' || cep.value.length != 8){
        alert('O cep informado precisar ter 9 digitos para ser válido')
    }else{
        // getBuscarCep(cep.value)
        getBuscarCepApi(cep.value)
    }
}

const getBuscarCep = function(cep){
    let status = false
    // Realiza a repetição do forEach para percorrer todos os elemenos do array
   dadosCep.dados.forEach(function(item){
    // Valida se o cep informado existe no array de CEP
      if(cep == item.cep){
        // Chama a função para printar os dados do form e encaminha os dados encontrado
         setDadosForm(item)
         status = true
      }
   })
   if(!status){
     alert('CEP não encontrado!!!')
   }
}

// Função que busca o CEP na API do ViaCep
const getBuscarCepApi = async function(cep){
    // Cria a variavel para concatenar o CEP na url do via cep
    let url = `https://viacep.com.br/ws/${cep}/json/`
    // Executa a url no site do via cep e recebe os dados do cep no site do via cep
    let response = await fetch(url)
    let item = await response.json()
    console.log(item)
    setDadosForm(item)
}

// Função para printar os dados no form, após a busca do CEP
const setDadosForm = function(dadosCep){
    // Coloca os dados do cep nas caixas do formulario
   document.getElementById('logradouro').value = dadosCep.logradouro
   document.getElementById('bairro').value = dadosCep.bairro
   document.getElementById('cidade').value = dadosCep.localidade
   document.getElementById('estado').value = dadosCep.uf
}

botaoPesquisar.addEventListener('click', function(){
    getValidarDados()
})

