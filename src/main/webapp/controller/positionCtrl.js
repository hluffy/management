app.controller("positionCtrl",function($scope,positionSer){
	positionSer.getPositionInfos().then(function(data){
		console.log(data);
		$scope.positions = data.data;
	});
	
	
});