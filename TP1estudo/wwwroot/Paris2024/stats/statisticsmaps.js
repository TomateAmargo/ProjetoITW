// ViewModel KnockOut
var vm = function () {
    //---Variáveis locais
    var self = this;
    self.displayName = 'Paris2024 Statistic Maps';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.data = ko.observableArray([]);
    self.tipograph = ko.observable('1');
 
    //--- Page Events
    
    self.activate = function () {
        switch (self.tipograph()) {
            case '1':
                var composedUri = "http://192.168.160.58/Paris2024/API/athletes?page=1&pageSize=1000000000";
            
                ajaxHelper(composedUri, 'GET').done(function (data) {
                    hideLoading();
                    self.data(data.Athletes);
    
                    google.charts.load('current', {
                        'packages':['geochart'],
                    });
                    google.charts.setOnLoadCallback(drawRegionsMap);
    
                    const countryCount = {};
    
                    var athletes = self.data();
                    console.log(athletes);
                    for (const athlete of athletes) {
                        var country = athlete.BirthCountry;
                        if (country == 'AIN') {
                            country = "RU";
                        }
                        if (countryCount[country]) {
                            countryCount[country] += 1;
                        } else {
                            countryCount[country] = 1;
                        }
                    }
    
                    const result = [['Country', 'Number of Athletes'], ...Object.entries(countryCount).sort((a, b) => b[1] - a[1])];

                    function drawRegionsMap() {
                        var data = google.visualization.arrayToDataTable(result);
    
                        var options = {};
    
                        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    
                        chart.draw(data, options);
                    }
                });
                break;
    
            case '2':
                var composedUri = "http://192.168.160.58/Paris2024/API/Medals?page=1&pageSize=1000000000";
            
                ajaxHelper(composedUri, 'GET').done(function (data) {
                    hideLoading();
                    self.data(data.Medals);
    
                    google.charts.load('current', {
                        'packages':['geochart'],
                    });
                    google.charts.setOnLoadCallback(drawRegionsMap);
    
                    const countryCount = {};
    
                    var medals = self.data();
                    for (const medal of medals) {
                        var country = medal.CountryName;
                        if (country == 'AIN') {
                            country = "RU";
                        }
                        if (countryCount[country]) {
                            countryCount[country] += 1;
                        } else {
                            countryCount[country] = 1;
                        }
                    }
    
                    const result = [['Country', 'Number of Medals'], ...Object.entries(countryCount).sort((a, b) => b[1] - a[1])];
    
                    function drawRegionsMap() {
                        var data = google.visualization.arrayToDataTable(result);
    
                        var options = {};
    
                        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    
                        chart.draw(data, options);
                    }
                });
                break;
            case '3':
                var composedUri = "http://192.168.160.58/Paris2024/API/Teams?page=1&pageSize=1000000000";
            
                ajaxHelper(composedUri, 'GET').done(function (data) {
                    hideLoading();
                    self.data(data.Teams);
    
                    google.charts.load('current', {
                        'packages':['geochart'],
                    });
                    google.charts.setOnLoadCallback(drawRegionsMap);
    
                    const countryCount = {};
    
                    var teams = self.data();
                    for (const team of teams) {
                        var country = team.Country;
                        if (country == 'AIN') {
                            country = "RU";
                        }
                        if (countryCount[country]) {
                            countryCount[country] += 1;
                        } else {
                            countryCount[country] = 1;
                        }
                    }
    
                    const result = [['Country', 'Number of Teams'], ...Object.entries(countryCount).sort((a, b) => b[1] - a[1])];
    
                    function drawRegionsMap() {
                        var data = google.visualization.arrayToDataTable(result);
    
                        var options = {};
    
                        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    
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