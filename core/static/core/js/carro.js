window.onload = function () {
    // Variables
    let baseDeDatos = [
        {
            id: 1,
            nombre: 'Cortina tradicional color gris 130x150 CM',
            precio: 50000,
            imagen: "{% static 'https://sodimac.scene7.com/is/image//SodimacCL/2318911' %}"
        },
        {
            id: 2,
            nombre: 'Cortina tradicional color crudo 170x150 CM',
            precio: 65000,
            imagen: "{% static 'core/img/840e3e4f329be1eaf5977e378865d31c.jpg' %}"
        },
        {
            id: 3,
            nombre: 'Cortina roller color blanco 100x150 CM',
            precio: 60000,
            imagen: "{% static 'core/img/bg2.jpg' %}"
        },
        {
            id: 4,
            nombre: 'Store color crudo 180x150 CM',
            precio: 70000,
            imagen: "{% static 'core/img/Cortina-Store.jpg' %}"
        },
        {
            id: 5,
            nombre: 'Cortina tradicional color crudo 170x150 CM',
            precio: 65000,
            imagen: "{% static 'core/img/840e3e4f329be1eaf5977e378865d31c.jpg' %}"
        },
        {
            id: 6,
            nombre: 'Cortina roller color blanco 100x150 CM',
            precio: 60000,
            imagen: "{% static 'core/img/bg2.jpg' %}"
        },
        {
            id: 7,
            nombre: 'Store color crudo 180x150 CM',
            precio: 70000,
            imagen: "{% static 'core/img/Cortina-Store.jpg' %}"
        },
        {
            id: 8,
            nombre: 'Cortina tradicional color crudo 170x150 CM',
            precio: 65000,
            imagen: "{% static 'core/img/840e3e4f329be1eaf5977e378865d31c.jpg' %}"
        },
        {
            id: 9,
            nombre: 'Cortina roller color blanco 100x150 CM',
            precio: 60000,
            imagen: "{% static 'core/img/bg2.jpg' %}"
        },
        {
            id: 10,
            nombre: 'Store color crudo 180x150 CM',
            precio: 70000,
            imagen: "{% static 'core/img/Cortina-Store.jpg' %}"
        },

    ]
    let $items = document.querySelector('#items');
    let carrito = [];
    let total = 0;
    let $carrito = document.querySelector('#carrito');
    let $total = document.querySelector('#total');
    let $botonVaciar = document.querySelector('#boton-vaciar');

    // Funciones
    function renderItems() {
        for (let info of baseDeDatos) {
            // Estructura
            let miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            let miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            let miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info['nombre'];
            // Imagen
            let miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info['imagen']);
            // Precio
            let miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = '$' + info['precio'];
            // Boton 
            let miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info['id']);
            miNodoBoton.addEventListener('click', anyadirCarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            $items.appendChild(miNodo);
        }
    }

    function anyadirCarrito() {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(this.getAttribute('marcador'))
        // Calculo el total
        calcularTotal();
        // Renderizamos el carrito 
        renderizarCarrito();
    }

    function renderizarCarrito() {
        // Vaciamos todo el html
        $carrito.textContent = '';
        // Quitamos los duplicados
        let carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach(function (item, indice) {
            // Obtenemos el item que necesitamos de la variable base de datos
            let miItem = baseDeDatos.filter(function (itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            // Cuenta el número de veces que se repite el producto
            let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            let miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} : $${miItem[0]['precio']} `;
            // Boton de borrar
            let miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.setAttribute('item', item);
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            $carrito.appendChild(miNodo);
        })
    }

    function borrarItemCarrito() {
        console.log()
        // Obtenemos el producto ID que hay en el boton pulsado
        let id = this.getAttribute('item');
        // Borramos todos los productos
        carrito = carrito.filter(function (carritoId) {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Calculamos de nuevo el precio
        calcularTotal();
    }

    function calcularTotal() {
        // Limpiamos precio anterior
        total = 0;
        // Recorremos el array del carrito
        for (let item of carrito) {
            // De cada elemento obtenemos su precio
            let miItem = baseDeDatos.filter(function (itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            total = total + miItem[0]['precio'];
        }
        // Formateamos el total para que solo tenga dos decimales
        let totalDosDecimales = total.toFixed(2);
        // Renderizamos el precio en el HTML
        $total.textContent = totalDosDecimales;
    }

    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        calcularTotal();
    }

    // Eventos
    $botonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    renderItems();
} 