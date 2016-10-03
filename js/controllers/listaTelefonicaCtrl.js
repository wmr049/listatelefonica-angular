angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $filter, contatosAPI, operadorasAPI, serialGenerator){
    
    console.log(serialGenerator.generate());
    $scope.app = "Lista Telefonica";
    $scope.contatos = [];
    $scope.operadoras = [];

    var carregarContatos = function (){        
         contatosAPI.getContatos().success(function (data, status){
            $scope.contatos = data;
        })
        .error(function(data, status){
            $scope.message = "Aconteceu um problema : " + data;
        });
    };
    
    var carregarOperadoras = function (){
        operadorasAPI.getOperadoras().success(function (data, status){
            $scope.operadoras = data;
        });
    };

    $scope.adicionarContato = function (contato) {
        //console.log($scope.nome);

        
        contato.serial = serialGenerator.generate();
        contato.operadora_id = contato.operadora.id;
        contato.data = new Date();

        contatosAPI.saveContato(contato).success(function(data,status){
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        });
    };

    $scope.apagarContatos = function(contatos){
        
        $scope.contatos = contatos.filter(function (contato){
            if (!contato.selecionado) return contato;
        });
        //console.log(contatoSelecionado);
    };
    
    $scope.isContatoSelecionado = function(contatos){
        //console.log(contatos);
        return contatos.some(function (contato){
            return contato.selecionado;
        });

        //console.log(isContatoSelecionado);                
    };

    $scope.ordenarPor = function(campo){
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };

    carregarContatos();
    carregarOperadoras();
});