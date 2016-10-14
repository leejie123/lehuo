// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.service', 'ngCordova'])
// .config(function() {
//   $ionicConfigProvider.backButton.text('Goback').icon('ion-chevron-back')
// })
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('page', {
    url: '/'
  })

    .state('app', {
    url: '/app',
    abstract: true, 
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.main', {
    url: '/main',
    views: {
      'menuContent': {
        templateUrl: 'templates/main.html'
      }
    }
  })

  .state('app.Detail', {
    url: '/Detail/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/Detail.html',
        controller: 'Detail'
      }
    }
  })

  .state('app.collection',{
    url: '/collection',
    views: {
      'menuContent': {
        templateUrl:'templates/collection.html',
        controller: 'collection'
      }
    }
  })

  .state('app.myMagazine', {
    url: '/myMagazine/:sort',
    views: {
      'menuContent': {
        templateUrl: 'templates/myMagazine.html',
        controller: 'myMagazine'
      }
    }
  })

  .state('app.magazineInner', {
    url: '/magazineInner/:id',
    views: {
      'menuContent':{
        templateUrl: 'templates/magazineInner.html',
        controller: 'magazineInner'
      }
    }
  })

  .state('app.topice', {
    url:'/topice/:item',
    views: {
      'menuContent': {
        templateUrl: 'templates/topice.html',
        controller: 'topice'
      }
    }
    })

  .state('app.setting', {
    url: '/setting',
    views: {
      'menuContent': {
        templateUrl: 'templates/setting.html',
        controller: 'setting'
      }
    }
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
  //   .state('app.playlists', {
  //     url: '/playlists',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/playlists.html',
  //         controller: 'PlaylistsCtrl'
  //       }
  //     }
  //   })

  // .state('app.single', {
  //   url: '/playlists/:playlistId',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/playlist.html',
  //       controller: 'PlaylistCtrl'
  //     }
  //   }
  // }) 

  .state('app.aboutus', {
    url: '/aboutus',
    views: {
      'menuContent': {
        templateUrl: 'templates/aboutUs.html',
        controller: 'aboutus'
      }
    }
  })

  .state('app.square', {
    url: '/square',
    views: {
      'menuContent': {
        templateUrl: 'templates/Square.html',
        controller: 'square'
      }
    }
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/Square.html',
        controller: 'home'
      }
    }
  })

  .state('app.community', {
    url: '/community',
    views:{
      'menuContent': {
        templateUrl: 'templates/community.html',
        controller: 'community'
      }
    }
  })

  .state('app.appStory', {
    url: '/appStory',
    views: {
      'menuContent':{
        templateUrl: 'templates/appStory.html'
      }
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/aboutus');
});
