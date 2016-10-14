angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $http, $ionicModal, $location, $ionicLoading, $ionicActionSheet, $timeout, $ionicPopup, $ionicScrollDelegate) {
  // $http({
  //   method: 'post',
  //   url: 'qu',
  //   data: {},
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  //   },
  //   transformRequest: function(obj) {
  //     return str.push('xx')
  //   }
  // }).success(function(req) {
  //   console.log(req);
  // })
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  // ROOT_PATH = "http://localhost:8100/templates/";
  ROOT_PATH = "templates/";
  homeUrl = ROOT_PATH + 'home.json';
  var followingUrl = ROOT_PATH + 'following.json';

  // 一页多用
  $scope.isHome = true;


  $scope.loginData = {};

  $scope.share = function () {
    var share = $ionicActionSheet.show({
      buttons:[
        {
          text: '分享到微信 <i class="icon ion-share"></i>',
          cssClass: 'button-assertive'
        },
        {
          text: '分享到微博 <i class="icon ion-no-smoking"></i>',
          cssClass: 'button-assertive',
          // buttonClicked: function() {
          //   alert(this.text)
          // }
        }
      ],
      // destructiveText: 'delete',
      titleText: 'Share',
      cancelText: 'cancel',
      cssClass: 'button-assertive',
      cancel: function() {
      },
      buttonClicked: function(index, item) {
        console.log(this.buttons)
      }
    })
  }

  $scope.showAlert = function(title, content) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: content
    })
  }

  $scope.scrollTop = function() {
    $ionicScrollDelegate.$getByHandle('small').scrollBy(0, 127, false)
  }
 
  $scope.showLoading = function() {
      $ionicLoading.show('成功');
  }

  $scope.closeLoading = function() {
    $ionicLoading.hide();
  }
 
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal_login = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal_login.hide();
    if (!$scope.isLogin) {
      $location.path('/app/aboutus');
    }
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal_login.show();
  };

  // Perform the login action when the user submits the login form
  $scope.isLogin = false;
  $scope.loginData = {
    username: 'liduanjie',
    password: '123'
  }
  // logout
  $scope.doLogout = function() {
    $scope.loginData = {
      username: null,
      password: null
    }
    $scope.user = null;
    $scope.isLogin = false
    return;
  }

  $scope.userDefault = {
    "username": "testing",
    "password": "testing",
    "note": "0",
    "follower": "0",
    "following": "0",
    "avatar": "http://placehold.it/100x100?text=testing",
    "new": " ",
    "message": "",
    "forum": ""
  };

  $ionicModal.fromTemplateUrl('following.html', {
    scope:$scope,
  }).then(function(modal){
    $scope.modal_following = modal;
  })

  $scope.showFollowing = function(type) {
    $scope.modal_following.show();
    switch (type) {
      case 'recommand':

        $scope.recommandFollowing = 
        {
          "type": 'recommand',
          "title": '推荐关注',
          "content": [ 
            {
              "name":"1",
              "note": "2",
              "img": "http://placehold.it/200x200",
              'user_id': '10'
            },
            {
              "name":"222",
              "note": "2",
              "img": "http://placehold.it/200x200",
              'user_id':'11'
            },
            {
              "name":"333",
              "note": "2",
              "img": "http://placehold.it/200x200",
              'user_id':'12'
            },
            {
              "name":"444",
              "note": "2",
              "img": "http://placehold.it/200x200",
              'user_id':'13'
            },
            {
              "name":"555",
              "note": "2",
              "img": "http://placehold.it/200x200",
              'user_id':'14'
            },
            {
              "name":"recommand",
              "note": "2",
              "img": "http://placehold.it/200x200",
              'user_id':'114'
            }
          ]
        };
        $scope.concern = function(user_id) {
          angular.forEach($scope.recommandFollowing.content, function(value, key) {
            if (value.user_id == user_id) {
              $scope.recommandFollowing.content.splice(key, 1);
              $scope.user.following = parseInt($scope.user.following) - 1;
              return;
            }
          })
        };
        break;
      case 'following': 
        $scope.recommandFollowing =  
        {
          "type": 'following',
          "title": '我关注的人',
          "content": [
            {
              "name":"follower",
              "note": "2",
              "img": "http://placehold.it/200x200",
              "user_id": "1"
            },
            {
              "name":"follower",
              "note": "2",
              "img": "http://placehold.it/200x200",
              "user_id": "2"
            },
            {
              "name":"follower",
              "note": "2",
              "img": "http://placehold.it/200x200",
              "user_id": "3"
            },
            {
              "name":"follower",
              "note": "2",
              "img": "http://placehold.it/200x200",
              "user_id": "4"
            },
            {
              "name":"follower",
              "note": "2",
              "img": "http://placehold.it/200x200",
              "user_id": "5"
            },
            {
              "name":"follower",
              "note": "2",
              "img": "http://placehold.it/200x200",
              "user_id": "6"
            }
          ]
        };
        $scope.cancelConcern = function(user_id) {
          angular.forEach($scope.recommandFollowing.content, function(value, key) {
            if (value.user_id == user_id) {
              $scope.recommandFollowing.content.splice(key, 1);
              $scope.user.following = parseInt($scope.user.following) - 1;
              return;
            }
          })
        };
        break;
      case "follower": 
        $scope.recommandFollowing =  
          {
            "type": 'follower',
            "title": '关注我的人',
            "content":[
            {
              "name":"following",
              "note": "2",
              "img": "http://placehold.it/200x200",
              "user_id": '20'
            },
            {
              "name":"following",
              "note": "2",
              "img": "http://placehold.it/200x200",
              "user_id": '22'
            },
            {
              "name":"following",
              "note": "2",
              "img": "http://placehold.it/200x200",
              "user_id": '24'
            },
            {
              "name":"following",
              "note": "2",
              "img": "http://placehold.it/200x200",
              "user_id": '25'
            },
            {
              "name":"following",
              "note": "2",
              "img": "http://placehold.it/200x200",
              "user_id": '26'
            },
            {
              "name":"following",
              "note": "2",
              "img": "http://placehold.it/200x200",
              "user_id": '27'
            }
          ]};
          $scope.concern = function(user_id) {
            angular.forEach($scope.recommandFollowing.content, function(value, key) {
              if (value.user_id == user_id) {
                $scope.recommandFollowing.content.splice(key, 1);
                $scope.user.follower = parseInt($scope.user.follower) + 1;
                return;
              }
            })
          };
        break;
    }
  }
  $scope.closeFollowing = function() {
    $scope.modal_following.hide();
    // 暂时不用，因为没有返回不同数据
    // $http({
    //   data:{

    //   },
    //   url: followingUrl,
    //   type: 'get'
    // }).success(function(data){
    //   $scope.recommandFollowing = data;
    // })
  }
  // login
  $scope.doLogin = function() {
    $http.get('templates/user.json').success(function(data) {
      $scope.showLoading()
      angular.forEach(data,function(k,v) {
        if (k.username == $scope.loginData.username && k.password == $scope.loginData.password) {
          $scope.isLogin = true;
          $scope.user = k;
          $scope.closeLogin();
          $scope.closeLoading();
          $scope.showFollowing('recommand');
          return;
        } 
        return;
      })
      if ($scope.isLogin !== true) {
          $scope.showAlert('<i class="ion-info icon"> 提示', '登陆失败，请重新尝试');
          $scope.closeLoading();
          return;
      }
    })
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    // $timeout(function() {
    //   $scope.closeLogin();
    // }, 1000);
  };

})

