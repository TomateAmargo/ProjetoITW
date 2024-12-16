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
    
    self.favoriteFilter = ko.observable("all"); // Valor inicial do filtro

    // Função para aplicar o filtro de favoritos
    self.filterAthletes = function () {
        const filter = self.favoriteFilter(); // Pega o filtro selecionado
        
        // A lista de atletas filtrada
        let filtered = self.athletes();
        
        // Aplica o filtro com base na seleção
        if (filter === "favorites") {
            filtered = filtered.filter(function (athlete) {
                return self.favourites().includes(athlete.Id); // Exibe apenas os favoritos
            });
        } else if (filter === "non-favorites") {
            filtered = filtered.filter(function (athlete) {
                return !self.favourites().includes(athlete.Id); // Exclui os favoritos
            });
        }
        
        // Atualiza a lista de atletas filtrados
        self.filteredAthletes(filtered);
    };
    
    // Função para ativar e carregar atletas
    self.activate = function (id) {
        console.log('CALL: getAthletes...');
        const composedUri = `${self.baseUri()}?page=${id}&pageSize=${self.pagesize()}`;
        
        // Chama a função ajaxHelper para buscar os dados dos atletas
        ajaxHelper(composedUri, 'GET').done(function (data) {
            hideLoading(); // Esconde o indicador de carregamento
            
            // Atualiza dados de atletas
            self.athletes(data.Athletes);
            self.currentPage(data.CurrentPage);
            self.hasNext(data.HasNext);
            self.hasPrevious(data.HasPrevious);
            self.pagesize(data.PageSize);
            self.totalPages(data.TotalPages);
            self.totalRecords(data.TotalAthletes);
            self.SetFavourites();
            self.filterAthletes();
        });
    };
    
    // Função para alternar favoritos
    self.toggleFavourite = function (id) {
        const favourites = self.favourites(); 
        const index = favourites.indexOf(id);
        
        if (index === -1) {
            self.favourites.push(id); 
        } else {
            self.favourites.splice(index, 1); 
        }
    
        localStorage.setItem("fav", JSON.stringify(self.favourites()));
    };
    
    
    // Função para carregar os favoritos do localStorage
    self.SetFavourites = function () {
        let storage = null;
        try {
            storage = JSON.parse(localStorage.getItem("fav"));
        } catch (e) {
            console.error("Erro ao carregar favoritos:", e);
        }
        
        if (Array.isArray(storage)) {
            self.favourites(storage); // Atualiza a lista de favoritos
        }
    };
    
    // Inicializa a lista de favoritos
    self.favourites = ko.observableArray([]);
    
    // Inicializa o filtro com valor "all"
    self.favoriteFilter.subscribe(function () {
        // Sempre que o filtro mudar, aplica a filtragem novamente
        self.filterAthletes();
    });
    self.filteredAthletes = ko.observableArray([]);

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
