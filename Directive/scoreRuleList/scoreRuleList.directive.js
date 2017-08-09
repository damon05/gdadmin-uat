/**
 * Created by liulb on 2017/4/10.
 */


angular.module("app").directive("scoreRuleList",function(){
    return {
        templateUrl:"./Directive/scoreRuleList/scoreRuleList.html?v=1300",
        restrict:"EA",
        scope:{
            "chooseCallback":"=",
            "showAddBtn":"=",
            "showCk":"="
        },
        link:function(){},
        controller:function($scope,$http,$rootScope,$state,enume){
           
            $scope.List = [];

            $scope.search = function () {
                $scope.$broadcast("searchByFilter");
            }

            $scope.create = function () {
                $scope.showButton = true;
                $state.go("roomManage.createScoreRule", { entity: { tag: "add" } });
            }

            $scope.getUrl = function(){
                return srvDomain + "/ScoreRule/Index?studyBean=" ;
            }

            $scope.directiveCallBack = function(valueFromDirective){
                $scope.List = valueFromDirective;
            }

            $scope.edit = function (item) {
                $scope.showButton = true;
                $state.go("roomManage.createScoreRule", { entity: { tag: "edit", item: item } });
            }


            $scope.goDetail = function (item) {
                $scope.showButton = false;
                $state.go("roomManage.createScoreRule", { entity: { tag: "detail", item: item } });
            }

            $scope.delete = function (item) {
                if (confirm("确定要删除此项目吗？")) {
                    var tmp = {
                    };
                    var url = "";

                    var id = item.ID;
                    url = srvDomain + "/ScoreRule/Delete";
                    tmp.id = id;

                    enume.postData(url, tmp, function (d) {
                        alert("删除成功!");
                        $scope.$broadcast("searchByFilter");
                    })
                }
            };

        }
    }
})