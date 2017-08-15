/**
 * Created by mac on 16/6/17.
 */

'use strict';

angular.module('app').controller('classCateCtl', function ($http, $scope, enume, $state, $stateParams) {

    var tree = null;

    var selectedNode = null;

    function clear(){
        $scope.kcxlbh = "";
        $scope.kcxlmc = "";
        $scope.kctp = "";
        $scope.parentbh = "";
        $scope.tmCount = "";
    }

    clear();

    jsCoreMethod.fileUploadByFormAjax("upimg",function(d){
        $scope.$apply(function(){
            $scope.kctp = "/file"+d;
        });
    })

    var setting = {
        check: {
            enable: false,
            chkDisabledInherit: true
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onClick: function(event, treeId, treeNode, clickFlag) {
                selectedNode = treeNode;
                //$scope.$apply(function(){
                //    $scope.kcxlbh = selectedNode.id;
                //    $scope.kcxlmc = selectedNode.name;
                //    $scope.kctp = selectedNode.img;
                //    $scope.parentbh = selectedNode.id;
                //    $scope.tmCount = selectedNode.count;
                //})
            }
        }
    };

    var flag = "add";
    $scope.add = function(){
        clear();
        if(selectedNode != null){
            $scope.parentbh = selectedNode.id;
        }
        flag = "add";
    }

    $scope.edit = function(){
        if(selectedNode == null){
            alert("请选择一项进行编辑!");
            return;
        }
        flag = "edit";
        $scope.kcxlbh = selectedNode.kcxlbh;
        $scope.kcxlmc = selectedNode.name;
        $scope.kctp = selectedNode.img;
        $scope.parentbh = selectedNode.pId;
        $scope.tmCount = selectedNode.count;
    }

    $scope.del = function(){
        if(selectedNode == null){
            alert("请选择一项进行删除!id为:"+selectedNode.id);
            return;
        }
        if(window.confirm("是否要删除?")){
            enume.getData("/cmsapi/course/deleteCourseXl?lineid="+selectedNode.id,function(){
                alert("删除成功!");
                getData();
                selectedNode = null;
            })
        }
    }

    $scope.sub = function(){
        //添加根节点
        var tmp = {
            kcxlbh:$scope.kcxlbh.toString(),
            kcxlmc:$scope.kcxlmc.toString(),
            kctp:$scope.kctp.toString(),
            parentbh:"",
            tmCount:$scope.tmCount.toString()
        }
        var url = "";
        if(flag == "add"){
            if(selectedNode != null){
                tmp.parentbh = selectedNode.id;
            }
            url = "/cmsapi/course/addCourseXl?kcxlbh="+tmp.kcxlbh+"&kcxlmc="+tmp.kcxlmc+"&kctp="
                +tmp.kctp+"&parentbh="+tmp.parentbh+"&tmCount="+tmp.tmCount;
        }

        if(flag == "edit"){
            url = "/cmsapi/course/updateCourseXl?kcxlbh="+$scope.kcxlbh+"&lineid="+selectedNode.id+"&kcxlmc="+tmp.kcxlmc+"&kctp="
                +tmp.kctp+"&parentbh="+selectedNode.pId+"&tmCount="+tmp.tmCount;
        }

        enume.postData(url,null,function(d){
            alert("保存成功!");
            getData();
            clear();
            selectedNode = null;
        })
    }

    function convertTreeData(data){
        if(data){
            var res = [];
            for(var i=0;i<data.length;i++){
                res.push({
                    id:data[i].lineid,
                    pId:data[i].parentbh,
                    name:data[i].kcxlmc,
                    count:data[i].tmCount,
                    img:data[i].kctp,
                    kcxlbh:data[i].kcxlbh
                });
            }
            return res;
        }
        return null;
    }

    function getData(){
        enume.getData("/cmsapi/course/xilie?isAll=1",function(d){
            $scope.zNodes = convertTreeData(d);
            tree = $.fn.zTree.init($("#ztree"), setting, $scope.zNodes);
        })
    }

    getData();
})




