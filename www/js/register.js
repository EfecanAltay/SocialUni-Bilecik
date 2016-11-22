
//Email girişi hatalı olduğunda geri dönme işlemi

$(document).ready(function(){
  $('input').keypress(function(){
    $('#errorText').hide();
    $('#errorText').text('');
  });
});

function register(){
  $('#errorText').hide();
  var kadi = $('#kname').val();
  var pass = $('#pass').val();
  var pass2 = $('#pass2').val();
  var mail = $('#mail').val();

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
    $.ajax({
    type: "POST",
    url: "http://localhost:3030/register",
    data: {kadi :kadi ,pass:pass,mail:mail},
    success:function(data){
            console.log(data);
        }
    });

  }
}
