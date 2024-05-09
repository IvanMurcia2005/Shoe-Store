function loadCliente(){ 
    $.ajax({
        url: 'http://localhost:9000/prueba/prueba/clientes/',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function(items){
        var registros = `<option selected="" selected disabled hidden>--- Seleccione ---</option>`;
        items.forEach(function(item, index, array){
            registros += `
                <option value="`+item.id+`">`+item.nombresCliente+` - `+item.apellidosCliente+`</option>
            `;
        })
        $("#clienteId").html(registros);
    })
}

function loadProductos(){
    $.ajax({
        url: 'http://localhost:9000/prueba/prueba/producto/',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function(items){
        var registros = `<option selected="" selected disabled hidden>--- Seleccione ---</option>`;
        items.forEach(function(item, index, array){
            registros += `
            <option value="`+item.id+`">`+item.nombreProducto+` (cantidad:  `+item.cantidad+`)</option>
            `;
        })
        $("#productoId").html(registros);
    })
}