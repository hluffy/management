app.controller("parentCtrl",function($scope){
//		$scope.userName = localStorage.getItem("userName");
// 		$scope.userRole = localStorage.getItem("userRole");
// 		console.log($scope.userRole);
 		
 		if(localStorage.getItem("userName")!=null){
 			sessionStorage.setItem("userName",localStorage.getItem("userName"));
 			sessionStorage.setItem("userRole",localStorage.getItem("userRole"));
 		}
 		
 		$scope.userName = sessionStorage.getItem("userName");
 		$scope.userRole = sessionStorage.getItem("userRole");
 		
 		localStorage.clear();
 		
		
		
		
})