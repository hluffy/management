//app.controller("carCtrl",function($scope,$http){
//	$scope.master = {};
//	$scope.isShow = false;
//	$http.get("../resources/car/car.json").success(function(data){
//		$scope.cars = data.cars;
//	});
//	
//});

app.controller("carCtrl",function($scope,carService){
	$scope.master = {};
	$scope.car = {};
	$scope.isShow = false;
	carService.getCarInfos().then(function(data){
		$scope.cars = data.data;
	});
	
	$scope.addCar = function(car){
		
		carService.addCarInfo($scope.car).then(function(data){
			console.log(data);
			$scope.car = {};
		});
	}
	
	$scope.updateCar = function($index){
		$scope.isShow = true;
		var id = "input" + $scope.cars[$index].frameNum;
		console.log(id);
		var obj = $("."+id);
		obj.removeClass("inactive");
		obj.addClass("active");
		obj.removeAttr("readonly");
		obj.focus();
		$scope.master = angular.copy($scope.cars[$index]);
	}
	
	$scope.saveCar = function($index){
		$scope.isShow = false;
		var id = "input" + $scope.cars[$index].frameNum;
		var obj = $("."+id);
		obj.removeClass("active");
		obj.addClass("inactive");
		obj.attr("readonly",true);
	}
	
	$scope.cancelCar = function($index){
		$scope.isShow = true;
		var id = "input" + $scope.cars[$index].frameNum;
		var obj = $("."+id);
		obj.removeClass("active");
		obj.addClass("inactive");
		obj.attr("readonly",true);
	}
	
	$scope.deleteCar = function($index){
		$scope.cars.splice($index,1);
	}
});

app.directive("caredit",function($document){
	return{
		restrict:"E",
		require:"ngModel",
		link:function(scope,element,attrs,ngModel){
			element.bind("click",function(){
				var id = "input" + ngModel.$modelValue.frameNum;
				console.log(id);
				var obj = $("."+id);
				obj.removeClass("inactive");
				obj.addClass("active");
				obj.removeAttr("readonly");
				scope.$apply(function(){
					scope.isShow = true;
					scope.master = angular.copy(ngModel.$modelValue);
				});
			});
		}
	}
});

app.directive("carcancel",function($document){
	return{
		restrict:"E",
		require:"ngModel",
		link:function(scope,element,attrs,ngModel){
			element.bind("click",function(){
				scope.$apply(function(){
					angular.copy(scope.master,ngModel.$modelValue);
				});
				var id = "input" + ngModel.$modelValue.frameNum;
				console.log(id);
				var obj = $("."+id);
				obj.removeClass("active");
				obj.addClass("inactive");
				obj.attr("readonly",true);
				scope.$apply(function(){
					scope.isShow = false;
				});
			});
		}
	}
});

app.directive("cardelete",function($document,carService){
	return{
		restrict:"E",
		require:"ngModel",
		link:function(scope,element,attrs,ngModel){
			element.bind("click",function(){
				var id = ngModel.$modelValue.frameNum;
				scope.$apply(function(){
					for(var i = 0;i<scope.cars.length;i++){
						if(scope.cars[i].frameNum==id){
							carService.deleteCarInfo(ngModel.$modelValue).then(function(data){
								console.log(data);
								alert(data.message);
								
							});
							scope.cars.splice(i,1);
							
						}
					}
				});
				
			});
		}
	}
});

app.directive("carupdate",function($document,carService){
	return{
		restrict:"E",
		require:"ngModel",
		link:function(scope,element,attrs,ngModel){
			element.bind("click",function(){
				var id = "input" + ngModel.$modelValue.frameNum;
				console.log(id);
				var obj = $("."+id);
				obj.removeClass("active");
				obj.addClass("inactive");
				obj.attr("readonly",true);
				scope.$apply(function(){
					carService.updateCarInfo(ngModel.$modelValue).then(function(data){
						scope.isShow = false;
						console.log(data);
						alert(data.message);
					});
				});
			});
		}
	}
});