/**
 * Created by mac on 16/6/17.
 */

'use strict';

angular.module('app')
 
    .controller('createCourseCategoryCtl', function ($http, $scope, enume, $state, $stateParams) {
        $scope.ID = "";
        $scope.Name = "";
        $scope.Intro = "";
        $scope.Sort = "";
        $scope.CreateBy = "";
        $scope.CreateTime = "";
        $scope.ModifyBy = "";
        $scope.ModifyTime = "";
    
        function getInfoByCode(){
            var id = $stateParams.entity.item.ID;            
            enume.getData(srvDomain + "/CourseCategory/Update?ID=" + id, function (item) {
                $scope.ID = item.ID;
                $scope.Name = item.Name;
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
            $scope.t_title = "修改课程分类";
            getInfoByCode();
            $scope.showButton = true;
            $scope.showImg = true;

        }
        else if($stateParams.entity.tag == "detail"){
            $scope.t_title = "课程分类详情";
            getInfoByCode();
            $scope.showButton = false;
        }
        else{
            $scope.t_title = "添加课程分类";
            $scope.showButton = true;
        }

        $scope.createCourseCategory = function () {

            var tmp = {
                Name: $scope.Name,
                Intro: $scope.Intro,
                Sort: $scope.Sort               
            };


            var url = "";
            if($stateParams.entity.tag == "edit"){
                var id = $stateParams.entity.item.ID;                
                url = srvDomain + "/CourseCategory/Update";
                tmp.id = id;
            }else{
                url = srvDomain + "/CourseCategory/Add";
            }          
            enume.postData(url,tmp,function(d){
                $state.go("roomManage.courseCategoryList");
            })
        }
    })

    .controller('courseCategoryListCtl', function ($http, $scope, enume, $state) { })





