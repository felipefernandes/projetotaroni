var app = angular.module('appTaroni', [
  'jcs-autoValidate'
],
function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.run([
    'defaultErrorMessageResolver',
    function (defaultErrorMessageResolver) {
        defaultErrorMessageResolver.setI18nFileRootPath('/assets/angular-auto-validate/dist/lang/');
        defaultErrorMessageResolver.setCulture('pt-br');
    }
]);

app.controller('DoacoesController', function ($scope, $http) {
  $scope.formModel = {};
  $scope.checkOutro = false;

  $scope.habilitaOutro = function() {
    $scope.checkOutro = ($scope.checkOutro) ? true : false;
  };

  $scope.onSubmit = function () {

  		console.log("Hey i'm submitted!");
  		console.log($scope.formModel);

  		$http({
        url: 'https://sheetsu.com/apis/v1.0/4152e609',
        method: 'POST',
        data: {
          Nome: $scope.formModel.nome,
          Email: $scope.formModel.email,
          Telefone: $scope.formModel.telefone,
          Luva: $scope.formModel.luva,
          Bandagem: $scope.formModel.bandagem,
          Caneleira: $scope.formModel.caneleira,
          Calcao: $scope.formModel.calcao,
          ProtetorBucal: $scope.formModel.protbucal,
          ProtetorCabeca: $scope.formModel.protcabeca,
          Coquilha: $scope.formModel.coquilha
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
      }).
      success(function (data) {
        console.log(":)");
        alert('Formulário enviado com sucesso. Obrigado!');
        window.reload(true);
      }).
      error(function(data) {
        console.log(":(");
        console.log(this.data);
        alert('Infelizmente houve um erro no registro dos dados. Tente novamente, por favor.');
      });
  	};
});

app.controller('FormularioContato', function ($scope, $http) {
  $scope.infos = {};
  $scope.success = false;
  $scope.error = false;

  //função que será usada para preparar os dados no formato que poderemos usar no servidor para envio do email
  var param = function(data) {
        var returnString = '';
        for (d in data){
            if (data.hasOwnProperty(d))
               returnString += d + '=' + data[d] + '&';
        }
        // Remove o último & que não é necessário
        return returnString.slice( 0, returnString.length - 1 );
  };

  $scope.onSubmit = function () {

  		console.log("Hey i'm submitted!");
  		console.log($scope.formModel);

  		$http({
        url: 'http://felipefernandes.rio/mail.php',
        method: 'POST',
        data: param($scope.infos),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).
      success(function (data) {
        console.log(":)");
        //verifica o retorno do servidor se o email foi enviado
			if (data.enviado) {
			   $scope.success = true; //ocultamos o formulário e exibimos mensagem de sucesso
			} else {
			   $scope.success = false;
			}
      }).
      error(function(data) {
        console.log(":(");
        console.log(this.data);
        $scope.error = true;
      });
  	};

});


// jQuery

// external js: masonry.pkgd.js, imagesloaded.pkgd.js

$(document).ready( function() {

  // Inicializacao do FancyBox
  $('.fancybox').fancybox();

  // init Masonry after all images have loaded
  var $grid = $('.grid').imagesLoaded( function() {
    $grid.masonry({
      itemSelector: '.grid-item',
      percentPosition: true,
      columnWidth: '.grid-sizer'
    });
  });

});
