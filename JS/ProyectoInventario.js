import { Producto } from "./Producto.js";
import { Inventario } from "./Inventario.js";

const inventario = new Inventario();
const div = document.getElementById("detalles");

function mostrar(mensaje) {
    div.innerHTML = div.innerHTML + mensaje + "<br>";
}

document.getElementById("anadirProd").addEventListener("click", () => {
    let codigo = parseInt(document.getElementById("txtCode").value);
    let nombre = document.getElementById("txtNom").value;
    let cantidad = parseInt(document.getElementById("txtCan").value);
    let costo = parseFloat(document.getElementById("txtCost").value);

    let producto = new Producto(codigo, nombre, cantidad, costo);
    let resultado = inventario.agregar(producto);

    if (resultado === false) {
        mostrar("No se agregó. Ya existe un producto con el código " + codigo);
    } else {
        mostrar("Producto agregado ordenado: " + producto.info());
    }
});

document.getElementById("buscarProd").addEventListener("click", () => {
    let codigo = parseInt(document.getElementById("txtBuscar").value);
    let res = inventario.buscar(codigo);
    if (res === null) {
        mostrar("No existe el producto con código " + codigo);
    } else {
        mostrar("Encontrado: " + res.info());
    }
});

document.getElementById("eliminarProd").addEventListener("click", () => {
    let codigo = parseInt(document.getElementById("txtBuscar").value);
    let res = inventario.eliminar(codigo);
    if (res === null) {
        mostrar("No se pudo eliminar. No existe el código " + codigo);
    } else {
        mostrar("Producto con código " + codigo + " eliminado.");
    }
});

document.getElementById("extraerPrimero").addEventListener("click", () => {
    let res = inventario.extraerPrimero();
    if (res === null) {
        mostrar("El inventario está vacío.");
    } else {
        mostrar("Se extrajo el primero: " + res.info());
    }
});

document.getElementById("extraerUltimo").addEventListener("click", () => {
    let res = inventario.extraerUltimo();
    if (res === null) {
        mostrar("El inventario está vacío.");
    } else {
        mostrar("Se extrajo el último: " + res.info());
    }
});

document.getElementById("listarProd").addEventListener("click", () => {
    mostrar("--- LISTADO ---");
    mostrar(inventario.listar());
    mostrar("--- FIN DEL LISTADO ---");
});

document.getElementById("listarInverso").addEventListener("click", () => {
    mostrar("--- LISTADO INVERSO ---");
    mostrar(inventario.listarInverso());
    mostrar("--- FIN DEL LISTADO ---");
});

document.getElementById("limpiar").addEventListener("click", () => {
    div.innerHTML = "";
});