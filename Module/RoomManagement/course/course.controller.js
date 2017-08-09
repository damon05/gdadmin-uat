/**
 * Created by mac on 16/6/17.
 */

'use strict';

angular.module('app')
 
    .controller('createCourseCtl', function ($http, $scope, enume, $state, $stateParams) {       
        $scope.ID = "";
        $scope.CourseName = "";
        $scope.CategoryID = "";
        $scope.TeacherID = "";
        $scope.Intro = "";
        $scope.Content = "";
        $scope.Scope = "0";
        $scope.Image = "";
        $scope.ResURL = "";
        $scope.Status = "";
        $scope.Restype = 0;
        $scope.PublishTime = "";
        $scope.StopTime = "";
        $scope.CreateBy = "";
        $scope.CreateTime = "";
        $scope.ModifyBy = "";
        $scope.ModifyTime = "";
        //$scope.gradeSelected = [];
        $scope.levelSelected = [];
        $scope.labelSelected = [];
        //$scope.schoolSelected = [];
        $scope.wxCourseCategory = enume.wxCourseCategory;
        $scope.wxCourseLevel = enume.wxCourseLevel;
        //$scope.gradeList = enume.NIANJI;
        //$scope.wxSchool = enume.wxSchool;
        $scope.wxCourseLabel = enume.wxCourseLabel;
        $scope.wxWeiTeacher = enume.wxWeiTeacher;
        $scope.wxStatus = enume.wxStatus;
        $scope.wxQuestionResType=enume.wxQuestionResType;
        $scope.statusID = -1;
        $scope.showImg = false;

        $scope.data = {
            current: "1" // 1代表课程信息，2代表课程评论信息，3代表听课会员
        };

        $scope.actions =
            {
                setCurrent: function (param) {
                    $scope.data.current = param;
                }
            }
    
        function getInfoByCode(){
            var id = $stateParams.entity.item.ID;            
            enume.getData(srvDomain + "/Course/Update?ID=" + id, function (item) {
                $scope.ID = item.ID;
                $scope.CourseName = item.CourseName;
                $scope.CategoryID = item.CategoryID;
                $scope.TeacherID = item.TeacherID;
                $scope.Intro = item.Intro;
                $scope.Content = item.Content;
                $scope.Scope = item.Scope;
                $scope.Image = item.Image;
                $scope.ResURL = item.ResURL;
                $scope.Status = item.Status;
                $scope.Restype = item.Restype;
                $scope.PublishTime = item.PublishTime;
                $scope.StopTime = item.StopTime;
                $scope.CreateBy = item.CreateBy;
                $scope.CreateTime = item.CreateTime;
                $scope.ModifyBy = item.ModifyBy;
                $scope.ModifyTime = item.ModifyTime;
                //$scope.gradeSelected = item.selectGrade.split(",");
                $scope.levelSelected = item.selectLevel.split(",");
                $scope.labelSelected = item.selectLabel.split(",");
                //$scope.schoolSelected = item.selectSchool.split(",");
            })
        }

        jsCoreMethod.fileUploadByFormAjax_wx("btnUploadImg", "images", function (d) {
            $scope.ResURL = d;
            $scope.r1 = "上传成功";
            $scope.$apply();
        }, 1000)

        jsCoreMethod.fileUploadByFormAjax_wx("btnUploadThumbnail", "images", function (d) {
            $scope.Image = d;
            $scope.r2 = "上传成功";
            $scope.$apply();
        }, 500)
        $scope.showButton = true;
        if($stateParams.entity.tag == "edit"){
            $scope.t_title = "修改课程";
            getInfoByCode();
            $scope.showButton = true;
            $scope.showImg = true;

        }
        else if($stateParams.entity.tag == "detail"){
            $scope.t_title = "课程详情";
            getInfoByCode();
            $scope.showButton = false;
            $scope.showImg = true;
        }
        else{
            $scope.t_title = "添加课程";
            $scope.showButton = true;
        }

        $scope.createCourse = function () {

            var levelstr = "";
            if ($scope.levelSelected.length > 0) {
                levelstr = $scope.levelSelected.join();
            }
            else {
                alert("请选择课程级别!");
                return;
            }
            //var gradestr = "";
            //if ($scope.gradeSelected.length > 0) {
            //    gradestr = $scope.gradeSelected.join();
            //}
            //else {
            //    alert("请选择针对年级!");
            //    return;
            //}
            var labelstr = "";
            if ($scope.labelSelected.length > 0) {
                labelstr = $scope.labelSelected.join();
            }
            else {
                alert("请选择课程标签!");
                return;
            }
            //var schoolstr = "";
            //if ($scope.schoolSelected.length > 0) {
            //    schoolstr = $scope.schoolSelected.join();
            //}
            //else {
            //    if ($scope.Scope == "1") {
            //        alert("请选择学校!");
            //        return;
            //    }
            //}
            var tmp = {
                CourseName: $scope.CourseName,
                CategoryID: $scope.CategoryID ,
                TeacherID: $scope.TeacherID,
                Intro: $scope.Intro,
                Content: $scope.Content,
                Scope: $scope.Scope,
                Image: $scope.Image ,
                ResURL: $scope.ResURL ,
                Status: $scope.Status ,
                Restype: $scope.Restype,
                selectLevel: levelstr,
                //selectGrade: gradestr,
                selectLabel: labelstr,
                //selectSchool:schoolstr
            };


            var url = "";
            if($stateParams.entity.tag == "edit"){
                var id = $stateParams.entity.item.ID;                
                url = srvDomain + "/Course/Update";
                tmp.id = id;
            }else{
                url = srvDomain + "/Course/Add";
            }          
            enume.postData(url,tmp,function(d){
                $state.go("roomManage.courseList");
            })
        }

        var updateSelected = function (vtarget, action, id, name) {
            switch (vtarget) {
                case "level":
                    if (action == 'add' && $scope.levelSelected.indexOf(id) == -1) {
                        $scope.levelSelected.push(id);
                    }
                    if (action == 'remove' && $scope.levelSelected.indexOf(id) != -1) {
                        var idx = $scope.levelSelected.indexOf(id);
                        $scope.levelSelected.splice(idx, 1);
                    }
                    break;
                //case "grade":
                //    if (action == 'add' && $scope.gradeSelected.indexOf(id) == -1) {
                //        $scope.gradeSelected.push(id);
                //    }
                //    if (action == 'remove' && $scope.gradeSelected.indexOf(id) != -1) {
                //        var idx = $scope.gradeSelected.indexOf(id);
                //        $scope.gradeSelected.splice(idx, 1);
                //    }
                //    break;
                case "label":
                    if (action == 'add' && $scope.labelSelected.indexOf(id) == -1) {
                        $scope.labelSelected.push(id);
                    }
                    if (action == 'remove' && $scope.labelSelected.indexOf(id) != -1) {
                        var idx = $scope.labelSelected.indexOf(id);
                        $scope.labelSelected.splice(idx, 1);
                    }
                    break;
                //case "school":
                //    if (action == 'add' && $scope.schoolSelected.indexOf(id) == -1) {
                //        $scope.schoolSelected.push(id);
                //    }
                //    if (action == 'remove' && $scope.schoolSelected.indexOf(id) != -1) {
                //        var idx = $scope.schoolSelected.indexOf(id);
                //        $scope.schoolSelected.splice(idx, 1);
                //    }
                //    break;                
                default:                    
                    break;
            }           
        }

        $scope.updateSelection = function (vtarget,$event, id) {
            var checkbox = $event.target;
            var action = (checkbox.checked?'add':'remove');
            updateSelected(vtarget,action, id, checkbox.name);
        }

        $scope.isSelected = function (vtarget, id) {
            var isSelected = false;
            switch (vtarget) {
                case "level":
                    isSelected = $scope.levelSelected.indexOf(id) >= 0;
                    break;
                //case "grade":
                //    isSelected = $scope.gradeSelected.indexOf(id) >= 0;
                //    break;
                case "label":
                    isSelected = $scope.labelSelected.indexOf(id) >= 0;
                    break;
                //case "school":
                //    isSelected = $scope.schoolSelected.indexOf(id) >= 0;
                //    break;
                default:
                    break;
            }
            return isSelected;
        }
    })

    .controller('courseListCtl', function ($http, $scope, enume, $state) { })





