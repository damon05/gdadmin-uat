/**
 * Created by mac on 16/6/17.
 */

'use strict';

angular.module('app')
 
    .controller('createOfficalAccountCtl', function ($http, $scope, enume, $state, $stateParams) {
        $scope.ID = "";
        $scope.OfficalName = "";
        $scope.OfficalCode = "";
        $scope.AppID = "";
        $scope.AppSecret = "";
        $scope.Category = "";
        $scope.State = "";
        $scope.VerifyState = "";
        $scope.AccountType = "";
        $scope.AccessToken = "";
        $scope.Remark = "";
        $scope.CreateBy = "";
        $scope.CreateTime = "";
        $scope.ModifyBy = "";
        $scope.ModifyTime = "";
        $scope.AccountCategoryList = enume.wxAccountCategory;
        $scope.AccountTypeList = enume.wxAccountType;
        $scope.StateList = enume.wxStatus;
        $scope._src = "http://admin.zhongguoanquanjiaoyu.com/cmsapi/ruzhuschool/detail";
    
        function getInfoByCode(){
            var id = $stateParams.entity.item.ID;            
            enume.getData(srvDomain + "/OfficalAccount/Update?ID=" + id, function (item) {
                $scope.ID = item.ID;
                $scope.OfficalName = item.OfficalName;
                $scope.OfficalCode = item.OfficalCode;
                $scope.AppID = item.AppID;
                $scope.AppSecret = item.AppSecret;
                $scope.Category = item.Category;
                $scope.State = item.State;
                $scope.VerifyState = item.VerifyState;
                $scope.AccountType = item.AccountType;
                $scope.AccessToken = item.AccessToken;
                $scope.Remark = item.Remark;
                $scope.CreateBy = item.CreateBy;
                $scope.CreateTime = item.CreateTime;
                $scope.ModifyBy = item.ModifyBy;
                $scope.ModifyTime = item.ModifyTime;
            })
        }

        $scope.showButton = true;
        if($stateParams.entity.tag == "edit"){
            $scope.t_title = "修改公众账号";
            getInfoByCode();
            $scope.showButton = true;
            $scope.showImg = true;

        }
        else if($stateParams.entity.tag == "detail"){
            $scope.t_title = "公众账号详情";
            getInfoByCode();
            $scope.showButton = false;
        }
        else{
            $scope.t_title = "添加公众账号";
            $scope.showButton = true;
        }

        $scope.createOfficalAccount = function () {

            var tmp = {
                OfficalName : $scope.OfficalName,
                OfficalCode : $scope.OfficalCode,
                AppID : $scope.AppID,
                AppSecret : $scope.AppSecret,
                Category : $scope.Category,
                State : $scope.State,
                VerifyState : $scope.VerifyState,
                AccountType : $scope.AccountType,
                Remark: $scope.Remark
            };


            var url = "";
            if($stateParams.entity.tag == "edit"){
                var id = $stateParams.entity.item.ID;                
                url = srvDomain + "/OfficalAccount/Update";
                tmp.id = id;
            }else{
                url = srvDomain + "/OfficalAccount/Add";
            }          
            enume.postData(url,tmp,function(d){
                $state.go("roomManage.officalAccountList");
            })
        }
    })

    .controller('officalAccountListCtl', function ($http, $scope, enume, $state) { })





