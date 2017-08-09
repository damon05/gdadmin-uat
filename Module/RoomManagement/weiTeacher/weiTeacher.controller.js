/**
 * Created by mac on 16/6/17.
 */

'use strict';

angular.module('app')
 
    .controller('createWeiTeacherCtl', function ($http, $scope, enume, $state, $stateParams) {
        $scope.ID = "";
        $scope.Name = "";
        $scope.Intro = "";
        $scope.Province = "";
        $scope.City = "";
        $scope.County = "";
        $scope.Address = "";
        $scope.Tel = "";
        $scope.ImageURL = "";
        $scope.Avatar = "";
        $scope.CreateBy = "";
        $scope.CreateTime = "";
        $scope.ModifyBy = "";
        $scope.ModifyTime = "";
        $scope.r1 = "";
        $scope.r2 = "";

        //jsCoreMethod.fileUploadByFormAjax("btnUploadImg", function (d, f) {
        //    enume.postData(srvDomain + "/Common/Upload", f, function (data) {
        //        $scope.ImageURL = "/file" + data;
        //        $scope.r1 = "上传成功";
        //    })
        //}, "image");
        jsCoreMethod.fileUploadByFormAjax_wx("btnUploadImg", "images",function (d) {
            $scope.ImageURL =  d;
            $scope.r1 = "上传成功";
            $scope.$apply();
        }, 500)
        jsCoreMethod.fileUploadByFormAjax_wx("btnUploadAvatar", "images", function (d) {
            $scope.Avatar = d;
            $scope.r2 = "上传成功";
            $scope.$apply();
        }, 100)
        function getInfoByCode(){
            var id = $stateParams.entity.item.ID;            
            enume.getData(srvDomain + "/WeiTeacher/Update?ID=" + id, function (item) {
                $scope.ID = item.ID;
                $scope.Name = item.Name;
                $scope.Intro = item.Intro;
                $scope.Tel = item.Tel;
                $scope.Province = item.Province;
                $scope.City = item.City;
                $scope.County = item.County;
                $scope.Address = item.Address;   
                $scope.ImageURL = item.ImageURL;
                $scope.Avatar = item.Avatar;
                $scope.CreateBy = item.CreateBy;
                $scope.CreateTime = item.CreateTime;
                $scope.ModifyBy = item.ModifyBy;
                $scope.ModifyTime = item.ModifyTime;
            })
        }

        $scope.showButton = true;
        if($stateParams.entity.tag == "edit"){
            $scope.t_title = "修改教师";
            getInfoByCode();
            $scope.showButton = true;
            $scope.showImg = true;

        }
        else if($stateParams.entity.tag == "detail"){
            $scope.t_title = "教师详情";
            getInfoByCode();
            $scope.showButton = false;
        }
        else{
            $scope.t_title = "添加教师";
            $scope.showButton = true;
        }

        $scope.createWeiTeacher = function () {

            var tmp = {
                Name: $scope.Name,
                Intro: $scope.Intro,
                Tel: $scope.Tel,
                Province: $scope.Province,
                City: $scope.City,
                County: $scope.County,
                Address: $scope.Address,
                ImageURL: $scope.ImageURL,
                Avatar: $scope.Avatar
            };


            var url = "";
            if($stateParams.entity.tag == "edit"){
                var id = $stateParams.entity.item.ID;                
                url = srvDomain + "/WeiTeacher/Update";
                tmp.id = id;
            }else{
                url = srvDomain + "/WeiTeacher/Add";
            }          
            enume.postData(url,tmp,function(d){
                $state.go("roomManage.weiTeacherList");
            })
        }
    })

    .controller('weiTeacherListCtl', function ($http, $scope, enume, $state) { })





