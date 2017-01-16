/* Notlar
->HammerJS reflesh bir bak..
->set Profil Texture 446. satırda hata düzeltilecek base64 bit dönüşümü yapılıp json veri gönderilecek
*/


$.getScript("js/CookieControl.js",function(){
  logid = getCookie("veri");
});
$.getScript("js/ImagetoBase64Data.js");

var ip = "192.168.2.73";
//var ip = "10.82.15.100";
//var ip = "localhost";

var kid = "";
var logid ;

function refleshNewsButton(){
  var scope = angular.element(document.getElementById("refleshNewsButton")).scope();
    $('#scrolltableNews').text('');
    scope.data = getNews();
    for(var i = scope.data.length-1 ; i >= 0 ; i--)
    {
      scope.panelData = scope.data[i];
      scope.addNewElement(scope.panelData);
    }
}

function refleshFriendsButton(){
  var scope = angular.element(document.getElementById("refleshFriendButton")).scope();
  $('#scrolltableFriends').html('');
    scope.friendsData = getFriends();
    console.log(scope.friendsData[0]);
    if(scope.friendsData)
      for(var i = 0 ; i < scope.friendsData.length ; i++)
      {
        scope.panelData = scope.friendsData[i];
        scope.addFriendTable(scope.panelData);

      }
}


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

function getProfilData(){
  //var logid = getCookie("veri");
  var profileData ;
  $.ajax({
      type: "POST",
      async: false,
      url: "http://"+ip+":3030/users/getProfile",
      data: { logid :logid },
      error: function(data){
        showErrorMessage("Bağlantı Hatası2","Bağlantınızı kontrol edin profil");
      },
      success:function(data){
        if(!data.status){
          //setWindowLocate('index.html');
          logout();
        }
        else{
          profileData = data.profileData ;
          kid = data.profileData.kid;
        }
      }
    });
    return profileData ;
}
function getFriends(){
  var logid = getCookie("veri");
  var friends ;
  $.ajax({
      type: "POST",
      async: false,
      url: "http://"+ip+":3030/users/getFriends",
      data: { logid :logid },
      error: function(data){
        showErrorMessage("Bağlantı Hatası","Bağlantınızı kontrol edin friend");
      },
      success:function(data){
        if(!data.status){
          showErrorMessage("Bağlantı Hatası","Bağlantı yanlış");
        }
        else
        {
          friends = data.friendsData ;
        }
      }
    });
    return friends;
}


