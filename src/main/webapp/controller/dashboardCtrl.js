app.controller("dashboardCtrl",function($scope,userService,carService,ibeaconSer){
	userService.getUserInfos().then(function(data){
		$scope.userNum = data.data.length;
	});
	carService.getCarInfos().then(function(data){
		$scope.carNum = data.data.length;
	});
	ibeaconSer.getIbeaconInfos().then(function(data){
		$scope.ibeaconNum = data.data.length;
	});
});