//app.controller("userCtrl",function($scope,$http){
//	$scope.master = {};
//	$scope.isShow = false;
//	$http.get("../resources/user/users.json").success(function(data){
//		$scope.users = data.users;
//		console.log($scope.users);
//	});
//});

app.controller("userCtrl",function($rootScope,$scope,$http,userService){
	$scope.master = {};
	$scope.user = {};
	$scope.defIndex = -1;
	$scope.isShow = false;
	$rootScope.pages = new Array();
	$rootScope.indexPage = 1;
	userService.getUserInfos().then(function(data){
		$rootScope.users = data.data;
		$rootScope.count = data.count;
		if($scope.count){
			$scope.page = Math.ceil($scope.count/10);
			$rootScope.lastPage = $scope.page;
			for(var i=1;i<=$scope.page;i++){
				$rootScope.pages[i-1] = i;
			}
		}
	});
	
//	$http.get("http://localhost:8080/management/user/getinfos.ll").success(function(data){
//		$scope.users = data.data;
//	});
	
	$scope.addUser = function(){
		userService.saveUserInfo($scope.user).then(function(data){
			console.log(data);
			alert(data.message);
			$scope.user = {};
		});
	}
	
//	$scope.getUserInfo = function(){
//		console.log(1111);
//		$scope.users = {};
//	}
	
	
	$scope.getUserInfo = function(){
		$scope.users = {};
		$rootScope.pages = new Array();
		userService.getUserInfo($scope.user).then(function(data){
			$scope.users = data.data;
			$rootScope.count = data.count;
			if($scope.count){
				$scope.page = Math.ceil($scope.count/10);
				$rootScope.lastPage = $scope.page;
				for(var i=1;i<=$scope.page;i++){
					$rootScope.pages[i-1] = i;
				}
			}
		})
	}
	
	$scope.getUserInfoOfPage = function(page){
		$rootScope.indexPage = page;
		$scope.user.page = page;
		userService.getUserInfo($scope.user).then(function(data){
			$scope.users = data.data;
		});
	}
	
	$scope.cancelUser = function($index){
		$scope.isShow = false;
		var id = "input" + $scope.users[$index].userName;
		var obj = $("."+id);
		obj.removeClass("active");
		obj.addClass("inactive");
		obj.attr("readonly",true);
		angular.copy($scope.master,$scope.users[$index]);
	}
	
	$scope.updateUser = function($index){
//		$event.target.show();
//		console.log($event.target);
		$scope.isShow = true;
		var id = "input" + $scope.users[$index].userName;
		var obj = $("."+id);
		obj.removeClass("inactive");
		obj.addClass("active");
		obj.removeAttr("readonly");
		obj.focus();
		$scope.master = angular.copy($scope.users[$index]);
		
	}
	
	$scope.saveUser = function($index){
		var id = "input" + $scope.users[$index].userName;
		var obj = $("."+id);
		obj.removeClass("active");
		obj.addClass("inactive");
		obj.attr("readonly",true);
		$scope.isShow = false;
		$scope.user = angular.copy($scope.users[$index]);
		userService.updateUserInfo($scope.users[$index]).then(function(data){
			console.log($scope.users[$index]);
			console.log(data);
		});
	}
	
	$scope.deleteUser = function($index){
		$scope.users.splice($index,1);
	}
});


app.directive("useredit",function($document){
	return{
		 restrict: "E",
		 require: "ngModel",
		 link:function(scope,element,attrs,ngModel){
			 element.bind("click",function(){
				 var id = "input" + ngModel.$modelValue.userName;
				 console.log(id);
				 var obj = $("."+id);
				 obj.removeClass("inactive");  
		         obj.addClass("active");
		         obj.removeAttr("readonly");
		         obj.focus();
//		         obj.next().removeClass("inactive");
//		         obj.next().addClass("active");
//		         obj.next().removeAttr("readonly");
		         scope.$apply(function(){
//		        	 angular.copy(scope.master,ngModel.$modelValue);
		        	 scope.master = angular.copy(ngModel.$modelValue);
		        	 scope.isShow = true;
		         });
			 });
		 }
	}
});

app.directive("usercancel",function($document){
	return{
		restrict:"E",
		require:"ngModel",
		link:function(scope,element,attrs,ngModel){
			element.bind("click",function(){
				scope.$apply(function(){
					angular.copy(scope.master,ngModel.$modelValue);
				});
				var id = "input" + ngModel.$modelValue.userName;
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

app.directive("userdelete",function($rootScope,$document,userService){
	return{
		restrict:"E",
		require:"ngModel",
		link:function(scope,element,attrs,ngModel){
			element.bind("click",function(){
				var id = ngModel.$modelValue.userName;
//				console.log(id);
				scope.$apply(function(){
					for(var i = 0;i<scope.users.length;i++){
						if(scope.users[i].userName==id){
							userService.deleteUserInfo(ngModel.$modelValue).then(function(data){
								
								console.log(data);
								alert(data.message);
								$rootScope.count = $rootScope.count-1;
							});
							scope.users.splice(i,1);
							
						}
					}
				});
			});
		}
	}
});

app.directive("userupdate",function($document,userService){
	return{
		restrict:"E",
		require:"ngModel",
		link:function(scope,element,attrs,ngModel,index){
			element.bind("click",function(){
				var id = "input" + ngModel.$modelValue.userName;
				console.log(id);
				var obj = $("."+id);
				obj.removeClass("active");
				obj.addClass("inactive");
				obj.attr("readonly",true);
				scope.$apply(function(){
					userService.updateUserInfo(ngModel.$modelValue).then(function(data){
						scope.isShow = false;
						console.log(data);
						alert(data.message);
					});
				})
			});
		}
	}
});