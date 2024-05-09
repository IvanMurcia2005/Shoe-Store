//Cargar de manera automatica los datos registrados
// Busqueda por id
function findById(id) {
    $.ajax({
        url: 'http://localhost:9000/prueba/prueba/producto/' + id,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (item) {
        $("#id").val(item.id)
        $("#nombreProducto").val(item.nombreProducto)
        $("#descripcion").val(item.descripcion)
        $("#cantidad").val(item.cantidad)
        $("#precio").val(item.precio)
        $("#porcentajeIva").val(item.porcentajeIva)
        $("#porcentajeDescuento").val(item.porcentajeDescuento)
        $("#estado").val(item.estado == true ? '1' : '0')
    })
}

function loadTable() {
    $.ajax({
        url: 'http://localhost:9000/prueba/prueba/producto/',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (items) {
        var registros = "";
        items.forEach(function (item, index, array) {
            registros += `
                        <tr class="table-light">
                            <td>`+ item.id + `</td>
                            <td>`+ item.nombreProducto +`</td>
                            <td>`+ item.descripcion + `</td>
                            <td>`+ item.cantidad + `</td>
                            <td>`+ item.precio + `</td>
                            <td>`+ item.porcentajeIva + ` %</td>
                            <td>`+ item.porcentajeDescuento + ` %</td>
                            <td>`+ (item.estado == true ? 'Activo' : 'Inactivo') + `</td>
                            <td><button class="btnEdit" type="button" onclick="findById(`+ item.id + `);" data-bs-toggle="modal"
                            data-bs-target="#modalProducto"><i class="fi fi-rr-pencil"></i></button></td>
                            <td><button class="btnDelete" type="button" onclick="deleteById(`+ item.id + `);"><i class="fi fi-rr-trash"></i></button></td>
                        </tr>
                        `;
        })
        $("#dataResult").html(registros);
    })
}

//Accion para eliminar un registro seleccionado 
function deleteById(id) {
    Swal.fire({
        title: '¿Está seguro?',
        text: "¡No podrá revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: 'http://localhost:9000/prueba/prueba/producto/' + id,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).done(function (result) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Producto eliminado',
                });
                loadTable();
            })
        }
    })
}

//Accion de adicionar un registro
function guardar() {
    // Obtener el valor del campo de ID
    var id = $("#id").val();
    
    // Crear el objeto de datos a enviar
    var data = {
        nombreProducto: $("#nombreProducto").val(),
        descripcion: $("#descripcion").val(),
        cantidad: $("#cantidad").val(),
        precio: $("#precio").val(),
        porcentajeIva: $("#porcentajeIva").val(),
        porcentajeDescuento: $("#porcentajeDescuento").val(),
        estado: ($("#estado").val() === '1') ? true : false
    };
    
    // Determinar si se debe realizar una solicitud POST o PUT
    var method = (id !== "") ? "PUT" : "POST";
    var url = (id !== "") ? "http://localhost:9000/prueba/prueba/producto/" + id : "http://localhost:9000/prueba/prueba/producto/";

    // Realizar la solicitud AJAX
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (result) {
        //Cargar datos
        loadTable();

        //Limpiar formulario
        clearData();

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: (method === "POST") ? 'success' : 'warning',
            title: (method === "POST") ? 'Registro exitoso' : 'Modificación exitosa',
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // Si la respuesta es un error
        Swal.fire({
            icon: 'error',
            title: "Error",
            text: jqXHR.responseJSON.message,
        })
    });
}


function filtros(){
    var nombre = $("#filtrarNombreProducto").val();
    var estado = ($("#filtrarEstado").val() === '1') ? true : false;

    if (nombre || descripcion || estado) {
        var data = {
            nombreProducto: nombre,
            estado: estado
        };

        $.ajax({
            url: 'http://localhost:9000/prueba/prueba/producto/filtros',
            method: "GET",
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (items) {
            var registros = "";
            items.forEach(function (item, index, array) {
                registros += `
                            <tr class="table-light">
                                <td>`+ item.id + `</td>
                                <td>`+ item.nombreProducto +`</td>
                                <td>`+ item.descripcion + `</td>
                                <td>`+ item.cantidad + `</td>
                                <td>`+ item.precio + `</td>
                                <td>`+ item.porcentajeIva + ` %</td>
                                <td>`+ item.porcentajeDescuento + ` %</td>
                                <td>`+ (item.estado == true ? 'Activo' : 'Inactivo') + `</td>
                                <td><button class="btnEdit" type="button" onclick="findById(`+ item.id + `);" data-bs-toggle="modal"
                                data-bs-target="#modalProducto"><i class="fi fi-rr-pencil"></i></button></td>
                                <td><button class="btnDelete" type="button" onclick="deleteById(`+ item.id + `);"><i class="fi fi-rr-trash"></i></button></td>
                            </tr>
                            `;
            })
            $("#dataResult").html(registros);
        });
    } else {
        loadTable();
    }
}

// Función para limpiar datos
function clearData() {
    $("#id").val(""),
    $("#nombreProducto").val(""),
    $("#descripcion").val(""),
    $("#cantidad").val(""),
    $("#precio").val(""),
    $("#porcentajeIva").val(""),
    $("#porcentajeDescuento").val(""),
    $("#estado").val("")
}

function limpiarFiltros(){
    $("#filtrarNombreProducto").val(""),
    $("#filtrarDescripcion").val(""),
    $("#filtrarEstado").val("")
}
