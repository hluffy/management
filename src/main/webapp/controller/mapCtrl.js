app.controller("mapCtrl",function($scope,$timeout,mapServ){
	$scope.map = {};
// 		function initmap(){
		var centerPoint = [31.1707739,121.406607];
		var map = L.map('leafletMap').setView(centerPoint, 19);
		
		var aerial = new L.tileLayer("http://localhost:8080/Tiles/{z}/{x}/{y}.png", {
    		maxZoom: 21,
    		minZoom: 8,
		});
		aerial.addTo(map);
		
		L.control.scale().addTo(map);//添加比例尺
// 		}
	
	
// 		$timeout(function(){
// 			initmap();
// 		}, 100);
		var marker = L.marker();
		$scope.getPositionInfo = function(){
			
			map.removeLayer(marker);
			mapServ.getPositionInfoAsFrameNum($scope.map).then(function(data){
				console.log(data);
				marker = L.marker([data.data.log,data.data.lat]);
				map.addLayer(marker);
				marker.bindPopup('test marker').openPopup();
			});
		}
});