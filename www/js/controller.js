/* Notlar
HammerJS reflesh bir bak..
*/
$.getScript("js/CookieControl.js");


function readURL(input){
  var imageSrc ="" ;
  if (input.files && input.files[0]) {
   var reader = new FileReader();
   reader.onload = function (e) {
             $('#setProfilPanelImage')
                 .attr('src', e.target.result)
                 .width(150);
          };
   reader.readAsDataURL(input.files[0]);
   }
}

function getProfilData(kid){
  var profileData ;
  $.ajax({
      type: "POST",
      async: false,
      url: "http://localhost:3030/users/getProfile",
      data: { kid :kid },
      error: function(data){
        showErrorMessage("Bağlantı Hatası","Bağlantınızı kontrol edin");
      },
      success:function(data){
        if(!data.status){
          //setWindowLocate('index.html');
          logout();
        }
        else
          profileData = data.profileData ;
      }
    });
    return profileData ;
}

function getNews(kid){
  var newsData ;
  $.ajax({
      type: "POST",
      async: false,
      url: "http://localhost:3030/news",
      data: { kid :kid },
      error: function(data){
        showErrorMessage("Bağlantı Hatası","Bağlantınızı kontrol edin");
      },
      success:function(data){
        if(!data.status){
          showErrorMessage("Bağlantı Hatası","Bağlantı yanlış");
        }
        else
          newsData = data.news ;
      }
    });
    return newsData;
}


function logout(){
  var kid = getCookie("veri");
  deleteCookie("veri");
  $.ajax({
      type: "POST",
      url: "http://localhost:3030/users/logout",
      data: { kid :kid },
      error: function(data){
        showErrorMessage("Bağlantı Hatası","Bağlantınızı kontrol edin");
      },
      success:function(data){
        if(data.status){
          console.log("silindi");
          setWindowLocate('index.html');
        }
      }
    });
    setWindowLocate('index.html');
}

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
  this.setProfilePicKey = false ;

  this.openProfilePic = function (){
    this.setProfilePicKey = true ;
    $('#setProfilPanelImage')
           .attr('src', this.data.img);
  }
  this.closeProfilePic = function (){
    this.setProfilePicKey = false ;
  }
  this.imSrc = "";
  this.uploadImg = function(){
    if(this.imSrc)
      {
        this.data.img = this.imSrc ;
        console.log("yükleme tamamlandı");
        console.log(this.data.img);
      }
  }
  this.dropImage = function(){
      this.imSrc = "";
      $('#setProfilPanelImage')
             .attr('src', "img/defaultPR.png")
             .width(150);
      $('#setProfilPanelBtn').val("");
  }
  var kid = getCookie("veri");
    if(kid){
    profileData  = getProfilData(kid);
    console.log(profileData);
    }

    if(profileData){
      this.data = profileData ;
    }else{
      console.error("bağlantı hatası var Tekrar giriş yapınız : " + kid);
      this.data ="";
      logout();
    }

});
app.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    scope.fileread = changeEvent.target.files[0];
                });
            });
        }
    }
}]);
app.controller('newsController',function($compile,$scope){

    this.data  = "";
    this.modeldata = "";
    this.reflesh = function(){
      $('#scrolltableNews').html('');
        var kid = getCookie("veri");
        this.data = getNews(kid);
        angular.forEach(this.data,function(a){
          addNewElement(a);
          //console.log(a);
      });
    }
    function addNewElement(data){
      this.modeldata = data ;
      this.dada = data ;
      console.log(data);
      if(data.dataType == "Text"){
        $('#scrolltableNews').append($compile("<news-text-table><news-text-table/>")($scope));
      }
      else if(data.dataType == "Photo")
      {
        $('#scrolltableNews').append($compile("<news-photo-table><news-photo-table/>")($scope));
      }
      else if(data.dataType == "Activity")
      {
        $('#scrolltableNews').append($compile("<news-activity-table><news-activity-table/>")($scope));
      }
    }

  });
  app.directive('newsTextTable',function(){
    return{
      restrict : 'E',
      templateUrl: 'html/newsText.html'
    }
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
