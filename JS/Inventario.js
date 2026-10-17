import { Nodo } from "./Nodo.js";

export class Inventario {
    constructor() {
        this.primero = null;
    }

    agregar(producto) {
        let nuevo = new Nodo(producto);

        if (this.primero === null) {
            this.primero = nuevo;
            return true;
        }

        if (producto.codigo === this.primero.producto.codigo) {
            return false;
        }

        if (producto.codigo < this.primero.producto.codigo) {
            nuevo.siguiente = this.primero;
            this.primero.anterior = nuevo;
            this.primero = nuevo;
            return true;
        }

        let auxiliar = this.primero;
        while (auxiliar.siguiente !== null) {
            if (auxiliar.siguiente.producto.codigo === producto.codigo) {
                return false;
            }
            if (auxiliar.siguiente.producto.codigo > producto.codigo) {
                break;
            }
            auxiliar = auxiliar.siguiente;
        }

        nuevo.siguiente = auxiliar.siguiente;
        nuevo.anterior = auxiliar;
        if (auxiliar.siguiente !== null) {
            auxiliar.siguiente.anterior = nuevo;
        }
        auxiliar.siguiente = nuevo;
        return true;
    }

    buscar(codigo) {
        let auxiliar = this.primero;
        while (auxiliar !== null) {
            if (auxiliar.producto.codigo === codigo) {
                return auxiliar.producto;
            }
            if (auxiliar.producto.codigo > codigo) {
                return null;
            }
            auxiliar = auxiliar.siguiente;
        }
        return null;
    }

    eliminar(codigo) {
        let auxiliar = this.primero;
        while (auxiliar !== null) {
            if (auxiliar.producto.codigo === codigo) {
                if (auxiliar.anterior === null) {
                    this.primero = auxiliar.siguiente;
                    if (this.primero !== null) {
                        this.primero.anterior = null;
                    }
                } else {
                    auxiliar.anterior.siguiente = auxiliar.siguiente;
                    if (auxiliar.siguiente !== null) {
                        auxiliar.siguiente.anterior = auxiliar.anterior;
                    }
                }
                return auxiliar.producto;
            }
            if (auxiliar.producto.codigo > codigo) {
                return null;
            }
            auxiliar = auxiliar.siguiente;
        }
        return null;
    }

    extraerPrimero() {
        if (this.primero === null) {
            return null;
        }
        let eliminado = this.primero.producto;
        this.primero = this.primero.siguiente;
        if (this.primero !== null) {
            this.primero.anterior = null;
        }
        return eliminado;
    }

    extraerUltimo() {
        if (this.primero === null) {
            return null;
        }
        let auxiliar = this.primero;
        while (auxiliar.siguiente !== null) {
            auxiliar = auxiliar.siguiente;
        }
        let eliminado = auxiliar.producto;
        if (auxiliar.anterior === null) {
            this.primero = null;
        } else {
            auxiliar.anterior.siguiente = null;
        }
        return eliminado;
    }

    listar() {
        let texto = "";
        let auxiliar = this.primero;
        while (auxiliar !== null) {
            texto = texto + auxiliar.producto.infoHtml();
            auxiliar = auxiliar.siguiente;
        }
        return texto;
    }

    listarInverso() {
        if (this.primero === null) {
            return "";
        }
        let auxiliar = this.primero;
        while (auxiliar.siguiente !== null) {
            auxiliar = auxiliar.siguiente;
        }
        let texto = "";
        while (auxiliar !== null) {
            texto = texto + auxiliar.producto.infoHtml();
            auxiliar = auxiliar.anterior;
        }
        return texto;
    }
}