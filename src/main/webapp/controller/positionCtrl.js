app.controller("positionCtrl",function($rootScope,$scope,positionSer){
	$scope.position = {};
	positionSer.getPositionInfos().then(function(data){
		console.log(data);
		$rootScope.positions = data.data;
	});
	
	$scope.getPositionInfo = function(){
		positionSer.getPositionInfo($scope.position).then(function(data){
			console.log(data);
			$scope.positions = data.data;
		});
	}
	
	
});