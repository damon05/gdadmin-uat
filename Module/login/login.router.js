'use strict';

angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider
            .state('loginAdmin', {
                url: '/loginAdmin',
                cache:false,
                templateUrl: "./Module/login/loginAdmin.html",
                controller: 'loginAdminCtrl'
            })
    });
