$.getScript("js/CookieControl.js");

$(document).ready(function(){
    if(getCookie("veri")){
      setWindowLocate("profile.html");
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
    url: "http://localhost:3030/users/login",
    data: { kadi :kadi , pass:pass},
    error: function(data){
      showErrorMessage("Bağlantı Hatası","Bağlantınızı kontrol edin");
    },
    success:function(data){
      if(data.status){
        setCookie("veri",data.kid);
        console.log(data.kid);
        setWindowLocate('profile.html');
      }else
      showErrorMessage("Kullanıcı Yok");
    }
    });
  }
}
