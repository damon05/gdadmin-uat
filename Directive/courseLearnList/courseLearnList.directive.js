/**
 * Created by wupeng5 on 2016/3/5.
 */


angular.module("app").directive("courseLearnList", function () {
    return {
        templateUrl: "./Directive/courseLearnList/courseLearnList.html?v=1303",
        restrict:"EA",
        scope:{
            "chooseCallback":"=",
            "showAddBtn":"=",
            "showCk":"="
        },
        link:function(){},
        controller: function ($scope, $http, $rootScope, $state, enume, $stateParams) {
            $scope.CourseID = $stateParams.entity.item.ID;          
            $scope.startTime = null;
            $scope.endTime = null;
            $scope.List = [];

            $scope.search = function () {
                $scope.$broadcast("searchByFilter");
            }


            $scope.getUrl = function(){
                return srvDomain + "/CourseLearn/Index?CourseID=" + $scope.CourseID + "&startTime=" + $scope.startTime + "&endTime=" + $scope.endTime ;
            }

            $scope.directiveCallBack = function(valueFromDirective){
                $scope.List = valueFromDirective;
            }

        }
    }
})