//app.controller("ibeaconCtrl",function($scope,$http){
//	$scope.isShow = false;
//	$scope.master = {};
//	$http.get("../resources/location/IBeacon.json").success(function(data){
//		$scope.ibeacons = data.ibeacons;
//	});
//});

app.controller("ibeaconCtrl",function($scope,ibeaconSer){
	$scope.isShow = false;
	$scope.master = {};
	ibeaconSer.getIbeaconInfos().then(function(data){
		console.log(data);
		$scope.ibeacons = data.data;
	});
	
	$scope.ibeacon = {};
	$scope.addIbeacon = function(ibeacon){
		ibeaconSer.addIbeaconInfo($scope.ibeacon).then(function(data){
			console.log(data);
			$scope.ibeacon = {};
		});
	}
});

app.directive("ibeedit",function($document){
	return{
		restrict:"E",
		require:"ngModel",
		link:function(scope,element,attrs,ngModel){
			element.bind("click",function(){
				scope.$apply(function(){
					scope.master = angular.copy(ngModel.$modelValue);
					scope.isShow = true;
				});
				var id = "input" + ngModel.$modelValue.minor;
				console.log(id);
				var obj = $("."+id);
				obj.removeClass("inactive");
				obj.addClass("active");
				obj.attr("readonly",false);
			});
		}
	}
});

app.directive("ibecancel",function($document){
	return{
		restrict:"E",
		require:"ngModel",
		link:function(scope,element,attrs,ngModel){
			element.bind("click",function(){
				scope.$apply(function(){
					angular.copy(scope.master,ngModel.$modelValue);
				});
				var id = "input" + ngModel.$modelValue.minor;
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

app.directive("ibedelete",function($document,ibeaconSer){
	return{
		restrict:"E",
		require:"ngModel",
		link:function(scope,element,attrs,ngModel){
			element.bind("click",function(){
				var id = ngModel.$modelValue.minor;
				console.log(id);
				scope.$apply(function(){
					for(var i = 0;i<scope.ibeacons.length;i++){
						if(scope.ibeacons[i].minor==id){
							ibeaconSer.deleteIbeaconInfo(ngModel.$modelValue).then(function(data){
								console.log(data);
							});
							scope.ibeacons.splice(i,1);
						}
					}
				});
			});
		}
	}
});

app.directive("ibeupdate",function($document,ibeaconSer){
	return{
		restrict:"E",
		require:"ngModel",
		link:function(scope,element,attrs,ngModel){
			element.bind("click",function(){
				var id = "input" + ngModel.$modelValue.minor;
				console.log(id);
				var obj = $("."+id);
				obj.removeClass("active");
				obj.addClass("inactive");
				obj.attr("readonly",true);
				scope.$apply(function(){
					ibeaconSer.updateIbeaconInfo(ngModel.$modelValue).then(function(data){
						scope.isShow = false;
						console.log(data);
					});
				});
				
			});
		}
	}
});