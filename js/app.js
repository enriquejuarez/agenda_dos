var agregarContacto = document.getElementById('agregar');
var formulario = document.getElementById('formulario_crear_usuario');
var action = formulario.getAttribute('action');
var divCrear = document.getElementById('crear_contacto');
var tablaRegistrados = document.getElementById('registrados');
var checkboxes = document.getElementsByClassName('borrar_contacto');
var btn_borrar = document.getElementById('btn_borrar');

function registroExitoso(nombre){
	var divMensaje = document.createElement('DIV');
	divMensaje.setAttribute('id', "mensaje");

	var texto = document.createTextNode('Creado: '+nombre);
	divMensaje.appendChild(texto);

	divCrear.insertBefore(divMensaje, divCrear.childNodes[4]);

	divMensaje.classList.add('mostrar');

	setTimeout(function(){
		divMensaje.classList.add('ocultar');
		setTimeout(function(){
			var divPadreMensaje = divMensaje.parentNode;
			divPadreMensaje.removeChild(divMensaje);
		}, 500);
	}, 3000);
}

function construirTemplate(nombre, telefono, id){
	var tdNombre = document.createElement('TD');
	var textoNombre = document.createTextNode(nombre);
	tdNombre.appendChild(textoNombre);

	var tdTelefono = document.createElement('TD');
	var textoTelefono = document.createTextNode(telefono);
	tdTelefono.appendChild(textoTelefono);

	var nodoBtn = document.createElement('A');
	var textoEnlace = document.createTextNode('Editar');
	nodoBtn.appendChild(textoEnlace);
	nodoBtn.href = 'editar.php?id='+id;

	var nodoTdEditar = document.createElement('TD');
	nodoTdEditar.appendChild(nodoBtn);

	var checkBorrar = document.createElement('INPUT');
	checkBorrar.type = 'checkbox';
	checkBorrar.name = id;
	checkBorrar.classList.add('borrar_contacto');

	var tdCheckbox = document.createElement('TD');
	tdCheckbox.classList.add('borrar');
	tdCheckbox.appendChild(checkBorrar);

	var trContacto = document.createElement('TR');
	trContacto.appendChild(tdNombre);
	trContacto.appendChild(tdTelefono);
	trContacto.appendChild(nodoTdEditar);
	trContacto.appendChild(tdCheckbox);

	tablaRegistrados.childNodes[3].append(trContacto);

}

function contactosEliminar(contactos){
	var xhr =  new XMLHttpRequest();
	xhr.open('GET', 'borrar.php?='+ contactos, true);
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.onreadystatechange =  function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			var resultadoBorrar = xhr.responseText;
			var json = JSON.parse(resultadoBorrar);
			if (json.respuesta == false){
				
			}
		}
	}
}

function checkboxSeleccionado(){
	var contactos=[];
	for(i=0; i<checkboxes.length; i++){
		if(checkboxes[i].checked==true){
			contactos.push(checkboxes[i].name);
		}
	}
	contactosEliminar(contactos);
}

function crearUsuario(){
	var form_datos = new FormData(formulario);
	for([key, value] of form_datos.entries()){
		console.log(key + ": " +value);
	}
	var xhr = new XMLHttpRequest();
	xhr.open('POST', action, true);
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			var resultado = xhr.responseText;
			var json = JSON.parse(resultado);
			if (json.respuesta){
				registroExitoso(json.nombre);
				construirTemplate(json.nombre, json.telefono, json.id);
			}
		}
	}
	xhr.send(form_datos);
}

for (var i = 0; i < checkboxes.length; i++) {
	checkboxes[i].addEventListener('change', function(){
		if(this.checked){
			this.parentNode.parentNode.classList.add('activo');
		}else{
			this.parentNode.parentNode.classList.remove('activo');
		}
	});
}
agregarContacto.addEventListener('click', function(e){
	e.preventDefault();
	crearUsuario();
});

btn_borrar.addEventListener('click', function(){
	checkboxSeleccionado();
});