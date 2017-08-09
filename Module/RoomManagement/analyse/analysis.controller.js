angular.module('app')
    .controller('evaluateListCtl', function ($http,$scope,enume,$state) {})

    .controller('evaluateDetailCtl',function($http,$scope,enume,$state,$stateParams){
        $scope.entity = {id:$stateParams.id};
    })

    .controller('statisticsListCtl',function($http,$scope,enume,$state){})

    .controller('statisticsDetail',function($http,$scope,enume,$state,$stateParams){
        $scope.entity = {id:$stateParams.id};
    })

    .controller('proSortCtrl',function($http,$scope,enume,$state,$stateParams){

        $scope.proList = [];

        $scope.getUrl = function(){
            return "/cmsapi/course/queryCourseRanking?1=1";
        }

        $scope.directiveCallBack = function(d){
            $scope.proList = d;
        }

        $scope.previewPro = function(item){
            $state.go("roomManage.productPreview",{id:item.courseCode});
        }

    })