/// <reference path="../libs/angular.js" />

'use strict';

angular.module('cart-wizard', ['ui.router', 'cart-widget.controllers', 'ui.bootstrap', 'ngAnimate'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('product', {
            url: '/',
            templateUrl: 'partials/home.html',
            controller: 'ProductController'
        })
        .state('cart', {
            url: '/',
            templateUrl: 'partials/cart.html',
            controller: 'CartController'
        })
        .state('login', {
            url: '/',
            templateUrl: 'partials/login.html',
            controller: 'LoginController'
        })
        .state('card', {
            url: '/',
            templateUrl: 'partials/card.html',
            controller: 'CardController'
        });

        $urlRouterProvider.otherwise('/');
    })
    .factory('Storage', function () {
        var order = { };
        return {
            SetProduct: function (product) {
                order.Product = product;
            },
            SetUser: function (user) {
                order.User = user;
            },
            SetCard: function (card) {
                order.Card = card;
            },
            GetOrder: function () {
                return order;
            }
        }
    });