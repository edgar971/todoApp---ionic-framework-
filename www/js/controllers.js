angular.module('starter.controllers', [])
    .controller('TodoListController', function ($scope, $ionicModal) {
	    
	    //define an empty array for the list 
		$scope.todoItems = [
		];
		
		//modal window code
		//init the modal window
		$ionicModal.fromTemplateUrl('modal.html', {
		 	scope: $scope,
		 	animation: 'slide-in-up'
		}).then(function (modal) {
		 	$scope.modal = modal;
		 	//console.log(modal);
		});
		
		
		
		
		
		
		//function to open modal 
		$scope.openModal = function () {
		  $scope.modal.show();
		};
		
		//function to close modal 
		$scope.closeModal = function () {
		  $scope.modal.hide();
		};
		
		//Cleanup the modal when we're done with it!
		$scope.$on('$destroy', function () {
		  $scope.modal.remove();
		});
		
		//function to add data to the list
		$scope.AddItem = function (data) {
		  $scope.todoItems.push({
		    task: data.newItem,
		    status: 'not done'
		  });
		  data.newItem = '';
		  $scope.closeModal();
		};
		
	    //output data
	    //console.log($scope);
		//console.log($ionicModal);
});