.controller('aboutus', function($scope) {
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ]; 
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('myMagazine', function($scope, $stateParams) {
  $scope.loadMoreMagazine = function() {
    var more = [
          {
            'image': 'http://placehold.it/200x200',
            'title': '《青春之门》',
            'time': '2015.12-02',
            'link': 'app.magazineInner/1',
            'id': 1
          },
          {
            'image': 'http://placehold.it/200x200',
            'title': '《芳香疗ddsa法》',
            'time': '2015.12-02',
            'link': 'app.magazineInner/2',
            'id': 2
          },
          {
            'image': 'http://placehold.it/200x200',
            'title': '《芳香dsd疗法》',
            'time': '2015.12-02',
            'link': 'app.magazineInner/3',
            'id': 3
          }];
          $scope.magazine = concat($scope.magazine, more);
  }

  switch($stateParams.sort) {
      case 'all':
        $scope.magazine = 
        [
          [{
            'image': 'http://placehold.it/200x200',
            'title': '《青春之门》',
            'time': '2015.12-02',
            'id': 1
          },
          {
            'image': 'http://placehold.it/200x200',
            'title': '《美好的生活》',
            'time': '2015.12-02',
            'id': 2
          },
          {
            'image': 'http://placehold.it/200x200',
            'title': '《流年·时光·岁月》',
            'time': '2015.12-02',
            'id': 3
          }],
          [{
            'image': 'http://placehold.it/200x200',
            'title': '《遇见文字，缘结一生》',
            'time': '2015.12-02',
            'id': 4
          },
          {
            'image': 'http://placehold.it/200x200',
            'title': '《天籁》',
            'time': '2015.12-02',
            'id': 8
          },
          {
            'image': 'http://placehold.it/200x200',
            'title': '《忆元宵节》',
            'time': '2015.12-02',
            'id': 5
          }]
        ];
        break;
      case 'recommand':
        $scope.magazine = [
          [{
            'image': 'http://placehold.it/200x200',
            'title': '《芳香疗法wewe》',
            'time': '2015.12-02',
            'id': 12
          },
          {
            'image': 'http://placehold.it/200x200',
            'title': '《芳香疗ddsa法》',
            'time': '2015.12-02',
            'id': 12
          },
          {
            'image': 'http://placehold.it/200x200',
            'title': '《芳香dsd疗法》',
            'time': '2015.12-02',
            'id': 12
          }]
        ];
        break;
      case 'season':
          $scope.magazine = [
            {
                'image': 'http://placehold.it/200x200',
                'title': '《JIEQI 》',
                'time': '2015.12-02',
                'id': 12
            }
          ];
        break;
      case 'video':
        $scope.magazine = [
            {
              'image': 'http://placehold.it/200x200',
              'title': '《video》',
              'time': '2015.12-02',
              'id': 12
          }
        ];
        break;
      case 'mine': 
        $scope.magazine = [
            {
              'image': 'http://placehold.it/200x200',
              'title': '《mine》',
              'time': '2015.12-02',
              'id': 12
          }
        ];
        break;
      case 'time-stolean':
        $scope.magazine = [
            {
              'image': 'http://placehold.it/200x200',
              'title': '《mine》',
              'time': '2015.12-02',
              'id': 12
          }
        ];
        break;

    }
})

.controller('magazineInner', function($scope, $ionicModal, $compile, $ionicSlideBoxDelegate, $stateParams, $location) {
  switch($stateParams.id) {
    case '1':
      $scope.catalog = [
        {
          "title": "青春之门",
          "link": "#/app/magazineInner/",
          "page_id":1,
          "page":"<img src='http://placehold.it/200x300' class='full-image'>"
        },
        {
          "title": "回忆",
          "link": "#/app/magazineInner/",
          "page_id":2,
          "page":"<img class='full-image padding-bottom' src='http://placehold.it/200x200'><p class='padding'>从前一直认为那扇门很大，大得连风雨都推不动。那时门里只有爸爸妈妈、姐姐和玩具熊，一本旧旧的连环画早就翻烂了；一首催人如梦的童谣早就唱厌了；一段关于公主与巫婆的故事早就听腻了……可门却关得那么严，我出不去。只好经常站在窗前，夏天看窗外的白鹭在云里钻来钻去，心儿便也插上了翅膀飞出大门；冬天用手在窗花上模仿各种野兽在雪地中的脚印，每一串脚印都跳到了门外……懂事的时候，我就试图接近那扇门，有时间就与它培养感情，跟它说话，给它唱歌，向它做鬼脸儿……可是不论我怎样讨好，它都不理我，它离我好远啊! 后来，我可能是长大了，在某年某月的某一天，那扇门竟訇然地向我洞开了。我一下子仿佛置身于另一个清新的世界。跑呵跳呵，朋友也多起来，调皮的鸟，溢香的花，青翠的山，幽蓝的湖，还有伙伴的友情，对知识的求索，对异性的那种神秘而清纯的爱慕……排山倒海地向我堆来。穿越过一段时间的隧道，我终于跨过了这扇既陌生而又熟悉的大门。 由小男孩迅速长成个小伙子，这不能不算是大自然对自己的慷慨。那扇绚丽芬香的五彩门已经被丢在身后了，喜欢在门前徘徊的我，突然像失去了什么，周围是一片空蒙寂寥，于是便发现了自己的孤独。总想把甜蜜和痛苦都揉进梦里，让一个清丽修长的身影夜夜光着脚熨干我潮湿的情绪；总想把静谧和骚动都揉进指甲缝，让一个绵软的笑时时眯着眼流入我荒凉的田野。 这就是我所踏上的青春阶梯吗?这样的年龄悄悄地来了，这样的季节悄悄地来了，谁也无法拒绝，谁也无法回避。青春的门应该是属于诗的，它不仅奔流着执著的血浆，还燃烧着热情的生命。</p>"
        },
        {
          "title": "something",
          "link": "#/app/magazineInner/",
          "page_id":3,
          "page":"<img src='http://placehold.it/200x300' class='full-image'>"
        },
        {
          "title": "思念",
          "link": "#/app/magazineInner/",
          "page_id":4,
          "page":"<img src='http://placehold.it/200x100' class='full-image'><p class='padding'>清晨，我在它的轻唤中醒来；夜晚，我在他的抚慰中睡去；仅仅是在短暂的瞬间，我便迎来了青春之门，我便告别了青春之门，向人生的又一领域奋力攀登。仅仅只是在短短的路程中，便留下了一生中最多最多的回忆…… 想停下来深情地沉湎一番，怎奈行驶的船却没有铁锚；想回过头去重温旧梦，怎奈身后早已经没有了归途。因为时间的钟摆一刻也不曾停顿过，所以使命便赋予我们将在汹涌的大潮之中不停地颠簸。 生命不是一张永远旋转的唱片；青春也不是一张永远不老的容颜。</p>"
        },
        {
          "title": "总结",
          "link": "#/app/magazineInner/",
          "page_id":5,
          "page":"<img class='full-image' src='http://placehold.it/200x100'><p class='padding'>爱情是一个永恒的故事，从冬说到夏，又从绿说到黄；步履是一个载着命运的轻舟，由南驶向北，又由近驶向远……你看到那阳光明媚、金色羽毛升起的地方，矗立在歌吟里、掩映在诗词中的不分明是一扇神奇玄妙的青春之门吗? 人生就像小姑娘跳方格一样，无论愿不愿意，都必须跨过这一扇又一扇庄严的大门。</p>",
        }
      ];
    break;
    case '2':
      $scope.catalog = [
        {
          'title': '流年',
          "link": "",
          "page": "<img src='img/liunian1.jpg' class='full-image'>"
        },
        {
          "title": "回味时光（一）",
          "link": "#/app/magazineInner/",
          "page_id":1,
          "page":"<h3>流年·时光·岁月</h3><img src='img/liunian2.jpg' class='full-image'><p>生命的天空，缀满时光的星辰，那些忽明忽暗的时光碎片，折射着我们生命蜿蜒的足迹。点点滴滴，分分秒秒，不管是否在意，不管是否留恋，曾经的曾经，都成了回不去的过眼烟云。</p><p>时光，就像吞噬生命年华的黑洞，悄无声息而又摧枯拉朽。几声晨钟暮鼓，几轮日月潮汐，几度花开花谢，几回梦里梦外。一刹那，就把明天翻转成今天，一眨眼，就把今天蜕变成昨天，一转身，就把昨天尘封进历史的藩篱。时光如水漫过，岁月老去，生命凋零，沧海变桑田。迟暮沦陷了青葱，老旧征服了光鲜，空洞的时光隧道里，只剩若干隔空的祭奠。</p><p>时光的回味，像极了食草动物的反刍。不咀嚼，不知甘苦，一回首，伤痕累累。</p><p>快乐的时光，总是昙花一现，如沙漠里的雨滴般珍贵；幸福的时光，像春阳，抚平我们心灵的创伤；艰难的时光，像风霜，打磨着我们的棱角，把我们变成陌生的模样；孤独的时光，总是那么漫长，仿佛天上的星星和月亮；甜蜜的时光，像蜜糖，把我们的美好情感尽情释放……</p><p>流浪于时光的荒野，每个人都像拾荒者，寻寻觅觅，挑挑拣拣。我们行得匆忙，时光走得苍翠。一边囫囵吞枣，一边大肆丢弃，等到来日所剩无几，竟然不曾记得时光本真的滋味</p>",
        },  
        {
          "title": "回味时光（一）",
          "link": "#/app/magazineInner/",
          "page_id":1,
          "page":"<p>或许，唯有孩提时代才是最为本真的时光。人生的扉页，如同线装的纯朴，没有经过世尘的沾染，没有来自生活的挤压，一切都显得那么自然和通透。自由自在，无忧无虑，依着父母的臂膀，合着时光的节拍，徜徉在属于自己的时光溪流里，满载鲜花和笑语，尽情的抒写时光的童话。这段时光，因为没有羁绊，所以自然；因为没有污染，所以清纯；因为没有欲壑，所以平和；因为没有压迫，所以也不会扭曲。</p><img src='img/liunian4.jpg' class='full-image'><p>无情的时光，不会因眷恋而暂停，也不会因蹉跎而回放。当时光一层层的褪去我们青涩的外衣，当我们在短暂的青春岁月里恣意挥霍一回，生活向我们亮出了锋利的牙齿。</p><p>生活，本是时光的影子。然而生活的重载，让太多的人沉醉在影子里出不来，失去了自我。活在影子里的人，为了追求生活的完美，要么与时光为敌，典当一段年华换取另一段年华的繁盛，要么身不由己，无法独立支配自己的时光，使得时光生生扭曲变形。但是，影子装扮得再奢华，终归是一场华丽的梦。</p><p>岁月太沉，撑不起生活的全部载荷；时光太薄，兜不住情感的决绝流逝。时光的缝隙，写满各种各样的冷暖故事。人间的悲喜剧无时无刻不在上演，你方唱罢我登场，今日我是你的配角，明日你是我的道具，分分合合，聚聚散散，情节扑朔迷离，结局殊难预料。</p><p>时光深深浅浅地镌刻着年轮，又仿佛一块不知疲倦的橡皮擦，把流年的故事涂抹得支离破碎。不知是故事丰盈了时光，还是时光薄凉了故事。</p><p>时光是生命的碎片，随着生命的流失而湮灭。你的时光我进不去，我的时光你进不来，在薄凉的时光中，谁都无法抵御岁月的寒流。唯有采集一片时光，共同分享，相守相依，将温情相互传递，温润一段年华。</p><p>时常慨叹人生的不易，时常奢望浮生偷得半日闲。枝枝蔓蔓，纷纷扰扰，尘事和欲望就像蛛网一样牢牢把我们困在八宫中央，几人能挣脱？时光的宿命面前，我们每个人都是待宰的羔羊。</p><p>不如学仿陶公，寻几处世外桃园式的所在，偶尔放逐几日。好友不用多，三两个就成，风景不用绝，依山傍水就行，把盏对月，谈古论今，把茶喝淡，把歌听老，把风景悉数看透。</p><p>都说，生命如虹，岁月如歌，年华似锦，时光如炬。</p><p>当日薄西山，时光之炬将生命燃烧殆尽，对于曾经拥有如今往事成烟的美好时光，我们后悔否？</p>",
        }
      ];
    break;
    case '3':
      $scope.catalog = [
        {
          "title": "流年",
          "link": "#/app/magazineInner/",
          "page_id":1,
          "page":"<img src='img/time.jpg' class='full-image'><p>　　已经慢慢的忘记了，失去一些事一些人后的那些伤痛。一瞬间的重逢和偶然，一句熟悉的问候，想念，勾起曾经快乐无限。还有对若干年前的记忆，若干年后的回忆，还有曾经发自内心的追忆。</p><p>　　也许我们当时都还是年轻，眼里心里脑海里，没有一丝的自私与功名利禄。纯纯的感情，纯纯的关心，所以才被想念很久很久。诚如所说：我们总要走一些陌生的路，看一些陌生的风景，听一些陌生的歌，等到某个不经意的瞬间，发现那些我们以为不会忘却的事就那么被遗忘了。到现在想起从前，心里有的是些什么，也记不清道不明。</p><p>今天一个朋友在她的日志里写道：时间改变了我们的样子，却在心里留下了彼此的影子。流年逝去里，我为谁记住，为谁流泪，为谁狂欢，为谁落寞……都一一定格在了那些若干年的沉淀里。一件东西，一封信笺，一声问候，一句想念，都可以勾起那时那年那段最美的记忆来，在思绪里泛滥成灾，然后再慢慢沉淀。</p> ",
        },  
        {
          "title": "时光",
          "link": "#/app/magazineInner/",
          "page_id":1,
          "page":"<p>我细心的收藏着每一件我所能记住的东西，礼物，音乐，糖果和那些特定的称谓。很多时候我们的世界太过于喧嚣和尘埃，我听不见那些为我们疯狂拔节年华里的成长，看不见那些为我们疯狂追逐梦想的期待。也许，我错过了很多，也或许我得到了很多，结果都被时间一一带走，留给我的只有蹒跚前行。</p><p>也许我们还是稚嫩，如同那茶树上的新绿枝桠，不够时间，不够经验，不够资格去成为能炮制出浓郁香气的茶叶，能做的就只有等待，等待自己一天天慢慢成长，慢慢历练，把自己融成能穿越千山万水障碍的无所不能。</p>",
        },
        {
          "title": "岁月",
          "link": "#/app/magazineInner/",
          "page_id":1,
          "page":"<p>　　我还是会想念从前，还是会期待有一天我们长大后的场面，一群群稚嫩的面孔变成了陌生的脸，就连自己也看不清自己在镜子里的轮廓，那时的空间是不是早已变迁，你们都不在我的世界，只剩我一个人，在空旷的心里，默默呐喊。</p><p>　　流年。岁月。时光。请别带走那些有我出现的记忆，被记住也是一种美丽。生命如此辽阔，我看不见了起点，也不能望见终点。也许我就只有慢慢的追逐，慢慢的失去，慢慢的得到，然后记忆里酸甜苦辣一一明显，看清谁上演了最华美的篇章，书写出最动人的篇章，勾勒出了那年我们一起看过的幽幽月光。"
        }
      ];
    break;
    case '4':
      $scope.catalog = [
        {
          "title": "题记",
          "link": "#/app/magazineInner/",
          "page_id":1,
          "page":"<img src='img/time.jpg' class='full-image'><quote>你是我生命中最唯美的遇见，文字带我走进这个陌生的世界。---题记</quote>",
        },  
        {
          "title": "时光",
          "link": "#/app/magazineInner/",
          "page_id":1,
          "page":"<h3>遇见文字，结缘一生</h3><p>那年，七岁，走进了那间土坯房，遇见了你。</p><p>　　那个清贫的年代，没有刻意的准备，就把那双粘满泥巴的小脚丫洗干净，穿上妈妈自己做的布鞋子，还有在油灯下缝制的新书包，就欢天喜地的奔向村口的那间老屋---只有几排用木板搭建的课桌，村里唯一的一间教室，里面只有一个戴着眼睛的老夫子，据说是村里唯一的一名高中生。z</p><p> 　　第一次，端坐在教室里，第一次，听老夫子教字。老夫子在黑板上写下一个大大“人”，我和小伙伴们都笑了，这不是比玩泥巴捏小人还简单吗？第一次知道了那是一个文字！</p><p>  　　我们都是人，简单的人。</p><p>　　那声音，过了许多年，如今，仍然清晰地回荡在耳边：孩子们，这就是你们人生的第一节课，学习了一个“人”字，它就站在那里！无论以后，经历了多少风雨，多少曲折，你们都要永远地站着！</p><p> 　　文字，带我走进这个陌生的世界，舞台很大，我自狂欢！于是，缘起，我知道了生活的简单定义：认字，可以帮助你过上更好的生活。文字，吸引了我的视线，孩子那懵懵懂懂的记忆里，文字发芽了。</p><p> 　　那时，农村是清贫的，特别是多病的父亲和渐渐老去的奶奶，需要好多钱，而且家里也没有什么收入，只靠挣工分，哪里够用呀。尽管生活捉襟见肘，父亲还是坚持让我读书，希望走出大山，去谋求好的未来。太小的年龄，哪里能体会父母的心情？于是，放学后，还是疯狂地玩耍，甚至和别的孩子玩起了逃学的游戏，没少挨打。值得双亲欣慰的是，学习成绩一直居高不下。逐渐大了，看着疼痛的父亲，年迈的奶奶，还有瘦小的妈妈，突然觉得自己长大了。因为哥哥已经分家另过，大姐已经出嫁，只剩下一个比我大两岁的小姐，家里的活都落在了妈妈和小姐的肩上，心突然痛了。终于，从文字中，我知道了什么是生活的不容易，知道了艰难困苦，还有什么是沧桑的岁月！</p>",
        },
        {
          "title": "岁月",
          "link": "#/app/magazineInner/",
          "page_id":1,
          "page":"<p>生活，是一本无字书，我却读出了很多滋味，在那个花季的日子里。　　那年，奶奶去世，看着不能送奶奶去坟地的父亲，我知道了死的含义，最后是哥哥代替父亲送奶奶去的坟地！那年，我十四岁。　　都说，一无所知的世界，一直走下去，才会有惊喜。可是，我已经一知半解了。　　那年，我十五岁，父亲饱经病魔的摧残，一米八的个子，躺在那里一动不动，母亲的手拉着她爱了一生的男人，舍不得他走。那一刻，我懂得了死的滋味。可能对于别人来说，没有什么，可是对于我和我的母亲来说，一座大山轰然倒塌！我懂得了死别的味道，一刹那，我成熟了：生老病死是人生的循环，无人阻挡得了。　　那年，我到县城读了高中。挥手告别站在村口那棵梨树下的母亲和姐姐，我读懂了她们眼睛里的希望！我知道了离别的滋味：是鹰，总要，离开巢穴，展翅翱翔！　　文字，让我读懂了离别的味道，还有思念的味道……　　花季的雨里，我如饥似渴地汲取着知识的甘露。清晨，那条洒满露珠的小路上，可以听到我朗朗的读书声；傍晚，那片落满夕阳色彩的田埂上，可以看到我执著的脚步 ；月朗星稀的夜晚，依着校园那昏黄的路灯下，依然有我孜孜不倦的背影……　　那个秋阳高照的日子，学校组织了一次关于花季的征文大赛。我跃跃欲试，几个昼夜的努力，一篇题为“文字飘在花季的天空”被张贴在校园的优秀征文栏里，好多同学纷纷议论：谁呀，写的真好！　　当周末回家，有点沾沾自喜地把这件事说给妈妈听的时候，只读了几年私塾学堂的母亲淡淡地笑了：孩子，花季虽美，文字更美。如果，你不努力，文字可以退出你花季的天空！　　我不懂，问道：文字会飘吗？它怎么能走出我的天空？　　母亲认真地说：文字，是有灵魂的。　　我似懂非懂，扭头看向姐姐：你懂吗？姐姐读完初中就没有再上学了，帮助母亲干活。姐姐微笑着，指了指房顶的小燕子：你看，燕子大了，总要飞出去的呀！　　仿若一扇心窗被打开：外面的世界很大，我却很小。恰似文字的海洋无限宽旷，而我只是沧海的一叶轻舟！　　文字，教我懂得了宽广的含义，还有爱的温暖！　　那年，十八岁，却遭遇了黑色的七月风暴，留在独木桥的此岸！　　默默地沿着那条熟悉的土路，一步一步地走着，很慢很慢，三十里的路一直走到了深夜！一个人，一颗落寞的心。那晚，恰恰，没有月亮！　　轻轻地推开，那间亮着灯光的门扉。只一眼，我的泪水哗哗流下：年迈的母亲斜依在椅子上，半睁着眼睛，似睡非睡，昏黄的灯光照在刻满皱纹的脸上，写满了沧桑，我却清晰地看见了母亲头上的根根白发，那样的刺眼，我的心很痛！不小了，我已经成年，实不该再让母亲扛起家的重担！　　以前，我只知道男人怎么写，此刻，我真正懂得了男人的责任和担当，还有亲情的无私！　　脱下衣服，走过去，轻轻地披在了母亲的身上。　　“回来了？怎么那么晚呀？吃饭了吗？一连串的担忧，挂在了母亲的心上。都说，男儿有泪不轻弹，此时，语言是多余的，我紧紧地抱住母亲那瘦弱的双肩，哽咽着：我，无缘独木桥的彼岸……　　子夜，是农村一天中最寂静的时候，而此时我的心，却似翻滚的海洋，奔驰的野马，何处是我，停泊的港湾，归巢之地？　　“孩子，今年不行，明年再考呀。并不是所有的努力都有回报的，比如妈妈，我把爱都给了你们，看见你们一个一个都长大，快乐地生活着，我就高兴。”　　子夜未央，心片片碎。文字，你让我用什么来描述此时的心情？无言，你教会了我是真！　　有人说，雨水，是天空倾泻而下的忧伤；孤独，是心底攀沿而上的渴望！我说，眼泪，是心底潺潺流淌的音符；寂静，是灵魂蠢蠢欲动的清泉！　　那年，送我到村口梨树下的只有我的母亲，小姐已经为人妻。风中的您，白发苍苍，弱弱的身躯，还有寂寞的眼神，都给了我向上的力量。那一刻，文字，让我诠释了母爱的伟大！　　那一刻，我成了故乡的离人，文字让我懂得了乡愁的含义！　　青春的记忆，镌刻在岁月的车轮上，用碎片串起人生的风铃，或浅浅，或张狂，任由文字述说。　　轻敲这些文字的时候，又是子夜十分。漂泊的无奈，思乡的难言，聆听静夜的声音，看谁的故事清瘦了心的方向？谁的执着赋予了岁月的沧桑？　　今晚，当清辉倾洒而下时，文字已经植入了我的似水年华。有些往事，让我雾气盈眸，泪湿心语；有些心事，云淡风轻，与岁月静酌！　　遇见文字，缘结一生，无法忘怀！</p>"
        }
      ];
    break;
    case '5':
      $scope.catalog = [
        {
          "title": "天籁",
          "link": "#/app/magazineInner/",
          "page_id":1,
          "page":"<h3>天籁</h3><img src=''><p>你仰头、仰头，耳朵像一对空空的盅儿，去承接由高无穷尽的天空滑下来的声音。然而，你什么也听不到。人的耳朵不是聆听天体的，而是听取俗事的；所以人们说茫茫宇宙，寥廓无声。　　这宇宙天体，如此浩瀚，如此和谐，如此宁静，如此透明，如此神奇；它一定有一种美妙奇异、胜过一切人间音乐的天籁。你怎样才能听到它，你乞灵于谁？　　你仰着头，屏住气，依然什么也没听到，却感受了高悬头顶的天体的博大与空灵。　　当乌云汇集，你的目光从那尚未闭合的云洞穿过，极力望去，一束阳光恰好由那里直射下来，和你的目光金灿灿地相撞。你是否听到一种激动人心的灿烂的金属般的声响？当然，你没有听到任何声音。还有那涌动的浓雾，不安的流光，行走的星球和日全食的太阳，为什么全是毫无声息？　　噢，你听到了！闪电刺入乌云的腹内，你终于听到天公的暴怒；你还说空中的风一定是天体的呼吸，否则为什么时而宁静柔和，时而猛烈迅疾？细密的小雨为了叫你听见它的声音，每一滴雨都把一片叶子作为碧绿的小鼓，你已经神会到雨声是一种天意！可到头来蒙昧的仍旧是你！只要人能听到的、听懂的，全不是天体之声。　　你更加焦渴地仰着头——　　不，不是你，是约瑟夫·施特劳斯。他一直张着双耳，倾听来自宇宙天体深处的声音，并把这声音①描述下来。尽管这声音②并非真实的天籁，只不过是他的想象，却叫我们深深地为之感动。从这清明空远的音响里，我们终于悟到了天体之声最神圣、最迷人的主题：永恒！　　永恒，一个所有地球生命的终极追求，所有艺术生命苦苦攀援的极顶；它又是无法企及的悲剧性的生命境界。从蛮荒时代到文明社会，人类一直心怀渴望，举首向天，祈盼神示以永恒。面对天体，我们何其渺小；面对永恒，我们又何其短暂！尽管如是，地球人类依旧努力不弃，去理解永恒和走进永恒。我们无法达到的是永恒，我们永远追求的也是永恒。　　听到了永恒之声，便是听到了天籁。</p>",
        }
      ];
    break;
    case '6':
      $scope.catalog = [
        {
          "title":"元宵节",
          "link": "",
          "page": "<img src='img/lantern.jpg' class='full-image'>"
        },
        {
          "title": "元宵节",
          "link": "#/app/magazineInner/",
          "page_id":1,
          "page":"<h3>忆元宵节</h3><p>元宵节到了！又是吃元宵，寓意家庭团圆的好日子! 忆元宵节小时侯过元宵节，记忆中的快乐：一是邻居送的小小的元宵，红、黄、绿，在姜糖水中格外诱人；二是花灯，记得买过几个，不是最贵的，塑料的，动物造型的，装电池的。（后来大了点，家长就没再主动买了，自己也就告诉自己没啥意思，就再没玩过）记得那时上午买回来，就一直期待晚上的时光！等不及就抱着花灯钻被子，拿着它躲房间里、床底下，提着它关在厕所里，就是如此的快乐！如此的单纯!</p>",
        }
      ];
    break;
    default:
      $scope.catalog = [
        {
          "title": "没有更多了",
          "link": "#/app/magazineInner/",
          "page_id":1,
          "page": "<div style='width:100%;height:300px;display:table;text-align:center'><p style='color:#666;font-size:1.5em;display:table-cell;width:100%;vertical-align:middle;'><i class='icon ion-home' style='font-size:2em'></i><br/><span>没有更多内容了</span></p>"
        }
      ]
  }

  $scope.nextMag = function() {
    var id = parseInt($stateParams.id) + 1;
    var next = 'app/magazineInner/' + id;
    $location.path(next);
    $scope.closeMagazineCatalog();
  }

  $scope.prevMag = function() {
    var id = parseInt($stateParams.id) -1;
    var prev = 'app/magazineInner/' + id;
    $location.path(prev)
    $scope.closeMagazineCatalog();
  }

  // magazineComment
  $ionicModal.fromTemplateUrl('magazineComment.html', {
    scope:$scope,
    animation: 'slide-to-right'
  }).then(function(modal) {
    $scope.modal_MagazineComment = modal;
  })

  $scope.magazineComment = function() {
    $scope.modal_MagazineComment.show();
  }

  $scope.closeMagazineComment = function() {
    $scope.modal_MagazineComment.hide();
  }

  // magazineCatalog
  $ionicModal.fromTemplateUrl('magazineCatalog.html', {
    scope: $scope,
    animation: 'slide-to-up'
  }).then(function(modal){
    $scope.modal1 = modal;
  });

  $scope.magazineCatalog = function() {
    $scope.modal1.show();
  }

  $scope.closeMagazineCatalog = function() {
    $scope.modal1.hide();
  }

  $scope.detailShare = function() {
    $scope.share();
  }
    

  console.log($ionicSlideBoxDelegate.$getByHandle('duanjie'));
  $scope.next = function() {

  }
})

.controller('topice', function($scope, $http, $stateParams, $ionicSlideBoxDelegate){
 
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    }
    $scope.noMoreItemsAvailavle = false;
    $scope.loadMore = function() {
      $http.get('/templates/testingData.json').success(function(data){
        $scope.more = data;
        if ( $scope.more.length == 3) {
          $scope.loadMore = true;
          angular.copy(data, $scope.topice);
        }
        $scope.$broadcast('scroll complete');
      })
    }
    switch($stateParams.item) {
      case 'recommand':
        $scope.topice = [
          {
            'image': 'http://placehold.it/200x200',
            'title': '就在本周六， 邀请您体验一天有机生活',
            'month': 'May',
            'day': '23',
            'link': '#app/Detail/12',
            'id': 12
          }, 
          {
            'image': 'http://placehold.it/200x200',
            'title': '就在本周六， 邀请您体验一天有机生活',
            'month': 'May',
            'day': '23',
            'link': '#app/Detail/12',
            'id': 12
          }, 
          {
            'image': 'http://placehold.it/200x200',
            'title': '就在本周六， 邀请您体验一天有机生活',
            'month': 'May',
            'day': '23',
            'link': '#app/Detail/12',
            'id': 12
          }, 
          {
            'image': 'http://placehold.it/200x200',
            'title': '就在本周六， 邀请您体验一天有机生活',
            'month': 'May',
            'day': '23',
            'link': '#app/Detail/12',
            'id': 12
          },         
          {
            'image': 'http://placehold.it/200x200',
            'title': '就在本周六， 邀请您体验一天有机生活',
            'month': 'May',
            'day': '23',
            'link': '#app/Detail/12',
            'id': 12
          },    
        ];
        break;
      case 'season':
        $scope.topice = [
          {
              'image': 'http://placehold.it/200x200',
              'title': '《JIEQI 》',
              'time': '2015.12-02',
              'link': '#app/Detail/12',
              'id': 12
          }
        ];
        break;
      case 'video':
        $scope.topice = [
            {
              'image': 'http://placehold.it/200x200',
              'title': '《video》',
              'time': '2015.12-02',
              'link': '#app/magazineDetail/:12',
              'id': 12
          }
        ];
        break;
      case 'mine': 
        $scope.topice = [
            {
              'image': 'http://placehold.it/200x200',
              'title': '《mine》',
              'time': '2015.12-02',
              'link': '#app/magazineDetail/:12',
              'id': 12
          }
        ];
        break;
      case 'time-stolean':
        $scope.topice = [
            {
              'image': 'http://placehold.it/200x200',
              'title': '《mine》',
              'time': '2015.12-02',
              'link': '#app/magazineDetail/:12',
              'id': 12
          }
        ];
        break;

    }
})

