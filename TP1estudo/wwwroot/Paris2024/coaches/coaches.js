var vm = function () {
    console.log('ViewModel initiated...');
    var self = this;

    // Observables
    self.baseUri = ko.observable('http://192.168.160.58/Paris2024/API/coaches');
    self.displayName = 'Paris2024 Coaches List';
    self.error = ko.observable('');
    self.coaches = ko.observableArray([]); // Correção aqui, de athletes para coaches
    self.currentPage = ko.observable(1);
    self.pagesize = ko.observable(20);
    self.totalRecords = ko.observable(50);
    self.hasPrevious = ko.observable(false);
    self.hasNext = ko.observable(false);
    self.totalPages = ko.observable(0);

    // Computed observables
    self.previousPage = ko.computed(() => Math.max(1, self.currentPage() - 1));
    self.nextPage = ko.computed(() => Math.min(self.totalPages(), self.currentPage() + 1));

    self.fromRecord = ko.computed(() => (self.currentPage() - 1) * self.pagesize() + 1);
    self.toRecord = ko.computed(() => Math.min(self.currentPage() * self.pagesize(), self.totalRecords()));

    self.pageArray = function () {
        const size = Math.min(self.totalPages(), 9);
        const step = Math.max(0, Math.min(self.currentPage() - 5, self.totalPages() - 9));
        return Array.from({ length: size }, (_, i) => i + 1 + step);
    };

    // Function to activate the page and fetch data
    self.activate = function (id) {
        console.log('CALL: getCoaches...');
        const composedUri = `${self.baseUri()}?page=${id}&pageSize=${self.pagesize()}`;
        showLoading();

        // AJAX call to get the data
        ajaxHelper(composedUri, 'GET').done(function (data) {
            hideLoading();
            // Populate the coaches data
            self.coaches(data.Coaches);
            self.currentPage(data.CurrentPage);
            self.hasNext(data.HasNext);
            self.hasPrevious(data.HasPrevious);
            self.pagesize(data.PageSize);
            self.totalPages(data.TotalPages);
            self.totalRecords(data.TotalCoaches);
        }).fail(function (error) {
            hideLoading();
            self.error('Failed to load coaches. Please try again later.');
        });
    };

    // AJAX Helper function to make API requests
    function ajaxHelper(uri, method, data) {
        self.error(''); // Reset the error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(`AJAX Call [${uri}] Failed:`, errorThrown);
                hideLoading();
                self.error('An error occurred while fetching the data. Please try again.');
            }
        });
    }

    // Show the loading modal
    function showLoading() {
        $("#myModal").modal('show', { backdrop: 'static', keyboard: false });
    }

    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        });
    }

    // Function to get parameters from the URL
    function getUrlParameter(sParam) {
        const params = new URLSearchParams(window.location.search);
        return params.get(sParam);
    }

    // Initialize the ViewModel
    const page = getUrlParameter('page') || 1;
    self.activate(page); // Load data for the current page
    console.log("VM initialized!");
};

// Apply Knockout bindings when the document is ready
$(document).ready(function () {
    console.log("Document ready!");
    ko.applyBindings(new vm());
});
