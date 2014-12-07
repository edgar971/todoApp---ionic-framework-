/* Yelp API
Consumer Key	tLivdqcpKOiCT6NnCnN8dA
Consumer Secret	a-BuyovQAMqs8YVz8lE5Vk58cEo
Token	u0qX_MFsNqpWlv9efftSmc1b0mChZoQm
Token Secret	kVfjZdl6goTOAawxwgWTt_5v6tg
*/

angular.module('starter.controllers', [])
    .controller('TodoListController', function ($scope, $ionicModal, $ionicLoading) {
	    
	    //define an empty array for the list 
		$scope.todoItems = [
			{
				task: 'Keep Working',
				done: 'false'
			}
		];
		
		$scope.instagramUsers = [];
		
		//modal window code
		//init the modal window
		$ionicModal.fromTemplateUrl('modal.html', {
		 	scope: $scope,
		 	animation: 'slide-in-up'
		}).then(function (modal) {
		 	$scope.modal = modal;
		 	//console.log(modal);
		});
		
		$scope.showLoader = function() {
		    $ionicLoading.show({
		      template: 'Loading...'
		    });
		  };
		$scope.hideLoader = function(){
		    $ionicLoading.hide();
		};		
		$scope.searchInstagram = function(event) {
			value = event.target.value;
			if(value.length > 3) {
				$scope.showLoader();
				console.log('Searching...');
				console.log(value);
				queryString = "https://api.instagram.com/v1/users/search?q=" + value +"&access_token=359438134.e80aed7.a2363c18a8ae4200b1770b3f942bffed";
				$.ajax({
					url: queryString,
					type: "GET",
					//external server request must use jsonp 
					dataType: "jsonp",
					global: true,
					success: function(results) {
						$scope.instagramUsers = [];
						console.log(results.data);
						$.each(results.data, function(index, user){
							console.log(user);
							$scope.instagramUsers.push({
								name: user.full_name,
								description: user.bio,
								imgsrc: user.profile_picture
							});
						});
						$scope.hideLoader();
					}
				});

			} else {
				$scope.instagramUsers = [];
			}
		}
		
		$scope.onItemDelete = function(item) {
		  $scope.todoItems.splice($scope.todoItems.indexOf(item), 1);
		};		
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