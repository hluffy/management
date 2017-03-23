app.controller("maproadCtr",function($scope,mapServ){
	var centerPoint = [31.1707739,121.406607];
	var map = L.map('leafletMap').setView(centerPoint, 19);
	
	var aerial = new L.tileLayer("http://localhost:8080/Tiles/{z}/{x}/{y}.png", {
		maxZoom: 21,
		minZoom: 8,
	});
	aerial.addTo(map);
	
	L.control.scale().addTo(map);//添加比例尺
	
	$scope.map = {};
	$scope.getRoadInfo = function(){
		map.remove();
		map = L.map('leafletMap').setView(centerPoint, 19);
		var aerial = new L.tileLayer("http://localhost:8080/Tiles/{z}/{x}/{y}.png", {
    		maxZoom: 21,
    		minZoom: 8,
//     		maxNativeZoom: 19
		});
		aerial.addTo(map);
		mapServ.getPositionInfoAsFrameNum($scope.map).then(function(data){
			var marker = L.marker([data.data.log,data.data.lat]);
			map.addLayer(marker);
			marker.bindPopup("终点").openPopup();
			L.Routing.control({
				router: L.Routing.graphHopper(undefined /* no api key */, {
			        serviceUrl: 'http://www.1000van.com:8989/route'}),
				waypoints:[
					L.latLng(31.1709241,121.4074275),
					L.latLng(data.data.log,data.data.lat)
				           ]
			}).addTo(map);
		});
		
	}
	
});