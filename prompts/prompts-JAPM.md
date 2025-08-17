# Prompt 1 
Eres un experto en ingenieria de prompts, en Cypress, en Automatización de pruebas y pruebas E2E
## Contexto inicial
Tenemos un proyecto para el seguimiento de candidatos al cual se a integrado la funcionalidad de mover un candidato de una etapa a otra, se pide automatizar las pruebas de este modulo.

## Instrucciones Generales
El objetivo es crear un prompt para Copilot (ChatGPT) que asegure el funcionamiento adecuado de la interfaz mediante purbeas End-to-End (E2E) con los siguientes requerimientos

## Requerimientos
1. Configurar Cypress en el proyecto
    - Se sugiere el siguiente comenado para ello, revisar si es correcto:
    ```bash
    npm install cypress --save-dev
    ```
2. Crear pruebas E2E para verificar los siguientes escenarios
    * Carga de la página positions
        * URL: http://localhost:3000/positions
        * Verificar que el título de la posición se muestra correctamente.
        * Verificar que se muestran las columnas correspondientes a cada fase del proceso de contratación.
        * Verificar que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.
    * Cambio de Fase de un Candidato
        * URL: http://localhost:3000/positions/:id
        * Simula el arrastre de una tarjeta de candidato de una columna a otra.
        * Verifica que la tarjeta del candidato se mueve a la nueva columna.
        * Verifica que la fase del candidato se actualiza correctamente en el backend mediante el endpoint PUT /candidate/:id.
3. Crear pruebas E2E:
    * Crear un archivo de prueba position.spec.js en la carpeta /cypress/integration.
    * Escribe pruebas E2E para verificar la carga de la página y el cambio de fase de un candidato.
    * Se sugiere ejecutar las pruebas con el siguiente comando:
    ```bash
    npx cypress open
    ```

## Consideraciones
- El chatbot tendra acceso al codigo fuente del frontend para completar con la tarea

## Mejores Practicas
- Incluye el rol en el que debe actual el chatbot

## Pautas para generar el contenido
1. El formato de salida va ser un archivo con extensión .md y el contenido en formato Markdown

Antes de generar el prompt revisa mis requerimientos ¿me esta faltando algo por considerar?
Realiza preguntas si necesitas mas información.



# Prompt 2, para Copilot (ChatGPT) - Automatización E2E con Cypress

## Rol
Actúa como experto en Cypress y automatización de pruebas E2E.

## Objetivo
Automatizar pruebas End-to-End (E2E) para el módulo de seguimiento de candidatos, específicamente la funcionalidad de mover un candidato de una etapa a otra.

## Instrucciones

1. **Configura Cypress en el proyecto**  
   - Verifica si Cypress está instalado. Si no, instala Cypress usando:
     ```bash
     npm install cypress --save-dev
     ```

2. **Revisa el código fuente del frontend**  
   - Inspecciona los archivos relevantes para identificar:
     - Selectores de columnas de fases del proceso de contratación.
     - Selectores de tarjetas de candidatos.
     - Selector del título de la posición.
     - Cualquier atributo único (`data-testid`, `id`, `class`, etc.) útil para las pruebas.
   - Documenta los selectores encontrados en el archivo Markdown antes de escribir los tests.

3. **Precondiciones**
   - Asegúrate de que existan datos de prueba de posiciones y candidatos en el estado inicial necesario para ejecutar las pruebas.

4. **Escenarios a probar**
   - **Carga de la página de posiciones**
     - URL: `http://localhost:3000/positions`
     - Verifica que el título de la posición se muestra correctamente.
     - Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación.
     - Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.
   - **Cambio de fase de un candidato**
     - URL: `http://localhost:3000/positions/:id`
     - Simula el arrastre de una tarjeta de candidato de una columna a otra usando la librería `react-beautiful-dnd`.
     - Verifica que la tarjeta del candidato se mueve a la nueva columna.
     - Verifica que la fase del candidato se actualiza correctamente en el backend mediante el endpoint `PUT /candidate/:id`.

5. **Implementación de pruebas**
   - Crea el archivo de prueba `position.spec.js` en la carpeta `/cypress/integration`.
   - Escribe las pruebas E2E para los escenarios descritos utilizando los selectores identificados.
   - Ejecuta las pruebas con:
     ```bash
     npx cypress open
     ```

## Consideraciones
- No existe autenticación.
- El entorno de ejecución es local.
- Solo existe un rol de usuario.
- Las pruebas se realizarán únicamente en Desktop.
- No es necesario limpiar el estado, pero documenta las precondiciones necesarias.

## Mejores prácticas
- Utiliza selectores robustos y claros.
- Comenta brevemente cada paso relevante en el código de prueba.

## Formato de salida
- En cada archivo y sección que se vaya a crear incluye primero la documentación de los selectores encontrados y luego el código de las pruebas E2E.

