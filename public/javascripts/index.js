/**
 * Created by MushrChun on 16/5/17.
 */
angular.module('snaplab', [ 'ui.bootstrap','ui.router', 'ui.toggle']);

angular.module('snaplab').config(function($stateProvider, $urlRouterProvider) {
    var indexState = {
        name: 'index',
        url: '/index',
        templateUrl: 'templates/index.html'
    };

    var aboutState = {
        name: 'about',
        url: '/about',
        templateUrl: 'templates/about.html'
    };

    var designState = {
        name: 'design',
        url: '/design',
        templateUrl: 'templates/design.html'
    };

    var downloadState = {
        name: 'download',
        url: '/download',
        templateUrl: 'templates/download.html'
    };

    var signinState = {
        name: 'signin',
        url: '/signin',
        templateUrl: 'templates/signin.html'
    };

    var signupState = {
        name: 'signup',
        url: '/signup',
        templateUrl: 'templates/signup.html'
    };

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('zone', {
        url: '/',
        templateUrl: 'templates/index.html',
    });
    $stateProvider.state(indexState);
    $stateProvider.state(aboutState);
    $stateProvider.state(designState);
    $stateProvider.state(downloadState);
    $stateProvider.state(signinState);
    $stateProvider.state(signupState);
});

angular.module('snaplab').run(function($rootScope, $transitions, authentication){
    $rootScope.isLogin = authentication.isLoggedIn(authentication.getToken());
    if($rootScope.isLogin){
        $rootScope.email = authentication.getLoginUser();
    }
    $transitions.onStart({ to: 'design.**' }, function(trans) {

        if (!$rootScope.isLogin) {
            return trans.router.stateService.target('signin');
        }
    });
});


angular.module('snaplab').controller('NavCtrl', function ($scope, $rootScope, authentication) {
    $scope.isNavCollapsed = true;
    $scope.isCollapsed = false;
    $scope.isCollapsedHorizontal = false;
    $scope.logout = function(){
        authentication.logout();
        $rootScope.isLogin = false;
    }
});

angular.module('snaplab').controller('NotificationCtrl', function ($scope, $rootScope) {
    $scope.alerts = [
        { type: 'warning', msg: 'This website is for Test only' }
    ];

    $rootScope.addAlert = function(content) {
        $scope.alerts.push(content);
    };

    $rootScope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});

angular.module('snaplab').controller('MainCarouselCtrl', function ($scope) {
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    $scope.slides = [
        {
            image: '/images/asell-schools-button.jpg',
            text: 'asell-schools-button',
            id: 0
        },
        {
            image: '/images/asell-uni-button.jpg',
            text: 'asell-uni-button',
            id: 1
        }
    ];
})

angular.module('snaplab').controller('ExpListCtrl', function ($scope, $http, authentication) {

    $http.get('experiment')
        .then(function(response) {
            $scope.list = response.data;
            $scope.totalItems = response.data.length;
            $scope.currentPage = 1;
            $scope.maxSize = 5;

            $scope.currentList = [];
            for(var i = 0; i < 10 && i<$scope.totalItems;i++){
                $scope.currentList.push($scope.list[i]);
            }
        });

    $scope.pageChanged = function() {
        $scope.currentList = [];
        for(var i = ($scope.currentPage-1)*10; i < $scope.currentPage*10 && i<$scope.totalItems; i++){
            $scope.currentList.push($scope.list[i]);
        }
    };

})

angular.module('snaplab').controller('SignUpCtrl', function ($scope, $rootScope, $http) {
    $scope.signUp = function() {
        var email = $scope.email;
        var password = $scope.password;
        var repassword = $scope.repassword;
        if(password && password == repassword && email){
            $http.post('auth/signup', {email: email, password: password})
                .then(
                    function successCallback(response) {
                        window.location.href = "/#!/signin";
                        $rootScope.addAlert({ type:'success', msg:'Sign Up Success' });
                        },
                    function failCallback(response) {
                        $rootScope.addAlert({ type:'danger', msg:'Sign Up Fail' });
                    }
                )
        }else{
            $rootScope.addAlert({ type:'danger', msg:'Sign Up Information Incorrect' });
        }
    }
})

