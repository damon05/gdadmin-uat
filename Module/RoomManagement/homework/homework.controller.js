'use strict';

angular.module('app')
    .controller('createHomeworkCtrl', function ($http, $scope, enume, $state, $stateParams) {
        $scope.ID = "";        
        $scope.Title = "";
        $scope.CourseTitle = "";
        $scope.showQuestion = false;
        $scope.teachingCode = $stateParams.entity.teachingCode;
        $scope.SchoolID = $stateParams.entity.schoolID;;
        $scope.homeworkID = $stateParams.entity.homeworkID;
        $scope.homeworkType = $stateParams.entity.homeworkType;
        $scope.Type = $stateParams.entity.Type;
        $scope.KCBH = $stateParams.entity.KCBH;
        $scope.wxHomeworkScoreRule = enume.wxHomeworkScoreRule;
        $scope.TypeName = "";
        $scope.wxExamCategory = enume.wxExamCategory;
        $scope.CategoryID = "";

        if ($scope.Type == "0") {
            $scope.TypeName = "考卷";
        }
        else {
            $scope.TypeName = "问卷";
        }

        $scope.data = {
            current: "1" // 1代表考卷基本信息，2代表考卷完成信息
        };

        $scope.actions =
            {
                setCurrent: function (param) {
                    $scope.data.current = param;
                }
            }

        function getInfoByCode() {
            var id = $stateParams.entity.homeworkID;
            enume.getData(srvDomain + "/Homework/Update?ID=" + id, function (item) {
                $scope.ID = item.ID;
                $scope.SchoolID = item.SchoolID;
                $scope.teachingCode = item.TeachingCode;
                $scope.KCBH = item.CourseCode;
                $scope.homeworkType = item.HomeworkType;
                $scope.Title = item.Title;
                if (item.FinishTime != null && item.FinishTime != "") {
                    $scope.FinishTime = new Date(Date.parse(item.FinishTime.replace(/-/g, "/")));
                }
                $scope.CreateBy = item.CreateBy;
                $scope.CreateTime = item.CreateTime;
                $scope.ModifyBy = item.ModifyBy;
                $scope.ModifyTime = item.ModifyTime;
                $scope.CategoryID = item.CategoryID;
            })
        }

        $scope.showButton = true;
        if ($stateParams.entity.tag == "edit") {
            $scope.t_title = "修改" + $scope.TypeName;
            getInfoByCode();
            $scope.showButton = true;
        }
        else if ($stateParams.entity.tag == "detail") {
            $scope.t_title =  $scope.TypeName+"详情";
            getInfoByCode();
            $scope.showButton = false;           
        }
        else if ($stateParams.entity.tag == "addQuestion") {
            $scope.t_title = "修改" + $scope.TypeName;
            getInfoByCode();
            $scope.showButton = true;
            $scope.showQuestion = true;
        }
        else if ($stateParams.entity.tag == "detailQuestion") {
            $scope.t_title = "修改" + $scope.TypeName;
            getInfoByCode();
            $scope.showButton = false;
            $scope.showQuestion = true;
        }
        else {
            $scope.t_title = "添加" + $scope.TypeName;
            $scope.showButton = true;
        }

        $scope.gotoStepTwo = function () {
            // $state.go("roomManage.homeworkCreate", { entity: { tag: "edit", homeworkID: item.ID, Type: $scope.Type } });
            if ($scope.ID == "") {
                alert("请先保存考卷基本信息！");
            }
            else {
                $scope.showQuestion = true;
            }
        }

        $scope.gotoStepOne = function () {
            // $state.go("roomManage.homeworkCreate", { entity: { tag: "edit", homeworkID: item.ID, Type: $scope.Type } });
            $scope.showQuestion = false;
        }

        $scope.backToHomeworkList = function () {            
            if ($scope.Type == "0") {
                $state.go("roomManage.homeworkList", { entity: { Type: $scope.Type } });
            }
            else {
                $state.go("roomManage.investigateList", { entity: { Type: $scope.Type } });
            }
        }

        $scope.createHomework = function () {

            var tmp = {
                SchoolID: $scope.SchoolID,
                TeachingCode:$scope.teachingCode,
                Title: $scope.Title,
                Type:$scope.Type,//考卷0 调查问卷1
                HomeworkType: $scope.homeworkType,
                CourseCode: $scope.KCBH,
                FinishTime: $scope.FinishTime,
                Remark: $scope.Remark,
                CategoryID: $scope.CategoryID
            };            

            var url = "";
            if ($stateParams.entity.tag == "edit") {
                var id = $stateParams.entity.homeworkID;
                url = srvDomain + "/Homework/Update";
                tmp.id = id;
            } else {
                url = srvDomain + "/Homework/Add";
            }
            enume.postData(url, tmp, function (d) {
                if ($stateParams.entity.tag == "add") {
                    alert("保存成功！");
                    $state.go("roomManage.homeworkCreate", { entity: { tag: "edit", homeworkID: d, homeworkType: $scope.homeworkType, Type: $scope.Type } });
                }
                else {
                    alert("保存成功！");
                }

            })
        }
    })

    .controller('homeworkListCtrl', function ($http, $scope, enume, $state, $stateParams) {
        $scope.Type = $stateParams.entity.Type;
        
    })

    .controller('investigateListCtrl', function ($http, $scope, enume, $state, $stateParams) {
        $scope.Type = $stateParams.entity.Type;

    })



  

