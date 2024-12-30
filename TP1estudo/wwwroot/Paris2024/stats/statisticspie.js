// ViewModel KnockOut
var vm = function () {
    //---Variáveis locais
    var self = this;
    self.displayName = 'Paris2024 Statistic Pie Charts';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.data = ko.observableArray([]);
    self.tipograph = ko.observable('1');
 
    //--- Page Events
    
    self.activate = function () {
        switch (self.tipograph()) {
            case '1':
                var composedUri = "http://192.168.160.58/Paris2024/API/Sports";
            
                ajaxHelper(composedUri, 'GET').done(function (data) {
                    hideLoading();
                    self.data(data);

                    const sport = [['Sport', 'Athletes Number']];

                    for (const d of self.data()) {
                        sport.push([d.Name, d.Athletes]);
                    }

                    google.charts.load('current', {'packages':['corechart']});
                    google.charts.setOnLoadCallback(drawChart);
              
                    function drawChart() {
              
                      var data = google.visualization.arrayToDataTable(sport);
              
                      var options = {
                        title: 'Sport by athletes percentage'
                      };
              
                      var chart = new google.visualization.PieChart(document.getElementById('piechart'));
              
                      chart.draw(data, options);
                    }
                });
                break;
    
            case '2':
                var composedUri = "http://192.168.160.58/Paris2024/API/Sports";
            
                ajaxHelper(composedUri, 'GET').done(function (data) {
                    hideLoading();
                    self.data(data);

                    const sport = [['Sport', 'Coaches Number']];

                    for (const d of self.data()) {
                        sport.push([d.Name, d.Coaches]);
                    }

                    google.charts.load('current', {'packages':['corechart']});
                    google.charts.setOnLoadCallback(drawChart);
              
                    function drawChart() {
              
                      var data = google.visualization.arrayToDataTable(sport);
              
                      var options = {
                        title: 'Sport by coaches percentage'
                      };
              
                      var chart = new google.visualization.PieChart(document.getElementById('piechart'));
              
                      chart.draw(data, options);
                    }
                });
                break;
            case '3':
                var composedUri = "http://192.168.160.58/Paris2024/API/Sports";
            
                ajaxHelper(composedUri, 'GET').done(function (data) {
                    hideLoading();
                    self.data(data);

                    const sport = [['Sport', 'Teams Number']];

                    for (const d of self.data()) {
                        sport.push([d.Name, d.Teams]);
                    }

                    google.charts.load('current', {'packages':['corechart']});
                    google.charts.setOnLoadCallback(drawChart);
              
                    function drawChart() {
              
                      var data = google.visualization.arrayToDataTable(sport);
              
                      var options = {
                        title: 'Sport by teams percentage'
                      };
              
                      var chart = new google.visualization.PieChart(document.getElementById('piechart'));
              
                      chart.draw(data, options);
                    }
                });
                break;
        }
    };
    
    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                hideLoading();
                self.error(errorThrown);
            }
        });
    }

    function showLoading() {
        $("#myModal").modal('show', {
            backdrop: 'static',
            keyboard: false
        });
    }
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    //--- start ....
    self.activate();
};

$(document).ready(function () {
    ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
})