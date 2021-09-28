const url = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json"

fetch(url).then(res=>res.json()).then(res=>{
    const datos = res;
    llenarTabla(datos);
})

const thead1 = document.getElementById("head1");
const tbody1 = document.getElementById("body1");
const thead2 = document.getElementById("head2");
const tbody2 = document.getElementById("body2");

let eventos = [];
let truePos = [];
let falsePos = [];
let trueNeg = [];
let falseNeg = [];
let final = [];

function llenarTabla(json){
    const filaPrincipal = document.createElement("tr");
    const col1Principal = document.createElement("th");
    const col2Principal = document.createElement("th");
    const col3Principal = document.createElement("th");

    col1Principal.textContent = "#";
    col2Principal.textContent = "Events";
    col3Principal.textContent = "Squirrel";

    filaPrincipal.appendChild(col1Principal);
    filaPrincipal.appendChild(col2Principal);
    filaPrincipal.appendChild(col3Principal);

    thead1.appendChild(filaPrincipal);
    //table.appendChild(filaPrincipal);

    for(let i = 0; i < json.length; i++){
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
    }
    llenarTablaCor(json);
}


function correlacion(trueNeg, falseNeg, falsePos, truePos){
    return (((truePos*trueNeg)-(falsePos*falseNeg))/(Math.sqrt((truePos+falsePos)*(truePos+falseNeg)*(trueNeg+falsePos)*(trueNeg+falseNeg))));
}

function llenarTablaCor(json){
    const filaPrincipal = document.createElement("tr");
    const col1Principal = document.createElement("th");
    const col2Principal = document.createElement("th");
    const col3Principal = document.createElement("th");

    col1Principal.textContent = "#";
    col2Principal.textContent = "Event";
    col3Principal.textContent = "Correlation";

    filaPrincipal.appendChild(col1Principal);
    filaPrincipal.appendChild(col2Principal);
    filaPrincipal.appendChild(col3Principal);

    thead2.appendChild(filaPrincipal);

    falVer(json);

    for(let i = 0; i < eventos.length; i++){
        let tNeg = trueNeg[i];
        let fNeg = falseNeg[i];
        let fPos = falsePos[i];
        let tPos = truePos[i];

        let tupla = [eventos[i], correlacion(tNeg, fNeg, fPos, tPos)];
        final.push(tupla);
    }
    final.sort((a,b) => (b[1] - a[1]));
    console.log(final);
    for(let i = 0; i < eventos.length; i++){
        const fila = document.createElement("tr");
        const col1 = document.createElement("td");
        const col2 = document.createElement("td");
        const col3 = document.createElement("td");

        col1.textContent = i+1;
        col2.textContent = final[i][0];
        col3.textContent = final[i][1];
        
        fila.appendChild(col1);
        fila.appendChild(col2);
        fila.appendChild(col3);
        
        tbody2.appendChild(fila);
    }
}

function falVer(json){
    for (let i = 0; i < eventos.length; i++){
        trueNeg.push(0);
        falseNeg.push(0);
        falsePos.push(0);
        truePos.push(0);
        let eventoActual = eventos[i];
        for (let j = 0; j < json.length; j++){
            let esta = (json[j].events).includes(eventoActual);
            let squ = json[j].squirrel;
            if (!esta && !squ){
                trueNeg[i] += 1;
            }
            else if(esta && !squ){
                falseNeg[i] += 1;
            }
            else if (!esta && squ){
                falsePos[i] += 1;
            }
            else if (esta && squ){
                truePos[i] += 1;
            }
        }
    }
}

