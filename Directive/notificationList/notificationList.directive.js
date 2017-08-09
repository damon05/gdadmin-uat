/**
 * Created by wupeng5 on 2016/3/5.
 */


angular.module("app").directive("notificationList",function(){
    return {
        templateUrl:"./Directive/notificationList/notificationList.html",
        restrict:"EA",
        scope:{
            "chooseCallback":"=",
            "showAddBtn":"=",
            "showCk":"="
        },
        link:function(){},
        controller:function($scope,$http,$rootScope,$state,enume){

            $scope.Title = "";
            $scope.Status = -1;
            $scope.wxStatus = enume.wxStatus;

            $scope.List = [];

            $scope.search = function () {
                $scope.$broadcast("searchByFilter");
            }

            $scope.createNotification = function () {
                $scope.showButton = true;
                $state.go("roomManage.createNotification", { entity: { tag: "add" } });
            }

            $scope.getUrl = function(){
                return srvDomain + "/Notification/Index?title=" + $scope.Title + "&status=" + $scope.Status;
            }

            $scope.directiveCallBack = function(valueFromDirective){
                $scope.roomList = valueFromDirective;
            }

            $scope.edit = function (item) {
                $scope.showButton = true;
                $state.go("roomManage.createNotification", { entity: { tag: "edit", item: item } });
            }

            $scope.publish = function (item) {
                var tmp = {
                };
                
                var url = "";                
                var id = item.ID;
                url = srvDomain + "/Notification/Publish";
                tmp.id = id;
              
                enume.postData(url, tmp, function (d) {                    
                    $state.go("roomManage.notificationList");                   
                    
                })
            }

            $scope.goDetail = function (item) {
                $scope.showButton = false;
                $state.go("roomManage.createNotification", { entity: { tag: "detail", item: item } });
            }

           

        }
    }
})