/**
 * Created by wupeng5 on 2016/3/5.
 */


angular.module("app").directive("homeworkList",function(){
    return {
        templateUrl: "./Directive/homeworkList/homeworkList.html?v=1333",
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

            //查询模板
            $scope.search = function(){
                $scope.$broadcast("searchByFilter");
            }

            $scope.createHomework = function(){                
                $state.go("roomManage.homeworkCreate", { entity: { tag: "add", from: "safe", teachingCode: "", schoolID: "nlsex", homeworkType: 1, Type: 0 } });
               
            }

            $scope.createHomeworkTemplate = function () {
                $state.go("roomManage.homeworkCreate", { entity: { tag: "add", homeworkType: 0, KCBH: "zn100009", Type: 0 } });
                
            }

            $scope.getUrl = function(){
                return srvDomain + "/Homework/Index?homeworkTitle=" + $scope.Title + "&courseTitle=" + $scope.CourseTitle + "&status=" + $scope.statusID + "&type=0" + "&homeworkType=" + $scope.homeworkType;
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
                var alertMessage = "发布后不能再修改考卷内容，确定要发布吗？";

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

            $scope.closeHomework = function (item) {
                var alertMessage = "确定要关闭考卷吗？";

                if (confirm(alertMessage)) {
                    var tmp = {
                    };
                    var url = "";

                    var id = item.ID;
                    url = srvDomain + "/Homework/CloseHomework";
                    tmp.id = id;

                    enume.postData(url, tmp, function (d) {
                        alert("关闭考卷成功!");
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