(function () {
    var urlChamada = "";
    var jqAjax = $.ajax;

    module("Carrinho", {
        setup: function () {
            $.ajax = function (url, settings) {
                urlChamada = url;
            };
        },
        teardown: function () {
            urlChamada = "";
            $.ajax = jqAjax;
        }
    });

    test("Adicionar um produto ao carrinho", function () {
        // Arrange
        var urlEsperada = "/api/item/incluir";
        var idCarrinho = 10;
        var carrinho = new Carrinho(idCarrinho);
        var produto = new Produto(15, "Treinamento de TDD", 150);

        // Act
        var resultado = carrinho.addProduto(produto);

        // Assert
        notEqual(resultado, null, "Resultado deve ser não-nulo");
        equal(urlChamada, urlEsperada, "Deve ter chamado o serviço para incluir o item");
        equal(carrinho.itens().length, 1, "Deve haver um item no carrinho");
        equal(carrinho.itens()[0].produto, produto, "O item deve ter o produto correto");
        equal(carrinho.itens()[0].quantidade(), 1, "A quantidade do item deve ser 1");
        equal(carrinho.total(), produto.valor, "O valor total do carrinho deve estar correto");
    });

    test("Não deve adicionar um produto que já esteja no carrinho", function () {
        // Arrange
        var idCarrinho = 10;
        var carrinho = new Carrinho(idCarrinho);
        var produto = new Produto(15, "Treinamento de TDD", 150);
        carrinho.addProduto(produto);
        urlChamada = "";

        // Act
        var resultado = carrinho.addProduto(produto);

        // Assert
        equal(resultado, null, "Resultado deve ser nulo");
        equal(urlChamada, "", "Não deve ter chamado o serviço de inclusão de item");
        equal(carrinho.itens().length, 1, "Deve haver um item no carrinho");
        equal(carrinho.total(), produto.valor, "O valor total do carrinho deve estar correto");
    });

    test("Remover um produto do carrinho", function () {
        // Arrange
        var urlEsperada = "/api/item/remover";
        var idCarrinho = 10;
        var carrinho = new Carrinho(idCarrinho);
        var item1 = carrinho.addProduto(new Produto(15, "Treinamento de TDD", 150)),
            item2 = carrinho.addProduto(new Produto(97, "Cartas de Planning Poker", 20)),
            item3 = carrinho.addProduto(new Produto(52, "Guia do Scrum", 49.5));
        urlChamada = "";

        // Act
        carrinho.removerProduto(item2);

        // Assert
        equal(urlChamada, urlEsperada, "Deve ter chamado o serviço de remoção de item");
        equal(carrinho.itens().length, 2, "O número de itens deve estar correto");
        equal(carrinho.total(), 199.5, "O valor total do carrinho deve estar correto");
    });
})();