var Item = function (produto, carrinho, quantidade) {
    var _self = this;

    var _quantidade = ko.observable(quantidade);

    /**********************/
    /* Atributos Públicos */
    /**********************/
    this.produto = produto;
    this.carrinho = carrinho;
    this.quantidade = ko.dependentObservable({
        read: function () {
            return _quantidade();
        },
        write: function (value) {
            if (value < 1) return;

            var oldValue = _quantidade();
            $.ajax("api/item/alterarQuantidade.json", { data: "..." });
            _quantidade(value);
            _self.carrinho.total(_self.carrinho.total() + (value - oldValue) * _self.produto.valor);
        },
        owner: _self
    });

    /********************/
    /* Métodos Públicos */
    /********************/
    this.incrementar = function () {
        _self.quantidade(_self.quantidade() + 1);
    };

    this.decrementar = function () {
        _self.quantidade(_self.quantidade() - 1);
    };

    this.remover = function () {
        _self.carrinho.removerProduto(_self);
    };
};