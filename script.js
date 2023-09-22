/*Função responsável por pesquisar o cep*/
function pesquisarCep() {
    var cep = document.getElementById('cep').value.replace(/\D/g, '');
    var addressInfoDiv = document.getElementById('addressInfo');

    if (cep !== "") {
      var validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        // Mostrar mensagem de carregamento
        addressInfoDiv.innerHTML = "Carregando...";

        fetch('https://viacep.com.br/ws/' + cep + '/json/').then(function (response) {
            return response.json();
          }).then(function (data){
            if (!data.erro) {
              // Construir a string de endereço
              var addressString = "<b>Rua:</b> " + data.logradouro + "<br>";
              addressString += "<b>Bairro: </b>" + data.bairro + "<br>";
              addressString += "<b>Cidade: </b>" + data.localidade + "<br>";
              addressString += "<b>Estado: </b>" + data.uf + "<br>";
              addressString += "<b>IBGE: </b>" + data.ibge + "<br>";

              // Exibir informações de endereço na div
              addressInfoDiv.style.color = 'black';
              addressInfoDiv.innerHTML = addressString;
            } else {
              addressInfoDiv.style.color = 'red';
              addressInfoDiv.innerHTML = "CEP não encontrado.";
            }
          })
          .catch(function (error) {
            console.error('Erro:', error);
            addressInfoDiv.innerHTML = "Erro ao buscar informações.";
          });
      } else {
        addressInfoDiv.style.color = 'red';
        addressInfoDiv.innerHTML = "Formato de CEP inválido.";
      }
    } else {
        addressInfoDiv.style.color = 'red';
      addressInfoDiv.innerHTML = "Digite um CEP válido.";
    }
  }