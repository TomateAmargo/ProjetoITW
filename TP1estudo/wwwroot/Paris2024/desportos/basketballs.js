
const translations = {
    en: {
        name: "Name",
        sport_id: "Sport Id",
    },
    pt: {
        name: "Nome",
        sport_id: "Id do desporto",
    }
};

// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    var self = this;

    // Observáveis
    self.baseUri = ko.observable('http://192.168.160.58/Paris2024/api/Basketballs/Events');
    self.displayName = 'Paris2024 Basketballs List';
    self.currentLanguage = ko.observable('en');
    self.error = ko.observable('');
    self.basketballs = ko.observableArray([]);
    self.pyramidData = ko.observableArray([]);


    // Trocar linguagem
    self.getTranslation = function (key) {
        const lang = self.currentLanguage();
        return translations[lang][key] || key;
    };

    self.changeLanguage = function (lang) {
        if (translations[lang]) {
            self.currentLanguage(lang);
        }
    };

    // Ativar e carregar dados
    self.activate = function () {
        console.log('CALL: getEvents...');
        const composedUri = `${self.baseUri()}`;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            hideLoading();
            self.basketballs(data[0].Stages);

        });
    };

    // AJAX Helper
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
    const pg = getUrlParameter('page') || 1;
    self.activate(pg);
    console.log("VM initialized!");
};

$(document).ready(function () {
    console.log("Document ready!");
    ko.applyBindings(new vm());
});


