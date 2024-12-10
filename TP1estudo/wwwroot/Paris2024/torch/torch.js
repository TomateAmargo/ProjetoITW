// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Paris2024/api/Torch_route');
    self.error = ko.observable('');
    self.displayName = 'Paris 2024 Torch Route';

    self.records = ko.observableArray([]);

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getRoutes...');
        var composedUri = self.baseUri();
        showLoading();
        ajaxHelper(composedUri, 'GET').done(function (data) {
                hideLoading();
                console.log(data);
                self.records(data);
            });
    };

    function showLoading() {
        // Show the loading modal
        $("#myModal").modal('show', { backdrop: 'static', keyboard: false });
    }
    
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    //--- start .....
    showLoading();
    self.activate(1);
    console.log("VM initialized!");
}

function ajaxHelper(uri, method, data) {
    return $.ajax({
        type: method,
        url: uri,
        dataType: "json",
        contentType: "application/json",
        data: data ? JSON.stringify(data) : null,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("AJAX Call[" + uri + "] Fail...");
        },
    });
}

$(document).ready(function () {

    ajaxHelper("http://192.168.160.58/Paris2024/api/Torch_route", "GET").done(function (data) {
        var Url = data.map(item => item.Url);                
        var Coords = data.map(item => [item.Lat, item.Lon]);
        

        var Marker = L.icon({
            iconUrl: '../Images/marker.png',
            iconSize: [32, 32]
        });

        var map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy;',
            maxZoom: 18
        }).addTo(map);

        var markers = [];
        for (var i = 0; i < Coords.length; i++) {
            if (i === 1) {
                console.warn(`Ignorando o índice ${i}`);
                continue; // Pula o índice 1
            }
        
            var coordinate = Coords[i];
            var url = Url[i];              
        
            // Criar e adicionar o marcador
            var marker = L.marker(coordinate, { icon: Marker }).addTo(map);

            marker.bindPopup(`<a href="${url}" target="_blank">Visitar Local</a>`);
            markers.push(marker);
        }

        var bounds = new L.LatLngBounds();
        markers.forEach(marker => bounds.extend(marker.getLatLng()));
        map.fitBounds(bounds);
        map.setMaxBounds([
            [-90, -180],
            [90, 180]
        ]);
        map.setMinZoom(2);
        map.setMaxZoom(18);
    });
});

1
$('document').ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});
