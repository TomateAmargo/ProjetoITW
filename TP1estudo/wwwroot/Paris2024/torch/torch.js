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

1
$('document').ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});
