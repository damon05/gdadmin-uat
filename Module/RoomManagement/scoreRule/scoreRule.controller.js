/**
 * Created by mac on 16/6/17.
 */

'use strict';

angular.module('app')
 
    .controller('createScoreRuleCtl', function ($http, $scope, enume, $state, $stateParams) {
        $scope.ID = "";
        $scope.ScoreBegin = "";
        $scope.ScoreEnd = "";
        $scope.StudyBean = "";     
    
        function getInfoByCode(){
            var id = $stateParams.entity.item.ID;            
            enume.getData(srvDomain + "/ScoreRule/Update?ID=" + id, function (item) {
                $scope.ID = item.ID;
                $scope.ScoreBegin = item.ScoreBegin;
                $scope.ScoreEnd = item.ScoreEnd;
                $scope.StudyBean = item.StudyBean;  
            })
        }

        $scope.showButton = true;
        if($stateParams.entity.tag == "edit"){
            $scope.t_title = "修改奖励规则";
            getInfoByCode();
            $scope.showButton = true;

        }
        else if($stateParams.entity.tag == "detail"){
            $scope.t_title = "奖励规则详情";
            getInfoByCode();
            $scope.showButton = false;
        }
        else{
            $scope.t_title = "添加奖励规则";
            $scope.showButton = true;
        }

        $scope.createScoreRule = function () {

            var tmp = {
                ScoreBegin: $scope.ScoreBegin,
                ScoreEnd: $scope.ScoreEnd,
                StudyBean: $scope.StudyBean
            };

            if ($scope.ScoreBegin == "" || isNaN($scope.ScoreBegin)) {
                alert("请输入开始分数（数字）！");
                return;
            }

            if ($scope.ScoreEnd == "" || isNaN($scope.ScoreEnd)) {
                alert("请输入结束分数（数字）！");
                return;
            }
            if ($scope.StudyBean == "" || isNaN($scope.StudyBean)) {
                alert("请输入赠送学豆数（数字）！");
                return;
            }

            var url = "";
            if($stateParams.entity.tag == "edit"){
                var id = $stateParams.entity.item.ID;                
                url = srvDomain + "/ScoreRule/Update";
                tmp.id = id;
            }else{
                url = srvDomain + "/ScoreRule/Add";
            }          
            enume.postData(url,tmp,function(d){
                $state.go("roomManage.scoreRuleList");
            })
        }
    })

    .controller('scoreRuleListCtl', function ($http, $scope, enume, $state) { })





