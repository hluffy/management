app.service("singupServ",function($http,$q){
	this.userSignup = function(user){
		var deferred = $q.defer();
		
		$http({
			method:"post",
			url: "http://localhost:8080/management/user/addinfo.ll",
			data: user,
			dataType: "json"
		}).success(function(data){
			deferred.resolve(data);
		}).error(function(){
			deferred.reject("注册失败");
		});
		
		return deferred.promise;
	}
});