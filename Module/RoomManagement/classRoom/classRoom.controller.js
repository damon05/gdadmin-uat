/**
 * Created by mac on 16/6/17.
 */

'use strict';

angular.module('app')
    .controller('createProductCtl',function ($http,$scope,enume,$state,$stateParams) {
        $scope.proCate = "jf";
        $scope.jfs = [];
        $scope.jfNum = "";

        $scope.jsVersion = enume.jsVersion;
        $scope.syjsbbh = "";
        $scope.kcxls = enume.kcxl;
        $scope.kcxlsNum = "";

        $scope.NIANJI = enume.NIANJINo;
        $scope.kcsynj = "01";

        $scope.nowjsVersion = enume.jsVersion;
        $scope.ddbbh = "";
        $scope.spbh = "";
        $scope.ssmc = "";

        $scope.proStatus = "up";
        $scope.spkc = 0;

        $scope.spjj = "";
        $scope.spnr = "";

        $scope.tmpId1 = "";
        $scope.tmpName1 = "";
        $scope.tmpId2 = "";
        $scope.tmpName2 = "";
        $scope.tmpId3 = "";
        $scope.tmpName3 = "";
        $scope.tmpId4 = "";
        $scope.tmpName4 = "";
        $scope.tmpId5 = "";
        $scope.tmpName5 = "";

        $scope.proImg = "";
        $scope.keVideo = "";

        $scope.kcbz = "";
        $scope.jiaoan = "";
        $scope.kcjc = "";
        $scope.dmtkj = "";
        $scope.jjsysmjqd = "";
        $scope.kcsc = "";
        $scope.tiku = "";

        $scope.xxls = [{name:"全部",code:""}];
        $scope.childKcxlNum = "";

        $scope.t_title = "创建商品";
        $scope.showDialog = false;
        $scope.showImg = false;

        jsCoreMethod.fileReader("btn1",function(d,f){
            enume.postData("/cmsapi/image/upload",d,function(data){
                $scope.proImg = "/file"+data;
                $scope.r1 = "上传成功";
            })
        },"image");

        jsCoreMethod.fileUploadByFormAjax("btn2",function(d){
            $scope.keVideo = "/file"+d;
            $scope.r2 = "上传成功";
            $scope.$apply();
        })
        jsCoreMethod.fileUploadByFormAjax("btn3",function(d){
            $scope.kcbz = "/file"+d;
            $scope.r3 = "上传成功";
            $scope.$apply();
        })
        jsCoreMethod.fileUploadByFormAjax("btn4",function(d){
            $scope.jiaoan = "/file"+d;
            $scope.r4 = "上传成功";
            $scope.$apply();
        })
        jsCoreMethod.fileUploadByFormAjax("btn5",function(d){
            $scope.kcjc = "/file"+d;
            $scope.r5 = "上传成功";
            $scope.$apply();
        })
        jsCoreMethod.fileUploadByFormAjax("btn6",function(d){
            $scope.dmtkj = "/file"+d;
            $scope.r6 = "上传成功";
            $scope.$apply();
        })
        jsCoreMethod.fileUploadByFormAjax("btn7",function(d){
            $scope.jjsysmjqd = "/file"+d;
            $scope.r7 = "上传成功";
            $scope.$apply();
        })
        jsCoreMethod.fileUploadByFormAjax("btn8",function(d){
            $scope.kcsc = "/file"+d;
            $scope.r8 = "上传成功";
            $scope.$apply();
        })
        jsCoreMethod.fileUploadByFormAjax("btn9",function(d){
            $scope.tiku = "/file"+d;
            $scope.r9 = "上传成功";
            $scope.$apply();
        })

        if($stateParams.entity.tag == "edit"){
            $scope.t_title = "修改商品";
            var spbh = $stateParams.entity.item.code;
            enume.getData("/cmsapi/course/detail?code="+spbh,function(d){
                    $scope.proCate=d.proCate,         //商品类别
                    $scope.jfNum=d.jfNum,             //选择的教辅id
                    $scope.syjsbbh=d.syjsbbh,          //适用教室版本号
                    $scope.kcxlsNum=d.kcxlsNum,       //课程系列id
                    $scope.ddbbh=d.ddbbh,             //当前版本号
                    $scope.spbh=d.spbh,               //商品编号
                    $scope.ssmc=d.ssmc,               //商品名称
                    $scope.proStatus=d.proStatus,     //商品状态
                    $scope.spkc=d.spkc,               //商品库存
                    $scope.spjj=d.spjj,               //商品简介
                    $scope.spnr=d.spnr,               //商品内容
                    $scope.proImg=d.proImg,            //商品缩略图
                    $scope.keVideo=d.keVideo,           //课件视频
                    $scope.tmpId1=d.tmpId1,           //教师对课程评价问卷ID
                    $scope.tmpName1=d.tmpName1,       //教师对课程评价问卷Name
                    $scope.tmpId2=d.tmpId2,           //学生对课程评价问卷ID
                    $scope.tmpName2=d.tmpName2,       //学生对课程评价问卷Mame
                    $scope.tmpId3=d.tmpId3,           //其他对课程评价问卷ID
                    $scope.tmpName3=d.tmpName3,       //其他对课程评价问卷Name
                    $scope.tmpId4=d.tmpId4,           //课堂作业问卷ID
                    $scope.tmpName4=d.tmpName4,       //课堂作业问卷Name
                    $scope.tmpId5=d.tmpId5,           //课后作业问卷ID
                    $scope.tmpName5=d.tmpName5        //课后作业问卷Name

                    $scope.kcbz = d.kcbz;
                    $scope.jiaoan = d.jiaoan;
                    $scope.kcjc = d.kcjc;
                    $scope.dmtkj = d.dmtkj;
                    $scope.jjsysmjqd = d.jjsysmjqd;
                    $scope.kcsc = d.kcsc;
                    $scope.tiku = d.tiku;

                    bindNjCk(d.njbh);

                    getXxlData($scope.kcxlsNum,function(){
                        $scope.childKcxlNum = d.childKcxlNum;
                    })
            })
            $scope.showImg = true;
        }

        function clearCks(){
            for(var i=0;i<$scope.NIANJI.length;i++){
                $scope.NIANJI[i].ck = false;
            }
        }

        function bindNjCk(codes){
            clearCks();
            if(codes == ""){
                return;
            }
            var tmp = codes.split(',');
            for(var i=0;i<$scope.NIANJI.length;i++){
                var exist = false;
                for(var k=0;k<tmp.length;k++){
                    if($scope.NIANJI[i].code == tmp[k]){
                        exist = true;
                        break;
                    }
                }
                if(exist){
                    $scope.NIANJI[i].ck = true;
                }
            }
        }

        if($stateParams.entity.tag == undefined || $stateParams.entity.tag == "add"){
            clearCks();
            $scope.showImg = false;
        }

        var openTag = 0;
        $scope.getChooseTmps = function(d){
            if(d.length == 0){
                alert("请选择一个模板!");
                return;
            }
            d = d[0];
            if(openTag == 1){
                $scope.tmpId1 = d.code;
                $scope.tmpName1 = d.name;
            }
            if(openTag == 2){
                $scope.tmpId2 = d.code;
                $scope.tmpName2 = d.name;
            }
            if(openTag == 3){
                $scope.tmpId3 = d.code;
                $scope.tmpName3 = d.name;
            }
            if(openTag == 4){
                $scope.tmpId4 = d.code;
                $scope.tmpName4 = d.name;
            }
            if(openTag == 5){
                $scope.tmpId5 = d.code;
                $scope.tmpName5 = d.name;
            }
            $scope.showDialog = false;
        }

        $scope.showTmpDialog = function(num){
            if(num == 1){
                $scope.showDialog = true;
                openTag = num;
            }
        }
        $scope.closeDialog = function(){
            $scope.showDialog = false;
        }

        $scope.cancelPro = function(){
            $state.go("roomManage.productList");
        }

        function getXxlData(code,cb){
            enume.getData("/cmsapi/course/xilieChildren?code="+code,function(d){
                $scope.xxls = [{name:"全部",code:""}];
                for(var i=0;i<d.length;i++){
                    $scope.xxls.push({name: d[i].kcxlmc,code: d[i].kcxlbh});
                }
                if(cb){
                    cb();
                }
            })
        }

        $scope.getXxl = function(){
            getXxlData($scope.kcxlsNum,function(){
                $scope.childKcxlNum = "";
            });
        }

        function getNameById(id,arr){
            var res = "";
            for(var i=0;i<arr.length;i++){
                if(id == arr[i].code){
                    res = arr[i].name;
                    break;
                }
            }
            return res;
        }

        function getCkCodes(){
            var res = [];
            for(var i=0;i<$scope.NIANJI.length;i++){
                if($scope.NIANJI[i].ck){
                    res.push($scope.NIANJI[i].code);
                }
            }
            return res.join(',');
        }

        $scope.savePro = function(){
            var tmp = {
                proCate:$scope.proCate,         //商品类别
                jfNum:$scope.jfNum,             //选择的教辅id
                jfmc:getNameById($scope.jfNum,$scope.jfs),  //教辅名称
                syjsbbh:$scope.syjsbbh,          //适用教室版本号
                kcxlsNum:$scope.kcxlsNum,       //课程系列id
                kcxlmc:getNameById($scope.kcxlsNum,$scope.kcxls),   //课程系列名称
                ddbbh:$scope.ddbbh,             //当前版本号
                spbh:$scope.spbh,               //商品编号
                ssmc:$scope.ssmc,               //商品名称
                proStatus:$scope.proStatus,     //商品状态
                spkc:$scope.spkc,               //商品库存
                spjj:$scope.spjj,               //商品简介
                spnr:$scope.spnr,               //商品内容
                proImg:$scope.proImg,            //商品缩略图
                keVideo:$scope.keVideo,           //课件视频
                tmpId1:$scope.tmpId1,           //教师对课程评价问卷ID
                tmpName1:$scope.tmpName1,       //教师对课程评价问卷Name
                tmpId2:$scope.tmpId2,           //学生对课程评价问卷ID
                tmpName2:$scope.tmpName2,       //学生对课程评价问卷Mame
                tmpId3:$scope.tmpId3,           //其他对课程评价问卷ID
                tmpName3:$scope.tmpName3,       //其他对课程评价问卷Name
                tmpId4:$scope.tmpId4,           //课堂作业问卷ID
                tmpName4:$scope.tmpName4,       //课堂作业问卷Name
                tmpId5:$scope.tmpId5,           //课后作业问卷ID
                tmpName5:$scope.tmpName5,        //课后作业问卷Name
                kcbz : $scope.kcbz,
                jiaoan : $scope.jiaoan,
                kcjc : $scope.kcjc,
                dmtkj : $scope.dmtkj,
                jjsysmjqd : $scope.jjsysmjqd,
                kcsc : $scope.kcsc,
                tiku : $scope.tiku,
                njbh : getCkCodes(),
                childKcxlNum:$scope.childKcxlNum,
                childKcxlmc:getNameById($scope.childKcxlNum,$scope.xxls)
            };

            //if($scope.childKcxlNum == ""){
            //    alert("课程系列必须选择!");
            //    return;
            //}

            if($scope.ssmc == ""){
                alert("课程名称必须填写!");
                return;
            }

            if(!/^\d+$/.test($scope.spkc)){
                alert("库存只允许为数字!");
                return;
            }

            var url = "";
            if($stateParams.entity.tag == "edit"){
                url = "/cmsapi/course/update";
                tmp.code = $stateParams.entity.item.code;
            }else{
                url = "/cmsapi/course/add";
            }

            enume.postData(url,tmp,function(d){
                if($stateParams.entity.tag == "edit"){
                    $state.go("roomManage.productPreview",{id:$stateParams.entity.item.code});
                }else{
                    $state.go("roomManage.productPreview",{id:$scope.spbh});
                }

            })
        }

        $scope.selectTemplates = function(){
            $scope.$broadcast("getCkTemplates");
        }
    })

    .controller('registerRoomCtl',function ($http,$scope,enume,$state,$stateParams) {
        $scope.zhh = "";
        $scope.xxbh = "";
        $scope.xxmc = "";
        $scope.jsbh = "";
        $scope.jsmc = "";
        $scope.jsdz = "";
        $scope.sqzh = "";
        $scope.sqmm = "";
        $scope.cStatus = "y";
        $scope.bz = "";
        $scope.sp1 ="";
        $scope.sp2 ="";
        $scope.sp3 ="";
        $scope.sp4 ="";
        $scope.sp5 ="";
        $scope.sp6 ="";
        $scope.sp7 ="";
        $scope.sp8 ="";
        $scope.sp9 ="";
        $scope.sp10 ="";
        $scope.sp11 ="";
        $scope.sp12 ="";

        $scope.r1 = "";
        $scope.r2 = "";
        $scope.r3 = "";
        $scope.r4 = "";
        $scope.r5 = "";
        $scope.r6 = "";
        $scope.r7 = "";
        $scope.r8 = "";
        $scope.r9 = "";
        $scope.r10 = "";
        $scope.r11 = "";
        $scope.r12 = "";

        $scope.showImg = false;

        $scope.jsVersion = enume.jsVersion;
        $scope.jsbbh = "";

        $scope.xzxm = "";
        $scope.glyxx = "";
        $scope.jfrq = "";

        $scope.key = "";

        $scope.zzdw = "";

        for(var i=0;i<12;i++){
            (function(index){
                jsCoreMethod.fileReader("b"+(index+1),function(d,f){
                    enume.postData("/cmsapi/image/upload",d,function(data){
                        //document.querySelector("#sp"+(index+1)).innerHTML = f.name;
                        $scope["sp"+(index+1)] = "/file"+data;
                        $scope["r"+(index+1)] = "上传成功";
                        //$scope.$apply();
                    })
                },"image")
            })(i);
        }

        function getInfoByCode(){
            var tanentId = $stateParams.entity.item.tanentid;
            var jsbh = $stateParams.entity.item.jsbh;
            enume.getData("/cmsapi/tclassRegister/detail?tanentId="+tanentId+"&jsbh="+jsbh,function(d){
                $scope.zhh = d.zhh;
                $scope.xxbh = d.xxbh;
                $scope.xxmc = d.jsmc;
                $scope.jsbh = d.jsbh;
                $scope.jsmc = d.jsmc;
                $scope.jsdz = d.jsdz;
                $scope.sqzh = d.sqzh;
                $scope.sqmm = d.sqmm;
                $scope.jsbbh = d.jsbbh;

                $scope.xzxm = d.xzxm;
                $scope.glyxx = d.glyxx;
                $scope.jfrq = new Date(d.jfrq);

                $scope.email = d.email;
                $scope.key = d.key;

                $scope.zzdw = d.zzdw;

                $scope.cStatus = d.cstatus;
                $scope.bz = d.bz;
                $scope.sp1 = d.b1Src;
                $scope.sp2 = d.b2Src;
                $scope.sp3 = d.b3Src;
                $scope.sp4 = d.b4Src;
                $scope.sp5 = d.b5Src;
                $scope.sp6 = d.b6Src;
                $scope.sp7 = d.b7Src;
                $scope.sp8 = d.b8Src;
                $scope.sp9 = d.b9Src;
                $scope.sp10 = d.b10Src;
                $scope.sp11 = d.b11Src;
                $scope.sp12 = d.b12Src;
            })
        }

        $scope.showButton = true;
        if($stateParams.entity.tag == "edit"){
            $scope.t_title = "培训机构注册";
            getInfoByCode();
            $scope.showButton = true;
            $scope.showImg = true;

        }
        else if($stateParams.entity.tag == "detail"){
            $scope.t_title = "培训机构注册";
            getInfoByCode();
            $scope.showButton = false;
        }
        else{
            $scope.t_title = "培训机构注册";
            $scope.showButton = true;
        }

        $scope.createClass = function(){

            var tmp = {
                zhh:$scope.zhh,         //租户号
                xxbh:$scope.xxbh,       //学校编号
                xxmc:$scope.xxmc,       //学校名称
                jsbh:$scope.xxbh,       //教室编号
                jsmc:$scope.xxmc,       //教室名称
                jsdz:$scope.jsdz,       //教室地址
                sqzh:$scope.sqzh,        //授权账号
                sqmm:$scope.sqmm,       //授权密码
                jsbbh:$scope.jsbbh,      //教室版本号
                cstatus:$scope.cStatus, //有效状态
                bz:$scope.bz,           //备注说明
                b1Src:$scope.sp1,        //欢迎登陆安全教育平台图片
                b2Src:$scope.sp2,        //登陆页背景图
                b3Src:$scope.sp3,        //课前准备按钮图
                b4Src:$scope.sp4,        //选择课程按钮图
                b5Src:$scope.sp5,        //选课页背景图
                b6Src:$scope.sp6,        //安全教育平台logo
                b7Src:$scope.sp7,        //年级班级选择按钮图
                b8Src:$scope.sp8,        //返回首页按钮图
                b9Src:$scope.sp9,        //学生选择按钮图
                b10Src:$scope.sp10,      //重新选择班级按钮图
                b11Src:$scope.sp11,       //返回上一级
                b12Src:$scope.sp12,       //完成点名继续选课按钮图
                xzxm : $scope.xzxm,
                glyxx : $scope.glyxx,
                jfrq : new Date($scope.jfrq).format(),
                email:$scope.email,
                key:$scope.key,
                zzdw:$scope.zzdw
            };

            var e = jsCoreMethod.validateEmail($scope.email,"请输入正常的的邮箱!");
            if(e.bl == false){
                alert(e.msg);
                return;
            }

            if($scope.key != "" && $scope.key.length != 8){
                alert("加密密匙必须为8为数字字符或者符号组成!");
                return;
            }

            var url = "";
            if($stateParams.entity.tag == "edit"){
                var tanentId = $stateParams.entity.item.tanentid;
                var jsbh = $stateParams.entity.item.jsbh;
                url = "/cmsapi/tclassRegister/update";
                tmp.tanentId = tanentId;
                tmp.oldJsbh = jsbh
            }else{
                url = "/cmsapi/tclassRegister/register";
            }

            enume.postData(url,tmp,function(d){
                $state.go("roomManage.roomList");
            })
        }
    })

    .controller('roomListCtl',function ($http,$scope,enume,$state) {})

    .controller('productListCtl',function ($http,$scope,enume,$state) {})

    .controller('warrantCtl',function ($http,$scope,enume,$state) {

        var selPros = null;
        var selClass = null;

        $scope.getSelPros = function(d){
            selPros = d;
        }
        $scope.getSelClass = function(d){
            selClass = d;
        }

        $scope.submitWarrant = function(){

            $scope.$broadcast("getCkPros");
            $scope.$broadcast("getCkClass");

            if(selClass.length != 1 || selClass.length == 0){
                alert("只能选择一个教室，可以选择多个课程!");
                return;
            }
            var res = [];
            for(var i=0;i< selPros.length;i++){
                res.push(selPros[i].code);
            }

            var tmp = {
                tanentId: selClass[0].tanentid,
                proIds:res.join(','),
                begin:$scope.beginDate,
                end:$scope.endDate
            };

            enume.postData("/cmsapi/tclassRegister/auth",tmp,function(d){
                alert("授权成功!");
            })
        }

    })

    .controller('productPreviewCtl',function ($http,$scope,enume,$state,$stateParams) {
        var id = $stateParams.id;

        $scope.name = "";
        $scope.from = "";
        $scope.kcxlmc = "";
        $scope.kjdz = "";
        $scope.kcjj = "";
        $scope.kcnr = "";
        $scope.kjdz = "";
        $scope.dmtkjdz = "";

        enume.getData("/cmsapi/course/view?code="+id,function(d){
            $scope.name = d.name;
            $scope.from = d.from;
            $scope.kcxlmc = d.kcxlmc;
            $scope.kjdz = d.kjdz;
            $scope.kcjj = d.kcjj;
            $scope.kcnr = d.kcnr;
            $scope.kjdz = d.kjdz;
            $scope.dmtkjdz = d.dmtkjdz;

            $("#img1").attr("src", d.kctp);

            //二维码生成器
            $("#code1").qrcode({
                render: "table",
                width: 200,
                height:200,
                text: "http://" + document.domain + "/safe/out.html?code="+ d.teacherWenjuan
            });
            $("#code2").qrcode({
                render: "table",
                width: 200,
                height:200,
                text: "http://" + document.domain + "/safe/out.html?code="+ d.studentWenjuan
            });
        })

    })

    .controller('decorationCtl',function ($http,$scope,enume,$state,$stateParams) {
        $scope.classList = enume.classList;
        $scope.classListNum = "";

        $scope.listXl = [];
        $scope.listKc = [];

        $scope.className = "";
        $scope.classBh = "";

        $scope.searchLists = function(){
            if($scope.classListNum == ""){
                alert("必须选择教室！");
                return;
            }
            var res = getClassById($scope.classListNum,$scope.classList);
            $scope.className = res.name;
            $scope.classBh = res.bh;
            $scope.$broadcast("searchByFilter");
        }

        function getClassById(id,arr){
            var res = "";
            for(var i=0;i<arr.length;i++){
                if(id == arr[i].code){
                    res = arr[i];
                    break;
                }
            }
            return res;
        }

        //装修课程系列图标list
        $scope.getUrlXl = function(){
            if($scope.classListNum != ""){
                return "/cmsapi/course/authXilie?tanentId="+$scope.classListNum;
            }
        }

        $scope.directiveCallBackXl = function(d){
            $scope.listXl = d;
        }

        var newPathXl = "";
        $scope.getImgXl = function(item,id){
            jsCoreMethod.fileReader(id,function(d,f){
                enume.postData("/cmsapi/image/upload",d,function(data){
                    newPathXl = "/file"+data;
                    item.newPath = f.name;
                })
            },"image")
        }

        $scope.loadImgXl = function(item){
            if(newPathXl == ""){
                return;
            }
            enume.postData("/cmsapi/decorate/setCourseXlImage?tanentId="+$scope.classListNum+"&jsbh="+$scope.classBh+"&xlbh="+item.kcxlbh+"&xlmc="+item.kcxlmc+"&image="+newPathXl,null,function(d){
                alert("设置成功!");
                $scope.$broadcast("searchByFilter");
            })
        }

        //装修课程图标
        $scope.getUrlKc = function(){
            if($scope.classListNum != ""){
                return "/cmsapi/course/authKeCheng?tanentId="+$scope.classListNum;
            }
        }

        $scope.directiveCallBackKc = function(d){
            $scope.listKc = d;
        }

        var newPathKc = "";
        $scope.getImgKc = function(item,id){
            jsCoreMethod.fileReader(id,function(d,f){
                enume.postData("/cmsapi/image/upload",d,function(data){
                    newPathKc = "/file"+data;
                    item.newPath = f.name;
                })
            },"image")
        }

        $scope.loadImgKc = function(item){
            if(newPathKc == ""){
                return;
            }
            enume.postData("/cmsapi/decorate/setCourseImage?tanentId="+$scope.classListNum+"&jsbh="+$scope.classBh+"&kcbh="+item.code+"&kcmc="+item.name+"&image="+newPathKc,null,function(d){
                alert("设置成功!");
                $scope.$broadcast("searchByFilter");
            })
        }
    })

