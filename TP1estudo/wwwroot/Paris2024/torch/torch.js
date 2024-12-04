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
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            self.records(data);
        });
    };

    //--- start ....
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
            alert("AJAX Call[" + uri + "] Fail...");
        }
    });
}

$('document').ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});
