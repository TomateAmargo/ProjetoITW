
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
    self.baseUri = ko.observable('http://192.168.160.58/Paris2024/api/Sports');
    self.displayName = ko.observable('Competitions Match Information');
    self.error = ko.observable('');
    self.info = ko.observable('');

    // Function to fetch athlete details
    self.activate = function (id) {
        console.log('CALL: getAthlete...');
        const composedUri = `${self.baseUri()}?id=${id}`;
        console.log(composedUri);
        ajaxHelper(composedUri, 'GET').done(function (data) {
            hideLoading();
            self.info(data);
            console.log(data);
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

    // Get athlete ID from URL
    function getUrlParameter(param) {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    }

    // Initialization
    showLoading();
    const id = getUrlParameter('id');
    if (id) {
        self.activate(id);
    } else {
        console.error('Event ID not found in URL');
        hideLoading();
    }
};

$(document).ready(function () {
    console.log("Document ready!");
    ko.applyBindings(new vm());
});
