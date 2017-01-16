
//Email girişi hatalı olduğunda geri dönme işlemi

//var ip = "10.82.15.100";
var ip = "192.168.2.73";
//var ip = "localhost";

var kadi ;
var pass ;
var pass2 ;
var mail ;
var kname,ksurname;
var fakulte,bolum ;

$(document).ready(function(){
  $('input').keypress(function(){
    $('#errorText').hide();
    $('#errorText').text('');
  });
  $('#nextButton').hide();
  $('#page1').show();
  $('#page2').hide();
  $('#bolumFielt').hide();
  $("#registerButton").hide();
  $('.ui.dropdown').dropdown({
    onChange: function(){
      var fakulte = $('#fakülte').val();
      console.log(fakulte);
      switch (fakulte) {
        case "0":
            console.log(0);
            $('#bolumFielt').show();
            $('#bolum').html('');
            $('#bolum').append('<option value="">Bölüm seç...</option>');
            $('#bolum').append('<option value="0">Bilgisayar Mühendisliği</option>');
            $('#bolum').append('<option value="1">Elektrik Elektronik Mühendisliği</option>');
            $('#bolum').append('<option value="2">İnşaat Mühendisliği</option>');
            $('#bolum').append('<option value="3">Makine ve imalat Mühendisliği</option>');
            $('#bolum').append('<option value="4">Kimya ve Süreç Mühendisliği</option>');
            $("#bolum").val("Bölüm Seç...");
            $("#registerButton").show();
          break;
        case "1":
            $('#bolumFielt').hide();
            $('#bolumFielt').show();
            $('#bolum').html('');
            $('#bolum').append('<option value="">Bölüm seç...</option>');
            $('#bolum').append('<option value="0">İktisat</option>');
            $('#bolum').append('<option value="1">İşletme</option>');
            $('#bolum').append('<option value="2">Maliye</option>');
            $('#bolum').append('<option value="3">Siyaset Birimi ve Kamu Yönetimi</option>');
            $('#bolum').append('<option value="4">Yönetim ve Bilişim Sistemleri</option>');
            $('#bolum').append('<option value="5">Uluslararası ilişkiler</option>');
            $("#bolum").val(0).change();
            $("#registerButton").show();
          break;
        case "2":
            $('#bolumFielt').hide();
            $('#bolumFielt').show();
            $('#bolum').html('');
            $('#bolum').append('<option value="">Bölüm Seç...</option>');
            $('#bolum').append('<option value="0">Arkeoloji</option>');
            $('#bolum').append('<option value="1">Coğrafya</option>');
            $('#bolum').append('<option value="2">İstatistlik</option>');
            $('#bolum').append('<option value="3">Fizik</option>');
            $('#bolum').append('<option value="4">Kimya</option>');
            $('#bolum').append('<option value="5">Matematik</option>');
            $('#bolum').append('<option value="6">Molerküler Biyoloji ve Genetik</option>');
            $('#bolum').append('<option value="7">Tarih</option>');
            $('#bolum').append('<option value="8">Türk Dili Ve Edebiyatı</option>');
            $("#bolum").val("Bölüm Seç...");
            $("#registerButton").show();
          break;
        case "3":
            $('#bolumFielt').hide();
            $('#bolumFielt').show();
            $('#bolum').html('');
            $('#bolum').append('<option value="">Bölüm Seç...</option>');
            $('#bolum').append('<option value="0">Güzel Sanatlar</option>');
            $("#bolum").val(0).change();
            $("#registerButton").show();
          break;
          case "4":
              $('#bolumFielt').hide();
              $('#bolumFielt').show();
              $('#bolum').html('');
              $('#bolum').append('<option value="">Bölüm Seç...</option>');
              $('#bolum').append('<option value="0">Felsefe ve Din Bilimleri</option>');
              $('#bolum').append('<option value="1">İslam Tarihi ve Sanatları</option>');
              $('#bolum').append('<option value="2">Temel İslam Bilimleri</option>');
              $("#bolum").val(0).change();
              $("#registerButton").show();
            break;
            case "5":
                $('#bolumFielt').hide();
                $('#bolumFielt').show();
                $('#bolum').html('');
                $('#bolum').append('<option value="">Bölüm Seç...</option>');
                $('#bolum').append('<option value="0">Bahçe Bitkileri</option>');
                $('#bolum').append('<option value="1">Biyosistem Mühendisliği</option>');
                $('#bolum').append('<option value="2">Tarla Bitkileri</option>');
                $("#bolum").val(0).change();
                $("#registerButton").show();
              break;
        default:
            $('#bolumFielt').hide();
          break;
      }
    }
  });

});
function registerLogin(){
  kname = $('#kname').val();
  ksurname = $('#ksurname').val();
  fakulte = $('#fakulte').val();
  bolum = $('#bolum').val();

  $.ajax({
  type: "POST",
  url: "http://"+ip+":3030/register",
  data: {kadi :kadi ,pass:pass,mail:mail ,name : kname,surname: ksurname , fakulte: parseInt(fakulte),bolum : parseInt(bolum)},
  error:function(data){
    if(data.statusText =="error"){
      showErrorMessage("bağlantıda sorun var","Bağlantınız veya Sunucu hatalı");
    }
  },
  success:function(data,err){
          console.log(data);
          $.ajax({
          type: "POST",
          url: "http://"+ip+":3030/users/login",
          data: { kadi :kadi , pass:pass},
          error: function(req,stat,err){
            showErrorMessage("Bağlantı Hatası","Bağlantınızı kontrol edin");
            alert(err);
          },
          success:function(data){
            if(data.status){
              setCookie("veri",data.logid);
              setWindowLocate('profile.html');
            }else
            showErrorMessage("Kullanıcı Yok");
          }
          });
      }
  });
}
function isRegistered(){
  var isRegister = false;
  $.ajax({
  type: "POST",
  async: false,
  url: "http://"+ip+":3030/register/isRegistered",
  data: { kadi :kadi ,email : mail},
  error: function(req,stat,err){
    showErrorMessage("Bağlantı Hatası","Bağlantınızı kontrol edin");
    alert(err);
  },
  success:function(data){
    console.log(data.status);
    isRegister = data.status;
  }
  });
  console.log(isRegister);
  return isRegister;
}
function TryRegister(){
  $('#errorText').hide();
  kadi = $('#kname').val();
  pass = $('#pass').val();
  pass2 = $('#pass2').val();
  mail = $('#mail').val();

  if(kadi == "" || pass == "" || pass2 == "" || mail == "")
  {
    showErrorMessage('Hata','Boş Yer Kalmamalı');
  }
  else if(kadi.length < 5){
    console.log("kullanıcı adı uzunluğu hatası");
    showErrorMessage('Kullanıcı adı çok kısa',' Minimum 5 karakter olmalı');
  }
  else if(!(/([a-z]|[A-Z]|[1-9])@gmail.com\b/.test(mail)) && !(/([a-z]|[A-Z]|[1-9])@hotmail.com\b/.test(mail))){
    showErrorMessage('Mail girişi hatalı','Mailinizi kontrol edin');
  }
  else if(!(pass == pass2)){
    console.log("şifre tekrarla");
    showErrorMessage('Şifreler Uyuşmuyor','Şifreleri tekrar giriniz');
  }
  else{
    if(isRegistered())
    {
      showSuccessMessage('Harika','ileri geçebilirsiniz');
      $('#nextButton').show();
    }
    else{
      showErrorMessage('Tekrar Deneyin','böyle bir kullanıcıAdı kayıtlı');
      $('#nextButton').hide();
    }
  }
}
function Next(){
  $('#page1').hide();
  $('#page2').show();
}
