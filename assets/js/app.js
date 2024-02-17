
const datoPesos = document.getElementById('valorConsultaClp')
const select = document.getElementById('monedaAconsultar')
const btnCalcular = document.getElementById('btnCalcular')
const totalCalculo = document.getElementById('valorTotal')



const apiURL = "https://mindicador.cl/api";

let cambioValor
let valorDolar
let valorEuro 



let myChart = null;

// conectarse a la api

async function obtenerData(){
    try{ 
    const res = await fetch(apiURL);
    const data = await res.json();
    return data;
    
    }catch(e){
        alert("error")
    }
    
     
    
}

obtenerData()

//Extraer valor de monedas y agregarlas al select

async function monedas(){

    const data = await obtenerData();
    
    valorDolar = data.dolar.valor
    valorEuro = data.euro.valor
    

    const dolar = document.createElement('option')
    dolar.value = valorDolar
    dolar.text = "USD"
    select.appendChild(dolar)

    const euro = document.createElement('option')
    euro.value = valorEuro
    euro.text = "EUR"
    select.appendChild(euro)
   

}

monedas()




//Obtener valor del select

const agregarSelect = () => {
   select.addEventListener('change', () => {

   

            cambioValor = select.value
            opcionTxt = select.options[select.selectedIndex].textContent;
            valoresTexto.textContent = `Últimos valores del ${opcionTxt}`;

            
            // si el select cambia las moneds muestra la gráfica
            if(opcionTxt === "USD"){

                async function getValores() {
                    const endpoint = "https://mindicador.cl/api/dolar/";
                    const res = await fetch(endpoint);
                    const valorDolar = await res.json();
                    return valorDolar;
                }
                
                function prepararConfiguracionParaLaGrafica(valorDolar) {
                    // Tomar solo los primeros 10 datos
                    const primerosDiezDatos = valorDolar.serie.slice(0, 10);
                
                    // Creamos las variables necesarias para el objeto de configuración
                    const tipoDeGrafica = "line";
                    const nombresDeLasMonedas = primerosDiezDatos.map((dolar) => {
                        const fecha = dolar.fecha.split('T')[0]; // Tomar solo la parte de la fecha
                        return fecha;
                    });
                    const titulo = "Valor Dolares";
                    const colorDeLinea = "red";
                    const valores = primerosDiezDatos.map((dolar) => {
                        const valor = dolar.valor;
                        return Number(valor);
                    });
                
                    // Creamos el objeto de configuración usando las variables anteriores
                    const config = {
                        type: tipoDeGrafica,
                        data: {
                            labels: nombresDeLasMonedas,
                            datasets: [
                                {
                                    label: titulo,
                                    backgroundColor: colorDeLinea,
                                    data: valores
                                }
                            ]
                        }
                    };
                    return config;
                }
                
                async function renderGrafica() {
                    const valorDolar = await getValores();
                    const config = prepararConfiguracionParaLaGrafica(valorDolar);
                    const chartDOM = document.getElementById("myChart");
                    chartDOM.style.backgroundColor = "#f2f2f2"
                    
                    // Destruir el gráfico existente si existe
                    if (myChart) {
                        myChart.destroy();
                    }
                    
                    myChart = new Chart(chartDOM, config); // Crear el nuevo gráfico
                }
                renderGrafica();

            }else if (opcionTxt === "EUR") {

                async function getValores() {

                    try{

                    const endpoint = "https://mindicador.cl/api/euro/";
                    const res = await fetch(endpoint);
                    const valorEuro = await res.json();
                    return valorEuro;

                } catch (error){

                    alert("error")

                }

                }
                
                function prepararConfiguracionParaLaGrafica(valorEuro) {
                    // Tomar solo los primeros 10 datos
                    const primerosDiezDatos = valorEuro.serie.slice(0, 10);
                
                    // Creamos las variables necesarias para el objeto de configuración
                    const tipoDeGrafica = "line";
                    const nombresDeLasMonedas = primerosDiezDatos.map((euro) => {
                        const fecha = euro.fecha.split('T')[0]; // Tomar solo la parte de la fecha
                        return fecha;
                    });
                    const titulo = "Valor Euros";
                    const colorDeLinea = "red";
                    const valores = primerosDiezDatos.map((euro) => {
                        const valor = euro.valor;
                        return Number(valor);
                    });
                
                    // Creamos el objeto de configuración usando las variables anteriores
                    const config = {
                        type: tipoDeGrafica,
                        data: {
                            labels: nombresDeLasMonedas,
                            datasets: [
                                {
                                    label: titulo,
                                    backgroundColor: colorDeLinea,
                                    data: valores
                                }
                            ]
                        }
                    };
                    return config;
                }
                
                async function renderGrafica() {
                    const valorEuro = await getValores();
                    const config = prepararConfiguracionParaLaGrafica(valorEuro);
                    const chartDOM = document.getElementById("myChart");
                    chartDOM.style.backgroundColor = "#f2f2f2"
                    
                    // Destruir el gráfico existente si existe
                    if (myChart) {
                        myChart.destroy();
                    }
                    
                    myChart = new Chart(chartDOM, config); // Crear el nuevo gráfico
                }
                renderGrafica();
                

            } else{
                console.log("falló")
            }
    })

    
   
}

agregarSelect()



//calcular valor de la conversión

btnCalcular.addEventListener('click', () => {

    let miMoneda = datoPesos.value
    miMoneda = parseFloat(miMoneda)

    let calculoTotal = miMoneda / cambioValor
    valorTotal.textContent = "Resultado: " + calculoTotal.toFixed(2) + " " + opcionTxt;



})
  





    
    
  



 






    
    



















