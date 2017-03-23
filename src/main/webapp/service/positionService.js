app.service("positionSer",function($http,$q){
	this.getPositionInfos = function(){
		var deferred = $q.defer();
		$http.get("http://localhost:8080/management/position/getinfos.ll").success(function(data){
			deferred.resolve(data);
		}).error(function(){
			deferred.reject("连接失败");
		});
		
		return deferred.promise;
	}
	
	
});