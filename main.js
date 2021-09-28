fetch("archivo.json").then(res=>res.json()).then(res=>{
    const datos = res;
    llenarTabla(datos);
})


const thead1 = document.getElementById("head1");
const tbody1 = document.getElementById("body1");
const forms = document.forms;
const filaPrincipal = document.createElement("tr");
const col1Principal = document.createElement("th");
const col2Principal = document.createElement("th");
const col3Principal = document.createElement("th");
const col4Principal = document.createElement("th");

col1Principal.textContent = "Last Name";
col2Principal.textContent = "First Name";
col3Principal.textContent = "Email";
col4Principal.textContent = "Photo";

let data = [];
let dataSorted = [];

col1Principal.onclick = ordCol;
col2Principal.onclick = ordCol;
col3Principal.onclick = ordCol;
col4Principal.onclick = ordCol;

function llenarTabla(json){
    filaPrincipal.appendChild(col1Principal);
    filaPrincipal.appendChild(col2Principal);
    filaPrincipal.appendChild(col3Principal);
    filaPrincipal.appendChild(col4Principal);

    thead1.appendChild(filaPrincipal);

    for(let i = 0; i < json.length; i++){
        let dato = [json[i].last_name, json[i].first_name, json[i].email, json[i].photo];
        data.push(dato);
        dataSorted.push(dato);
    }

    for(let i = 0; i < json.length; i++){
        const fila = document.createElement("tr");
        const col1 = document.createElement("td");
        const col2 = document.createElement("td");
        const col3 = document.createElement("td");
        const col4 = document.createElement("td");

        col1.textContent = data[i][0];
        col2.textContent = data[i][1];
        col3.textContent = data[i][2];
        col4.textContent = data[i][3];

        fila.appendChild(col1);
        fila.appendChild(col2);
        fila.appendChild(col3);
        fila.appendChild(col4);
        
        tbody1.appendChild(fila);

        fila.onmouseover = function(){this.style.backgroundColor = "LightCoral";}
        fila.onmouseout = function(){this.style.backgroundColor = "White";}
    }
}

function ordCol(element){
    removeChildNodes(thead1);
    removeChildNodes(tbody1);

    filaPrincipal.appendChild(col1Principal);
    filaPrincipal.appendChild(col2Principal);
    filaPrincipal.appendChild(col3Principal);
    filaPrincipal.appendChild(col4Principal);

    thead1.appendChild(filaPrincipal);

    let columna = 4;
    let elemento = element.target.textContent;
    if (elemento == 'Last Name'){
        columna = 0;
    }
    else if (elemento == 'First Name'){
        columna = 1;
    }
    else if (elemento == 'Email'){
        columna = 2;
    }
    else if (elemento == 'Photo'){
        columna = 3;
    }
    dataSorted.sort((a,b) => ((a[columna] > b[columna] ? 1 : -1)));
    for(let i = 0; i < dataSorted.length; i++){
        const fila = document.createElement("tr");
        const col1 = document.createElement("td");
        const col2 = document.createElement("td");
        const col3 = document.createElement("td");
        const col4 = document.createElement("td");

        col1.textContent = dataSorted[i][0];
        col2.textContent = dataSorted[i][1];
        col3.textContent = dataSorted[i][2];
        col4.textContent = dataSorted[i][3];

        fila.appendChild(col1);
        fila.appendChild(col2);
        fila.appendChild(col3);
        fila.appendChild(col4);
        
        tbody1.appendChild(fila);
    }
}

function removeChildNodes(parent){
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

//FORMS: forms[i].elements[i].nodeValue?
