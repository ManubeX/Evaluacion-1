const nombreApp = "ControladorDeGastos";
const datosApp = JSON.parse(localStorage.getItem(nombreApp)) || [];
var eleccion = false;

//Menú de inicio
do {
  eleccion = true;
  let opcion = prompt(
    "Elige una opción del menú: \n\n1️- Agregar gasto \n2️- Agregar ingreso \n3️- Mostrar gastos \n4️- Mostrar ingresos \n5️- Editar registro \n6️- Eliminar un registro \n7️- Mostrar balance  \n0- Salir"
  );

  switch (parseInt(opcion)) {
    case 0:
      salir();
      break;
    case 1:
      addReg("gasto");
      break;
    case 2:
      addReg("ingreso");
      break;
    case 3:
      mostrar("gasto");
      break;
    case 4:
      mostrar("ingreso");
      break;
    case 5:
      seleccionarRegistro("editar");
      break;
    case 6:
      seleccionarRegistro("borrar");
      break;
    case 7:
      mostrarBalance();
      break;
    default:
      alert("Elige una opción correcta");
      break;
  }
} while (eleccion);

//Salir
function salir() {
  alert("Adios");
  eleccion = false;
}

//Guardar datos en localStorage
function guardarLS() {
  localStorage.setItem(nombreApp, JSON.stringify(datosApp));
}

//Añadir gasto/ingreso

function addReg(tipoDato) {
  let date = new Date();
  const addFecha = prompt(
    `Introduce la fecha del ${tipoDato} \n Ej: 01/01/2022`,
    String(date.getDate()).padStart(2, "0") +
      "/" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "/" +
      date.getFullYear()
  );
  const addImporte = prompt(
    `Introduce el importe del ${tipoDato} \n Ej: 100`,
    "0"
  );
  const addConcepto = prompt(`Introduce el concepto del ${tipoDato}`, " ");
  const addId = datosApp.length ? datosApp.at(-1).id + 1 : 1;

  const dato = {
    id: addId,
    fecha: addFecha,
    importe: addImporte,
    concepto: addConcepto,
    tipo: tipoDato,
  };

  datosApp.push(dato);
  guardarLS();
}

// Mostrar gastos/ingresos
function mostrar(tipoDato) {
  console.log("Mostrar");
  let resultadoAlert = `${tipoDato}s \n`.toUpperCase();

  const resultado = datosApp.filter((element) => element.tipo === tipoDato);
  console.log(tipoDato);
  resultado.length
    ? console.table(resultado, ["id", "fecha", "importe", "concepto"])
    : console.info(`no hay ningún ${tipoDato} para mostrar`);

  resultado.forEach((element) => {
    resultadoAlert += `Id: ${element.id}, Fecha: ${element.fecha}, Importe: ${element.importe}, Concepto: ${element.concepto} \n`;
  });

  alert(resultadoAlert);
}

//Editar registros
function seleccionarRegistro(elecc) {
  let registros = `Seleccione el id del registro a ${elecc} \n`;
  datosApp.forEach((element) => {
    registros += `Id: ${element.id}, Fecha: ${element.fecha}, Importe: ${element.importe}, Concepto: ${element.concepto}, Tipo: ${element.tipo} \n`;
  });
  const idElegido = prompt(registros);

  const elementIndex = datosApp.findIndex((obj) => obj.id == idElegido);
  if (elementIndex > -1) {
    if (elecc == "editar") {
      editarRegistro(elementIndex);
    } else {
      borrarRegistro(elementIndex);
    }
  } else alert("El id seleccionado no existe");
}

function editarRegistro(elementIndex) {
  let editar = true;
  while (editar) {
    let opcion = prompt(
      `Registro:\n Id: ${datosApp[elementIndex].id}, Fecha: ${datosApp[elementIndex].fecha}, Importe: ${datosApp[elementIndex].importe}, Concepto: ${datosApp[elementIndex].concepto}, Tipo: ${datosApp[elementIndex].tipo} \n` +
        `\n Elige que campo quieres modificar:` +
        `\n 1)Fecha, 2)Importe, 3)Concepto, 0)Guardar`
    );

    switch (parseInt(opcion)) {
      case 1:
        const nuevaFecha = prompt("Inserte una nueva fecha");
        datosApp[elementIndex].fecha = nuevaFecha;
        break;

      case 2:
        const nuevoImporte = prompt("Inserte un nuevo importe");
        datosApp[elementIndex].importe = nuevoImporte;
        break;

      case 3:
        const nuevoConcepto = prompt("Inserte un nuevo concepto");
        datosApp[elementIndex].concepto = nuevoConcepto;
        break;

      case 0:
        guardarLS();
        editar = false;
        break;
      default:
        alert("Elige una opción correcta");
    }
  }
}

function borrarRegistro(elementIndex) {
  alert(
    `Registro:\n Id: ${datosApp[elementIndex].id}, Fecha: ${datosApp[elementIndex].fecha}, Importe: ${datosApp[elementIndex].importe}, Concepto: ${datosApp[elementIndex].concepto}, Tipo: ${datosApp[elementIndex].tipo} \n Eliminado.`
  );
  datosApp.splice(elementIndex, 1);
  guardarLS();
}

function mostrarBalance() {
  let totalGasto = 0;
  let totalIngreso = 0;
  let regGastos = [];
  let regIngresos = [];
  datosApp.forEach((registro) => {
    if (registro.tipo === "ingreso") {
      totalIngreso += parseInt(registro.importe);
      regIngresos.push(registro);
    } else {
      totalGasto += parseInt(registro.importe);
      regGastos.push(registro);
    }
  });

  console.log("Gastos");
  console.table(regGastos, ["id", "fecha", "importe", "concepto"]);
  console.log(`Total gastos = ${totalGasto}€`);
  console.log("Ingresos");
  console.table(regIngresos, ["id", "fecha", "importe", "concepto"]);
  console.log(`Total gastos = ${totalIngreso}€`);
  console.log(
    `________________________________________________________________`
  );
  console.log(`Balance =  ${totalIngreso - totalGasto}€`);

  alert(
    ` Balance: \nIngresos totales: ${totalIngreso}€ \nGastos totales: ${totalGasto}€ \nBalance: ${
      totalIngreso - totalGasto
    }€`
  );
}
