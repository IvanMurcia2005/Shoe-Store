function usuariosTotales() {
    $.ajax({
        url: 'http://localhost:9000/prueba/prueba/clientes/contar_usuarios',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (items) {
        var registros = `<label>` + items + `</label>`;
        $("#usuariosTotales").html(registros);
    })
}

function productosTotales() {
    $.ajax({
        url: 'http://localhost:9000/prueba/prueba/producto/contar_productos',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (items) {
        var registros = `<label>` + items + `</label>`;
        $("#productosTotales").html(registros);
    })
}

function ventasTotales() {
    $.ajax({
        url: 'http://localhost:9000/prueba/prueba/ventas/contar_ventas',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (items) {
        var registros = `<label>` + items + `</label>`;
        $("#ventasTotales").html(registros);
    })
}


function tabla() {
    $.ajax({
        url: 'http://localhost:9000/prueba/prueba/producto/productosMenorStock',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (items) {
        var registros = "";
        items.forEach(function (item, index, array) {
            registros += `
                        <tr class="table-light">
                            <td>`+ index+1 + `</td>
                            <td>`+ item.nombreProducto + `</td>
                            <td>`+ item.cantidad + `</td>
                        </tr>
                        `;
        })
        $("#dataResult").html(registros);
    })
}
