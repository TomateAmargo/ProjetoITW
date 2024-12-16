var vm = function () {
    console.log('ViewModel initiated...');
    var self = this;

    // Observables
    self.baseUri = ko.observable('http://192.168.160.58/Paris2024/API/nocs');
    self.displayName = ko.observable('NOC Detail');
    self.error = ko.observable('');
    self.noc = ko.observable(); // Observable for NOC data

    // Function to fetch NOC details
    self.activate = function (id) {
        console.log('Fetching NOC details for ID:', id);
        const composedUri = `${self.baseUri()}/${id}`;
        ajaxHelper(composedUri, 'GET')
            .done(function (data) {
                console.log('API Response:', data); // Debugging response
                hideLoading();
                self.noc(data); 
            })
            .fail(function (error) {
                console.error('Error fetching NOC:', error);
                self.error('Unable to fetch NOC details. Please try again later.');
                hideLoading();
            });
    };

    // AJAX Helper Function
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear previous errors
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
        });
    }

    // Show/hide loading indicators
    function showLoading() {
        $("#myModal").modal('show', { backdrop: 'static', keyboard: false });
    }

    function hideLoading() {
        $("#myModal").modal('hide');
    }

    // Parse URL parameters to extract `id`
    function getUrlParameter(param) {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    }

    // Initialize
    showLoading();
    const nocId = getUrlParameter('id');
    if (nocId) {
        self.activate(nocId);
    } else {
        console.error('NOC ID not found in URL');
        self.error('NOC ID not found in URL.');
        hideLoading();
    }
};

$(document).ready(function () {
    console.log("Document ready!");
    ko.applyBindings(new vm());
});
