
function openModal() {
    document.getElementById('gameDetailsModal').style.display = 'block';
}
function closeModal() {
    document.getElementById('gameDetailsModal').style.display = 'none';
}

var vm = function () {
    console.log('ViewModel initiated...');
    var self = this;

    // Observables
    self.baseUri = ko.observable('http://192.168.160.58/Paris2024/api/Athletics');
    self.displayName = ko.observable('Basketball Match Information');
    self.error = ko.observable('');
    self.info = ko.observable('');
    self.modalinfo = ko.observable('');

    // Function to fetch athlete details
    self.activate = function (eventId, stageId) {
        console.log('CALL: getAthlete...');
        const composedUri = `${self.baseUri()}?EventId=${eventId}&StageId=${stageId}`;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            hideLoading();
            self.info(data);
            console.log(data);
        });
    };

    self.getinformation = function (eventId, id) {
        console.log('CALL: getAthlete...');
        console.log('EventId:', eventId, 'StageId:', stageId, 'Id:', id); // Verifica os valores
        const composedUri = `${self.baseUri()}?EventId=${eventId}&id=${id}`;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            hideLoading();
            self.modalinfo(data); 
            console.log(data);
            openModal(); 
        });
    };

    // AJAX helper
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

    // Loading indicators
    function showLoading() {
        $("#myModal").modal('show', { backdrop: 'static', keyboard: false });
    }

    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        });
    }

    self.getSexDescription = function (sex) {
        if (sex === "M") return "Masculino";
        if (sex === "F") return "Feminino";
    }

    self.getWinnerorLoser = function (wl) {
        if (wl === "W") return "Winner";
        if (wl === "L") return "Loser";
    }

    // Get athlete ID from URL
    function getUrlParameter(param) {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    }

    // Initialization
    showLoading();
    const eventId = getUrlParameter('EventId');
    const stageId = getUrlParameter('StageId');
    if (eventId && stageId) {
        self.activate(eventId, stageId);
    } else {
        console.error('Event ID not found in URL');
        hideLoading();
    }
};

$(document).ready(function () {
    console.log("Document ready!");
    ko.applyBindings(new vm());
});
