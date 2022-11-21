| HTTP Method |        URL path        |          Description           | JSON |     ROLES     |
| :---------: | :--------------------: | :----------------------------: | :--: | :-----------: |
|     GET     |       /registrar       |           registrar            |      |    usuario    |
|    POST     |       /registrar       |           registrar            |      |    usuario    |
|     GET     |         /login         |             login              |      |    usuario    |
|    POST     |         /login         |             login              |      |    usuario    |
|     GET     |        /logout         |         logout un form         |      |    usuario    |
|     GET     |           /            |           index page           |      |    usuario    |
|     GET     |   /ingredientes/list   |       ingredientes list        |      | PM: eliminar  |
|     GET     |     /usuarios/:id      | editar infor y eliminar receta |      |    usuario    |
|     GET     |  /usuarios/:id/editar  |         editar perfil          |      | admin/usuario |
|    POST     |  /usuarios/:id/editar  |         editar perfil          |      | admin/usuario |
|    POST     | /usuarios/:id/eliminar |        eliminar perfil         |      |     admin     |
|     GET     |       /usuarios        |           user list            |      |    usuario    |
|     GET     |     /recetas/crear     |         crear recetas          |      |    usuario    |
|    POST     |     /recetas/crear     |         crear recetas          |      |    usuario    |
|     GET     |  /recetas/mis-recetas  |      list de mis recetas       |      |    usuario    |
|     GET     | /recetas/todas-recetas |     list de todas recetas      |      |               |
|     GET     |  /recetas/detalle/:id  |            detalles            |      |    usuario    |
|     GET     |       /contacto        |           form de AC           |      |    usuario    |
|    POST     |       /contacto        |      Atencion de cliente       |      |    usuario    |

nota: en /recetas/detalle/:id

1.  PM puede eliminar recetas
2.  propio usuario puede eliminar su receta
3.  debajo de los detalles de la receta, hay tabla de comentario

POST coger datos de API https://api.edamam.com/api/nutrition-details?app_id=d3f9147b&app_key=b526a4ec27f87aa09981ca28c4b5fa30

nota:en el/recetas/crear, un formulario con opciones, usuario elige ingredientes y cantidad.mandar a API
THIS INDEX PAGE HAY 3 articulos: create receta/ listado de todas recetas/, listado de todos los usuarios
