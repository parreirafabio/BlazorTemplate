var GLOBAL = {};
GLOBAL.DotNetReference = null;
GLOBAL.SetDotnetReference = function (pDotNetReference) {
    if (GLOBAL.DotNetReference === null) {
        GLOBAL.DotNetReference = pDotNetReference;
    }
};

window.loadScript = function (scriptPath) {
    // check list - if already loaded we can ignore
    //if (loaded[scriptPath]) {
    //    console.log(scriptPath + " already loaded");
    //    // return 'empty' promise
    //    return new this.Promise(function (resolve, reject) {
    //        resolve();
    //    });
    //}

    return new Promise(function (resolve, reject) {
        // create JS library script element
        var script = document.createElement("script");
        script.src = scriptPath;
        script.type = "text/javascript";
        console.log(scriptPath + " created");

        // flag as loading/loaded
        loaded[scriptPath] = true;

        // if the script returns okay, return resolve
        script.onload = function () {
            console.log(scriptPath + " loaded ok");
            resolve(scriptPath);
        };

        // if it fails, return reject
        script.onerror = function () {
            console.log(scriptPath + " load failed");
            reject(scriptPath);
        }
        // scripts will load at end of body
        document["body"].appendChild(script);
    });
}

window.DestroyCarregaTabela = function () {
    $(document).ready(function () {
        if ($.fn.dataTable.isDataTable('.table')) {
            $('.table').dataTable().destroy();
        }
    });
}

window.CarregaTabela = function () {
   
    $('.table').dataTable({
        "language": {
            "url": "assets/Portuguese.json"
        }});
}

window.ReCarregaTabela = function () {  
    if ($.fn.dataTable.isDataTable('.table')) {
        $('.table').dataTable().destroy();
    }     
    $('.table').dataTable({
        "language": {
            "url": "assets/Portuguese.json"
        }
    });
}

window.CarregaTabelaSemPaginacao = function () {
    $('.table').dataTable({
        "paging": false,
        "searching": false,
        "info": false,
        "language": {
            "url": "assets/Portuguese.json"
        }
    });
}

window.CarregaGrid = function (){
    var $grid = $('.grid').isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows',
        getSortData: {
            name: '.name',
            symbol: '.symbol',
            number: '.number parseInt',
            category: '[data-category]',
        }
    });
    $('#filters').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({
            filter: filterValue
        });
    });
    $('#filters-side').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({
            filter: filterValue
        });
    });
    // change active class on buttons
    $('.button-group').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function () {
            $buttonGroup.find('.active').removeClass('active');
            $(this).addClass('active');
        });
    });
}

window.ReCarregaTabelaSemPaginacao = function () {
    if ($.fn.dataTable.isDataTable('.table')) {
        $('.table').dataTable().destroy();
    }
    $('.table').dataTable({
        "paging": false,
        "searching": false,
        "info": false,
        "language": {
            "url": "assets/Portuguese.json"
        }
    });
}

window.CarregaMask = function () {
    $('.date').mask('00/00/0000');
    $('.cnpj').mask('99.999.999/9999-99');
    $('.cpf').mask('999.999.999-99');
    $('.telefone').mask('(00) 0000-0000');
    $('.mob_no').mask('(00) 00000-0000');
    $('.cep').mask('99999-999');
    $('.hora').mask('00:00'); 
    $('.simCard').mask('000.000.000.000.000.000.00')
    $('.cartao').mask('0000.0000.0000.0000')
    $('.ddd').mask('000')
    $('.celularSemDdd').mask('00000-0000')
}

window.CarregaMaskCpf = function () {  
    $('#cpf').mask('999.999.999-99');
}

window.CarregaSelectMult = function () {
    $(document).ready(function () {
        window.setTimeout(
            function () { $(".js-example-basic-multiple").select2() }, 500);


        $('#listaRoleSelect').on('select2:select', function (e) {
            var data = e.params.data;
            var id = data.id;
            GLOBAL.DotNetReference.invokeMethodAsync("AddRoleUsuario", data.id)
                .then(resultado => { });
        });

        $('#listaRoleSelect').on("select2:unselect", function (e) {
            var data = e.params.data;
            GLOBAL.DotNetReference.invokeMethodAsync("RemoveRoleUsuario", data.id)
                .then(resultado => { });
        }).trigger('change');

        $('#listaUsuarioSelect').on('select2:select', function (e) {
            var data = e.params.data;
            var id = data.id;
            GLOBAL.DotNetReference.invokeMethodAsync("AddUnidadeUsuario", data.id)
                .then(resultado => { });
        });

        $('#listaUsuarioSelect').on("select2:unselect", function (e) {
            var data = e.params.data;
            GLOBAL.DotNetReference.invokeMethodAsync("RemoveUnidadeUsuario", data.id)
                .then(resultado => { });
        }).trigger('change');
    });
}

window.CarregaSelectDadosCartao = function () {
    $(document).ready(function () {
        window.setTimeout(
            function () { $(".js-example-basic-multiple").select2() }, 500);


        $('#SelectGetDadosCartao').on('select2:select', function (e) {
            var data = e.params.data;
            var id = data.id;
            GLOBAL.DotNetReference.invokeMethodAsync("CarregaDadosCartao", id)
                .then(resultado => { });
        });     
    });
}

window.CarregaSelectMultiUniversal = function () {
    $(document).ready(function () {
        window.setTimeout(
            function () { $(".js-example-basic-multiple").select2() }, 500);

        $('#SelectUniversal').on('select2:select', function (e) {
            var data = e.params.data;
            var id = data.id;
            GLOBAL.DotNetReference.invokeMethodAsync("AddItemList", data.id)
                .then(resultado => { });
        });

        $('#SelectUniversal').on("select2:unselect", function (e) {
            var data = e.params.data;
            GLOBAL.DotNetReference.invokeMethodAsync("RemoveItemLista", data.id)
                .then(resultado => { });
        }).trigger('change');

    });
}

window.jsfunction = { focusElement: function (id) { const element = document.getElementById(id); element.focus(); } }

// store list of what scripts we've loaded
loaded = [];

window.AlteraBar = function () {  
    $('#progresswizard .progress-bar').css({
        width: 80 + '%'
    });
}

window.CarregaWizard = function () {
    $('#progresswizard').bootstrapWizard({
        withVisible: true,
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
        'firstSelector': '.button-first',
        'lastSelector': '.button-last',
        progressBar :true,
        onTabShow: function (tab, navigation, index) {          
            var $total = navigation.find('li').length;
            var $current = index + 1;
            var $percent = ($current / $total) * 100;
            $('#progresswizard .progress-bar').css({
                width: $percent + '%'
            });
        }
    });  
}

window.Alerta = function () { alert('teste');}

window.CarregaMaskCnpjCpf = function () {
    $(".cpfcnpj").keydown(function () {
        try {
            $(".cpfcnpj").unmask();
        } catch (e) { }

        var tamanho = $(".cpfcnpj").val().length;

        if (tamanho < 11) {
            $(".cpfcnpj").mask("999.999.999-99");
        } else {
            $(".cpfcnpj").mask("99.999.999/9999-99");
        }

        // ajustando foco
        var elem = this;
        setTimeout(function () {
            // mudo a posição do seletor
            elem.selectionStart = elem.selectionEnd = 10000;
        }, 0);
        // reaplico o valor para mudar o foco
        var currentValue = $(this).val();
        $(this).val('');
        $(this).val(currentValue);
    });
}