## Pautas para generar el contenido:
- Genera una lista de pasos para realizar la implementación y muestrala antes de realizar cualquier cosa
- Cada paso se va ejecutar de manera individual por lo que me tienes que preguntar si podemos pasar al siguiente
- En cada paso de la lista menciona el archivo que se va a crear o modificar e incluye el código que se va agregar

Antes de realizar la tarea revisa mis requisitos ¿hay algo que me este faltando considerar?
Hazme preguntas si necesitas más información.

# Prompt 3

Tenemos la vista "http://localhost:3000/positions/1" con la siguiente estructura:

```markdown
# Senior Full-Stack Engineer
|Initial Screening|Technical Interview|Manager Interview|
|---|---|---|
|Carlos García|John Doe|(fila sin candidato)|
|(fila sin candidato)|Jane Smith|(fila sin candidato)|
```

De acuerdo a la prueba "Debe mover un candidato de una etapa a otra y reflejar el cambio" se espera mover a "Carlos Gárcia" de la columna "Initial Screening" a "Technical Interview", por lo que el resultado esperado seria el siguiente:

```markdown
# Senior Full-Stack Engineer
|Initial Screening|Technical Interview|Manager Interview|
|---|---|---|
|(fila sin candidato)|John Doe|(fila sin candidato)|
|(fila sin candidato)|Jane Smith|(fila sin candidato)|
|(fila sin candidato)|Carlos García|(fila sin candidato)|
```

¿que modificaciones se requeiren realizar en el código para que la funcion de Drag&Drop se realice correctamente?
Realiza preguntas si requieres mas información

# Prompt 4

Tenemos el siguiente error al ejecutar las pruebas:
---ERROR---
15
get.card-header:contains("Technical Interview")
0
AssertionError
Timed out retrying after 4000ms: Expected to find element: .card-header:contains("Technical Interview"), but never found it.
node_modules/@4tw/cypress-drag-drop/index.js:122:1
120 | this.source = source.get(0)
121 | this.initialSourcePosition = this.source.getBoundingClientRect()

122 | return cy.get(target).then((targetWrapper) => {
| ^
123 | this.target = targetWrapper.get(0)
124 | })
125 | },
View stack trace
Print to console
at Object.init (webpack://frontend/./node_modules/@4tw/cypress-drag-drop/index.js:122)
at Object.drag (webpack://frontend/./node_modules/@4tw/cypress-drag-drop/index.js:127)
at Context.eval (webpack://frontend/./node_modules/@4tw/cypress-drag-drop/index.js:150:55)
at wrapped (http://localhost:3000/__cypress/runn
---FIN ERROR---

¿como lo resolvemos? ¿te serviria el código fuente de la página?

# Prompt 5

Al ejecutar la prueba se observa dentro del navegador de pruebas que el elemento si es posible arrastrarlo pero no hay alguna acción que despues de arrastarlo lo coloque dentro de la columa "Technical Interview", ¿que modificaciones se tiene que realizar para que el elemento "Carlos Garcia" se arrastre y despues se deposite en la columna mecionada?

# Prompt 6

Al comprobar el siguiente criterio se muestra un error:
```javascript
// Verificar que ya no aparece en la columna original
        cy.get('[data-rbd-droppable-id="0"]').within(() => {
            cy.get('.card-title').contains('Carlos García').should('not.exist');
});
```
Obtengo el siguient error en stack de ejecucion de Cypress:
--- ERROR ---
get.card-title
0
AssertionError
Timed out retrying after 4000ms: Expected to find element: .card-title, but never found it.
cypress/integration/position.spec.js:181:16
  179 |         // Verificar que ya no aparece en la columna original
  180 |         cy.get('[data-rbd-droppable-id="0"]').within(() => {
> 181 |             cy.get('.card-title').contains('Carlos García').should('not.exist');
      |                ^
  182 |         });
--- FIN ERROR ---
Sin embargo visualmente te puedo confirmar que se cumple. ¿que modificaciones se tienen que realizar para que el criterio pase con exito?

# Prompt 7

Agrega una comprobación inicial en donde si no se cumplen las precondiciones descritas en la documentación del archivo lance un error que describa por qué no es posible iniciar la ejecución y no ejecute ningun caso de prueba.

Antes de ejecutar esta tarea ¿tienes alguna pregunta?

# Prompts Adicionales

- Dame una lista de detalles que tengo que saber para trabajar realizar modificaciones sobre el proyecto actual
- Dame una lista de instrucciones para levantar el proyecto actual y todos su componentes
- Actualmente el proyecto dentro de la URL "http://localhost:3000/positions/:id" tiene una funcionalidad Drag & Drop para arrastrar un candidato de una columna a otra. ¿Me puedes decir si esta funcionalidad es nativa o de algun otro tipo?