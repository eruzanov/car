angular
    .module('app', ['ngMaterial'])
    .config([
        '$mdIconProvider',
        function($mdIconProvider) {
            $mdIconProvider
                .defaultIconSet('sprite-navigation.svg')
                .iconSet('action', 'sprite-action.svg');
        }
    ])
    .directive('datepicker', [
        '$mdPanel',
        function($mdPanel) {
            return {
                scope: {
                    date: '=',
                    format: '@?'
                },
                template:
                    '<div class="datepicker" ng-click="showDatepicker($event)">\
                      <input ng-model="datepicker.value" />\
                      <md-icon md-svg-icon="action:today"></md-icon>\
                    </div>',
                link: function($scope, el) {
                    var format = $scope.format || 'DD.MM.YYYY';

                    $scope.datepicker = {
                        date: $scope.date,
                        value: moment($scope.date).format(format)
                    };

                    $scope.$watch('datepicker.date', function(date) {
                        $scope.datepicker.value = moment(date).format(format);
                        $scope.date = moment(date).toDate();
                    });

                    $scope.$watch('datepicker.value', function(value) {
                        $scope.datepicker.date = moment(
                            $scope.datepicker.value,
                            format
                        ).toDate();
                    });

                    $scope.showDatepicker = function($event) {
                        var panelPosition = $mdPanel
                            .newPanelPosition()
                            .relativeTo(el)
                            .addPanelPosition(
                                $mdPanel.xPosition.ALIGN_START,
                                $mdPanel.yPosition.BELOW
                            );

                        var panelAnimation = $mdPanel
                            .newPanelAnimation()
                            .openFrom($event)
                            .duration(100)
                            .withAnimation($mdPanel.animation.FADE);

                        var config = {
                            attachTo: angular.element(document.body),
                            position: panelPosition,
                            animation: panelAnimation,
                            targetEvent: $event,
                            controller: function() {},
                            controllerAs: 'ctrl',
                            template:
                                '<div class="datepicker__calendar">\
                                    <md-calendar ng-model="ctrl.datepicker.date"></md-calendar>\
                                </div>',
                            clickOutsideToClose: true,
                            escapeToClose: true,
                            propagateContainerEvents: true,
                            focusOnOpen: false,
                            locals: {
                                datepicker: $scope.datepicker
                            }
                        };

                        $mdPanel.open(config);
                    };
                }
            };
        }
    ])
    .controller('app', [
        '$scope',
        function($scope) {
            $scope.user = { bithday: moment('1999-09-23').toDate() };
            $scope.bithday = moment('1999-09-23').toDate();
        }
    ]);
