var app = angular.module("myApp",[]);

app.controller("signupCtrl",function($scope,singupServ){
	$scope.user = {};
	
	$scope.userSignup = function(){
		singupServ.userSignup($scope.user).then(function(data){
			console.log(data);
			if(data.states){
				alert("注册成功！");
				window.location.href="login.html";
			}else{
				alert(data.message);
			}
			
			$scope.user = {};
		});
	}
});