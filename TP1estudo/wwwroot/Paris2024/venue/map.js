
$(document).ready(function () {

    ajaxHelper("http://192.168.160.58/Paris2024/API/Venues", "GET").done(function (data) {
        var Coords = data.map(item => [item.Lat, item.Lon]);
        var NumSports = data.map(item => item.NumSports);
        

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
            if (NumSports[i] === 0) {
                console.warn(`Ignorando o índice ${NumSports[i]}`);
                continue; // Pula o índice 1
            }
        
            var coordinate = Coords[i];
        
            // Criar e adicionar o marcador
            var marker = L.marker(coordinate, { icon: Marker }).addTo(map);

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
