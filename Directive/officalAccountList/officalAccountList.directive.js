/**
 * Created by wupeng5 on 2016/3/5.
 */


angular.module("app").directive("officalAccountList",function(){
    return {
        templateUrl:"./Directive/officalAccountList/officalAccountList.html?v=1325",
        restrict:"EA",
        scope:{
            "chooseCallback":"=",
            "showAddBtn":"=",
            "showCk":"="
        },
        link:function(){},
        controller:function($scope,$http,$rootScope,$state,enume){

            $scope.OfficalName = "";
            $scope.OfficalCode = "";
            $scope.State = -1;
            $scope.VerifyState = -1;
            $scope.wxStatus = enume.wxStatus;
            $scope.List = [];

            $scope.search = function () {
                $scope.$broadcast("searchByFilter");
            }

            $scope.create = function () {
                $scope.showButton = true;
                $state.go("roomManage.createOfficalAccount", { entity: { tag: "add" } });
            }

            $scope.getUrl = function(){
                return srvDomain + "/officalAccount/Index?categoryName=" + $scope.Name;
            }

            $scope.directiveCallBack = function(valueFromDirective){
                $scope.List = valueFromDirective;
            }

            $scope.edit = function (item) {
                $scope.showButton = true;
                $state.go("roomManage.createOfficalAccount", { entity: { tag: "edit", item: item } });
            }

            $scope.editMenu = function (item) {
                $scope.showButton = true;
                $state.go("roomManage.accountMenuList", { entity: { tag: "editMenu", accountID: item.ID } });
            }

            $scope.publish = function (item) {
                var url = "";
                var id = item.ID;
                url = srvDomain + "/OfficalAccount/Publish";
                var tmp = {
                };
                tmp.id = id;

                $http({
                        method: "POST",
                        url: url,
                        data: tmp
                    }).success(function (d) {
                        if (d.rc == "0") {
                            alert(d.msg);
                        }
                        else {
                            if (d.rc == "401") {
                                if ($rootScope.userFlag == "userSafe") {
                                    $state.go("loginSafe");
                                } else {
                                    $state.go("loginAdmin");
                                }
                            } else {
                                alert(d.msg);
                            }
                        }
                    })

            }

            $scope.goDetail = function (item) {
                $scope.showButton = false;
                $state.go("roomManage.createOfficalAccount", { entity: { tag: "detail", item: item } });
            }

            $scope.getRemark = function(item){
                return jsCoreMethod.cutString(item.remark,5);
            }
            $scope.ConertStatusName = function (v) {
                var result = "";
                if (v == true)
                {
                    result = "已发布";
                }
                else
                {
                    result = "未发布";
                }
                return result;
            }

            $scope.ConertVerifyStateName = function (v) {
                var result = "";
                if (v == true) {
                    result = "已验证";
                }
                else {
                    result = "未验证";
                }
                return result;
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