app.service("ibeaconSer",function($http,$q){
	this.getIbeaconInfos = function(){
		var deferred = $q.defer();
		$http.get("http://localhost:8080/management/ibeacon/getinfos.ll").success(function(data){
			deferred.resolve(data);
		}).error(function(){
			deferred.reject("连接失败");
		});
		
		return deferred.promise;
	}
	
	this.updateIbeaconInfo = function(ibeacon){
		var deferred = $q.defer();
		$http({
			method:"post",
			url:"http://localhost:8080/management/ibeacon/updateinfo.ll",
			data:ibeacon,
			dataType:"json"
		}).success(function(data){
			deferred.resolve(data);
		}).error(function(){
			deferred.reject("更新失败");
		});
		return deferred.promise;
	}
	
	this.addIbeaconInfo = function(ibeacon){
		var deferred = $q.defer();
		$http({
			method:"post",
			url:"http://localhost:8080/management/ibeacon/addinfo.ll",
			data:ibeacon,
			dataType:"json"
		}).success(function(data){
			deferred.resolve(data);
		}).error(function(){
			deferred.reject("保存失败");
		});
		
		return deferred.promise;
	}
	
	this.deleteIbeaconInfo = function(ibeacon){
		var deferred = $q.defer();
		$http({
			method:"post",
			url:"http://localhost:8080/management/ibeacon/deleteinfo.ll",
			data:ibeacon,
			dataType:"json"
		}).success(function(data){
			deferred.resolve(data);
		}).error(function(){
			deferred.reject("删除失败");
		});
		
		return deferred.promise;
	}
});