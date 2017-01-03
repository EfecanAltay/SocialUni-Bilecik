$.getScript("js/CookieControl.js");

//var ip = "192.168.2.76";
//var ip = "10.82.15.100";
var ip = "localhost";


$(document).ready(function(){
    if(getCookie("veri")){
      //setWindowLocate("profile.html");
    }
});

function login(){

  var kadi = $("#kadi").val();
  var pass = $("#pass").val();

  if(kadi == ""){
    $("#kadiUI").addClass('error');
    showErrorMessage("Hatalı Giriş","Kullanıcı Adı Boş Olamaz");
  }
  else if(pass == ""){
    $("#passUI").addClass('error');
    showErrorMessage("Hatalı Giriş","Şifre Boş Olamaz");
  }
  else{
    $.ajax({
    type: "POST",
    url: "http://"+ip+":3030/users/login",
    data: { kadi :kadi , pass:pass},
    error: function(req,stat,err){
      showErrorMessage("Bağlantı Hatası","Bağlantınızı kontrol edin");
      alert(err);
    },
    success:function(data){
      function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
      }
      if(data.status){
        setCookie("veri",data.logid);
        sleep(1000);
        setWindowLocate('profile.html');
      }else
      showErrorMessage("Kullanıcı Yok");
    }
    });
  }
}
