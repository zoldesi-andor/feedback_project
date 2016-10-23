/** The entry point for the Index page */
requirejs(
    ["IndexViewModel"],
    (IndexViewModel) => {
        ko.applyBindings(new IndexViewModel());
    }
);
