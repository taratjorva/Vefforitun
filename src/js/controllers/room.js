app.controller("RoomController", ["$scope", "$routeParams", "SocketService", function($scope, $routeParams, SocketService) {
	$scope.roomName = $routeParams.roomName;
	$scope.currentMessage = "";

	var socket = SocketService.getSocket();
	var socket2 = io.connect('http://localhost:8080');

	if(socket) {
		/*socket.emit("joinroom", { room: $scope.roomName, pass: "" }, function(success, errorMessage) {

		});*/
		socket.on("updatechat", function(roomname, messageHistory) {
			console.log(messageHistory);
			$scope.messages = messageHistory;
			$scope.$apply();
		});

		socket.on("updateusers", function(room, users) {
			if(room === $scope.roomName) {
				$scope.users = users;
			}
		});

		socket.on("roomlist", function(rooms) {
						$scope.rooms = rooms;
			
		});
		/*socket.on('rooms', function() {
		socket.emit('roomlist', rooms);*/
	

	}
	
	$scope.createChannel = function(){
	if(socket2) {
				
				socket2.emit("joinroom", { room:  $scope.roomName , pass: "" }, function(available) {
 
				if(true) {
					SocketService.setConnected(socket);
					//SocketService.setUsername($scope.username);*/
					//rooms.lobby = new Room();
				$location.path("/room/$scope.roomName");
				}
				$scope.$apply();
					});
		}
	};
		
	$scope.send = function() {
		if(socket) {
			console.log("I sent a message to " + $scope.roomName + ": " + $scope.currentMessage);
			socket.emit("sendmsg", { roomName: $scope.roomName, msg: $scope.currentMessage });
			$scope.currentMessage = "";
		}
	};

	$scope.keyPress = function($event) {
		if($event.keyCode === 13) {
			$scope.send();
		}
	};

}]);