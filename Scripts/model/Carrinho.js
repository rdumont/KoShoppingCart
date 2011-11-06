var Carrinho = function (id) {
    var _self = this;

    /**********************/
    /* Atributos Públicos */
    /**********************/
    this.id = id;
    this.total = ko.observable(0);
    this.itens = ko.observableArray([]);

    /********************/
    /* Métodos Públicos */
    /********************/
    this.addProduto = function (produto) {
        var itens = _self.itens();
        for (var i in itens)
            if (itens[i].produto.id == produto.id)
                return null;

        var item = new Item(produto, _self, 1);

        $.ajax("api/item/incluir.json", { data: "..." });

        _self.total(_self.total() + produto.valor);
        _self.itens.push(item);
        return item;
    };

    this.removerProduto = function (item) {
        $.ajax("api/item/remover.json", { data: "..." });

        _self.itens.remove(item);
        _self.total(_self.total() - item.produto.valor * item.quantidade());
    };
};