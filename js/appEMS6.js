const anio = document.getElementById('anio');

const maxAnio = new Date().getFullYear();
const minAnio = maxAnio - 20;



for(let i = maxAnio; i > minAnio; i--){
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    anio.appendChild(option);
}


//constructor para seguro

class Seguro{
    constructor(marca, anio, tipo){
        this.marca = marca;
        this.anio = anio;
        this.tipo = tipo;
    }

    cotizarSeguro(){
        /* 
            1 = americano 1.15
            2 = asiatico 1.05
            3 = europeo 1.35
        */
    
        let cantidad;
        const base = 2000;
    
        switch(this.marca){
            case '1':
                cantidad = base * 1.15;
                break;
    
            case '2':
                cantidad = base * 1.05;
                break;
    
            case '3':
                cantidad = base * 1.35;
                break;
            
        }
    
        //leer año
    
        const diferencia = new Date().getFullYear() - this.anio;
        //cada año de diferencia hay que reducir un 3% el valor del seguro
    
        cantidad -= ((diferencia*3)* cantidad)/ 100 ;
    
    
        /*
            si el seguro es basico se multiplica por 30% mas
            si el seguro es completo se multiplica por 50% mas
        */
    
        switch(this.tipo){
            case 'basico': 
                cantidad += ((cantidad*30)/100);
                break;
            case 'completo':
                cantidad += ((cantidad*50)/100);
                break;
        }
        return cantidad;
       
    }
}



//resultado
class Interfaz{

    mostrarMensaje(mensaje, tipo){
        let div = document.createElement('div');
   
        if(tipo === 'error'){
            div.classList.add('mensaje', 'error');
        }else{
            div.classList.add('mensaje', 'correcto');
        }
   
        div.innerHTML = `${mensaje}`;
   
        //insertando el mensaje
        document.getElementById('cotizar-seguro').insertBefore(div, document.querySelector('.form-group'));
       
        //quitar mensaje despues de 3 segundos
       setTimeout(function(){
            document.querySelector('.mensaje').remove();
        }, 3000);
       }

       //imprime el resultado de la cotizacion

    mostrarResultado(seguro, total){
    
        const resultado = document.getElementById('resultado');
        let marca;

        switch(seguro.marca){
            case '1':
                marca = 'americano';
            break;

            case '2':
                marca = 'asiatico';
            break;

            case '3':
                marca = 'europeo';
            break
        }

        const div = document.createElement('div');

        div.innerHTML = `
            <p class = "header" >Resultado:</p>
            <p>Marca : ${marca}</p>
            <p>AÑO: ${seguro.anio}</p>
            <p>Tipo de seguro : ${seguro.tipo}</p>
            <p>Total: $ ${total}</p>
        `;

        const img = document.querySelector('#cargando img')
        img.style.display = 'block';

        setTimeout(function(){
            img.style.display = 'none';
            resultado.appendChild(div);
        }, 3000);



}
}




//evenListener

const btnCotizar = document.getElementById('cotizar-seguro');

btnCotizar.addEventListener('submit', cotizar);

function cotizar(e){
    e.preventDefault();
    //leyendo la marca
    let marca = document.getElementById('marca');
    let marcaSeleccionada = marca.options[marca.selectedIndex].value;
    console.log(marcaSeleccionada);
    //leyendo el año
    let anio = document.getElementById('anio');
    let anioSeleccionado = anio.options[anio.selectedIndex].value;
    console.log(anioSeleccionado); 
    //leyendo el tipo de seguro
    let tipo = document.querySelector('input[name = "tipo"]:checked').value;
    console.log(tipo);

    //instanciamos la interfaz
    const interfaz = new Interfaz();

    //revisando que los campos no esten vacios
    if(marcaSeleccionada && anioSeleccionado && tipo){
        //limpiando resultados antes de imprimir

        const resultados = document.querySelector('#resultado div');
        if(resultados !== null){
            resultados.remove();
        }

        //instanciamos el seguro
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        //cotizar el seguro

        const cantidad =  seguro.cotizarSeguro();

        interfaz.mostrarResultado(seguro, cantidad);
        interfaz.mostrarMensaje('Cotizando...', 'correcto');

    }else{
        interfaz.mostrarMensaje('Faltan datos, revisar formulario y prueba', 'error'); 
    }
}