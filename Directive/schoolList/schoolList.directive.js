/**
 * Created by wupeng5 on 2016/3/5.
 */


angular.module("app").directive("schoolList",function(){
    return {
        templateUrl:"./Directive/schoolList/schoolList.html?v=1300",
        restrict:"EA",
        scope:{
            "chooseCallback":"=",
            "showAddBtn":"=",
            "showCk":"="
        },
        link:function(){},
        controller:function($scope,$http,$rootScope,$state,enume){

            $scope.schoolName = "";
            $scope.schoolLevel = "";
            $scope.wxCourseLevel = enume.wxCourseLevel;

            $scope.schoolList = [];

            $scope.searchSchool = function () {
                $scope.$broadcast("searchByFilter");
            }

            $scope.createSchool = function () {
                $scope.showButton = true;
                $state.go("roomManage.createSchool", { entity: { tag: "add" } });
            }

            $scope.getUrl = function(){
                return srvDomain+"/School/Index?schoolName=" + $scope.schoolName + "&schoolLevel=" + $scope.schoolLevel;
            }

            $scope.directiveCallBack = function(valueFromDirective){
                $scope.roomList = valueFromDirective;
            }

            $scope.editSchool = function (item) {
                $scope.showButton = true;
                $state.go("roomManage.createSchool", { entity: { tag: "edit", item: item } });
            }


            $scope.goDetail = function (item) {
                $scope.showButton = false;
                $state.go("roomManage.createSchool", { entity: { tag: "detail", item: item } });
            }

            $scope.getRemark = function(item){
                return jsCoreMethod.cutString(item.remark,5);
            }

            $scope.$on("getCkClass",function(e,d){
                var d = $scope.schoolList;
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