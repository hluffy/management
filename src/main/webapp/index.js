var app = angular.module("myApp",['ui.router']);
//app.directive('alertBar',[function(){
//  return {
//    restrict: 'EA',
//    templateUrl: 'html/alert/alertBar.html',
//    scope : {
//      message : "=",
//      type : "="
//    },
//    link: function(scope, element, attrs){
//      scope.hideAlert = function() {
//        scope.message = null;
//        scope.type = null;
//      };
//
//    }
//  };
//}]);

//app.factory('TipService', ['$timeout', function($timeout) {
//  return {
//    message : null,
//    type : null,
//    setMessage : function(msg,type){
//
//      this.message = msg;
//      this.type = type;
//
//      //提示框显示最多3秒消失
//      var _self = this;
//      $timeout(function(){
//        _self.clear();
//      },3000);
//    },
//    clear : function(){
//      this.message = null;
//      this.type = null;
//    }
//  };
//}]);






app.controller("myCtrl",function($scope){
	$scope.showlogin = false;
	$rootScope.userName = localStorage.getItem("userName");
});

//app.config(function($httpProvider){
//	$httpProvider.interceptors.push(HttpInterceptor);
//});
//
//app.factory("HttpInterceptor",function($q){
//	function HttpInterceptor($q) {
//		 return {
//		  // 请求发出之前，可以用于添加各种身份验证信息
//		  request: function(config){
//			  console.log(config);
////		   if(localStorage.token) {
////		    config.headers.token = localStorage.token;
////		   }
//		   return config;
//		  },
//		  // 请求发出时出错
//		  requestError: function(err){
//			  console.log(err);
////		   return $q.reject(err);
//		  },
//		  // 成功返回了响应
//		  response: function(res){
//			  console.log(res);
////		   return res;
//		  },
//		  // 返回的响应出错，包括后端返回响应时，设置了非 200 的 http 状态码
//		  responseError: function(err){
////			  console.log(err);
//			  window.location.href("login.html");
////		   return $q.reject(err);
//		  }
//		 };
//		}
//});






app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/dashboard');
    $stateProvider
	    .state('dashboard',{
	    	url:'/dashboard',
	    	templateUrl:'html/dashboard/dashboard.html'
	    })
        .state('user', {
            url: '/user',
//            templateUrl: 'html/user/usertable.html',
            templateUrl: 'html/user/usertable.html',
            controller: 'userCtrl',
            data:{
            	authorizedRoles:['admin']
            }
        })
        .state('userinfo',{
        	url:'/userinfo',
        	templateUrl: 'html/user/usertable.html',
        	controller: 'userCtrl',
        	permission: 'admin'
        })
        .state('adduser',{
        	url:'/adduser',
        	templateUrl: 'html/user/adduser.html',
        	controller: 'userCtrl'
        })
        .state('position', {
        	url: '/position',
        	templateUrl: 'html/position/position.html',
        	controller: 'positionCtrl'
        })
        .state('car', {
        	url: '/car',
        	templateUrl: 'html/car/cartable.html',
        	controller: 'carCtrl'
        })
        .state('carinfo',{
        	url:'/carinfo',
        	templateUrl: 'html/car/cartable.html',
        	controller: 'carCtrl'
        })
        .state('addcar',{
        	url:'/addcar',
        	templateUrl:'html/car/addcar.html',
        	controller:'carCtrl'
        })
        .state('ibeacon',{
        	url:'/ibeacon',
        	templateUrl: 'html/location/IBeacontable.html',
        	controller : 'ibeaconCtrl'
        })
        .state('ibeaconinfo',{
        	url:'/ibeaconinfo',
        	templateUrl: 'html/location/IBeacontable.html',
        	controller : 'ibeaconCtrl'
        })
        .state('addibeacon',{
        	url:'/addibeacon',
        	templateUrl:'html/location/addibeacon.html',
        	controller:'ibeaconCtrl'
        })
        .state('gps',{
        	url:'/gps',
        	templateUrl:'html/location/GPStable.html'
        })
        .state('map',{
        	url:'/map',
        	templateUrl:'html/map/map.html'
        })
        .state('mapposition',{
        	url:'/mapposition',
        	templateUrl:'html/map/map.html'
        })
        .state('maproad',{
        	url:'/maproad',
        	templateUrl:'html/map/maproad.html'
        })
        .state('barchart',{
        	url:'/barchart',
        	templateUrl:'html/charts/barchart.html'
        })
        .state('piechart',{
        	url:'/piechart',
        	templateUrl:'html/charts/piechart.html',
        	controller:'peichartCtrl'
        })
        .state('charts',{
        	url:'/charts',
        	templateUrl:'html/charts/barchart.html'
        })
        
//        .state('login',{
//        	url:'login',
//        	templateUrl:'login.html'
//        })
});


//app.config(function($routeProvider){
//	$routeProvider
//    .when('/user', {
//        templateUrl: 'html/user/usertable.html',
//        controller: 'userCtrl'
//    })
//    .when('/ibeacon', {
//        templateUrl: 'html/location/IBeacontable.html',
//        controller: 'ibeaconCtrl'
//    })
//    .when('/gps',{
//    	templateUrl: 'html/location/GPStable.html',
//    	controller: 'gpsCtrl'
//    })
//    .when('/car',{
//    	templateUrl: 'html/car/cartable.html',
//    	controller: 'carCtrl'
//    })
//    .when('/position',{
//    	templateUrl: 'html/position/position.html',
//    	controller: 'positionCtrl'
//    })
//    .when('/map',{
//    	templateUrl: 'html/map/map.html',
//    	controller: 'mapCtrl'
//    })
//    .when('/barchart',{
//    	templateUrl: 'html/charts/barchart.html',
//    	controller: 'barchartCtrl'
//    })
//    .when('/piechart',{
//    	templateUrl: 'html/charts/piechart.html',
//    	controller: 'peichartCtrl'
//    })
//    .when('/dashboard',{
//    	templateUrl: 'html/dashboard/dashboard.html',
////    	controller: 'dashboardCtrl',
//    })
//    .when('/charts',{
//    	redirectTo: '/barchart'
//    })
//    .otherwise({
//        redirectTo: '/user'
//    });
//});