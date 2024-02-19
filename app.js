//Inicializacion de variables 
let numero_secreto=0;
let numero_generado=0;
let contador=0;
let listaJugados=[];
let elemento_maximo=10;

//Asignar texto se toma un elemento y se asigna un texto con innerHTML
function asignar_texto(elemento,texto){
    let elemento_html=document.querySelector(elemento);
    elemento_html.innerHTML=texto;
}

function verificarIntento(){
    //Se toma el valor ingresado en el input number con .value
    let numeroUsuario = parseInt(document.getElementById('value_input').value);
    console.log(numero_secreto);
    console.log(numeroUsuario);

    if(contador==5){
    asignar_texto('h1','Lo Siento Mucho!!!')    
    asignar_texto('p',`Llegaste al tope de los ${contador} intentos `);
    limpiar_caja();
    value_input.disabled=true;
    jugar.disabled=true;
    reiniciar.disabled=false;
    listaJugados.pop(numero_generado);
    //document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else{//si el numero del ususario es igual al ingresado se avisa y se deshabilita jugar y el campo de ingreso 
        if(numero_secreto===numeroUsuario){
            asignar_texto('p',`Correcto adivinaste el numero en ${contador} ${contador==1? 'intento':'intentos'}`);  
            asignar_texto('h1','Felicitaciones!!!')
            //document.getElementById('reiniciar').removeAttribute('disabled');
            reiniciar.disabled=false;
            value_input.disabled=true;
            jugar.disabled=true;
        }
        else{//condiciones de comparacion 
            if(numero_secreto<numeroUsuario){
                asignar_texto('p','El numero ingresado es mayor al secreto');
            }
            if(numero_secreto>numeroUsuario){
                asignar_texto('p','El numero ingresado es menor al secreto');
            }//siempre despues de un ingreso que no es el buscado se limpia la caja del input 
            limpiar_caja();
            contador++;
        }
        return;
    }
}

//En esta funcion se selecciona el input number y se cambia su contenido a vacio
function limpiar_caja(){
   let valorCaja = document.querySelector('#value_input');
   valorCaja.value=''; 
}

//Aqui se asignan los titulos iniciales se llama la funcion generar numero 
//se reinicia el contador de intentos se habilitan botones y campo de ingreso
function condiciones_ini(){
    asignar_texto('h1','Adivina el número secreto!!!');
    asignar_texto('p',`ingrese un numero del 1 al ${elemento_maximo}`);
    numero_secreto=generar_numero();
    value_input.disabled=false;
    jugar.disabled=false;
    contador=1;
}

//En esta funcion se reinicia las condiciones del juego al apretar el boton reiniciar 
function reinicioJuego(){
    limpiar_caja();
    condiciones_ini();
    //document.getElementById('reiniciar').setAttribute('disabled',true);
    reiniciar.disabled=true;
}

function generar_numero() {
    //generar numero aletorio entre 1 y elemento maximo que en este caso es 10
    numero_generado = Math.floor(Math.random()*elemento_maximo)+1;

    console.log(numero_generado);
    console.log(listaJugados);
    //si el numero de elementos agregados a la lista jugados es igual a elemento maximo en este caso 10 decir que ya se han sorteado todos los numeros posibles
    if (listaJugados.length>=elemento_maximo)
    {
        asignar_texto('p','Ya se sortearon todos los numeros posibles');;
    }
    else
    {//si la lista de jugados ya tiene un numero jugado entonces que genere otro que no este 
        if(listaJugados.includes(numero_generado))
        {
            return generar_numero();
        }
        else
        {//si el numero jugado no esta en la lista que lo ponga al final y retorne ese nuevo numero
            listaJugados.push(numero_generado);
            return numero_generado;
        }
    }
}

condiciones_ini();
