/// <reference path="../libs/angular.js" />

'use strict';

angular.module('cart-widget.controllers', [])
    .controller('DataController', ['$scope', 'Storage', function ($scope, Storage) {
        $scope.data = Storage.GetOrder();
    }])
    .controller('ProductController', ['$scope', '$http', '$state', 'Storage', function ($scope, $http, $state, Storage) {
        $scope.CompanyName = '';
        $scope.Products = [];
        $scope.ProductItems = [];

        $http.get('data/products.json').success(function (responsedata) {
            //Demonstrate handling response data to fit View structure 
            for (var i = 0; i < responsedata.Products.length; i++) {
                responsedata.Products[i].ProductQuantity = 1;
            }

            $scope.CompanyName = responsedata.CompanyName;
            $scope.Products = responsedata.Products;

            var firstProduct = $scope.Products[0];
            for (var i = 0; i < firstProduct.ProductItems.length; i++) {
                $scope.ProductItems.push({ ItemName: firstProduct.ProductItems[i].ProductItemName });
            }

        });

        $scope.select = function (product) {
            Storage.SetProduct(product);
            $state.go('cart');
        };
    }])
    .controller('CartController', ['$scope', '$state', 'Storage', function ($scope, $state, Storage) {
        $scope.Product = Storage.GetOrder().Product;

        //Demonstrate returning values from controller
        $scope.Total = function () {
            return $scope.Product.ProductPrice * $scope.Product.ProductQuantity;
        };
    }])
    .controller('LoginController', ['$scope', '$state', 'Storage', function ($scope, $state, Storage) {
        $scope.user = { email: '', password: ''};

        $scope.Login = function (isvalid) {
            if (isvalid) {
                Storage.SetUser($scope.user);
                $state.go('card');
            }
        };
    }])
    .controller('CardController', ['$scope', '$state', 'Storage', '$modal', function ($scope, $state, Storage, $modal) {
        $scope.IsPaying = false;

        $scope.Pay = function (card) {
            $scope.IsPaying = true;
            Storage.SetCard(card);

            //Simulate working on server-side
            setTimeout(function () {
                $scope.IsPaying = false;

                //Demonstrate Angular.ui.bootstrap
                $modal.open({
                    template: '<div class="modal-body"><h4>Congratulations! You just bought a car!</h4></div><div class="modal-footer"><button class="btn btn-primary" ng-click="$parent.$close()">OK</button></div>'
                });
            }, 2000);
        };
    }]);