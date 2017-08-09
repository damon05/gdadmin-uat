/**
 * Created by wupeng5 on 2016/3/5.
 */


angular.module("app").directive("memberHomeworkList",function(){
    return {
        templateUrl: "./Directive/memberHomeworkList/memberHomeworkList.html?v=1309",
        restrict:"EA",
        scope:{
            "chooseCallback":"=",
            "showAddBtn":"=",
            "showCk":"=",
            "from":"="
        },
        link:function(){},
        controller: function ($http, $scope, enume, $state, $rootScope, $stateParams, ngDialog, $filter) {

            //初始化下拉框数据  模板分类,模板类型
            $scope.homeworkID = $stateParams.entity.homeworkID;
            $scope.studentNo = "";
            $scope.studyDate = "";

            $scope.List = [];
            $scope.memberQuestionResultList = [];

            $scope.getUrl = function () {
                var sDate = $filter('date')($scope.studyDate, 'yyyy-MM-dd');
                return srvDomain + "/MemberHomework/Index?homeworkID=" + $scope.homeworkID +  "&studentNo=" + $scope.studentNo + "&studyDate=" + sDate;
            }
            //查询作业题目列表    
            $scope.search = function () {
                $scope.$broadcast("searchByFilter");
            }

            $scope.directiveCallBack = function(d){
                $scope.List = d;
            }

            function getData(item) {
                var url = srvDomain + "/MemberHomework/MemberQuestionResultList?homeworkID=" + item.HomeworkID + "&tanentID=" + item.SchoolID + "&signID=" + item.SignID + "&studentNo=" + item.StudentNo;
                url = url + "&pageIndex=1&pageSize=1000&ran=" + Math.random();

                $http.get(url).success(function (d) {

                    if (d.status.code == "1") {
                        var tmp = d.data.datas;
                        $scope.memberQuestionResultList = tmp;
                    }
                    else {
                        alert(d.status.message);
                    }
                })
            }

            $scope.detail = function (item) {                
                $scope.popTitle = "答题详情";
                getData(item);
                ngDialog.open({
                    template: 'questionResultListTmpl',
                    className: 'ngdialog-theme-tablelist',
                    scope: $scope
                });
            };

        }
    }
})