
angular.module('news',[])

.controller('newsController',function(){
  this.text = "Merhaba"
})
.directive('newsTable',function(){
  return{
    restrict : 'E',
    templateUrl: 'html/newsText.html'
  };
});
