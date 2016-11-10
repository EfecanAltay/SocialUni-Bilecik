$(document).ready(function(){
  $('.ui.form')
  .form({
        fields: {
          kname: {
                  identifier: 'kname',
                  rules: [
                            {
                              type   : 'empty',
                              prompt : 'Please enter your name'
                            }
                          ]
                }
              }
      });
});
