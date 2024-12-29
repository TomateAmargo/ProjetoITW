// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    var self = this;

    // Observáveis
    self.baseUri = ko.observable('http://192.168.160.58/Paris2024/api/CountryMedals');
    self.displayName = 'Paris2024 CountryMedals List';
    self.error = ko.observable('');
    self.countrymedal = ko.observableArray('');
    self.pagesize = ko.observable(20);

    self.TotalChange = function (order) {
        // Alterna entre 3 e 4
        if (order != 3 ) {
            return 3
        } else {
            return 4
        }
    };

    self.NameChange = function (order) {
        // Alterna entre 3 e 4
        if (order != 1 ) {
            return 1
        } else {
            return 2
        }
    };

    // Função para ativar a página
    self.activate = function (id, order) {
        console.log('CALL: getMedals...');
        const composedUri = `${self.baseUri()}?page=${id}&pagesize=${self.pagesize()}&Order=${order}`;
        showLoading();
        ajaxHelper(composedUri, 'GET').done(function (data) {
            hideLoading(); 
            console.log(data);
            self.countrymedal(data);
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
    self.getUrlParameter = function (sParam) {
        const params = new URLSearchParams(window.location.search);
        return params.get(sParam);
    }

    // Inicialização
    const getid = self.getUrlParameter('page') || 1;
    const getorder = self.getUrlParameter('order') || 4;
    showLoading();
    self.activate(getid, getorder);
    console.log("VM initialized!");
};

$(document).ready(function () {
    console.log("Document ready!");
    ko.applyBindings(new vm());
});
