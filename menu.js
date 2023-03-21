fetch('data.json')
    .then((response) => response.json())
    .then((json) => {
      var myTarget = document.getElementById('target');
      myTarget.appendChild(renderList(json));
    });

// funcion para darle el formato al precio
function formatPrice(str) {
  var result = '$';
  if (parseFloat(str) < 1) result += '0';
  return result + str;
}

// funcion de  utilizad para texto en mayuscula
function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function renderList(obj){
  // aqui creeamos un elemento ul
  var result = document.createElement('ul');
  for (key in obj) {
    // crea u  elemento li y agrega una copia en mayuzcula de la clave
    var list = document.createElement('li')
    var textnode = document.createTextNode(capitalize(key));
    list.appendChild(textnode);

    // si hay otro nivel para objeto llame repercusivamente a nuestra funcion, 
    // esto creara un nuevo ul que agregaremos desp de nuestro texto
    if (typeof obj[key] === 'object') {
      console.log(typeof obj[key]);
      list.appendChild(renderList(obj[key]));
    } 
    // de lo contrario, podria ser el precio  y agregar el valor a texto
    else {
      textnode.textContent += ': ' + formatPrice(obj[key]);
    }

  // agregamos nuestra li completada a la ul
    result.appendChild(list); 
  }
  return result;
}