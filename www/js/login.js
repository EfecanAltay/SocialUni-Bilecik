

function login(){
  var kadi = $("#kadi").val();
  var pass = $("#pass").val();

  if(kadi == ""){
    $("#kadiUI").addClass('error');
  }
  else if(pass == ""){
    $("#passUI").addClass('error');
  }
  else{
    $.ajax({
    type: "POST",
    url: "http://localhost:3030/users/login",
    data: { kadi :kadi , pass:pass},
    success:function(data){
      console.log(data.message);
      if(data.status)
        setWindowLocate('profile.html');
    }
    });
  }
}
