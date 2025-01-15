# Evaluación final Melisa Cresta

Este proyecto consiste en el desarrollo de una aplicación web de búsqueda de series de anime que permita marcar/desmarcar las series como favoritas y guardarlas en local storage. Este forma parte de la evaluación final del **Módulo 2:JAVASCRIPT** de Adalab, donde se evaluan los conocimientos adquiridos durante este módulo sobre JS.

Las técnologías y lenguajes usados para la realización de este proyecto han sido:

- **Starter Kit de Adalab**. Creado con **node y vite**. Para crear una plantilla del proyecto HTML.
- **Repositorio git y GitHub**. Para el control de versiones.
- **Lenguajes HTML y CSS**. HTML para la estructura del proyecto y CSS para la hoja de estilos.
- **JavaScript**. Para dar funcionalidad a la aplicación.
- **APIs**. Para las peticiones al servidor.

## REQUISITOS

### Interacción

El proyecto cumple con las siguientes interacciones:

1. **Maquetación:**
Creación de una estructura básica con HTML y CSS (información aportada por Adalab en el enunciado de este proyecto). 

2. **Búsqueda:**
Al realizar una búsqueda la aplicación se conectará al [API de series anime](https://docs.api.jikan.moe/) y mostrará en la aplicación aquellas series buscadas por la usuaria.

3. **Favoritos:**
La usuaria podrá indicar sus series favoritas haciendo clic sobre ellas. Estas aparecerán a la izquierda de la aplicación. También podrá continuar con la búsqueda de series sin afectar a la visualización de la lista de favoritos.

4. **Almacenamiento local:**
La lista de favoritos se almacenará en el localStorage para que al recargar la página este listado se muestre.

Los elementos han sido renderizados usando tanto **innerHTML** como **DOM***. 
*(DOM fue usado en la función handleRemoveFav).*


**NOTA:** Los siguientes puntos son BONUS:
1. **Borrar favoritos:**
 - Eliminar un elemento de la lista al dar a la X.
 - Eliminar/agregar un elemento al deseleccionar/seleccionar su serie.
 - Borrar todos los elementos de la lista de favoritos y del LS.
2. **Botón reset:**
 - Al clicar sobre el botón todos los valores volverán a su estado inicial. 

## INSTALACIÓN
Dentro de nuestro archivo de trabajo abrir una terminal BASH y clonar el repositorio de github.
Comprobar que estamos en la ruta del directorio adecuada. Posteriormente instalar las dependencias "node_modules" para la ejecución del framework Vite, e iniciar el proyecto. 

Clonar repositorio:
~~~
$ git clone https://example.com
~~~
Ruta directorio:
~~~
$ cd ../path/to/the/file
~~~
Instalación dependencias:
~~~
$ npm install
~~~
Iniciar proyecto:
~~~
$ npm start
~~~
## PUBLICACIÓN 
Primero generamos la página para producción. En la terminal BASH introducimos los comandos:
~~~
$ npm run build
$ npm run push-docs
$ npm run deploy
~~~
A continuación subimos el repositorio a la carpeta `docs/` que se acaba de generar. En la pestaña `settings` del repositorio ir al apartado de GitHub Pages y activar la opción **master branch /docs folder** 