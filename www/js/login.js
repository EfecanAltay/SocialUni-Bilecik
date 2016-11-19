function login(){
  $.ajax({
  type: "POST",
  url: "http://localhost:3030/register",
  data: { kadi :"admin" , pass:"admin"}
  });
}
