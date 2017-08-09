/**
 * Created by mac on 16/6/17.
 */

'use strict';

angular.module('app')
 
    .controller('createCourseLabelCtl', function ($http, $scope, enume, $state, $stateParams) {
        $scope.ID = "";
        $scope.LabelName = "";
        $scope.Intro = "";
        $scope.Sort = "";
        $scope.CreateBy = "";
        $scope.CreateTime = "";
        $scope.ModifyBy = "";
        $scope.ModifyTime = "";
    
        function getInfoByCode(){
            var id = $stateParams.entity.item.ID;            
            enume.getData(srvDomain + "/CourseLabel/Update?ID=" + id, function (item) {
                $scope.ID = item.ID;
                $scope.LabelName = item.LabelName;
                $scope.Intro = item.Intro;
                $scope.Sort = item.Sort;
                $scope.CreateBy = item.CreateBy;
                $scope.CreateTime = item.CreateTime;
                $scope.ModifyBy = item.ModifyBy;
                $scope.ModifyTime = item.ModifyTime;
            })
        }

        $scope.showButton = true;
        if($stateParams.entity.tag == "edit"){
            $scope.t_title = "修改课程标签";
            getInfoByCode();
            $scope.showButton = true;
            $scope.showImg = true;

        }
        else if($stateParams.entity.tag == "detail"){
            $scope.t_title = "课程标签详情";
            getInfoByCode();
            $scope.showButton = false;
        }
        else{
            $scope.t_title = "添加课程标签";
            $scope.showButton = true;
        }

        $scope.createCourseLabel = function () {

            var tmp = {
                LabelName: $scope.LabelName,
                Intro: $scope.Intro,
                Sort: $scope.Sort               
            };


            var url = "";
            if($stateParams.entity.tag == "edit"){
                var id = $stateParams.entity.item.ID;                
                url = srvDomain + "/CourseLabel/Update";
                tmp.id = id;
            }else{
                url = srvDomain + "/CourseLabel/Add";
            }          
            enume.postData(url,tmp,function(d){
                $state.go("roomManage.courseLabelList");
            })
        }
    })

    .controller('courseLabelListCtl', function ($http, $scope, enume, $state) { })





