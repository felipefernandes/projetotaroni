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
      }).
      error(function(data) {
        console.log(":(");
        console.log(this.data)
      });
  	};
});
