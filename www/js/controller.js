/* Notlar
HammerJS reflesh bir bak..
*/

$(document).ready(function(){
  //window.addEventListener("touchstart", function(e) { e.preventDefault();}, false);
  //window.addEventListener("touchmove", function(e) { e.preventDefault();}, false);
  $('.input').keypress(function(){
    $('.input').removeClass('error');
  });
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(StatusBar);
}

    $('#loaderIcon').hide("fade",500,function(){
      $(".page").css("opacity", "1");
      $('.page').show('fade');
    });
});

function setWindowLocate(url){
    $('.page').hide('fade',{},500,function(){
        $('#loaderIcon').show("fade",{},500,function(){
          window.location.href= url;
        });
    });
}

(
  function(){
  var app = angular.module('myApp',[]);


app.controller('PanelController',function(){
    this.tab = 1 ;

    this.init = function (){
      $('share-page').hide();
      $('#panelTab1').show('drop',{},500,function(){});
      $('#panelTab2').hide();
      $('#panelTab3').hide();
    }
    this.setTab = function (index){
      switch (index) {
        case 1:
        $('#selectDot2').removeClass('active');
        $('#selectDot1').addClass('active');
        if(tab == 2){
          $('#panelTab2').hide('drop',{direction:"right"},500,function(){
            $('#panelTab1').show('drop',{},500,function(){});
          });
        }
        else{
          $('#panelTab3').hide('drop',{direction:"right"},500,function(){
            $('#panelTab1').show('drop',{},500,function(){});
          });
        }
        tab = 1 ;
          break;
        case 2:
        $('#selectDot1').removeClass('active');
        $('#selectDot2').addClass('active');
        $('#panelTab1').hide('drop',{},500,function(){
          $('#panelTab2').show('drop',{direction:"right"},500,function(){});
        });
        tab = 2 ;
          break;
        case 3:
        $('#selectDot1').removeClass('active');
        $('#selectDot2').addClass('active');
        $('#panelTab1').hide('drop',{},500,function(){
          $('#panelTab3').show('drop',{direction:"right"},500,function(){});
        });
        tab = 3 ;
          break;
        default:

      }
    }
  });

app.controller('PageController',function(){
    this.header = "Profil";
    this.index = 2;
    this.btn1 = true;
    this.btn2 = true;
    leftMenu = false ;
    rightMenu = false ;

    this.yorumPanelKey = false;
    this.searchPanelKey = false;
    this.sharePanelKey = false ;
    this.activityPanelKey = false;

    this.yorumPanelData = "";

    this.initFunction = function(){
      leftMenu = false;
      rightMenu = false;
      $('menu-panel').hide();
      $('activity-Page').hide();

      $('#pageSection1').hide();
      $('#pageSection3').hide();
      $('.leftMenu').hide();
      $('.rightMenu').hide();
      this.CloseSharePage();
      this.CloseYorumPage();
      this.btn1function = function(){
        this.OpenLeftMenu()
      }
    }

    this.OpenLeftMenu = function(){
      leftMenu = true ;
      $('menu-panel').show();
      $('.leftMenu').hide();
      $('.rightMenu').hide();
      $('.leftMenu').show("drop",{},500,function(){});
    }
    this.CloseLeftMenu = function(){
      leftMenu = false;
      $('.leftMenu').hide("drop",{},500,function(){});
    }

    this.OpenRightMenu = function(){
      rightMenu = true ;
      $('menu-panel').show();
      $('.rightMenu').hide();
      $('.leftMenu').hide();
      $('.rightMenu').show("drop",{direction:"right"},500,function(){});
    }
    this.CloseRightMenu = function(){
      rightMenu = false;
      $('.rightMenu').hide("drop",{direction:"right"},500,function(){});
    }
    this.OpenSearchPanel = function(){
      this.searchPanelKey = true ;
    }
    this.CloseSearchPanel = function(){
      this.searchPanelKey = false ;
    }
    this.OpenSharePage = function(){
      $('share-page').show();
      this.sharePanelKey = true ;
      $('.rightMenu').hide();
    }
    this.CloseSharePage = function(){
      this.sharePanelKey = false ;
      $('.shareTPI').addClass('info');
      $('.shareTPI').removeClass('university');
      $('.shareTPI').removeClass('building');
      $('.shareTPI').removeClass('users');
      $('.shareTPI').removeClass('world');
      $('.activity.text').text("Paylaşım Kitlesini Seç...");
      $('.shareText').val("");
    }
    this.OpenActivityPage = function(){
      $('activity-page').show();
      this.activityPanelKey = true ;
      $('.rightMenu').hide();
    }
    this.CloseActivityPage = function(){
      this.activityPanelKey = false ;
      $('.shareTPI').addClass('info');
      $('.shareTPI').removeClass('university');
      $('.shareTPI').removeClass('building');
      $('.shareTPI').removeClass('users');
      $('.shareTPI').removeClass('world');
      $('#shareType').text("Paylaşım Kitlesini Seç...");
      $('.shareText').val("");
    }

    //Top Menu button 1
    this.btn1function = function(){
      console.log("btn1 callback");
    };
    //Top Menu button 2
    this.btn2function = function(){
      console.log("btn2 callback");
    };

    this.CloseYorumPage = function (){
      $('#yorumPanel').text('');
      this.yorumPanelKey = false;
      this.yorumPanelData = "";
    }
    this.OpenYorumPage = function (data){
      if(this.yorumPanelKey == false){
        $('#yorumPanel').text('');
        this.yorumPanelData = data;
        this.yorumPanelKey = true ;
      }
    }
    this.showYorum = function(data){
      $('#yorumPanel').text('');
      var i ;
      if(data){
        for(i = 0 ; i < data.length ; i++){
          var yorum = data[i];
          if(yorum.your){
            $('#yorumPanel').append('<div class="msgTable me"><div class="msgProfName">'+yorum.user.name+'</div><div class="msgBody">'+yorum.text.toString() +'</div></div>');
          }else{
            $('#yorumPanel').append('<div class="msgTable"><img class="msgPhoto" src="'+yorum.user.profImg+'" ></img><div class="msgProfName">'+yorum.user.name+'</div><div class="msgBody">'+ yorum.text.toString() +'</div></div>');
          }
        }
      }
    }
    this.setTab = function(index){
      switch (index) {
        case 1:
        this.header = "Güncel";
        $('.selectIcon.home').addClass('active');
        $('.selectIcon.profile').removeClass('active');
        $('.selectIcon.friends').removeClass('active');
        $('.headerBackground').removeClass('transparent');
        $('#pageSection1').show('fade',{},500,function(){});
        $('.profilImageTable').hide('fade',{},100,function(){
            $('#pageSection2').hide('fade',{direction:"right"},500,function(){});
        });
        $('.profileInfo').hide('fade',{},500,function(){});
        $('#pageSection3').hide('fade',{direction:"right"},500,function(){});


        $('#pbtn2').removeClass('photo');
        $('#pbtn2').removeClass('photo');
        $('#pbtn2').addClass('align justify');

        this.btn1 = false ;
        this.btn2 = true ;
        this.btn1function = function(){}
        this.btn2function = function(){
          this.OpenRightMenu();
        }
        this.index = 1 ;
          break;
        case 2:
        this.header = "Profil";
        $('.selectIcon.profile').addClass('active');
        $('.selectIcon.home').removeClass('active');
        $('.selectIcon.friends').removeClass('active');
        $('.headerBackground').addClass('transparent');
        if(this.index == 1)
        $('#pageSection2').show('fade',{direction:"right"},500,function(){
          $('.profilImageTable').show('fade',{},100,function(){});
          $('.profileInfo').show('fade',{},500,function(){});
        });
        else
        $('#pageSection2').show('fade',{},500,function(){
          $('.profilImageTable').show('fade',{},100,function(){});
          $('.profileInfo').show('fade',{},500,function(){});
        });
        $('#pageSection1').hide('fade',{},500,function(){});
        $('#pageSection3').hide('fade',{},500,function(){});

        $('#pbtn2').removeClass('add user');
        $('#pbtn2').removeClass('align justify');
        $('#pbtn2').addClass('photo');

        this.btn1 = true ;
        this.btn2 = true ;
        this.btn1function = function(){
          this.OpenLeftMenu()
        }
        this.btn2function = function(){

        }

        this.index = 2;
          break;
        case 3:
        this.header = "Arkadaşlarım";
        $('.selectIcon.friends').addClass('active');
        $('.selectIcon.home').removeClass('active');
        $('.selectIcon.profile').removeClass('active');
        $('.headerBackground').removeClass('transparent');
        $('#pageSection3').show('fade',{},500,function(){});
        $('.profilImageTable').hide('fade',{},100,function(){
            $('#pageSection2').hide('fade',{},500,function(){});
        });
        $('.profileInfo').hide('fade',{},500,function(){});
        $('#pageSection1').hide('fade',{},500,function(){});

        $('#pbtn2').addClass('add user');
        $('#pbtn2').removeClass('photo');
        $('#pbtn2').removeClass('align justify');

        this.btn1 = false ;
        this.btn2 = true ;
        this.btn1function = function(){};
        this.btn2function =  function(){
          console.log("buton 2");
          this.OpenSearchPanel();
        };
        this.index = 3 ;
        default:

      }
    }
});

app.controller('ProfileController',function(){
  this.data = profile;
});

app.controller('MessageController',function(){
  this.status = 1;
  this.active=0 ;
  this.close = function(){
    active = 0 ;
    $("#message").hide("drop" ,{direction: "up"});
  }
  switch (this.status) {
    case 0:
      this.data = wrongPass ;
      $("#message").removeClass("green");
      $("#message").addClass("red");
      $("#message").show("bounce");
      break;
    case 1:
      this.data = successLogin;
      $("#message").removeClass("red");
      $("#message").addClass("green");
      $("#message").fadeIn("bounce");
      break;
    default:

  }
  });
  app.controller('newsController',function(){

    this.data0={
      dataType:"Text",
      bodyText : "Merhabalar Ben Efecan Altay.\n Sizlere bu Sosyal Paylaşım Platformunu kurdum.",
      bodyImage: "Resimm",
      viewCount: 5,
      likeCount : 3,
      date : "07.05.2016",
      yorumData : {
        yorumHeader:"Merhabalar ben ...",
        yorumIconIndex:0,
        yorumIcon:["comment" , "picture" ,"student"],
        yorumStatusIndex:0,
        yorumStatus:["building","cloud"],
        yorums : [
          {
          count: 0,
          your : true,
          user : {
                  name: "Efecan Altay",
                  profImg : "img/prof.jpg"
                 },
          text : "Yorumları Alalım",
          date : "23.12.07",
          time : "23.00"
          },
          {
          count: 1,
          your : false,
          user : {
                  name: "Android",
                  profImg : "img/ic_launcher.png"
                  },
          text : "Çok Güzel bir uygulama",
          date : "23.12.07",
          time : "23.00"
          },
          {
          count: 2,
          your : false,
          user : {
                  name: "Bilecik",
                  profImg : "img/bileciklogo.jpg"
                  },
          text : "Bende Evet Katılıyorum",
          date : "23.12.07",
          time : "23.00"
          }
      ]
    }
    };
    this.data1={
      dataType:"Text",
      bodyText : "Merhabalar Ben Efecan Altay.\n Sizlere bu Sosyal Paylaşım Platformunu kurdum.",
      bodyImage: "Resimm",
      viewCount: 10,
      likeCount : 5,
      date : "07.05.2016",
      yorumData : {
        yorumHeader:"Merhabalar ben ...",
        yorumIconIndex:1,
        yorumIcon:["comment" , "picture" ,"student"],
        yorumStatusIndex:0,
        yorumStatus:["building","cloud"],
        yorums : [{
          count: 0,
          your : false,
          user : {
              name: "Android",
              profImg : "img/ic_launcher.png"
          },
          text : "Resim Bi harika",
          date : "23.12.07",
          time : "23.00"
          },{
          count: 1,
          your : true,
          user : {
              name: "Efecan Altay",
              profImg : "img/prof.jpg"
          },
          text : "Teşekkür Ederim",
          date : "23.12.07",
          time : "23.00"
        }]
      }
    };
    this.data2={
      dataType:"Text",
      bodyImage: "Resim",
      activityInfo :{name:"Akıllı Cihazların Önemi",date:"23 Ekim 2016",time:"20:00"},
      viewCount: 8,
      likeCount : 3,
      date : "07.05.2016",
      yorumData : {
        yorumHeader:"Merhabalar ben ...",
        yorumIconIndex:2,
        yorumIcon:["comment" , "picture" ,"student"],
        yorumStatusIndex:0,
        yorumStatus:["building","cloud"],
        yorums : [{
          count: 0,
          your : true,
          user : {
              name: "Efecan Altay",
              profImg : "img/prof.jpg"
          },
          text : "Çok Güzel Bir etkinlikti",
          date : "23.12.07",
          time : "23.00"
          },{
          count: 1,
          your : false,
          user : {
              name: "Efecan Altay",
              profImg : "img/prof.jpg"
          },
          text : "Evet Katılıyorum",
          date : "23.12.07",
          time : "23.00"
        }]
      }
    };

  });
  app.directive('newsTextTable',function(){
    return{
      restrict : 'E',
      templateUrl: 'html/newsText.html'
    };
  });
  app.directive('newsPhotoTable',function(){
    return{
      restrict : 'E',
      templateUrl: 'html/newsPhoto.html'
    };
  });
  app.directive('newsActivityTable',function(){
    return{
      restrict : 'E',
      templateUrl: 'html/newsActivity.html'
    };
  });
  app.directive('yorumPanel',function(){
    return{
      restrict : 'E',
      templateUrl: 'html/YorumPanel.html'
    };
  });
  app.directive('sharePage',function(){
    return{
      restrict : 'E',
      templateUrl: 'html/sharePage.html'
    };
  });
  app.directive('menuPanel',function(){
    return{
      restrict : 'E',
      templateUrl: 'html/menus.html'
    };
  });
  app.directive('activityPage',function(){
    return{
      restrict : 'E',
      templateUrl: 'html/activityPage.html'
    };
  });
})();
var wrongPass={
  head :"Hatalı Giriş",
  body : "Kullanıcı Adı veya Şifresi Hatalı"
}
var successLogin={
  head :"Giriş Başarılı",
  body : "Giriş Yaptınız"
}
var profile ={
  name : "Efecan",
  surname :"Altay",
  fakulte : "Mühendislik Fakültesi",
  bolum : "Bilgisayar Mühendisliği",
  durum : "Öğrenci",
  img: "img/prof.jpg",
  kimg:"img/kres.jpg"
}

//Rayu11
