/**
 * Created by mac on 16/6/17.
 */

'use strict';

angular.module('app')
 
    .controller('createNotificationCtl', function ($http, $scope, enume, $state, $stateParams) {
        $scope.ID = "";        
        $scope.Title = "";
        $scope.Aurthor = "";
        $scope.Logo = "";
        $scope.Content = "";
        

    
        function getInfoByCode(){
            var id = $stateParams.entity.item.ID;            
            enume.getData(srvDomain + "/Notification/Update?ID=" + id, function (item) {
                $scope.ID = item.ID;                
                $scope.Title = item.Title;
                $scope.Aurthor = item.Aurthor;
                $scope.Logo = item.Logo;
                $scope.Content = item.Content;
                $scope.Status = item.Status;
                $scope.PublishTime = item.PublishTime;
                $scope.CreateBy = item.CreateBy;
                $scope.CreateTime = item.CreateTime;
                $scope.ModifyBy = item.ModifyBy;
                $scope.ModifyTime = item.ModifyTime;

            })
        }

        jsCoreMethod.fileUploadByFormAjax_wx("btnUploadLogo", "images", function (d) {
            $scope.Logo = d;
            $scope.r1 = "上传成功";
            $scope.$apply();
        }, 500)

        $scope.showButton = true;
        if($stateParams.entity.tag == "edit"){
            $scope.t_title = "修改通知";
            getInfoByCode();
            $scope.showButton = true;
            $scope.showImg = true;

        }
        else if($stateParams.entity.tag == "detail"){
            $scope.t_title = "通知详情";
            getInfoByCode();
            $scope.showButton = false;
            $scope.showImg = true;
        }
        else{
            $scope.t_title = "添加通知";
            $scope.showButton = true;
        }

        $scope.createNotification = function () {

            var tmp = {                
                Title:$scope.Title,
                Aurthor:$scope.Aurthor,
                Logo:$scope.Logo,
                Content: $scope.Content
            };

            //var e = jsCoreMethod.validateEmail($scope.email,"请输入正常的的邮箱!");
            //if(e.bl == false){
            //    alert(e.msg);
            //    return;
            //}

            //if($scope.key != "" && $scope.key.length != 8){
            //    alert("加密密匙必须为8为数字字符或者符号组成!");
            //    return;
            //}

            var url = "";
            if($stateParams.entity.tag == "edit"){
                var id = $stateParams.entity.item.ID;                
                url = srvDomain + "/Notification/Update";
                tmp.id = id;
            }else{
                url = srvDomain + "/Notification/Add";
            }          
            enume.postData(url,tmp,function(d){
                $state.go("roomManage.notificationList");
            })
        }
    })

    .controller('notificationListCtl', function ($http, $scope, enume, $state) { })





