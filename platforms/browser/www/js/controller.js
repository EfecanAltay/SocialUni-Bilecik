
$(document).ready(function(){
  //window.addEventListener("touchstart", function(e) { e.preventDefault();}, false);
  //window.addEventListener("touchmove", function(e) { e.preventDefault();}, false);

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
    this.initFunction = function(){
      leftMenu = false;
      $('#pageSection1').hide();
      $('#pageSection3').hide();
      $('.leftMenu').hide();
      $('.rightMenu').hide();

      this.btn1function = function(){
        this.OpenLeftMenu()
      }
    }

    this.OpenLeftMenu = function(){
      leftMenu = true ;
      $('.leftMenu').show("drop",{},500,function(){});
    }
    this.CloseLeftMenu = function(){
      leftMenu = false;
      $('.leftMenu').hide("drop",{},500,function(){});
    }

    this.OpenRightMenu = function(){
      rightMenu = true ;
      $('.rightMenu').show("drop",{direction:"right"},500,function(){});
    }
    this.CloseRightMenu = function(){
      rightMenu = false;
      $('.rightMenu').hide("drop",{direction:"right"},500,function(){});
    }

    this.btn1function = function(){
      console.log("btn1 callback");
    };
    this.btn2function = function(){
      console.log("btn2 callback");
    };

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
        this.btn1function = function(){}
        this.btn2function = function(){}

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
    this.data={
      dataType:"Text",
      bodyText : "Merhabalar Ben Efecan Altay.\n Sizlere bu Sosyal Paylaşım Platformunu kurdum.",
      bodyImage: "Resimm"
    };

  })
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
