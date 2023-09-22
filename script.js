/*Função responsável por pesquisar o cep*/
function pesquisarCep() {
    // Variável "cep" recebe o valor do campo CEP
    var cep = document.getElementById('cep').value.replace(/\D/g, '');
    // Variável "addressInfoDiv" recebe a div de informações de endereço
    var addressInfoDiv = document.getElementById('addressInfo');
  // Verifica se o campo CEP não está vazio
    if (cep !== "") {
      // Expressão regular para validar o CEP
      var validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP
      if (validacep.test(cep)) {
        // Limpa a div de informações de endereço, e exibe a mensagem de carregamento
        addressInfoDiv.innerHTML = "Carregando...";
        // Faz a requisição do endereço através do CEP
        fetch('https://viacep.com.br/ws/' + cep + '/json/').then(function (response) {
            return response.json(); // Retorna uma promise JSON
          }).then(function (data){
            // Verifica se o CEP foi encontrado
            if (!data.erro) {
              // Construir a string de endereço
              var addressString = "<b>Rua:</b> " + data.logradouro + "<br>";
              addressString += "<b>Bairro: </b>" + data.bairro + "<br>";
              addressString += "<b>Cidade: </b>" + data.localidade + "<br>";
              addressString += "<b>Estado: </b>" + data.uf + "<br>";
              addressString += "<b>IBGE: </b>" + data.ibge + "<br>";

              // Exibir informações de endereço na div
              // Altera a cor do texto para preto
              addressInfoDiv.style.color = 'black';
              // Insere o conteúdo na div
              addressInfoDiv.innerHTML = addressString;
            } else {
              // CEP não encontrado.
              addressInfoDiv.style.color = 'red';
              // Altera o conteúdo da div
              addressInfoDiv.innerHTML = "CEP não encontrado.";
            }
          })
          .catch(function (error) {
            // Erro na requisição
            console.error('Erro:', error);
            addressInfoDiv.innerHTML = "Erro ao buscar informações.";
          });
      } else {
        // CEP inválido
        addressInfoDiv.style.color = 'red';
        addressInfoDiv.innerHTML = "Formato de CEP inválido.";
      }
    } else {
      // CEP em branco
        addressInfoDiv.style.color = 'red';
        addressInfoDiv.innerHTML = "Digite um CEP válido.";
    }
  }