class Calculadora {
    constructor(valorPrevioTextElement, valorActualTextElement) {
        this.valorPrevioTextElement = valorPrevioTextElement
        this.valorActualTextElement = valorActualTextElement
        this.borrarTodo()
        this.ultimaTecla = ''
        this.aux=0
    }

    borrarTodo() {
        this.valorActual = ''
        this.valorPrevio = ''
        this.operacion = undefined
    }

    borrar() {
        this.valorActual = this.valorActual.toString().slice(0, -1)
    }

    agregarNumero(numero) {
        //this.valorActual = numero
        if (this.ultimaTecla === '=' || this.ultimaTecla=='%' ) {
            this.borrarTodo()
            this.ultimaTecla = ''
        }
        if (this.valorActual.length < 16) { // Verifica que no se exceda el límite
            if (numero === '.' && this.valorActual.includes('.')) return;
            this.valorActual = this.valorActual.toString() + numero.toString();
        }
    }

    elejirOperacion(operacion) {
        if (this.valorActual === '') return
        if (this.valorPrevio !== '') {
            this.calcular()
        }
        this.operacion = operacion       
        this.valorPrevio = this.valorActual
        if (this.valorPrevio.length > 16) {
            this.valorPrevio = this.valorPrevio.substring(0, 16);
        }
        this.valorActual = ''
        this.ultimaTecla = operacion
    }


    calcular() {
        let resultado
        const valor_1 = parseFloat(this.valorPrevio)
        const valor_2 = parseFloat(this.valorActual)
        if (isNaN(valor_1) || isNaN(valor_2)) return
        switch (this.operacion) {
            case '+':
                resultado = valor_1 + valor_2
                break
            case '-':
                resultado = valor_1 - valor_2
                break
            case 'x':
                resultado = valor_1 * valor_2
                break
            case '÷':
                resultado = valor_1 / valor_2
                break
            default:
                return
        }
        this.valorActual = resultado
        this.aux=resultado
        this.segundoValor=valor_1
        this.tercerValor=valor_2
        
        this.op=this.operacion
        this.operacion = undefined
        
        this.valorPrevio = ''
    }

    obtenerNumero(numero) {
        const cadena = numero.toString()
        const enteros = parseFloat(cadena.split('.')[0])
        const decimales = cadena.split('.')[1]
        let mostrarEnteros
        if (isNaN(enteros)) {
            mostrarEnteros = ''
        } else {
            mostrarEnteros = enteros.toLocaleString('en', { maximumFractionDigits: 0 })
        }

        if (decimales != null) {
            return `${mostrarEnteros}.${decimales}`
        } else {
            return mostrarEnteros
        }
    }
    calcularPorcentaje(){
        let resultado
        const valor_1 = parseFloat(this.valorActual)
        if(this.valor_1 != 0){
            resultado= valor_1/100
        }

        this.valorActual = resultado
        this.valorActualTextElement.innerText=`${this.valorActual} `

    }

    actualizarPantalla() {
        this.valorActualTextElement.innerText = this.obtenerNumero(this.valorActual)
        if(this.aux !=0){
            this.valorPrevioTextElement.innerText = `${this.segundoValor} ${this.op} ${this.tercerValor}`
        }else if (this.operacion != null) {
            this.valorPrevioTextElement.innerText = `${this.obtenerNumero(this.valorPrevio)} ${this.operacion}`
        }else  {
            this.valorPrevioTextElement.innerText = ''
        }
        this.aux=0
    }
}

//Captura de datos del DOM
const numeroButtons = document.querySelectorAll('[data-numero]')
const operacionButtons = document.querySelectorAll('[data-operacion]')
const igualButton = document.querySelector('[data-igual]')
const porcentajeButton = document.querySelector('[data-porcentaje]')
const borrarButton = document.querySelector('[data-borrar]')
const borrarTodoButton = document.querySelector('[data-borrar-todo]')
const valorPrevioTextElement = document.querySelector('[data-valor-previo]')
const valorActualTextElement = document.querySelector('[data-valor-actual]')

// Instanciar un nueo objeto de tipo calculadora
const calculator = new Calculadora(valorPrevioTextElement, valorActualTextElement)

numeroButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.agregarNumero(button.innerText)
        calculator.actualizarPantalla()
        ajustarResultado()
    })
})

operacionButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.elejirOperacion(button.innerText)
        calculator.actualizarPantalla()
    })
})

igualButton.addEventListener('click', _button => {
    calculator.ultimaTecla = '='
    calculator.calcular()
    calculator.actualizarPantalla()
    ajustarRes()
})

borrarTodoButton.addEventListener('click', _button => {
    
    calculator.borrarTodo()
    calculator.actualizarPantalla()
    
})

borrarButton.addEventListener('click', _button => {
    ajustarResultado()
    calculator.borrar()
    calculator.actualizarPantalla()
})
porcentajeButton.addEventListener('click', _button =>{
    calculator.ultimaTecla = '%'
    calculator.calcularPorcentaje()
    calculator.actualizarPantalla()
    ajustarRes()
    })

function ajustarRes(){
    const resultadoText = calculator.valorActualTextElement.innerText;
    const valorPrev = calculator.valorPrevioTextElement.innerText;


    if (resultadoText.length > 19) {
        calculator.valorActualTextElement.style.fontSize = '1.3rem';
    } else if (resultadoText.length > 13) {
        valorActualTextElement.style.fontSize = '1.6rem';
    } else {
        calculator.valorActualTextElement.style.fontSize = '2.5rem';
    }

    if(valorPrev.length > 27){
        calculator.valorPrevioTextElement.style.fontSize = '0.9rem';
    }else if(valorPrev.length > 19){
        calculator.valorPrevioTextElement.style.fontSize = '1.0rem';
    }
}

function ajustarResultado() {
    const valorActualText = valorActualTextElement.innerText;

    if (valorActualText.length > 13) {
        valorActualTextElement.style.fontSize = '1.6rem';
    } else {
        valorActualTextElement.style.fontSize = '2.5rem';
    }

}
