/**
 * Created by carol on 16/5/18.
 */
'use strict';

angular.module('app').config(function($stateProvider){
    $stateProvider
        .state('roomManage',{
            url: '/roomManage',
            templateUrl: "./Module/RoomManagement/main/managerment.html"
        })
        //教室管理
        .state('roomManage.roomList', {
            url: '/roomList',
            params:{entity:{}},
            templateUrl: "./Module/RoomManagement/classRoom/roomList.html",
            controller: 'roomListCtl'
        })
        .state('roomManage.register',{
            url:'/roomRegister',
            params:{entity:{}},
            templateUrl:"./Module/RoomManagement/classRoom/registerRoom.html",
            controller:"registerRoomCtl"
        })
        .state('roomManage.productList',{
            url:'/productList',
            params:{entity:{}},
            templateUrl:"./Module/RoomManagement/classRoom/productList.html",
            controller:"productListCtl"
        })
        .state('roomManage.productPreview',{
            url:'/productPreview/:id',
            params:{entity:{}},
            templateUrl:"./Module/RoomManagement/classRoom/productPreview.html",
            controller:"productPreviewCtl"
        })
        .state('roomManage.createProduct', {
            url: '/createProduct',
            params:{entity:{}},
            templateUrl: "./Module/RoomManagement/classRoom/createProduct.html",
            controller: 'createProductCtl'
        })
        .state('roomManage.warrant', {
            url: '/warrant',
            params:{entity:{}},
            templateUrl: "./Module/RoomManagement/classRoom/warrant.html",
            controller: 'warrantCtl'
        })
        .state('roomManage.decoration', {
            url: '/decoration',
            params:{entity:{}},
            templateUrl: "./Module/RoomManagement/classRoom/decoration.html",
            controller: 'decorationCtl'
        })
        .state('roomManage.pushBullet',{
            url:'/pushBullet',
            params:{entity:{}},
            templateUrl:"./Module/RoomManagement/classRoom/pushBullet.html",
            controller:"pushBulletCtl"
        })
        //数据分析
        .state('roomManage.evaluateList',{
            url:'/evaluateList',
            params:{entity:{}},
            templateUrl:"./Module/RoomManagement/analyse/evaluateList.html",
            controller:"evaluateListCtl"
        })
        .state('roomManage.evaluateDetail', {
            url: '/evaluateList/:id',
            params:{entity:{}},
            templateUrl: "./Module/RoomManagement/analyse/evaluateDetail.html",
            controller: 'evaluateDetailCtl'
        })
        .state('roomManage.statisticsList', {
            url: '/statisticsList',
            params:{entity:{}},
            templateUrl: "./Module/RoomManagement/analyse/statisticsList.html",
            controller: 'statisticsListCtl'
        })
        .state('roomManage.statisticsDetail',{
            url:'/statisticsList/:id',
            params:{entity:{}},
            templateUrl:"./Module/RoomManagement/analyse/statisticsDetail.html",
            controller:"statisticsDetail"
        })
        .state('roomManage.dictionary',{
            url:'/dictionary',
            params:{entity:{}},
            templateUrl:'./Module/RoomManagement/other/dictionary.html',
            controller:'dictionaryCtrl'
        })
        .state('roomManage.report',{
            url:'/reports',
            params:{entity:{}},
            templateUrl:'./Module/RoomManagement/other/reports.html',
            controller:'reportsCtrl'
        })
        .state('roomManage.templateCreate',{
            url:'/createTemplate',
            params:{entity:{}},
            templateUrl:'./Module/RoomManagement/other/createTemplate.html',
            controller:'createTemplateCtrl'
        })
        .state('roomManage.templateList',{
            url:'/templateList',
            params:{entity:{}},
            templateUrl:'./Module/RoomManagement/other/templateList.html',
            controller:'templateListCtrl'
        })
        .state('roomManage.editPwd',{
            url:'/editPwd',
            params:{entity:{}},
            templateUrl:'./Module/RoomManagement/other/editPwd.html',
            controller:'editPwdCtrl'
        })
        .state('roomManage.proSort',{
            url:'/proSort',
            params:{entity:null},
            templateUrl:'./Module/RoomManagement/analyse/proSort.html',
            controller:'proSortCtrl'
        })
        //公众账号管理
        .state('roomManage.officalAccountList', {
            url: '/officalAccountList',
            params: { entity: {} },
            templateUrl: "./Module/RoomManagement/officalAccount/officalAccountList.html" ,
            controller: "officalAccountListCtl"
        })
        .state('roomManage.createOfficalAccount', {
            url: '/createOfficalAccount',
            params: { entity: {} },
            templateUrl: "./Module/RoomManagement/officalAccount/createOfficalAccount.html",
            controller: 'createOfficalAccountCtl'
        })
        .state('roomManage.createSettledSchool', {
            url: '/createSettledSchool',
            params: { entity: { tag: "settleschool" } },
            templateUrl: "./Module/RoomManagement/officalAccount/createSettledSchool.html",
            controller: 'createOfficalAccountCtl'
        })
        //公众账号菜单管理
         .state('roomManage.accountMenuList', {
             url: '/accountMenuList',
             params: { entity: {} },
             templateUrl: "./Module/RoomManagement/accountMenu/accountMenuList.html",
             controller: "accountMenuListCtl"
         })
        .state('roomManage.createAccountMenu', {
            url: '/createAccountMenu',
            params: { entity: {} },
            templateUrl: "./Module/RoomManagement/accountMenu/createAccountMenu.html",
            controller: 'createAccountMenuCtl'
        })
        //学校管理
        .state('roomManage.schoolList', {
            url: '/schoolList',
            params: { entity: {} },
            templateUrl: "./Module/RoomManagement/school/schoolList.html",
            controller: "schoolListCtl"
        })
        .state('roomManage.createSchool', {
            url: '/createSchool',
            params: { entity: {} },
            templateUrl: "./Module/RoomManagement/school/createSchool.html",
            controller: 'createSchoolCtl'
        })
        //学校通知管理
        .state('roomManage.notificationList', {
            url: '/notificationList',
            params: { entity: {} },
            templateUrl: "./Module/RoomManagement/notification/notificationList.html",
            controller: "notificationListCtl"
        })
        .state('roomManage.createNotification', {
            url: '/createNotification',
            params: { entity: {} },
            templateUrl: "./Module/RoomManagement/notification/createNotification.html",
            controller: 'createNotificationCtl'
        })
        //微课管理
        //课程分类
         .state('roomManage.courseCategoryList', {
             url: '/courseCategoryList',
             params: { entity: {} },
             templateUrl: "./Module/RoomManagement/courseCategory/courseCategoryList.html",
             controller: "courseCategoryListCtl"
         })
        .state('roomManage.createCourseCategory', {
            url: '/createCourseCategory',
            params: { entity: {} },
            templateUrl: "./Module/RoomManagement/courseCategory/createCourseCategory.html",
            controller: 'createCourseCategoryCtl'
        })

        //微课标签
         .state('roomManage.courseLabelList', {
             url: '/courseLabelList',
             params: { entity: {} },
             templateUrl: "./Module/RoomManagement/courseLabel/courseLabelList.html",
             controller: "courseLabelListCtl"
         })
        .state('roomManage.createCourseLabel', {
            url: '/createCourseLabel',
            params: { entity: {} },
            templateUrl: "./Module/RoomManagement/courseLabel/createCourseLabel.html",
            controller: 'createCourseLabelCtl'
        })

         //微课
         .state('roomManage.courseList', {
             url: '/courseList',
             params: { entity: {} },
             templateUrl: "./Module/RoomManagement/course/courseList.html",
             controller: "courseListCtl"
         })
        .state('roomManage.createCourse', {
            url: '/createCourse',
            params: { entity: {} },
            templateUrl: "./Module/RoomManagement/course/createCourse.html",
            controller: 'createCourseCtl'
        })

        //微课教师
         .state('roomManage.weiTeacherList', {
             url: '/weiTeacherList',
             params: { entity: {} },
             templateUrl: "./Module/RoomManagement/weiTeacher/weiTeacherList.html",
             controller: "weiTeacherListCtl"
         })
        .state('roomManage.createWeiTeacher', {
            url: '/createWeiTeacher',
            params: { entity: {} },
            templateUrl: "./Module/RoomManagement/weiTeacher/createWeiTeacher.html",
            controller: 'createWeiTeacherCtl'
        })

          //会员管理
         .state('roomManage.memberList', {
             url: '/memberList',
             params: { entity: {} },
             templateUrl: "./Module/RoomManagement/member/memberList.html",
             controller: "memberListCtl"
         })
        .state('roomManage.createMember', {
            url: '/createMember',
            params: { entity: {} },
            templateUrl: "./Module/RoomManagement/member/createMember.html",
            controller: 'createMemberCtl'
        })

         //安全课程管理
        //安全课程分类
         .state('roomManage.safeCategoryList', {
             url: '/safeCategoryList',
             params: { entity: {} },
             templateUrl: "./Module/RoomManagement/safeCategory/safeCategoryList.html",
             controller: "safeCategoryListCtl"
         })
        .state('roomManage.createSafeCategory', {
            url: '/createSafeCategory',
            params: { entity: {} },
            templateUrl: "./Module/RoomManagement/safeCategory/createSafeCategory.html",
            controller: 'createSafeCategoryCtl'
        })

         //安全课程
         .state('roomManage.safeCourseList', {
             url: '/safeCourseList',
             params: { entity: {} },
             templateUrl: "./Module/RoomManagement/safeCourse/safeCourseList.html",
             controller: "safeCourseListCtl"
         })
        .state('roomManage.createSafeCourse', {
            url: '/createSafeCourse',
            params: { entity: {} },
            templateUrl: "./Module/RoomManagement/safeCourse/createSafeCourse.html",
            controller: 'createSafeCourseCtl'
        })
         //作业路由
        .state('roomManage.homeworkCreate', {
            url: '/createHomework',
            params: { entity: {} },
            templateUrl: './Module/RoomManagement/homework/createHomework.html',
            controller: 'createHomeworkCtrl'
        })
        .state('roomManage.homeworkList', {
            url: '/homeworkList',
            params: { entity: { Type: "0" } },
            templateUrl: './Module/RoomManagement/homework/homeworkList.html',
            controller: 'homeworkListCtrl'
        })
        //作业题目路由
        .state('roomManage.questionCreate', {
            url: '/createQuestion',
            params: { entity: {} },
            templateUrl: './Module/RoomManagement/question/createQuestion.html',
            controller: 'createQuestionCtrl'
        })
        .state('roomManage.questionList', {
            url: '/questionList',
            params: { entity: {} },
            templateUrl: './Module/RoomManagement/question/questionList.html',
            controller: 'questionListCtrl'
        })
        //调查问卷 
        .state('roomManage.investigateList', {
            url: '/investigateList',
            params: { entity: { Type: "1" } },
            templateUrl: './Module/RoomManagement/homework/investigateList.html',
            controller: 'investigateListCtrl'
        })
       //学豆奖励规
         .state('roomManage.scoreRuleList', {
             url: '/scoreRuleList',
             params: { entity: {} },
             templateUrl: "./Module/RoomManagement/scoreRule/scoreRuleList.html",
             controller: "scoreRuleListCtl"
         })
        .state('roomManage.createScoreRule', {
            url: '/createScoreRule',
            params: { entity: {} },
            templateUrl: "./Module/RoomManagement/scoreRule/createScoreRule.html",
            controller: 'createScoreRuleCtl'
        })
});