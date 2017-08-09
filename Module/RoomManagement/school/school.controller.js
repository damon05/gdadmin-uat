/**
 * Created by mac on 16/6/17.
 */

'use strict';

angular.module('app')
 
    .controller('createSchoolCtl', function ($http, $scope, enume, $state, $stateParams) {
        $scope.ID = "";
        $scope.SchoolID = "";
        $scope.SchoolName = "";
        $scope.WebSite = "";
        //$scope.OfficalAccountID = "";
        $scope.Province = "";
        $scope.City = "";
        $scope.County = "";
        $scope.Address = "";
        $scope.Linkman = "";
        $scope.Phone = "";
        $scope.SchoolLevel = "";
        $scope.GradeAmount = "";
        $scope.wxOfficalAccount = enume.wxOfficalAccount;
        $scope.wxCourseLevel = enume.wxCourseLevel;

    
        function getInfoByCode(){
            var id = $stateParams.entity.item.ID;            
            enume.getData(srvDomain + "/School/Update?ID=" + id, function (item) {
                $scope.ID = item.ID;
                $scope.SchoolID = item.SchoolID;
                $scope.SchoolName = item.SchoolName;
                $scope.WebSite = item.WebSite;
                //$scope.OfficalAccountID = item.OfficalAccountID;
                $scope.Province = item.Province;
                $scope.City = item.City;
                $scope.County = item.County;
                $scope.Address = item.Address;
                $scope.Linkman = item.Linkman;
                $scope.Phone = item.Phone;
                $scope.SchoolLevel = item.SchoolLevel;
                $scope.GradeAmount = item.GradeAmount;
            })
        }

        $scope.showButton = true;
        if($stateParams.entity.tag == "edit"){
            $scope.t_title = "修改学校";
            getInfoByCode();
            $scope.showButton = true;
            $scope.showImg = true;

        }
        else if($stateParams.entity.tag == "detail"){
            $scope.t_title = "学校详情";
            getInfoByCode();
            $scope.showButton = false;
        }
        else{
            $scope.t_title = "添加学校";
            $scope.showButton = true;
        }

        $scope.createSchool = function(){

            var tmp = {
                SchoolID: $scope.SchoolID,
                SchoolName: $scope.SchoolName,
                WebSite:$scope.WebSite,
                //OfficalAccountID:$scope.OfficalAccountID ,
                Province:$scope.Province ,
                City:$scope.City,
                County:$scope.County,
                Address:$scope.Address,
                Linkman:$scope.Linkman,
                Phone:$scope.Phone,
                SchoolLevel:$scope.SchoolLevel,
                GradeAmount:$scope.GradeAmount
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
                url = srvDomain + "/School/Update";
                tmp.id = id;
            }else{
                url = srvDomain + "/School/Add";
            }          
            enume.postData(url,tmp,function(d){
                $state.go("roomManage.schoolList");
            })
        }
    })

    .controller('schoolListCtl', function ($http, $scope, enume, $state) { })





