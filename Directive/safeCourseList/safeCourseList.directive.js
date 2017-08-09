/**
 * Created by wupeng5 on 2016/3/5.
 */


angular.module("app").directive("safeCourseList",function(){
    return {
        templateUrl:"./Directive/safeCourseList/safeCourseList.html?v=1301",
        restrict:"EA",
        scope:{
            "chooseCallback":"=",
            "showAddBtn":"=",
            "showCk":"="
        },
        link:function(){},
        controller:function($scope,$http,$rootScope,$state,enume){

            $scope.Name = "";
            $scope.CategoryID = -1;
            $scope.statusID = -1;
            $scope.categoryList = enume.wxSafeCategory;
            $scope.wxStatus = enume.wxStatus;
            $scope.List = [];

            $scope.search = function () {
                $scope.$broadcast("searchByFilter");
            }

            $scope.create = function () {
                $scope.showButton = true;
                $state.go("roomManage.createSafeCourse", { entity: { tag: "add" } });
            }

            $scope.getUrl = function(){
                return srvDomain + "/SafeCourse/Index?courseName=" + $scope.Name + "&categoryID=" + $scope.CategoryID + "&status=" + $scope.statusID;
            }

            $scope.directiveCallBack = function(valueFromDirective){
                $scope.List = valueFromDirective;
            }

            $scope.edit = function (item) {
                $scope.showButton = true;
                $state.go("roomManage.createSafeCourse", { entity: { tag: "edit", item: item } });
            }


            $scope.detail = function (item) {
                $scope.showButton = false;
                $state.go("roomManage.createSafeCourse", { entity: { tag: "detail", item: item } });
            }
            $scope.publish = function (item) {
                var alertMessage = "确定要发布吗？";
                var resultMessage = "发布成功!";
                if (item.Status == 1) {
                    alertMessage = "确定要取消发布吗？";
                    resultMessage = "取消发布成功!";
                }
                if (confirm(alertMessage)) {
                    var tmp = {
                    };
                    var url = "";

                    var id = item.ID;
                    url = srvDomain + "/SafeCourse/Publish";
                    tmp.id = id;

                    enume.postData(url, tmp, function (d) {
                        alert(resultMessage);
                        $scope.$broadcast("searchByFilter");
                    })
                }
            };

            $scope.delete = function (item) {
                if (confirm("确定要删除此项目吗？")) {
                    var tmp = {
                    };
                    var url = "";

                    var id = item.ID;
                    url = srvDomain + "/SafeCourse/Delete";
                    tmp.id = id;

                    enume.postData(url, tmp, function (d) {
                        alert("删除成功!");
                        $scope.$broadcast("searchByFilter");
                    })
                }
            };

            $scope.getRemark = function(item){
                return jsCoreMethod.cutString(item.remark,5);
            }

            $scope.$on("getCkClass",function(e,d){
                var d = $scope.List;
                var res = [];
                for(var i=0;i< d.length;i++){
                    if(d[i].ck){
                        res.push(d[i]);
                    }
                }
                //res = [{id:"aaaaaa",name:"2222222"}];
                $scope.chooseCallback(res);
            })

        }
    }
})