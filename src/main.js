angular
    .module('app', ['ngMaterial'])
    .config([
        '$mdIconProvider',
        function($mdIconProvider) {
            $mdIconProvider
                .defaultIconSet('sprite-navigation.svg')
                .iconSet('navigation', 'sprite-navigation.svg');
        }
    ])
    .controller('app', [
        '$scope',
        function($scope) {
            function random(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }
            const icons = [
                'arrow_upward',
                'arrow_back',
                'arrow_downward',
                'arrow_forward',
                'chevron_left',
                'chevron_right',
                'expand_less',
                'expand_more'
            ];
            let uniqId = 0;
            $scope.rows = new Array(10).fill(true).map((it, i) =>
                new Array(10).fill(true).map((it, j) => ({
                    id: ++uniqId,
                    icon: icons[random(icons.length)]
                }))
            );
        }
    ]);
