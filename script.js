document.addEventListener('DOMContentLoaded', () => {
    const pantalla = document.getElementById('pantalla'); // Obtener la referencia al elemento de pantalla
    const botones = document.querySelectorAll('#teclado button'); // Obtener todos los botones del teclado

    // Inicializar la pantalla con 0
    pantalla.textContent = '0';

    botones.forEach(boton => { // Por cada botón en el teclado
        boton.addEventListener('click', () => { // Agregar un event listener para clics en los botones
            const valor = boton.textContent.trim(); // Obtener el texto del botón sin espacios alrededor

            if (valor === 'C') { // Si se presiona el botón 'C' (borrar todo)
                pantalla.textContent = '0'; // Reiniciar la pantalla a 0
            } else if (valor === '=') { // Si se presiona el botón '=' (calcular resultado)
                calcularResultado(); // Llamar a la función para calcular el resultado
            } else if (valor === '√') { // Si se presiona el botón '√' (raíz cuadrada)
                calcularRaizCuadrada(); // Llamar a la función para calcular la raíz cuadrada
            } else if (valor === '∛') { // Si se presiona el botón '∛' (raíz cúbica)
                calcularRaizCubica(); // Llamar a la función para calcular la raíz cúbica
            } else if (valor === '+/-') { // Si se presiona el botón '+/-' (cambiar signo)
                cambiarSigno(); // Llamar a la función para cambiar el signo
            } else if (boton.id === 'backspace') { // Si se presiona el botón de retroceso (backspace)
                borrarUltimo(); // Llamar a la función para borrar el último carácter
            } else if (valor === '%') { // Si se presiona el botón '%' (calcular porcentaje)
                calcularPorcentaje(); // Llamar a la función para calcular el porcentaje
            } else { // Para cualquier otro botón numérico o de operación
                agregarValor(valor); // Agregar el valor del botón a la pantalla
            }
        });
    });

    function agregarValor(valor) { // Función para agregar un valor a la pantalla
        let expresion = pantalla.textContent; // Obtener la expresión actual de la pantalla
    
        if (pantalla.textContent === '0') { // Si la pantalla está en 0
            pantalla.textContent = valor; // Reemplazar 0 con el valor del botón
        } else {
            // Verificar si el último carácter de la expresión es un operador
            const ultimoCaracter = expresion.slice(-1);
            const esOperador = /[\+\-\*\/%]/.test(ultimoCaracter);
    
            if (esOperador && /[\+\-\*\/%]/.test(valor)) {
                // Si el último carácter es un operador y el valor también es un operador,
                // reemplazar el último operador con el nuevo operador
                expresion = expresion.slice(0, -1) + valor;
            } else {
                expresion += valor; // En cualquier otro caso, agregar el valor al final de la expresión
            }
    
            pantalla.textContent = expresion; // Actualizar la pantalla con la nueva expresión
        }
    }
        

    function calcularResultado() { // Función para calcular el resultado de la expresión en la pantalla
        try {
            let expresion = pantalla.textContent; // Obtener la expresión de la pantalla
    
            // Reemplazar los símbolos de raíz cuadrada y cúbica para que JavaScript pueda evaluarlos
            expresion = expresion.replace(/√/g, 'Math.sqrt');
            expresion = expresion.replace(/∛/g, 'Math.cbrt');
    
            // Evaluar la expresión final y actualizar la pantalla con el resultado
            const resultado = eval(expresion);
            pantalla.textContent = resultado;
        } catch (error) {
            pantalla.textContent = 'Error'; // Si hay un error, mostrar 'Error' en la pantalla
        }
    }
    
    function calcularRaizCuadrada() { // Función para calcular la raíz cuadrada de la expresión en la pantalla
        try {
            const expresion = pantalla.textContent; // Obtener la expresión de la pantalla
            const resultado = Math.sqrt(eval(expresion)); // Calcular la raíz cuadrada
            pantalla.textContent = resultado; // Mostrar el resultado en la pantalla
        } catch (error) {
            pantalla.textContent = 'Error'; // Si hay un error, mostrar 'Error' en la pantalla
        }
    }
    
    function calcularRaizCubica() { // Función para calcular la raíz cúbica de la expresión en la pantalla
        try {
            const expresion = pantalla.textContent; // Obtener la expresión de la pantalla
            const resultado = Math.cbrt(eval(expresion)); // Calcular la raíz cúbica
            pantalla.textContent = resultado; // Mostrar el resultado en la pantalla
        } catch (error) {
            pantalla.textContent = 'Error'; // Si hay un error, mostrar 'Error' en la pantalla
        }
    }
    
    function cambiarSigno() { // Función para cambiar el signo del último número en pantalla
        try {
            let expresion = pantalla.textContent; // Obtener la expresión de la pantalla
    
            // Buscar el último número en la expresión
            const ultimoNumero = expresion.match(/[\d.]+$/);
    
            if (ultimoNumero && ultimoNumero[0] !== '0') {
                // Obtener la posición del último número en la expresión
                const posUltimoNumero = expresion.lastIndexOf(ultimoNumero[0]);
    
                // Cambiar el signo del último número
                const nuevoUltimoNumero = ultimoNumero[0].startsWith('-') ? ultimoNumero[0].substring(1) : '-' + ultimoNumero[0];
    
                // Reemplazar el último número en la expresión con el nuevo número
                expresion = expresion.substring(0, posUltimoNumero) + nuevoUltimoNumero + expresion.substring(posUltimoNumero + ultimoNumero[0].length);
                pantalla.textContent = expresion;
            }
        } catch (error) {
            pantalla.textContent = 'Error'; // Si hay un error, mostrar 'Error' en la pantalla
        }
    }
    
    
    
    
    function borrarUltimo() { // Función para borrar el último carácter de la expresión en la pantalla
        if (pantalla.textContent.length === 1) { // Si la pantalla tiene solo un carácter
            pantalla.textContent = '0'; // Reiniciar la pantalla a 0
        } else {
            pantalla.textContent = pantalla.textContent.slice(0, -1); // Borrar el último carácter
        }
    }
    
    function calcularPorcentaje() { // Función para calcular el porcentaje de la expresión en la pantalla
        try {
            let expresion = pantalla.textContent; // Obtener la expresión de la pantalla
    
            // Buscar el último operador antes del %
            const operadorIndex = expresion.lastIndexOf('+') || expresion.lastIndexOf('-') || expresion.lastIndexOf('*') || expresion.lastIndexOf('/');
    
            // Obtener la base y el porcentaje
            const base = parseFloat(expresion.substring(0, operadorIndex));
            const porcentaje = parseFloat(expresion.substring(operadorIndex + 1));
    
            // Calcular el valor del porcentaje y actualizar la pantalla
            const valorPorcentaje = base * (porcentaje / 100);
            pantalla.textContent = `${base}${expresion[operadorIndex]}${valorPorcentaje}`;
        } catch (error) {
            pantalla.textContent = 'Error'; // Si hay un error, mostrar 'Error' en la pantalla
        }
    }
    

     // Escuchar eventos de teclado
     document.addEventListener('keydown', event => { // Agregar un event listener para eventos de teclado
        const tecla = event.key; // Obtener la tecla presionada

        if (/[0-9.+\-*/%=]|Enter/.test(tecla)) { // Verificar si la tecla es válida para la calculadora
            event.preventDefault(); // Evitar la acción predeterminada del teclado

            if (tecla === 'Enter' || tecla === '=') { // Si se presiona Enter o =
                calcularResultado(); // Calcular el resultado
            } else if (tecla === 'Backspace'|| tecla === 'Delete') { // Si se presiona Backspace o Delete
                borrarUltimo(); // Borrar el último carácter
            } else { // Para cualquier otra tecla válida
                agregarValor(tecla); // Agregar el valor de la tecla a la pantalla
            }
        }
    });
});
