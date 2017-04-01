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
	
	this.getPositionInfo = function(position){
		var deferred = $q.defer();
		$http({
			method:"post",
			url:"http://localhost:8080/management/position/getinfo.ll",
			data:position,
			dataType:"json"
		}).success(function(data){
			deferred.resolve(data);
		}).error(function(){
			deferred.reject("查询失败");
		});
		
		return deferred.promise;
	}
	
	this.getInfoForPie = function(){
		var deferred = $q.defer();
		$http({
			method:"post",
			url:"http://localhost:8080/management/position/getinfoforpie.ll",
		}).success(function(data){
			deferred.resolve(data);
		}).error(function(){
			deferred.reject("查询失败");
		});
		
		return deferred.promise;
	}
	
	
});