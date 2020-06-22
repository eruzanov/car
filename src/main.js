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
        '$mdPanel',
        function($scope, $mdPanel) {
            $scope.showDatepicker = function($event) {
                $scope.date = new Date();

                var panelPosition = $mdPanel
                    .newPanelPosition()
                    .relativeTo($event.srcElement)
                    .addPanelPosition(
                        $mdPanel.xPosition.ALIGN_START,
                        $mdPanel.yPosition.BELOW
                    );

                var panelAnimation = $mdPanel
                    .newPanelAnimation()
                    .openFrom($event)
                    .duration(200)
                    .withAnimation($mdPanel.animation.FADE);

                var config = {
                    attachTo: angular.element(document.body),
                    controller: DialogController,
                    controllerAs: 'ctrl',
                    position: panelPosition,
                    animation: panelAnimation,
                    targetEvent: $event,
                    templateUrl: 'datepicker.html',
                    clickOutsideToClose: true,
                    escapeToClose: true,
                    propagateContainerEvents: true
                };

                $mdPanel.open(config);
            };

            function DialogController(mdPanelRef) {
                this.date = new Date();
                // function closeDialog() {
                //     if (MdPanelRef) MdPanelRef.close();
                // }
            }
        }
    ]);
