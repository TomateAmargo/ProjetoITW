// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Paris2024/api/Torch_route');
    self.displayName = 'Paris 2024 Torch Route';

    self.records = ko.observableArray([]);

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getRoutes...');
        var composedUri = self.baseUri();

        // Show loading modal before making the request
        showLoading();

        // Make AJAX call to get the data
        ajaxHelper(composedUri, 'GET')
            .done(function (data) {
                console.log(data);
                self.records(data);  // Bind data to the observable array
            })
            .fail(function () {
                alert('Failed to load routes.');  // Handle failure
            })
            .always(function () {
                // Hide loading modal after the request completes (whether success or failure)
                hideLoading();
            });
    };

    //--- start .....
    self.activate(1);
    console.log("VM initialized!");
}

//--- Internal functions
function ajaxHelper(uri, method, data) {
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null,
        error: function (jqXHR, textStatus, errorThrown) {
            // You can also show some error details here, if needed
            console.error("AJAX Call Failed:", errorThrown);
        }
    });
}

function showLoading() {
    // Show the loading modal
    $("#myModal").modal('show', { backdrop: 'static', keyboard: false });
}

function hideLoading() {
    // Hide the loading modal once the operation is complete
    $("#myModal").modal('hide');
}

1
$('document').ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});
