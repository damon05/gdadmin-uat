/**
 * Created by wupeng5 on 2016/3/5.
 */


angular.module("app").directive("investigateList", function () {
    return {
        templateUrl: "./Directive/investigateList/investigateList.html?v=1927",
        restrict:"EA",
        scope:{
            "chooseCallback":"=",
            "showAddBtn":"=",
            "showCk":"=",
            "from":"="
        },
        link:function(){},
        controller: function ($http, $scope, enume, $state, $rootScope, $stateParams, ngDialog) {

            //初始化下拉框数据  模板分类,模板类型
            $scope.Title = "";
            $scope.CourseTitle = "";
            $scope.statusID = -1;
            $scope.homeworkType = -1;
            $scope.wxStatus = enume.wxStatus;
            $scope.wxHomeworkType = enume.homeworkType;           
            $scope.List = [];
            $scope.questionList = [];

            
            //查询模板
            $scope.search = function(){
                $scope.$broadcast("searchByFilter");
            }

            $scope.createHomework = function(){                
                $state.go("roomManage.homeworkCreate", { entity: { tag: "add", from: "safe", teachingCode: "", schoolID: "", homeworkType: 1,Type: 1 } });
               
            }

      

            $scope.getUrl = function(){
                return srvDomain + "/Homework/Index?homeworkTitle=" + $scope.Title + "&courseTitle=" + $scope.CourseTitle + "&status=" + $scope.statusID + "&type=1" + "&homeworkType=" + $scope.homeworkType;
            }


            $scope.edit = function (item) {
                $scope.showButton = true;
                $state.go("roomManage.homeworkCreate", { entity: { tag: "edit", homeworkID: item.ID, homeworkType: item.HomeworkType, Type: item.Type } });
            }

            $scope.detail = function (item) {
                $scope.showButton = true;
                $state.go("roomManage.homeworkCreate", { entity: { tag: "detail", homeworkID: item.ID, homeworkType: item.HomeworkType, Type: item.Type } });
            }

            $scope.publish = function (item) {
                var alertMessage = "发布后不能再修改问卷内容，确定要发布吗？"
               
                if (confirm(alertMessage)) {
                    var tmp = {
                    };
                    var url = "";

                    var id = item.ID;
                    url = srvDomain + "/Homework/Publish";
                    tmp.id = id;

                    enume.postData(url, tmp, function (d) {                       
                            alert("发布成功!");
                            $scope.$broadcast("searchByFilter");                        
                    })
                }
            };

            $scope.delete = function (item) {
                if (confirm("确定要删除此项目吗？")) {
                    var tmp = {
                    };
                    var url = "";

                    var id = item.ID;
                    url = srvDomain + "/Homework/Delete";
                    tmp.id = id;

                    enume.postData(url, tmp, function (d) {                        
                            alert("删除成功!");
                            $scope.$broadcast("searchByFilter");                      
                    })
                }
            };

       

            function getData(item) {
                var url = srvDomain + "/Homework/Preview?homeworkID=" + item.ID ;
                url = url + "&pageIndex=1&pageSize=1000&ran=" + Math.random();

                $http.get(url).success(function (d) {

                    if (d.status.code == "1") {
                        var tmp = d.data.datas;
                        $scope.questionList = tmp;
                    }
                    else {
                        alert(d.status.message);
                    }
                })
            }
      
            $scope.previewItem = function (item) {
                $scope.popTitle = "问卷预览";
                getData(item);                
                ngDialog.open({
                    template: 'questionPreviewTmpl',
                    className: 'ngdialog-theme-default ngdialog-theme-dadao',
                    scope: $scope                   
                });
            };

            $scope.directiveCallBack = function(d){
                $scope.List = d;
            }

           

            $scope.getRemark = function(item){
                return jsCoreMethod.cutString(item.remark,5);
            }

            $scope.$on("getCkHomeworks",function(e,d){
                var d = $scope.homeworkList;

                var res = [];
                for(var i=0;i< d.length;i++){
                    if(d[i].ck){
                        res.push(d[i]);
                    }
                }
                $scope.chooseCallback(res);
            })
        }
    }
})