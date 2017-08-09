/**
 * Created by wupeng5 on 2016/3/5.
 */


angular.module("app").directive("memberList",function(){
    return {
        templateUrl: "./Directive/memberList/memberList.html?v=1302",
        restrict:"EA",
        scope:{
            "chooseCallback":"=",
            "showAddBtn":"=",
            "showCk":"="
        },
        link:function(){},
        controller:function($scope,$http,$rootScope,$state,enume){

            $scope.StudentNo = "";
            $scope.Mobile = "";
            $scope.StudentName = "";
            $scope.Identity = -1;
            $scope.wxStatus = enume.wxStatus;
            $scope.wxSchool = enume.wxSchool;
            $scope.List = [];

            $scope.search = function () {
                $scope.$broadcast("searchByFilter");
            }

            $scope.create = function (item) {
                $scope.showButton = true;
                $state.go("roomManage.createMember", { entity: { tag: "add",member:item } });
            }

            $scope.getUrl = function(){
                return srvDomain + "/Member/Index?studentNo=" + $scope.StudentNo + "&mobile=" + $scope.Mobile + "&name=" + $scope.StudentName + "&identity=" + $scope.Identity;
            }

            $scope.directiveCallBack = function(valueFromDirective){
                $scope.List = valueFromDirective;
            }

 

            $scope.goDetail = function (item) {
                $scope.showButton = false;
                $state.go("roomManage.createMember", { entity: { tag: "detail", item: item } });
            }

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