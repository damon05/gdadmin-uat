/**
 * Created by mac on 16/6/17.
 */

'use strict';

angular.module('app')
 
    .controller('createAccountMenuCtl', function ($http, $scope, enume, $state, $stateParams) {
        $scope.ID = "";
        $scope.OfficalAccountID = "";
        $scope.ParentID = "";
        $scope.Name = "";
        $scope.URL = "";
        $scope.Sort = "";
        $scope.CreateBy = "";
        $scope.CreateTime = "";
        $scope.ModifyBy = "";
        $scope.ModifyTime = "";
    
        function getInfoByCode(){
            var id = $stateParams.entity.item.ID;            
            enume.getData(srvDomain + "/AccountMenu/Update?id=" + id, function (item) {
                $scope.ID = item.ID;
                $scope.OfficalAccountID = item.OfficalAccountID;
                $scope.ParentID = item.ParentID;
                $scope.Name = item.Name;
                $scope.URL = item.URL;              
            })
        }

        if ($stateParams.entity.tag == "edit")     
        {
            getInfoByCode();
            $scope.showButton = true;
            $scope.showImg = true;

        }

        $scope.createAccountMenu = function () {

            var tmp = {
                Name: $scope.Name,
                URL: $scope.URL              
            };


            var url = "";
            if($stateParams.entity.tag == "edit"){
                var id = $stateParams.entity.item.ID;                
                url = srvDomain + "/AccountMenu/Update";
                tmp.id = id;
            }else{
                url = srvDomain + "/AccountMenu/Add";
            }

            enume.postData(url,tmp,function(d){               
                $state.go("roomManage.accountMenuList", { entity: { tag: "editMenu", accountID: $scope.OfficalAccountID } });
            })
        }
    })

    .controller('accountMenuListCtl', function ($http, $scope, enume, $state, $stateParams) { })





