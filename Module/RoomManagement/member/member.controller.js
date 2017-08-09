/**
 * Created by mac on 16/6/17.
 */

'use strict';

angular.module('app')
 
    .controller('createMemberCtl', function ($http, $scope, enume, $state, $stateParams) {       
        $scope.ID = "";
        $scope.MemberID = "";
        $scope.Mobile = "";
        $scope.SchoolID = "";
        $scope.StudentNo = "";
        $scope.StudentName = "";
        $scope.RegisterTime = "";  
        $scope.CreateBy = "";
        $scope.CreateTime = "";
        $scope.ModifyBy = "";
        $scope.ModifyTime = "";
        $scope.wxSchool = enume.wxSchool;
        if ($stateParams.entity.member != null)
        {
            $scope.MemberID = $stateParams.entity.member.MemberID;
            $scope.Mobile = $stateParams.entity.member.Mobile;
        }
       
    
        function getInfoByCode(){
            var id = $stateParams.entity.item.ID;            
            enume.getData(srvDomain + "/Member/Update?ID=" + id, function (item) {
                $scope.ID = item.ID;
                $scope.MemberID = item.MemberID;
                $scope.SchoolID = item.SchoolID;
                $scope.SchoolName = item.SchoolName;
                $scope.StudentNo = item.StudentNo;
                $scope.StudentName = item.StudentName;
                $scope.OpenID = item.OpenID;
                $scope.Mobile = item.Mobile;
                $scope.Name = item.Name;
                $scope.Status = item.Status;
                $scope.Avatar = item.Avatar;
                $scope.RegisterTime = item.RegisterTime;
                $scope.Identity = item.Identity;
                $scope.Studybean = item.Studybean;
                $scope.CreateBy = item.CreateBy;
                $scope.CreateTime = item.CreateTime;
                $scope.ModifyBy = item.ModifyBy;
                $scope.ModifyTime = item.ModifyTime;
            })
        }

        $scope.showButton = true;
        if($stateParams.entity.tag == "edit"){
            $scope.t_title = "修改会员";
            getInfoByCode();
            $scope.showButton = true;
            $scope.showImg = true;

        }
        else if($stateParams.entity.tag == "detail"){
            $scope.t_title = "会员详情";
            getInfoByCode();
            $scope.showButton = false;
        }
        else{
            $scope.t_title = "添加学号";
            $scope.showButton = true;
        }

        $scope.createMember = function () {

            var tmp = {
                MemberID: $scope.MemberID,
                SchoolID: $scope.SchoolID,
                StudentNo: $scope.StudentNo,
                Intro: $scope.Intro,

            };


            var url = "";
            if($stateParams.entity.tag == "edit"){
                var id = $stateParams.entity.item.ID;                
                url = srvDomain + "/Member/Update";
                tmp.id = id;
            }else{
                url = srvDomain + "/Member/Add";
            }          
            enume.postData(url,tmp,function(d){
                $state.go("roomManage.memberList");
            })
        }

    })

    .controller('memberListCtl', function ($http, $scope, enume, $state) { })





