/**
 * Created by wupeng5 on 2016/3/5.
 */


angular.module("app").directive("surveyAnalysisList",function(){
    return {
        templateUrl:"./Directive/surveyAnalysisList/surveyAnalysisList.html",
        restrict:"EA",
        scope:{
            "chooseCallback":"=",
            "showCk":"="
        },
        link:function(){},
        controller:function($http,$scope,enume,$state){
            $scope.xn = [{name:"全部",code:"0"}];
            $scope.nj = [{name:"全部",code:""}];
            $scope.bj = [{name:"全部",code:""}];

            $scope.xnNum = "0";
            $scope.njNum ="";
            $scope.bjNum = "";

            $scope.Js = [{name:"全部",code:""}];
            $scope.jsNum = "";

            $scope.downLink = "";
            $scope.btnCls = "btnGray";
            $scope.isDisabled = true;

            function downFile(){
                $scope.downLink = "";
                $scope.btnCls = "btnGray";
                $scope.isDisabled = true;
                enume.getData("/cmsapi/questionResult/download?tanentid="+$scope.jsNum+"&xn="+$scope.xnNum+"&njbh="+$scope.njNum+"&bjbh="+$scope.bjNum,function(d){
                    $scope.btnCls = "btnGreen";
                    $scope.downLink = "/file/"+d;
                    $scope.isDisabled = false;
                })
            }

            downFile();

            //enume.getXnByXx("",function(d){
            //    $scope.xn = [{name:"全部",code:"0"}];
            //    d = d.datas;
            //    for(var i=0;i< d.length;i++){
            //        $scope.xn.push({name:d[i],code:d[i]});
            //    }
            //});
            enume.getData("/cmsapi/tclassRegister/query?pageIndex=1&pageSize=100",function(d){
                d = d.datas;
                $scope.jsNum = "";
                for(var i=0;i<d.length;i++){
                    $scope.Js.push({name: d[i].jsmc,code: d[i].tanentid});
                }
            })

            $scope.changeJs = function(){
                if($scope.jsNum == ""){
                    $scope.xn = [{name:"全部",code:"0"}];
                    $scope.nj = [{name:"全部",code:""}];
                    $scope.bj = [{name:"全部",code:""}];
                }else{
                    enume.getData("/cmsapi/tclass/xn?tanentId="+$scope.jsNum,function(d){
                        d = d.datas;
                        $scope.xn = [{name:"全部",code:"0"}];
                        for(var i=0;i< d.length;i++){
                            $scope.xn.push({name:d[i],code:d[i]});
                        }
                    })
                }
                $scope.xnNum = "0";
                $scope.njNum = "";
                $scope.bjNum = "";
            }

            $scope.changeXn = function(){
                if($scope.xnNum == "0"){
                    $scope.nj = [{name:"全部",code:""}];
                    $scope.bj = [{name:"全部",code:""}];
                }else{
                    enume.getData("/cmsapi/tclass/nj?tanentId="+$scope.jsNum+"&xn="+$scope.xnNum,function(d){
                        $scope.nj = [{name:"全部",code:""}];
                        for(var i=0;i< d.length;i++){
                            $scope.nj.push({name:d[i].njmc,code:d[i].njbh});
                        }
                    })
                }
                $scope.njNum ="";
                $scope.bjNum = "";
            }
            $scope.changeNj = function(){
                if($scope.njNum == ""){
                    $scope.bj = [{name:"全部",code:""}];
                }

                enume.getData("/cmsapi/tclass/bj?tanentId="+$scope.jsNum+"&xn="+$scope.xnNum+"&njbh="+$scope.njNum,function(d){
                    $scope.bj = [{name:"全部",code:""}];
                    for(var i=0;i< d.length;i++){
                        $scope.bj.push({name:d[i].bjmc,code:d[i].bjbh});
                    }
                })

                $scope.bjNum = "";
            }

            $scope.templateList = [];

            $scope.getRemark = function(item){
                return jsCoreMethod.cutString(item.remark,5);
            }

            //查询模板
            $scope.templateListSearch = function(){
                $scope.$broadcast("searchByFilter");
                downFile();
            }

            $scope.getUrl = function(){
                return "/cmsapi/questionResult/queryTemplates?tanentId="+$scope.jsNum+"&xn="+$scope.xnNum+"&njbh="+$scope.njNum+"&bjbh="+$scope.bjNum;
            }

            $scope.directiveCallBack = function(valueFromDirective){
                $scope.templateList = valueFromDirective;
            }

            $scope.goDetail = function(item){
                $state.go("roomManage.evaluateDetail",{id:item.code});
            }

            $scope.preView = function(item){
                window.open("out.html?code="+item.code,"_blank","height=800,width=500");
            }
        }
    }
})