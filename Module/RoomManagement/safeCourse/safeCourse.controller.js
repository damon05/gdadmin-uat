/**
 * Created by mac on 16/6/17.
 */

'use strict';

angular.module('app')
 
    .controller('createSafeCourseCtl', function ($http, $scope, enume, $state, $stateParams) {       
        $scope.ID = "";
        $scope.CourseName = "";
        $scope.CategoryID = "";    
        $scope.Content = "";
        $scope.Scope = "";
        $scope.Image = "";
        $scope.Status = "";
        $scope.ContentType = "";
        $scope.PublishTime = "";
        $scope.StopTime = "";
        $scope.CreateBy = "";
        $scope.CreateTime = "";
        $scope.ModifyBy = "";
        $scope.ModifyTime = "";
        $scope.schoolSelected = [];
        $scope.wxSafeCategory = enume.wxSafeCategory;
        //$scope.wxSchool = enume.wxSchool;
        $scope.wxStatus = enume.wxStatus;
        $scope.statusID=-1;
        $scope.showImg = false;

        function getInfoByCode(){
            var id = $stateParams.entity.item.ID;            
            enume.getData(srvDomain + "/SafeCourse/Update?ID=" + id, function (item) {
                $scope.ID = item.ID;
                $scope.CourseName = item.CourseName;
                $scope.CategoryID = item.CategoryID;
                $scope.Content = item.Content;
                //$scope.Scope = item.Scope;
                $scope.Image = item.Image;         
                $scope.Status = item.Status;
                $scope.ContentType = item.ContentType;
                $scope.PublishTime = item.PublishTime;
                $scope.StopTime = item.StopTime;
                $scope.CreateBy = item.CreateBy;
                $scope.CreateTime = item.CreateTime;
                $scope.ModifyBy = item.ModifyBy;
                $scope.ModifyTime = item.ModifyTime;
            })
        }

        jsCoreMethod.fileUploadByFormAjax_wx("btnUploadImg", "images", function (d) {
            $scope.Image = d;
            $scope.r1 = "上传成功";
            $scope.$apply();
        }, 500)

        $scope.showButton = true;
        if($stateParams.entity.tag == "edit"){
            $scope.t_title = "修改安全课程";
            getInfoByCode();
            $scope.showButton = true;
            $scope.showImg = true;

        }
        else if($stateParams.entity.tag == "detail"){
            $scope.t_title = "安全课程详情";
            getInfoByCode();
            $scope.showButton = false;
            $scope.showImg = true;
        }
        else{
            $scope.t_title = "添加安全课程";
            $scope.showButton = true;
        }

        $scope.createSafeCourse = function () {

            var schoolstr = "";
            if ($scope.schoolSelected.length > 0) {
                schoolstr = $scope.schoolSelected.join();
            }
            else {
                if ($scope.Scope == "1") {
                    alert("请选择学校!");
                    return;
                }
            }

            var tmp = {
                CourseName: $scope.CourseName,
                CategoryID: $scope.CategoryID ,  
                Intro: $scope.Intro,
                Content: $scope.Content,
                //Scope: $scope.Scope,
                Image: $scope.Image ,
                Status: $scope.Status ,
                ContentType: $scope.ContentType,
                selectSchool: schoolstr
            };


            var url = "";
            if($stateParams.entity.tag == "edit"){
                var id = $stateParams.entity.item.ID;                
                url = srvDomain + "/SafeCourse/Update";
                tmp.id = id;
            }else{
                url = srvDomain + "/SafeCourse/Add";
            }          
            enume.postData(url,tmp,function(d){
                $state.go("roomManage.safeCourseList");
            })
        }

        var updateSelected = function(action,id,name){
            if(action == 'add' && $scope.schoolSelected.indexOf(id) == -1){
                $scope.schoolSelected.push(id);
            }
            if(action == 'remove' && $scope.schoolSelected.indexOf(id)!=-1){
                var idx = $scope.schoolSelected.indexOf(id);
                $scope.schoolSelected.splice(idx,1);
            }
        }

        $scope.updateSelection = function($event, id){
            var checkbox = $event.target;
            var action = (checkbox.checked?'add':'remove');
            updateSelected(action,id,checkbox.name);
        }

        $scope.isSelected = function (id) {
            return $scope.schoolSelected.indexOf(id) >= 0;
        }
    })

    .controller('safeCourseListCtl', function ($http, $scope, enume, $state) { })





