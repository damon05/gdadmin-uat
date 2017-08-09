/**
 * Created by mac on 16/6/6.
 */

angular.module('app').factory("enume",function($http,$state,$rootScope){

    var enumHelp = function(){

        var that = this;

        this.templateType = [{name:"全部",code:""}];          //模板分类
        this.templateCate = [{name:"--请选择--",code:""}];          //模板类型
        this.templateCateV2 = [{name:"全部",code:""}];          //模板类型

        this.templateTypeForAdd = [];          //模板分类
        this.templateCateForAdd = [];          //模板类型

        this.userSex = [{name:"请选择",code:""}];                                  //性别
        this.idType = [{name:"请选择",code:""}];                                   //证件类型
        this.maritalStatus = [{name:"请选择",code:""}];                            //婚姻状态
        this.macao = [{name:"请选择",code:""}];                                    //港澳台外

        this.kcxl = [{name:"全部",code:""}];                  //课程系列

        this.kcxlSafe = [{name:"全部",code:""}];              //授课记录里面的课程系列

        this.xx = [{name:"全部",code:""}];                    //安全教室学校
        this.xxAdmin = [{name:"全部",code:""}];               //教育机构学校

        this.provinces = [{name:"请选择",code:""}];            //省

        this.uRylxs = [{name:"全部",code:""}];                //人员类型
        this.uGws = [{name:"全部",code:""}];                  //岗位

        this.classList = [{name:"全部",code:""}];
        this.jsVersion = [{ name: "全部", code: "" }];             //教室版本号
        this.wxCourseCategory = [{ name: "全部", code: -1 }]; //妈妈微课课程分类
        this.wxWeiTeacher = [{ name: "全部", code: -1 }]; //妈妈微课教师
        this.wxSchool = []; //妈妈微课学校
        this.wxCourseLabel = []; //妈妈微课课程标签
        this.wxStatus = [{ name: "全部", code: -1 }, { name: "已发布", code: 1 }, { name: "未发布", code: 0 }]; //状态
        this.wxAccountCategory = [{ name: "请选择", code: -1 }, { name: "订阅号", code: 1 }, { name: "服务号", code: 2 }]; //公众账号级别
        this.wxOfficalAccount = [{ name: "全部", code: -1 }]; //公众账号
        this.wxAccountType = [{ name: "请选择", code: -1 }, { name: "学校", code: 1 }, { name: "公司", code: 2 }]; //公众账号类型
        this.wxSafeCategory = [{ name: "全部", code: -1 }]; //安全课程课程分类
        this.wxQuestionType = [{ name: "单选", code: 0 }, { name: "多选", code: 1 }];
        this.wxQuestionResType = [{ name: "文本", code: 0 }, { name: "图片", code: 1 }, { name: "音频", code: 2 }, { name: "视频", code: 3 }]; //问题资源类型
        this.wxCourseLevel = [];
        this.NIANJI = [];
        this.homeworkType = [{ name: "全部", code: -1 }, { name: "基础模板", code: 0 }, { name: "普通考卷", code: 1 }];
        this.wxHomeworkScoreRule = [];
        this.wxExamCategory = [];


        this.getData = function(url,cb){
            $http.get(url).success(function(d){
                if(d.status.code == "1"){
                    if(d.data){
                        cb(d.data);
                    }else{
                        alert("查询成功,但是数据为空!");
                    }
                }
                else{
                    if(d.status.code == "3"){
                        if($rootScope.userFlag == "userSafe"){
                            $state.go("loginSafe");
                        }else{
                            $state.go("loginAdmin");
                        }
                    } else{
                        alert(d.status.message);
                    }
                }
                //else{
                //    alert(d.status.message);
                //}
            })
        }

        this.postData = function(url,data,cb){
            $http({
                method:"POST",
                url:url,
                data:data
            }).success(function(d){
                if(d.status.code == "1"){
                    cb(d.data);
                }
                else{
                    if(d.status.code == "3"){
                        if($rootScope.userFlag == "userSafe"){
                            $state.go("loginSafe");
                        }else{
                            $state.go("loginAdmin");
                        }
                    } else{
                        alert(d.status.message);
                    }
                }
                //else{
                //    alert(d.status.message);
                //}
            })
        }

        //模板分类
        this.getTemplateType = function(){
            if(this.templateType.length <=1 ){
                this.getData("/cmsapi/template/queryModelTypes",function(tmp){
                    if(!tmp){
                        return;
                    }
                    for(var i=0;i<tmp.length;i++){
                        that.templateType.push({name: tmp[i].name,code: tmp[i].code});
                        that.templateTypeForAdd.push({name: tmp[i].name,code: tmp[i].code});
                    }
                })
            }
        }

        //模板类型
        this.getTemplateCate = function(){
            if(this.templateCate.length <= 1){
                this.getData("/cmsapi/template/queryModelCategorys",function(tmp){
                    if(!tmp){
                        return;
                    }
                    for(var i=0;i<tmp.length;i++){
                        that.templateCate.push({name: tmp[i].name,code: tmp[i].code});
                        that.templateCateForAdd.push({name: tmp[i].name,code: tmp[i].code});
                        that.templateCateV2.push({name: tmp[i].name,code: tmp[i].code});
                    }
                })
            }
        }

        //性别
        this.getUserSex = function(){
            if(this.userSex.length <= 1){
                this.getData("/cmsapi/user/querySex",function(tmp){
                    if(!tmp){
                        return;
                    }
                    for(var i=0;i<tmp.length;i++){
                        that.userSex.push({name: tmp[i].name,code: tmp[i].code});
                    }
                })
            }
        }

        //证件类型
        this.getIdType = function(){
            if(this.idType.length <= 1){
                this.getData("/cmsapi/user/queryIdTypes",function(tmp){
                    if(!tmp){
                        return;
                    }
                    for(var i=0;i<tmp.length;i++){
                        that.idType.push({name: tmp[i].name,code: tmp[i].code});
                    }
                })
            }
        }

        //婚姻状态
        this.getMaritalStatus = function(){
            if(this.maritalStatus.length <= 1){
                this.getData("/cmsapi/user/queryMarry",function(tmp){
                    if(!tmp){
                        return;
                    }
                    for(var i=0;i<tmp.length;i++){
                        that.maritalStatus.push({name: tmp[i].name,code: tmp[i].code});
                    }
                })
            }
        }

        //港澳台外
        this.getMacao = function(){
            if(this.macao.length <= 1){
                this.getData("/cmsapi/user/queryMacao",function(tmp){
                    if(!tmp){
                        return;
                    }
                    for(var i=0;i<tmp.length;i++){
                        that.macao.push({name: tmp[i].name,code: tmp[i].code});
                    }
                })
            }
        }

        //课程系列
        this.getKcxl  = function(){
            if(this.kcxl.length <= 1){
                this.getData("/cmsapi/course/xilie",function(tmp){
                    if(!tmp){
                        return;
                    }
                    for(var i=0;i<tmp.length;i++){
                        that.kcxl.push({name: tmp[i].kcxlmc,code: tmp[i].kcxlbh});
                    }
                })
            }
        }

        //学校
        this.getXx = function(){
            if(this.xx.length <= 1){
                this.getData("/cmsapi/tclass/xx",function(tmp){
                    if(!tmp.datas){
                        return;
                    }
                    tmp = tmp.datas;
                    for(var i=0;i<tmp.length;i++){
                        that.xx.push({name: tmp[i].xxmc,code: tmp[i].xxbh});
                    }
                })
            }
        }
        //教育机构学校
        this.getXxAdmin = function(){
            if(this.xxAdmin.length <= 1){
                this.getData("/cmsapi/tclassRegister/xx",function(tmp){
                    if(!tmp.datas){
                        return;
                    }
                    tmp = tmp.datas;
                    for(var i=0;i<tmp.length;i++){
                        that.xxAdmin.push({name: tmp[i].xxmc,code: tmp[i].xxbh});
                    }
                })
            }
        }

        //学年
        this.getXnByXx = function(xxbh,cb){
            this.getData("/cmsapi/tclass/xn?xxbh="+xxbh,function(tmp){
                cb(tmp);
            })
        }

        //年级
        this.getNjByXn = function(xxbh,xn,cb){
            this.getData("/cmsapi/tclass/nj?xxbh="+xxbh+"&xn="+xn,function(tmp){
                cb(tmp);
            })
        }

        //班级
        this.getBjByXnAndNjBh = function(xxbh,xn,njbh,cb){
            this.getData("/cmsapi/tclass/bj?xxbh="+xxbh+"&xn="+xn+"&njbh="+njbh,function(tmp){
                cb(tmp);
            })
        }

        //授课记录课程系列
        this.getCurrentKcxl = function(){
            if(this.kcxlSafe.length <=1){
                this.getData("/cmsapi/course/currentAuthXilie?pageIndex=1&pageSize=100",function(d){
                    if(!d.datas){
                        return;
                    }
                    d = d.datas;
                    for(var i=0;i< d.length;i++){
                        that.kcxlSafe.push({name:d[i].kcxlmc,code:d[i].kcxlbh});
                    }
                })
            }
        }

        //获取当前租户下的课程
        this.getCurrentKeCheng = function(kcxlbh,cb){
            this.getData("/cmsapi/course/currentAuthKeCheng?xlbh="+kcxlbh+"&pageIndex=1&pageSize=100",function(d){
                cb(d);
            })
        }


        //获取省
        this.getProvinces = function(){
            if(this.provinces.length <= 1){
                this.getData("/cmsapi/user/queryProvinces",function(tmp){
                    if(!tmp){
                        return;
                    }
                    for(var i=0;i<tmp.length;i++){
                        that.provinces.push({name: tmp[i].name,code: tmp[i].code});
                    }
                })
            }
        }

        //获取人员类型
        this.getuRylxs = function(){
            if(this.uRylxs.length <= 1){
                this.getData("/cmsapi/dictionary/queryByParentCode?parentCode=user_type",function(tmp){
                    if(!tmp){
                        return;
                    }
                    for(var i=0;i<tmp.length;i++){
                        that.uRylxs.push({name: tmp[i].name,code: tmp[i].code});
                    }
                })
            }
        }

        //获取岗位
        this.getuGws = function(){
            if(this.uGws.length <= 1){
                this.getData("/cmsapi/dictionary/queryByParentCode?parentCode=position",function(tmp){
                    if(!tmp){
                        return;
                    }
                    for(var i=0;i<tmp.length;i++){
                        that.uGws.push({name: tmp[i].name,code: tmp[i].code});
                    }
                })
            }
        }

        //获取所有教室
        this.getClassList = function(){
            if(this.classList.length <= 1){
                this.getData("/cmsapi/tclassRegister/query?pageIndex=1&pageSize=10000",function(tmp){
                    if(!tmp.datas){
                        return;
                    }
                    tmp = tmp.datas;
                    for(var i=0;i<tmp.length;i++){
                        that.classList.push({name: tmp[i].jsmc,code: tmp[i].tanentid,bh:tmp[i].jsbh});
                    }
                })
            }
        }

        //获取教室版本号
        this.getJsVersion = function(){
            if(this.jsVersion.length <= 1){
                this.getData("/cmsapi/dictionary/queryByParentCode?parentCode=jsVersion",function(tmp){
                    if(!tmp){
                        return;
                    }
                    for(var i=0;i<tmp.length;i++){
                        that.jsVersion.push({name: tmp[i].name,code: tmp[i].code});
                    }
                })
            }
        }

        this.NIANJINo = [];
        //获取所有年级
        this.getNianJi = function(){
            if(this.NIANJI.length <= 1){
                this.getData("/cmsapi/dictionary/queryByParentCode?parentCode=NIANJI",function(tmp){
                    if(!tmp){
                        return;
                    }
                    for(var i=0;i<tmp.length;i++){
                        that.NIANJI.push({name: tmp[i].name,code: tmp[i].code,ck:false});
                    }
                })
            }
            if(this.NIANJINo.length == 0){
                this.getData("/cmsapi/dictionary/queryByParentCode?parentCode=NIANJI",function(tmp){
                    if(!tmp){
                        return;
                    }
                    for(var i=0;i<tmp.length;i++){
                        that.NIANJINo.push({name: tmp[i].name,code: tmp[i].code,ck:false});
                    }
                })
            }
        }

        //获取所有课程级别
        this.getCourseLevel = function () {
            if (this.wxCourseLevel.length <= 0) {
                var url = srvDomain + "/Dictionary/QueryByParentCode?parentCode=CourseLevel&pageIndex=1&pageSize=10000";

                this.getData(url, function (tmp) {
                    if (!tmp.datas) {
                        return;
                    }
                    tmp = tmp.datas;
                    for (var i = 0; i < tmp.length; i++) {
                        that.wxCourseLevel.push({ name: tmp[i].name, code: tmp[i].code });
                    }
                })
            }
        }

        //获取所有妈妈微课课程分类
        this.getwxCourseCategoryList = function () {

            if (this.wxCourseCategory.length <= 1) {
                var url = srvDomain + "/CourseCategory/Index?categoryName=&pageIndex=1&pageSize=10000&ran=" + Math.random();
                this.getData(url, function (tmp) {
                    if (!tmp.datas) {
                        return;
                    }
                    tmp = tmp.datas;
                    for (var i = 0; i < tmp.length; i++) {
                        that.wxCourseCategory.push({ name: tmp[i].Name, code: tmp[i].ID });
                    }
                })
            }
        }
        //获取所有妈妈微课教师
        this.getwxWeiTeacherList = function () {

            if (this.wxWeiTeacher.length <= 1) {
                var url = srvDomain + "/WeiTeacher/Index?teacherName=&pageIndex=1&pageSize=10000&ran=" + Math.random();
                this.getData(url, function (tmp) {
                    if (!tmp.datas) {
                        return;
                    }
                    tmp = tmp.datas;
                    for (var i = 0; i < tmp.length; i++) {
                        that.wxWeiTeacher.push({ name: tmp[i].Name, code: tmp[i].ID });
                    }
                })
            }
        }

        //获取所有学校
        this.getwxSchoolList = function () {

            if (this.wxSchool.length <= 0) {

                var url = srvDomain + "/School/Index?schoolName=&pageIndex=1&pageSize=10000&ran=" + Math.random();
                this.getData(url, function (tmp) {
                    if (!tmp.datas) {
                        return;
                    }
                    tmp = tmp.datas;
                    for (var i = 0; i < tmp.length; i++) {
                        that.wxSchool.push({ name: tmp[i].SchoolName, code: tmp[i].SchoolID });
                    }
                })
            }
        }


        //获取所有妈妈微课课程标签
        this.getwxCourseLabelList = function () {

            if (this.wxCourseLabel.length <= 0) {
                var url = srvDomain + "/CourseLabel/Index?labelName=&pageIndex=1&pageSize=10000&ran=" + Math.random();
                this.getData(url, function (tmp) {
                    if (!tmp.datas) {
                        return;
                    }
                    tmp = tmp.datas;
                    for (var i = 0; i < tmp.length; i++) {
                        that.wxCourseLabel.push({ name: tmp[i].LabelName, code: tmp[i].ID });
                    }
                })
            }
        }

        //获取所有安全课程分类
        this.getwxSafeCategoryList = function () {

            if (this.wxSafeCategory.length <= 1) {
                var url = srvDomain + "/SafeCategory/Index?categoryName=&pageIndex=1&pageSize=10000&ran=" + Math.random();
                this.getData(url, function (tmp) {
                    if (!tmp.datas) {
                        return;
                    }
                    tmp = tmp.datas;
                    for (var i = 0; i < tmp.length; i++) {
                        that.wxSafeCategory.push({ name: tmp[i].Name, code: tmp[i].ID });
                    }
                })
            }
        }

        //获取所有公众账号
        this.getwxOfficalAccountList = function () {

            if (this.wxOfficalAccount.length <= 1) {
                var url = srvDomain + "/OfficalAccount/Index?officalName=&OfficalCode=&status=&verifyStatus=&pageIndex=1&pageSize=10000&ran=" + Math.random();
                this.getData(url, function (tmp) {
                    if (!tmp.datas) {
                        return;
                    }
                    tmp = tmp.datas;
                    for (var i = 0; i < tmp.length; i++) {
                        that.wxOfficalAccount.push({ name: tmp[i].OfficalName, code: tmp[i].ID });
                    }
                })
            }
        }
        //获取作业评分规则
        this.getwxHomeworkScoreRuleList = function () {

            if (this.wxHomeworkScoreRule.length <= 0) {
                var url = srvDomain + "/Dictionary/QueryHomeworkScoreRule?pageIndex=1&pageSize=10000&ran=" + Math.random();
                this.getData(url, function (tmp) {
                    if (!tmp.datas) {
                        return;
                    }
                    tmp = tmp.datas;
                    for (var i = 0; i < tmp.length; i++) {
                        that.wxHomeworkScoreRule.push({ ID: tmp[i].ID, ScoreBegin: tmp[i].ScoreBegin, ScoreEnd: tmp[i].ScoreEnd, StudyBean: tmp[i].StudyBean });
                    }
                })
            }
        }

        //获取所有考试类别
        this.getwxExamCategory = function () {
            if (this.wxExamCategory.length <= 0) {
                var url = srvDomain + "/Dictionary/QueryByParentCode?parentCode=ExamCategory&pageIndex=1&pageSize=10000";

                this.getData(url, function (tmp) {
                    if (!tmp.datas) {
                        return;
                    }
                    tmp = tmp.datas;
                    for (var i = 0; i < tmp.length; i++) {
                        that.wxExamCategory.push({ name: tmp[i].name, code: tmp[i].code });
                    }
                })
            }
        }

        //时间转换
        this.getCDate = function(date){
            if(date == ""){
                return "";
            }
            return new Date(date).format();
        }

        //时间转换
        this.getCDateTime = function(date){
            if(date == ""){
                return "";
            }
            return new Date(date).formatTime();
        }

        this.init = function(){
            console.log("初始化枚举服务!");
            this.getTemplateCate();
            this.getTemplateType();
            this.getUserSex();
            this.getIdType();
            this.getMaritalStatus();
            this.getMacao();
            this.getKcxl();
            this.getXx();
            this.getXxAdmin();
            this.getProvinces();
            this.getuRylxs();
            this.getuGws();
            this.getClassList();
            this.getCurrentKcxl();
            this.getJsVersion();
            this.getNianJi();
            this.getwxCourseCategoryList();
            this.getwxWeiTeacherList();
            this.getwxSchoolList();
            this.getwxCourseLabelList();
            this.getwxSafeCategoryList();
            this.getwxOfficalAccountList();
            this.getCourseLevel();
            this.getwxHomeworkScoreRuleList();
            this.getwxExamCategory();
        }
    }

    return new enumHelp();
})