/*
var myapp = angular
            .module("myModule", ["ngRoute"])
            .config(function($routeProvider){
                $routeProvider
                    .when("/home", {
                        templateUrl: "templates/posts.html"
                    })
                    .when("/posts", {
                        templateUrl: "templates/posts.html"
                    })
                    .when("/post", {
                        templateUrl: "templates/post.html"
                    })
            })
            .controller("postsController", function($scope, $http){                
                
                var successCallBack = function(response){
                    $scope.posts = response.data;
                    console.log(response.data);
                };
                var errorCallBack = function(response){
                    $scope.posts = response.data;
                };

                $http({
                    method: "GET",
                    url: "http://jsonplaceholder.typicode.com/posts"
                }).then(successCallBack, errorCallBack);
            })
            .controller("postController", function($scope){
                $scope.msg= "test";
            });
            */
var app = angular.module("myModule", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/index.html"
    })
    .when("/posts", {
        templateUrl : "templates/posts.html",
        controller: "postsController"
    })
    .when("/posts/post/:id", {
        templateUrl : "templates/post.html",
        controller: "postController"
    })
    .when("/posts/post/:id/comments",{
         templateUrl: "templates/comments.html",
         controller: "commentsController"
    })
    .when("/users", {
        templateUrl: "templates/users.html",
        controller: "usersController"
    })
    .when("/photos",{
        templateUrl: "templates/photos.html",
        controller: "photosController",
        resolve: {
            photosList: function($http){
                 $http({
                    method: "GET",
                    url: "http://jsonplaceholder.typicode.com/photos"
                }).then(function(response){
                    return response.data;
                });
            }
        }
    })
    .otherwise({
        redirectTo: "template/index.html"
    })
})
.controller("postsController", function($scope, $http){                 
    var successCallBack = function(response){
        $scope.posts = response.data;
        console.log(response.data);
    };
    var errorCallBack = function(response){
        $scope.posts = response.data;
    };

    $http({
        method: "GET",
        url: "http://jsonplaceholder.typicode.com/posts"
    }).then(successCallBack, errorCallBack);
})
.controller("postController", function($scope, $http, $routeParams){
    
    var successCallBack = function(response){
        $scope.post = response.data;
    };

    var errorCallBack = function(response){
        $scope.post = response.data;
    };

    $http({
        url: "http://jsonplaceholder.typicode.com/posts/"+$routeParams.id,
        /*params: {id: $routeParams.id},*/
        method: "GET"
    }).then(successCallBack, errorCallBack);
})
.controller("commentsController", function($scope, $http, $routeParams){
    
    var successCallBack = function(response){
        $scope.comments = response.data;
    };

    var errorCallBack = function(response){
        $scope.comments = response.data;
    };
    
    $http({
        method: "GET",
        url: "http://jsonplaceholder.typicode.com/posts/"+$routeParams.id+"/comments"
    }).then(successCallBack, errorCallBack);
})
.controller("usersController", function($scope, $http){
    
    var successCallBack = function(response){
        $scope.users = response.data;
    };

    var errorCallBack = function(response){
        $scope.users = response.data;
    };
    
    $http({
        method: "GET",
        url: "http://jsonplaceholder.typicode.com/users"
    }).then(successCallBack, errorCallBack);
})
.controller("photosController", function($scope, photosList){
    $scope.photos = photosList;
});