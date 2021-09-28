const url = "https://github.com/mcparrad24/EjercicioPreParcial/blob/master/archivo.json"

fetch(url).then(res=>res.json()).then(res=>{
    const datos = res;
    llenarTabla(datos);
})

const thead1 = document.getElementById("head1");
const tbody1 = document.getElementById("body1");
const thead2 = document.getElementById("head2");
const tbody2 = document.getElementById("body2");


function llenarTabla(json){
    const filaPrincipal = document.createElement("tr");
    const col1Principal = document.createElement("th");
    const col2Principal = document.createElement("th");
    const col3Principal = document.createElement("th");
    const col4Principal = document.createElement("th");

    col1Principal.textContent = "Last Name";
    col2Principal.textContent = "First Name";
    col3Principal.textContent = "Email";
    col4Principal.textContent = "Photo";

    filaPrincipal.appendChild(col1Principal);
    filaPrincipal.appendChild(col2Principal);
    filaPrincipal.appendChild(col3Principal);
    filaPrincipal.appendChild(col4Principal);

    thead1.appendChild(filaPrincipal);

    /*for(let i = 0; i < json.length; i++){
        let texto = " ";

        for(let j = 0; j < json[i].events.length; j++){
            let pertenece = false;
            
            if (j != json[i].events.length - 1){
                texto = texto + json[i].events[j] + ", ";
            }
            else {
                texto = texto + json[i].events[j];
            }
            
            if (eventos.length > 1){
                for (k = 0; k < eventos.length; k++){
                    if (json[i].events[j] == eventos[k]){
                        pertenece = true;
                    }
                }
            }
            
            if (pertenece == false){
                eventos.push(json[i].events[j]);
            }

        }
        const fila = document.createElement("tr");
        const col1 = document.createElement("td");
        const col2 = document.createElement("td");
        const col3 = document.createElement("td");

        col1.textContent = i+1;
        col2.textContent = texto;
        col3.textContent = json[i].squirrel;

        fila.appendChild(col1);
        fila.appendChild(col2);
        fila.appendChild(col3);
        
        tbody1.appendChild(fila);
        //table.appendChild(fila);

        if (json[i].squirrel == true){
            fila.style.backgroundColor = "LightCoral";
        }
    }*/
}