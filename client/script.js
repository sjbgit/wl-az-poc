angular.module('ui.bootstrap.demo', ['ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('CarouselDemoCtrl', function ($scope, $http) {
  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  // $scope.addSlide = function() {
  //   var newWidth = 600 + slides.length + 1;
  //   slides.push({
  //     image: 'http://placekitten.com/' + newWidth + '/300',
  //     text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
  //       ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
  //   });
  // };
  // for (var i=0; i<4; i++) {
  //   $scope.addSlide();
  // }

  $http.get('/api/slides')
            .success(function (data, status, headers, config) {
                $scope.slides = data;
            })
            .error(function(data, status, headers, config){
                console('error');
                console.log('error: ' + data);
            });
});