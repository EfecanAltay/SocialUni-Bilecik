
//Email girişi hatalı olduğunda geri dönme işlemi

function register(){
  var kadi = $('#kname').val();
  var pass = $('#pass').val();
  var pass2 = $('#pass2').val();
  var mail = $('#mail').val();

  if(kadi.length < 5){
    console.log("kullanıcı adı uzunluğu hatası");
  }
  else if(!(pass == pass2)){
    console.log("şifre tekrarla");
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
