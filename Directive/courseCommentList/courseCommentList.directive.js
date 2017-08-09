/**
 * Created by wupeng5 on 2016/3/5.
 */


angular.module("app").directive("courseCommentList", function () {
    return {
        templateUrl: "./Directive/courseCommentList/courseCommentList.html?v=1302",
        restrict:"EA",
        scope:{
            "chooseCallback":"=",
            "showAddBtn":"=",
            "showCk":"="
        },
        link:function(){},
        controller: function ($scope, $http, $rootScope, $state, enume, $stateParams) {
            $scope.CourseID = $stateParams.entity.item.ID;
            $scope.OpenID = "";
            $scope.startTime = null;
            $scope.endTime = null;
            $scope.IsValid = -1;         
            $scope.wxStatus = enume.wxStatus;
            $scope.List = [];

            $scope.search = function () {
                $scope.$broadcast("searchByFilter");
            }


            $scope.getUrl = function(){
                return srvDomain + "/CourseComment/Index?CourseID=" + $scope.CourseID + "&OpenID=" + $scope.OpenID + "&startTime=" + $scope.startTime + "&endTime=" + $scope.endTime + "&status=" + $scope.IsValid;
            }

            $scope.directiveCallBack = function(valueFromDirective){
                $scope.List = valueFromDirective;
            }

            $scope.edit = function (item) {
                var msg = "确定要降此条评论设置成无效状态吗？";
                if (item.IsValid==false)
                {
                    msg = "确定要降此条评论设置成有效状态吗？";
                }

                if (confirm(msg)) {
                    var tmp = {
                    };
                    var url = "";

                    var id = item.ID;
                    url = srvDomain + "/CourseComment/Update";
                    tmp.id = id;
                    item.IsValid = !item.IsValid;
                    enume.postData(url, tmp, function (d) {
                        alert("修改成功!");
                        $scope.$broadcast("searchByFilter");
                    })
                }
            };

        }
    }
})