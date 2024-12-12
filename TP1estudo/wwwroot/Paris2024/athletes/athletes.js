const translations = {
    en: {
        id: "Id",
        name: "Name",
        birth_date: "Birth Date",
        birth_place: "Birth Place",
        sex: "Sex",
        favorite: "Favorite"
    },
    pt: {
        id: "Id",
        name: "Nome",
        birth_date: "Data de nascimento",
        birth_place: "Nacionalidade",
        sex: "Sexo",
        favorite: "Favorito"
    }
};

// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    var self = this;

    // Observáveis
    self.baseUri = ko.observable('http://192.168.160.58/Paris2024/api/athletes');
    self.displayName = 'Paris2024 Athletes List';
    self.currentLanguage = ko.observable('en');
    self.error = ko.observable('');
    self.athletes = ko.observableArray([]);
    self.filteredAthletes = ko.observableArray([]);
    self.favoriteFilter = ko.observable('all'); // Filter state
    self.currentPage = ko.observable(1);
    self.pagesize = ko.observable(20);
    self.totalRecords = ko.observable(50);
    self.hasPrevious = ko.observable(false);
    self.hasNext = ko.observable(false);
    self.totalPages = ko.observable(0);

    // Computed observables para paginação
    self.previousPage = ko.computed(() => Math.max(1, self.currentPage() - 1));
    self.nextPage = ko.computed(() => Math.min(self.totalPages(), self.currentPage() + 1));
    self.fromRecord = ko.computed(() => (self.currentPage() - 1) * self.pagesize() + 1);
    self.toRecord = ko.computed(() => Math.min(self.currentPage() * self.pagesize(), self.totalRecords()));

    self.pageArray = function () {
        const size = Math.min(self.totalPages(), 9);
        const step = Math.max(0, Math.min(self.currentPage() - 5, self.totalPages() - 9));
        return Array.from({ length: size }, (_, i) => i + 1 + step);
    };

    // Get translated text
    self.getTranslation = function (key) {
        const lang = self.currentLanguage();
        return translations[lang][key] || key;
    };

    // Change language
    self.changeLanguage = function (lang) {
        if (translations[lang]) {
            self.currentLanguage(lang);
        }
    };

// Filter athletes based on favorites
self.filterAthletes = function () {
    const filter = self.favoriteFilter();
    const athletes = self.athletes();
    
    // Reset the filtered athletes based on the selected filter
    if (filter === 'favorites') {
        // Show only athletes marked as favorite
        self.filteredAthletes(athletes.filter(a => a.IsFavorite()));
    } else if (filter === 'non-favorites') {
        // Show only athletes not marked as favorite
        self.filteredAthletes(athletes.filter(a => !a.IsFavorite()));
    } else {
        // Show all athletes
        self.filteredAthletes(athletes);
    }
};

// Map athletes with favorite property and ensure toggleFavorite updates the filtered list
self.mapAthletes = function (data) {
    return data.map(a => ({
        ...a,
        IsFavorite: ko.observable(false),
        toggleFavorite: function () {
            // Toggle the favorite status
            this.IsFavorite(!this.IsFavorite());

            // Update the filtered list dynamically
            self.filterAthletes();
        }
    }));
};


    

    // Função para ativar a página
    self.activate = function (id) {
        console.log('CALL: getAthletes...');
        const composedUri = `${self.baseUri()}?page=${id}&pageSize=${self.pagesize()}`;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            hideLoading();
            const athletesWithFavorites = self.mapAthletes(data.Athletes);
            self.athletes(athletesWithFavorites);
            self.filteredAthletes(athletesWithFavorites); // Initialize filtered list
            self.currentPage(data.CurrentPage);
            self.hasNext(data.HasNext);
            self.hasPrevious(data.HasPrevious);
            self.pagesize(data.PageSize);
            self.totalPages(data.TotalPages);
            self.totalRecords(data.TotalAhletes);
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

    // Show/Hide loading modal
    function showLoading() {
        $("#myModal").modal('show', { backdrop: 'static', keyboard: false });
    }

    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        });
    }

    // Get URL parameter
    function getUrlParameter(sParam) {
        const params = new URLSearchParams(window.location.search);
        return params.get(sParam);
    }

    // Initialize
    showLoading();
    const pg = getUrlParameter('page') || 1;
    self.activate(pg);
    console.log("VM initialized!");
};

$(document).ready(function () {
    console.log("Document ready!");
    ko.applyBindings(new vm());
});