.controller('setting', function($scope, $state, $ionicModal){
   
  $ionicModal.fromTemplateUrl('recommand.html', {
    scope:$scope, 
    animation: 'slide-to-up'
  }).then(function(modal){
    $scope.modal = modal;
  });

  $scope.showRecommand = function() {
    $scope.modal.show();
  }
  $scope.hideRecommand = function() {
    $scope.modal.hide();
  }
})
.controller('collection', function($scope, $location, $ionicModal, $ionicActionSheet) {
    if (!$scope.isLogin) {
      $location.path('/app/aboutus');
    }
    $scope.data = {
      showDelete:false
    } 
    $scope.editCollection = {
      'title': 'null',
      'description': 'null'
    }
    
    $scope.onItemDelete = function(index) {
      $scope.xx.splice(index, 1);
    }
    $scope.xx = [
      {
        "title": "杂志·保罗万象",
        "description": '山不在高，有仙则名',
        "time": '2015.12.12-12.12',
        "id": "1",
        'img': 'http://placehold.it/200x200',
        'link': '#/app/magazineInner/1'
      }, 
      {
        "title": "文脉·世界的知识",
        "description": '世界的文脉',
        "time": '2015.12.12-12.12',
        "id": "2",
        'img': 'http://placehold.it/200x200',
        'link': '#/app/magazineInner/2'
      }, 
      {
        "title": "文脉·世界的知识",
        "description": '世界的文脉',
        "time": '2015.12.12-12.12',
        "id": "3",
        'img': 'http://placehold.it/200x200',
        'link': '#/app/magazineInner/3'
      }, 
      {
        "title": "文脉·世界的知识",
        "description": '世界的文脉',
        "time": '2015.12.12-12.12',
        "id": "4",
        'img': 'http://placehold.it/200x200',
        'link': '#/app/magazineInner/1'
      }, 
    ];

    $ionicModal.fromTemplateUrl('edit.html', {
      scope: $scope,
      animation: 'slide-to-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    var CollecId = null;
    $scope.edit = function(item) {
      CollecId = item;
      $scope.modal.show();
      console.log($scope.editCollection)
      
    }

    $scope.editData = function() {
      angular.forEach($scope.xx, function(k, v) {
        if (k.id == CollecId) {
          k.title = $scope.editCollection.title;
          k.description = $scope.editCollection.description;
          $scope.modal.hide()
          return;
        } 
      })
    }


    $scope.closeEditModal = function() {
      $scope.modal.hide();
    }

    $scope.changeColl = function() {

    }

    
    // $ionicModal.fromTemplateUrl('')
})
.controller('Detail', function($scope, $stateParams, $http, $sce, $ionicModal) {
  var pageUrl = ROOT_PATH + "page.html";
  // var pageUrl1 = "http://localhost:8100/#/page.html";
  $scope.isShowFooterbar = true;
  $http({
    method: 'get',
    url: pageUrl,
    data: {

    },
  }).success(function(data) {
    $scope.content = $sce.trustAsHtml(data);
  });
  switch ($stateParams.id) {
    case '2' :
      $scope.catalog = [
        { 
          'title': '《闲情盆景》封面',
          'link': '#/app/Detail/12'
        },
        { 
          'title': '闲情盆景',
          'link': '#/app/Detail/12'
        },
        { 
          'title': '盆景基础入门',
          'link': '#/app/Detail/12'
        },
        { 
          'title': '都市盆景日常',
          'link': '#/app/Detail/12'
        },
        { 
          'title': '宜居植物装置',
          'link': '#/app/Detail/12'
        },
        { 
          'title': '盆景人的乡愁',
          'link': '#/app/Detail/12'
        },
        { 
          'title': '园里有风情',
          'link': '#/app/Detail/12'
        },
        { 
          'title': '世界各地的盆景园',
          'link': '#/app/Detail/12'
        },
      ]
      break;
    case '12': 
      $scope.catalog = [
        { 
          'title': '封面',
          'link': '#/app/Detail/12'
        },
        {
          'title': '文章1',
          'link': '#/app/Detail/12'
        },
        {
          'title': '文章2',
          'link': '#/app/Detail/12'
        }
      ];
      break;
  }

  $scope.like = function() {
    if (!$scope.isLogin) {
      $scope.login();
      return;
    }
  }

  $ionicModal.fromTemplateUrl('magazineComment.html', {
    scope:$scope,
    animation: 'slide-to-right'
  }).then(function(modal) {
    $scope.modal_MagazineComment = modal;
  })

  $scope.magazineComment = function() {
    $scope.modal_MagazineComment.show();
  }

  $scope.closeMagazineComment = function() {
    $scope.modal_MagazineComment.hide();
  }
  

  $ionicModal.fromTemplateUrl('magazineCatalog.html', {
    scope: $scope,
    animation: 'slide-to-up'
  }).then(function(modal){
    $scope.modal1 = modal;
  });

  $scope.magazineCatalog = function() {
    $scope.modal1.show();
  }

  $scope.closeMagazineCatalog = function() {
    $scope.modal1.hide();
  }

  $scope.detailShare = function() {
    $scope.share();
  }
})

.controller('square', function($scope, $http) {
  var squareUrl = ROOT_PATH + "square.json";
  $scope.isHome = false;
  $http({
    url: squareUrl,
    method: 'get',
    data: {

    },
  }).success(function(data){
    $scope.square = data; 
  })
})

.controller('home', function($http,$scope, $ionicModal) {
  $scope.isHome = true;
  $http({
    data: {

    },
    type: 'get',
    url: homeUrl
  }).success(function(data) {
    $scope.square = data;
  })
  $scope.addNoteData = {
    "avatar": "http://placehold.it/100x200?test=dfasfd",
    "name": "this is home",
    "time": null,
    "content": null,
    "name": null
  };

  $scope.delNote = function(Note) {
    $scope.square.splice($scope.square.indexOf(Note), 1)
  }

  $scope.addNote = function() {
    var myDate = new Date();
    var date = myDate.getFullYear() + '-' + myDate.getMonth() + '-' +myDate.getDate();
    try{
      $scope.addNoteData.time = date;
      $scope.square = $scope.square.concat($scope.addNoteData);
      $scope.closeNote();
    } catch(err) {
      console.log(err);
    }
  }


  $ionicModal.fromTemplateUrl('writingNote.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal_note = modal;
  })

  $scope.note = function() {
    $scope.modal_note.show(); 
  }
  $scope.closeNote = function() {
    $scope.modal_note.hide()
  }
})
.controller('community', function($scope) {

});
