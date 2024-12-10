
const Stadiums = [
    "Hôtel de Ville",
    "La Concorde",
    "Pont Alexandre III",
    "Aquatics Centre",
    "Bercy Arena",
    "Champ de Mars Arena",
    "Cerimony",
    "Porte de La Chapelle Arena",
    "Paris La Defense Arena",
    "Eiffel Tower Stadium",
    "Grand Palais",
    "Invalides",
    "Le Bourget Sport Climbing Venue",
    "La Concorde 1",
    "La Concorde 2",
    "La Concorde 3",
    "La Concorde 4",
    "North Paris Arena",
    "Parc des Princes",
    "Stade Roland-Garros",
    "South Paris Arena 1",
    "South Paris Arena 4",
    "South Paris Arena 6",
    "South Paris Arena",
    "Stade de France",
    "Trocadéro"
  ];

  
// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    var self = this;

    // Observáveis
    self.baseUri = ko.observable('http://192.168.160.58/Paris2024/API/Venues');
    self.displayName = 'Paris2024 Coaches List';
    self.error = ko.observable('');
    self.venue = ko.observableArray([]); 

    // Função para ativar a página
    self.activate = function () {
        console.log('CALL: getVenue...');
        const composedUri = `${self.baseUri()}`;
        showLoading();
        ajaxHelper(composedUri, 'GET').done(function (data) {
            hideLoading();
            const filterStadiums = data.filter(stadium => Stadiums.includes(stadium.Name));
            console.log(filterStadiums);
        });
    };

    // Função AJAX
    function ajaxHelper(uri, method, data) {
        self.error('');
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(`AJAX Call [${uri}] Fail:`, errorThrown);
                hideLoading();
                self.error(errorThrown);
            }
        });
    }

    // Funções para mostrar e esconder o loading
    function showLoading() {
        $("#myModal").modal('show', { backdrop: 'static', keyboard: false });
    }

    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    // Função para obter parâmetros da URL
    function getUrlParameter(sParam) {
        const params = new URLSearchParams(window.location.search);
        return params.get(sParam);
    }

    // Inicialização
    showLoading();
    self.activate();
    console.log("VM initialized!");
};

$(document).ready(function () {
    console.log("Document ready!");
    ko.applyBindings(new vm());
});
