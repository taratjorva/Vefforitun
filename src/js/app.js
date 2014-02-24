var app = angular.module("ChatApp", ["ngRoute"]);

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "templates/home.html",
		controller: "LoginController",
	}).when("/rooms/channel/:id/", {
		templateUrl: "templates/rooms.html",
		controller: "RoomController",
	}).when("/rooms/room/:roomName", {
		templateUrl: "templates/room.html",
		controller: "RoomController",
	}).otherwise({ redirectTo: "/" });
}]);