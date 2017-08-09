/**
 * Created by wupeng5 on 2016/3/5.
 */


angular.module("app").directive("accountMenuList",function(){
    return {
        templateUrl:"./Directive/accountMenuList/accountMenuList.html?v=1235",
        restrict:"EA",
        scope:{
            "chooseCallback":"=",
            "showAddBtn":"=",
            "showCk":"="
        },
        link:function(){},
        controller: function ($scope, $http, $rootScope, $state, $stateParams, enume, ngDialog) {

            //$scope.AccountID = "";

            if ($stateParams.entity.tag == "editMenu") {
                $scope.AccountID = $stateParams.entity.accountID;
                enume.getData(srvDomain + "/OfficalAccount/Update?ID=" + $scope.AccountID, function (item) {                   
                    $scope.OfficalName = item.OfficalName;
                    $scope.OfficalCode = item.OfficalCode;                 
                })

            }
            
            $scope.List = [];
            $scope.Listchild1 = [];
            $scope.Listchild2 = [];
            $scope.Listchild3 = [];

            var url = srvDomain + "/AccountMenu/Index?accountID=" + $scope.AccountID + "&parentID=0&pageIndex=1&pageSize=10000&ran=" + Math.random();
            enume.getData(url, function (tmp) {
                if (!tmp.datas) {
                    return;
                }
                tmp = tmp.datas;
                for (var i = 0; i < tmp.length; i++) {                                     
                    $scope.List.push({ ID: tmp[i].ID, OfficalAccountID: tmp[i].OfficalAccountID, ParentID: tmp[i].ParentID, Name: tmp[i].Name, Sort: tmp[i].Sort, URL: tmp[i].URL, ModifyTime: tmp[i].ModifyTime, ModifyBy: tmp[i].ModifyBy, ChildItems: tmp[i].ChildItems });
                }              
            })

        

            $scope.create = function () {
                $scope.showButton = true;
                $state.go("roomManage.createAccountMenu", { entity: { tag: "add", OfficeAccountID: $scope.AccountID } });
            }

            $scope.getUrl = function(){
                return srvDomain + "/AccountMenu/Index?accountID=" + $scope.AccountID;
            }

            $scope.directiveCallBack = function(valueFromDirective){
                $scope.List = valueFromDirective;
            }

            //$scope.edit = function (item) {
            //    $scope.showButton = true;
            //    $state.go("roomManage.createAccountMenu", { entity: { tag: "edit", item: item } });
            //}

            $scope.edit = function (item) {
                $scope.tag = "edit";
                $scope.popTitle = "修改菜单项";
                $scope.selectedItem = item;
                ngDialog.open({
                    template: 'menuItemEditTmpl',
                    className: 'ngdialog-theme-default ngdialog-theme-dadao',
                    scope: $scope,
                    controller: function ($scope) {
                        $scope.save = function () {
                            $scope.saveMenuItem($scope.selectedItem);
                            $scope.closeThisDialog(); //关闭弹窗
                        }
                    }
                });
            };


            $scope.saveMenuItem = function (item) {
                var id = item.ID;
                var tmp = {
                    ID:item.ID,
                    Name: item.Name,
                    URL: item.URL
                };

                var url = "";
                url = srvDomain + "/AccountMenu/Update";              
                enume.postData(url, tmp, function (d) {                    
                })
            }


            $scope.publish = function () {
                var id = $scope.AccountID
                var tmp = {
                    id: id
                };

                var url = "";
                url = srvDomain + "/OfficalAccount/PublishMenu";
                enume.postData(url, tmp, function (d) {
                    alert("发布菜单成功！");
                })
            }

            $scope.goDetail = function (item) {
                $scope.showButton = false;
                $state.go("roomManage.createAccountMenu", { entity: { tag: "detail", item: item } });
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