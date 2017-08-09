/**
 * Created by wupeng5 on 2016/3/5.
 */


angular.module("app").directive("courseCategoryList",function(){
    return {
        templateUrl:"./Directive/courseCategoryList/courseCategoryList.html",
        restrict:"EA",
        scope:{
            "chooseCallback":"=",
            "showAddBtn":"=",
            "showCk":"="
        },
        link:function(){},
        controller:function($scope,$http,$rootScope,$state,enume){

            $scope.Name = "";
            
            $scope.List = [];

            $scope.search = function () {
                $scope.$broadcast("searchByFilter");
            }

            $scope.create = function () {
                $scope.showButton = true;
                $state.go("roomManage.createCourseCategory", { entity: { tag: "add" } });
            }

            $scope.getUrl = function(){
                return srvDomain + "/CourseCategory/Index?categoryName=" + $scope.Name;
            }

            $scope.directiveCallBack = function(valueFromDirective){
                $scope.List = valueFromDirective;
            }

            $scope.edit = function (item) {
                $scope.showButton = true;
                $state.go("roomManage.createCourseCategory", { entity: { tag: "edit", item: item } });
            }


            $scope.goDetail = function (item) {
                $scope.showButton = false;
                $state.go("roomManage.createCourseCategory", { entity: { tag: "detail", item: item } });
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