angular.module('snaplab').controller('SignInCtrl', function ($scope, $rootScope, $http, authentication) {
    $scope.signIn = function() {
        var email = $scope.email;
        var password = $scope.password;

        var invalidJudgement = $scope.sign.email.$invalid || $scope.sign.password.$invalid;
        if(!invalidJudgement){
            $http.post('auth/signin', {email: email, password: password})
                .then(
                    function successCallback(response) {
                        authentication.saveToken(response.data.token);
                        $rootScope.isLogin = true;
                        $rootScope.email = authentication.getLoginUser();
                        $rootScope.addAlert({ type:'success', msg:'Sign In Success' });
                        window.location.href = "/#!/";
                    },
                    function failCallback(response) {
                        $rootScope.addAlert({ type:'danger', msg:'Sign In Fail' });
                    })
        }else{
            $rootScope.addAlert({ type:'danger', msg:'Sign In Information Incomplete' });
        }
    }
})

angular.module('snaplab').controller('DesignCtrl', function ($scope, $rootScope, $http, authentication) {

    var defaultSensorTag = {
        "connect" : true,
        "title" : "SensorTag",
        "sensors" : {
            "Gyroscope" : {
                "grid" : {
                    "griddisplay" : false,
                    "columns" : "4",
                    "rows" : "4"
                },
                "data" : {
                    "display" : false,
                    "label" : "Gyroscope"
                },
                "graph" : {
                    "graphType" : "spline",
                    "graphTitle" : "Gyroscope Graph",
                    "graphXAxis" : "Time (s)",
                    "graphYAxis" : "Gyroscope"
                },
                "captureOnClick" : false
            },
            "Temperature" : {
                "data" : {
                    "display" : false,
                    "label" : "Temperature"
                },
                "graph" : {
                    "display":true,
                    "graphType" : "spline",
                    "graphTitle" : "Temperature Graph",
                    "graphXAxis" : "Time (s)",
                    "graphYAxis" : "Temperature"
                },
                "captureOnClick" : true,
                "grid" : {
                    "griddisplay" : true,
                    "columns" : "4",
                    "rows" : "4"
                },
                "parameters" : {
                    "ambient" : true,
                    "IR" : true
                }
            },
            "Humidity" : {
                "data" : {
                    "display" : true,
                    "label" : "Humidity"
                },
                "graph" : {
                    "display":true,
                    "graphType" : "spline",
                    "graphTitle" : "Humidity Graph",
                    "graphXAxis" : "Time (s)",
                    "graphYAxis" : "Humidity"
                },
                "captureOnClick" : false,
                "grid" : {
                    "griddisplay" : false,
                    "columns" : "4",
                    "rows" : "4"
                }
            },
            "Barometer" : {
                "data" : {
                    "display" : false,
                    "label" : "Barometer"
                },
                "graph" : {
                    "graphType" : "spline",
                    "graphTitle" : "Barometer Graph",
                    "graphXAxis" : "Time (s)",
                    "graphYAxis" : "Barometer"
                },
                "captureOnClick" : false,
                "grid" : {
                    "griddisplay" : false,
                    "columns" : "4",
                    "rows" : "4"
                }
            },
            "Accelerometer" : {
                "data" : {
                    "display" : false,
                    "label" : "Accelerometer"
                },
                "graph" : {
                    "graphType" : "spline",
                    "graphTitle" : "Accelerometer Graph",
                    "graphXAxis" : "Time (s)",
                    "graphYAxis" : "Accelerometer"
                },
                "captureOnClick" : false,
                "grid" : {
                    "griddisplay" : false,
                    "columns" : "4",
                    "rows" : "4"
                }
            },
            "Magnetometer" : {
                "data" : {
                    "display" : true,
                    "label" : "Magnetometer"
                },
                "graph" : {
                    "graphdisplay" : false,
                    "graphType" : "spline",
                    "graphTitle" : "Magnetometer Graph",
                    "graphXAxis" : "Time (s)",
                    "graphYAxis" : "Magnetic Flux (microT)"
                },
                "captureOnClick" : false,
                "grid" : {
                    "griddisplay" : true,
                    "columns" : "5",
                    "rows" : "5"
                },
                "parameters" : {
                    "xyz" : false,
                    "scalar" : true
                }
            },
            "Luxometer" : {
                "data" : {
                    "display" : false,
                    "label" : "Luxometer"
                },
                "graph" : {
                    "graphType" : "spline",
                    "graphTitle" : "Luxometer Graph",
                    "graphXAxis" : "Time (s)",
                    "graphYAxis" : "Luxometer"
                },
                "captureOnClick" : false,
                "grid" : {
                    "griddisplay" : false,
                    "columns" : "4",
                    "rows" : "4"
                }
            }
        }
    }

    $scope.expTitle = 'SensorTag Investigation';
    $scope.sampleInterval = 1000;
    $scope.sampleRateStr = 'select';
    $scope.allowDataStorage = false;
    $scope.allowVideo = false;
    $scope.autoStartGraphs = false;

    $scope.sensorTag = [];
    $scope.sensorTag.push(defaultSensorTag);
    $scope.setSampleRate = function(data, str){
        console.log(data);
        $scope.sampleRateStr = str;
        $scope.sampleInterval = 1000/data;
    }
    $scope.duplicate = function(data){
        var newSensorTag = JSON.parse(JSON.stringify(data));
        $scope.sensorTag.push(newSensorTag);
    }
    $scope.store = function(){
        var expCfg = {};
        expCfg.videoAllowed = $scope.allowVideo;
        expCfg.videoPrefix = $scope.expTitle + 'Video';
        expCfg.dataStorageAllowed = $scope.allowDataStorage;
        expCfg.dataStoragePrefix = $scope.expTitle + 'Data';
        expCfg.graphAutoStart = $scope.autoStartGraphs;
        expCfg.labTitle = $scope.expTitle;
        expCfg.sampleInterval = $scope.sampleInterval;
        expCfg.description = $scope.expDesc;
        var sensorTagDict = {};
        for(var i in $scope.sensorTag){
            sensorTagDict[i] = $scope.sensorTag[i]
        }
        expCfg.sensorTags = sensorTagDict;
        var postCfg = {};
        postCfg.headers = authentication.genHeader(authentication.getToken());

        if(expCfg.description && expCfg.labTitle){
            $http.post('experiment', expCfg, postCfg)
                .then(
                    function successCallback(successResponse){
                        window.location.href = "/#!/";
                        $rootScope.addAlert({ type:'success', msg:'Add Experiment Success' });
                        },
                    function failCallback(failResponse){
                        $rootScope.addAlert({ type:'danger', msg:'Add Experiment Fail' })
                    });
        }else{
            $rootScope.addAlert({ type:'danger', msg:'Experiment Info Incomplete' });
        }
    }


})

angular.module('snaplab').service('authentication', ['$http', '$window', '$rootScope', function ($http, $window, $rootScope) {

    var payload;

    var isLoggedIn = function(token) {

        if(token){
            payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    var getLoginUser = function() {
        console.log(payload);
        return payload.email;
    }

    var genHeader = function(token) {
        return {Authorization: 'Bearer '+ token};
    }

    var saveToken = function (token) {
        if(token){
            payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
        }
        $window.localStorage['mean-token'] = token;
    };

    var getToken = function () {
        return $window.localStorage['mean-token'];
    };

    var logout = function () {
        $window.localStorage.removeItem('mean-token');
        $rootScope.addAlert({ type:'success', msg:'Logout Success' });
        window.location.href = "/#!/";
    };

    return {
        saveToken: saveToken,
        getToken: getToken,
        logout: logout,
        isLoggedIn: isLoggedIn,
        getLoginUser: getLoginUser,
        genHeader: genHeader
    };
}]);


