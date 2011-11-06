$(document).ready(function () {
    var viewModel = (function () {
        var _self = this;
        
        this.carrinho = new Carrinho(1);

        this.produtos = ko.observableArray([
            new Produto(15, "Treinamento de TDD", 150),
            new Produto(97, "Cartas de Planning Poker", 20),
            new Produto(52, "Guia do Scrum", 49.5)
        ]);
        
        this.produtoSelecionado = ko.observable();
        this.produtoSelecionado.subscribe(function (valor) {
            if (valor == undefined) return;

            for (var i in _self.produtos()) {
                if (_self.produtos()[i].id == valor) {
                    _self.carrinho.addProduto(_self.produtos()[i]);
                    _self.produtoSelecionado(undefined);
                    break;
                }
            }

        }, _self);
    })();

    ko.applyBindings(viewModel);
});