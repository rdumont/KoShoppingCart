(function () {
    var urlChamada = "";
    var jqAjax = $.ajax;

    module("Item", {
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

    test("Incrementar quantidade de um item", function () {
        // Arrange
        var qtde = 3;
        var produto = new Produto(15, "Treinamento de TDD", 150);
        var item = new Item(produto, new Carrinho(1), qtde);

        // Act
        item.incrementar();

        // Assert
        equal(item.quantidade(), qtde + 1, "Quantidade deve ter sido incrementada");
    });

    test("Alterar a quantidade de um item", function () {
        // Arrange
        var urlEsperada = "/api/item/alterarQuantidade";
        var novaQtde = 3;
        var carrinho = new Carrinho(10);
        var produto = new Produto(15, "Treinamento de TDD", 150);
        var item = carrinho.addProduto(produto);
        urlChamada = "";

        // Act
        item.quantidade(novaQtde);

        // Assert
        equal(urlChamada, urlEsperada, "Deve ter chamado o serviço de alteração de quantidade");
        equal(item.quantidade(), novaQtde, "A quantidade deve ter sido alterada");
        equal(carrinho.total(), produto.valor * novaQtde, "O valor total do carrinho deve estar correto");
    });

    test("Decrementar quantidade de um item", function () {
        // Arrange
        var qtde = 3;
        var produto = new Produto(15, "Treinamento de TDD", 150);
        var item = new Item(produto, new Carrinho(1), qtde);

        // Act
        item.decrementar();

        // Assert
        equal(item.quantidade(), qtde - 1, "Quantidade deve ter sido decrementada");
    });

    test("Não deve decrementar se quantidade for 1", function () {
        // Arrange
        var produto = new Produto(15, "Treinamento de TDD", 150);
        var item = new Item(produto, new Carrinho(1), 1);

        // Act
        item.decrementar();

        // Assert
        equal(item.quantidade(), 1, "Quantidade não deve ter sido decrementada");
    });

    test("Remover um item", function () {
        // Arrange
        var carrinho = new Carrinho(1);
        var foiChamado = false;
        var itemRemovido = null;
        carrinho.removerProduto = function (i) {
            foiChamado = true;
            itemRemovido = i;
        };
        var produto = new Produto(15, "Treinamento de TDD", 150);
        var item = carrinho.addProduto(produto);

        // Act
        item.remover();

        // Assert
        ok(foiChamado, "Remoção de produto deve ter sido chamada");
        equal(itemRemovido, item, "O item removido deve estar correto");
    });
})();