function getNews(){
  var newsData ;
  var logid = getCookie("veri");
  $.ajax({
      type: "POST",
      async: false,
      url: "http://"+ip+":3030/news",
      data: { logid :logid },
      error: function(data){
        showErrorMessage("Bağlantı Hatası","Bağlantınızı kontrol edin news");
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
function sendNewsLikeData(newsId){
  var newsData ;
  var logid = getCookie("veri");
  $.ajax({
      type: "POST",
      async: false,
      url: "http://"+ip+":3030/news/likeShare",
      data: { newsId : newsId ,logid :logid},
      error: function(data){
        showErrorMessage("Bağlantı Hatası","Bağlantınızı kontrol edin news");
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

function setProfilPic(imageData){
  var base64Image = getBase64Image(imageData);
  var logid = getCookie("veri");
  //console.log(base64Image);
  var status ="";
  $.ajax({
      type: "POST",
      async: false,
      url: "http://"+ip+":3030/users/setProfileImage",
      data: { logid :logid , profImage : base64Image},
      error: function(data){
        showErrorMessage("Bağlantı Hatası","Bağlantınızı kontrol edin");
      },
      success:function(data){
        if(!data.status){
          //setWindowLocate('index.html');
        }
        else
          status = data.status ;
      }
    });
    return status ;
}
function getYorumsData(newsId){
  var yorumsData ;
  var logid = getCookie("veri");
  $.ajax({
      type: "POST",
      async: false,
      url: "http://"+ip+":3030/news/getYorums",
      data: { newsId : newsId ,logid :logid },
      error: function(data){
        showErrorMessage("Bağlantı Hatası","Bağlantınızı kontrol edin news");
      },
      success:function(data){
        if(!data.status){
          showErrorMessage("Bağlantı Hatası","Bağlantı yanlış");
        }
        else
          yorumsData = data.yorumData ;
      }
    });
    return yorumsData;
}
function sendYorumData(newsId,text){
  var yorumData ;
  var logid = getCookie("veri");
  $.ajax({
      type: "POST",
      async: false,
      url: "http://"+ip+":3030/news/createYorum",
      data: { newsId : newsId ,logid :logid , text : text },
      error: function(data){
        showErrorMessage("Bağlantı Hatası","Bağlantınızı kontrol edin news");
      },
      success:function(data){
        if(!data.status){
          showErrorMessage("Bağlantı Hatası","Bağlantı yanlış");
        }
        else{
          yorumData = data.yorumData ;
          console.log(yorumData);
        }
      }
    });
    return yorumData;
}
function logout(){
  var logid = getCookie("veri");
  $.ajax({
      type: "POST",
      url: "http://"+ip+":3030/users/logout",
      data: { logid :logid },
      error: function(data){
        showErrorMessage("Bağlantı Hatası","Bağlantınızı kontrol edin logut");
      },
      success:function(data){
        if(data.status){
          console.log("silindi");
          setWindowLocate('index.html');
          deleteCookie("veri");
        }
        else{
          showErrorMessage("Server Sorunu","Şuan Çıkış Yapamazsınız sonra tekrar deneyiniz.");
        }
      }
    });
}
function creatShareText(bodyText){
  var status ="";
  var logid = getCookie("veri");
  $.ajax({
      type: "POST",
      async: false,
      url: "http://"+ip+":3030/news/CreateShare",
      data: { logid :logid,type:0 , bodyText : bodyText},
      error: function(data){
        console.error("Hata Sunucu Yanıt vermiyor");
      },
      success:function(data){
        if(!data.status){
          //setWindowLocate('index.html');
        }
        else
          status = data.status ;
      }
    });
    return status ;
}
function creatShareActivity(bodyText,date,yer,time){
  var logid = getCookie("veri");
  var status ="";
  $.ajax({
      type: "POST",
      async: false,
      url: "http://"+ip+":3030/news/CreateShare",
      data: { logid :logid ,type:1, date: date, bodyText : bodyText,yer:yer,time:time },
      error: function(data){
        console.error("Hata Sunucu Yanıt vermiyor");
      },
      success:function(data){
        if(!data.status){
          //setWindowLocate('index.html');
        }
        else
          status = data.status ;
      }
    });
    return status ;
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
    this.newsID = "";

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
      //angular.element(document.getElementById('newsSlider')).scope();
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
    this.CreateTextShare = function(){
      var bodyText = $('#ShareText').val();
        if(bodyText){
          if(creatShareText(bodyText)){
            console.log("haber oluşturuldu");
            this.CloseSharePage();
            refleshNewsButton();
            showSuccessMessage("Haber Oluşturuldu","Yazınız Paylaşıldı.")
          }
          else {
              showErrorMessage("Bağlantı Hatası","Bağlantınızı kontrol edin");
          }
        }
        else{
          console.log("text Yok")
          showErrorMessage("Boş Metin","Gönderilecek Metni giriniz.");
        }
    }
    this.CreateActivityShare = function(){
      var bodyText = $('#shareTextActivity').val();
      var date = $('#datepicker').val();
      var yer = $('#yer').val();
      //time
      var time = "00:00";
        if(bodyText){
          if(creatShareActivity(bodyText,date,yer,time)){
            console.log("haber oluşturuldu");
            this.CloseActivityPage();
            showSuccessMessage("Haber Oluşturuldu","Yazınız Paylaşıldı.");
            refleshNewsButton();
          }
          else {
              showErrorMessage("Bağlantı Hatası","Bağlantınızı kontrol edin");
          }
        }
        else{
          console.log("text Yok")
          showErrorMessage("Boş Metin","Gönderilecek Metni giriniz.");
        }
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
      $('#yorumText').val('');
      this.yorumPanelKey = false;
      this.yorumPanelData = "";
    }
    this.OpenYorumPage = function (newsId){
      if(this.yorumPanelKey == false){
        $('#yorumPanel').text('');
        this.yorumPanelKey = true ;
        this.newsId = newsId;
        this.yorumPanelData = getYorumsData(newsId);
        //burda hata
        console.log(this.yorumPanelData.yorums.JSON);
        this.showYorum(this.yorumPanelData.yorums);
      }
    }
    this.sendYorum = function(){
      var text = $('#yorumText').val();
      if(text != '' && this.newsId != ''){
        console.log("newsId :" + this.newsId +",text :" + text);
        this.yorumPanelData = sendYorumData(this.newsId,text);
      }
      $('#yorumText').val('');
    }
    this.showYorum = function(data){
      $('#yorumPanel').text('');
      var i ;
      if(data){
        for(i = data.length-1 ; i >= 0  ; i--){
          var yorum = data[i];
          if(yorum.author == kid){
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
        var img = document.getElementById('setProfilPanelImage');
        var status = setProfilPic(img);
        if(status){
          this.data.img = $('#setProfilPanelImage').attr('src') ;
          this.closeProfilePic();

          showSuccessMessage("Profiliniz Güncellenmiştir.")
          console.log("yükleme tamamlandı");
        }
        else
          console.log("yükleme hatası");
      }
  }
  this.dropImage = function(){
      this.imSrc = "";
      $('#setProfilPanelImage')
             .attr('src', "img/defaultPR.png")
             .width(150);
      $('#setProfilPanelBtn').val("");
  }

    profileData  = getProfilData();

    if(profileData){
      this.data = profileData ;
    }else{
      console.error("bağlantı hatası var Tekrar giriş yapınız : ");
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

app.controller('friendListController',function($compile,$scope){
  this.friendsData = "";

  $scope.addFriendTable = function(data){
    Jdata = JSON.stringify(data);
    $('#scrolltableFriends').append($compile("<user-table ng-controller='friendTableController as ftable' ng-init='ftable.setData("+ Jdata +")'><user-table/>")($scope));
  };

});

app.controller('friendTableController',function(){
  this.data = "";
  this.setData = function(data){
    this.data =data;
  }
});

app.controller('newsController',function($compile,$scope){

    this.data  = "";
    this.panelData = "";

    $scope.addNewElement = function (data){
      Jdata = JSON.stringify(data);
      if(data.dataType == "Text"){

        $('#scrolltableNews').append($compile("<news-text-table ng-controller='newController as new' ng-init='new.setData("+ Jdata +")'><news-text-table/>")($scope));
      }
      else if(data.dataType == "Photo")
      {
        $('#scrolltableNews').append($compile("<news-photo-table ng-controller='newController as new' ng-init='new.setData("+ Jdata +")' ><news-photo-table/>")($scope));
      }
      else if(data.dataType == "Activity")
      {
        $('#scrolltableNews').append($compile("<news-activity-table ng-controller='newController as new' ng-init='new.setData("+ Jdata +")' ><news-activity-table/>")($scope));
      }
    }

  });
  app.controller('newController',function(){
    this.data = "";
    this.isLike = false;
    this.likeCount = 0 ;

    this.like = function(){
      if(this.isLike){
        this.isLike = false;
        this.data.likeCount--;
        sendNewsLikeData(this.data._id);
      }else{
        this.isLike = true;
        this.data.likeCount++;
        sendNewsLikeData(this.data._id);
      }
    }
    this.setData = function(data){
      this.data =data;
      if(this.isUser(kid))
        this.isLike = true;
      else {
        this.isLike = false;
      }
      console.log(this.data.bodyText);
    }
    this.isUser = function(kid){
      var likeUser = this.data.likeUser;
      for(var i = 0 ; i < likeUser.length ; i++)
      {
        if(likeUser[i] == kid)
          {
            return true;
          }
      }
      return false ;
    }
  });
  app.directive('newsTextTable',function(){
    return{
      restrict : 'E',
      templateUrl: 'html/newsText.html',
      controller : function(){
        this.data ="";
      }
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
  app.directive('userTable',function(){
    return{
      restrict : 'E',
      templateUrl: 'html/userTable.html'
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
