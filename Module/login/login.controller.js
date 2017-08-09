'use strict';

angular.module('app')
    .controller('loginAdminCtrl', function ($scope,$state,enume,$rootScope) {

        $rootScope.userName = "";

        $scope.error = false;
        $scope.errorMsg = "";

        $scope.name = "";
        $scope.pwd = "";

        $scope.login = function(){

            if($scope.name == "" || $scope.pwd == ""){
                $scope.error = true;
                $scope.errorMsg = "账号,密码都不允许为空!";
                return;
            }

            enume.postData("/cmsapi/login/jyjgDoLogin?name="+$scope.name+"&password="+$scope.pwd,null,function(d){
                $scope.error = false;
                enume.init();
                $state.go("roomManage.roomList");

                $rootScope.userName = d.name;
            })
        }

        document.querySelector("#pwd").addEventListener("keyup",function(e){
            var code = e.keyCode;
            if(code == 13){
                $scope.login();
            }
        },false);
    })
