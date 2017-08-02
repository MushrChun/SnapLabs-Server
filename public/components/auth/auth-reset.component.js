'use strict';

angular.module('snaplab.auth')
.component('reset', {
    templateUrl:'components/auth/auth-reset.template.html',
    controller: ['$rootScope', '$http', 'auth', '$state', function ($rootScope, $http, auth, $state) {
        var self = this;

        self.resetpw = function() {
            var validJudgement = angular.isDefined(self.token) && angular.isDefined(self.password);
            if(validJudgement){
                $http.post('auth/reset', {token: self.token, password: self.password})
                    .then(
                        function successCallback(response) {
                            $state.go('welcome');
                            $rootScope.addAlert({ type:'success', msg:'password has been reset' });
                        },
                        function failCallback(response) {
                            $rootScope.addAlert({ type:'danger', msg:'Send Reset Request Fail' });
                        })
            }else{
                $rootScope.addAlert({ type:'danger', msg:'Send Reset Request Incomplete' });
            }
        }
    }]
});