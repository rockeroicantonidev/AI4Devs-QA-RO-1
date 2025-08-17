/********************************************************************************************
 * Documentación de selectores para pruebas E2E (módulo de seguimiento de candidatos)
 *
 * Basado en la revisión de los componentes:
 * - Positions.tsx
 * - StageColumn.js
 * - CandidateCard.js
 *
 * Selectores identificados:
 *
 * 1. Título de la posición:
 *    - Selector: 'Card.Title' dentro de cada tarjeta de posición en la página /positions
 *    - Ejemplo: cy.get('.card-title').contains('Senior Full-Stack Engineer')
 *
 * 2. Botón para ver el proceso de una posición:
 *    - Selector: 'Button' con texto 'Ver proceso' dentro de cada tarjeta de posición
 *    - Ejemplo: cy.contains('button', 'Ver proceso')
 *
 * 3. Columnas de etapas del proceso:
 *    - Selector: 'Card.Header' dentro de cada columna (StageColumn)
 *    - Ejemplo: cy.get('.card-header').contains('Entrevista Técnica')
 *
 * 4. Tarjetas de candidatos:
 *    - Selector: 'Card' con clase 'mb-2' dentro de cada columna
 *    - Ejemplo: cy.get('.mb-2 .card-title').contains('John Doe')
 *
 * 5. Drag & Drop:
 *    - Las tarjetas de candidatos son elementos Draggable (react-beautiful-dnd)
 *    - Las columnas son Droppable (por índice, ej: '[data-rbd-droppable-id="0"]')
 *    - Ejemplo para arrastrar: cy.get('.mb-2').first().trigger('dragstart')
 *
 * Nota: No existen atributos 'data-testid' ni 'id' únicos, por lo que se usarán selectores de clase y texto.
 *       Los selectores pueden requerir ajustes si hay cambios en la estructura visual.
 ********************************************************************************************/

/********************************************************************************************
 * Estado inicial detallado de posiciones y candidatos
 *
 * POSICIONES VISIBLES:
 * 1. Senior Full-Stack Engineer
 *    - Ubicación: Remote
 *    - Estado: Open
 *    - Fecha límite: 31/12/2024
 *    - Candidatos asociados:
 *        a) John Doe
 *           - Etapa actual: Technical Interview
 *        b) Jane Smith
 *           - Etapa actual: Technical Interview
 *        c) Carlos García
 *           - Etapa actual: Initial Screening
 *
 * 2. Data Scientist
 *    - Ubicación: Remote
 *    - Estado: Open
 *    - Fecha límite: 31/12/2024
 *    - Candidatos asociados:
 *        a) John Doe
 *           - Etapa actual: Technical Interview
 *
 * ETAPAS DEL PROCESO DE ENTREVISTA (para Senior Full-Stack Engineer):
 *    - Initial Screening
 *    - Technical Interview
 *    - Manager Interview
 *
 * ETAPAS DEL PROCESO DE ENTREVISTA (para Data Scientist):
 *    - (No detalladas en el seed, pero se asume similar estructura)
 *
 * NOTA: Los nombres de las etapas corresponden a los creados en el seed y pueden variar en la interfaz.
 ********************************************************************************************/

/********************************************************************************************
 * Pruebas E2E para el módulo de seguimiento de candidatos
 * Escenarios:
 * 1. Carga de la página de posiciones y verificación de elementos clave.
 * 2. Visualización de columnas y candidatos en la posición seleccionada.
 * 3. Movimiento de un candidato entre etapas (drag & drop) y verificación visual/backend.
 ********************************************************************************************/

describe('Seguimiento de candidatos - E2E', () => {

    // Comprobación inicial de precondiciones antes de ejecutar cualquier test
    before(() => {
        cy.request('GET', 'http://localhost:3010/positions')
            .then((response) => {
                const position = response.body.find(p => p.title === 'Senior Full-Stack Engineer');
                if (!position) {
                    throw new Error('Precondición fallida: No existe la posición "Senior Full-Stack Engineer".');
                }
                return cy.request('GET', `http://localhost:3010/positions/${position.id}/candidates`);
            })
            .then((response) => {
                const candidates = response.body;
                const john = candidates.find(c => c.fullName === 'John Doe');
                const jane = candidates.find(c => c.fullName === 'Jane Smith');
                const carlos = candidates.find(c => c.fullName === 'Carlos García');

                if (!john || john.currentInterviewStep !== 'Technical Interview') {
                    throw new Error('Precondición fallida: John Doe no está en la etapa "Technical Interview".');
                }
                if (!jane || jane.currentInterviewStep !== 'Technical Interview') {
                    throw new Error('Precondición fallida: Jane Smith no está en la etapa "Technical Interview".');
                }
                if (!carlos || carlos.currentInterviewStep !== 'Initial Screening') {
                    throw new Error('Precondición fallida: Carlos García no está en la etapa "Initial Screening".');
                }
            });
    });

    // 1. Carga de la página de posiciones
    it('Debe mostrar las posiciones y sus datos principales', () => {
        cy.visit('http://localhost:3000/positions');
        // Verifica que se muestra el título de la posición
        cy.get('.card-title').contains('Senior Full-Stack Engineer').should('be.visible');
        cy.get('.card-title').contains('Data Scientist').should('be.visible');
        // Verifica que el botón "Ver proceso" está presente
        cy.contains('button', 'Ver proceso').should('exist');
    });

    // 2. Visualización de columnas y candidatos en la posición seleccionada
    it('Debe mostrar las columnas de etapas y los candidatos en la posición seleccionada', () => {
        cy.visit('http://localhost:3000/positions');
        // Selecciona la posición "Senior Full-Stack Engineer"
        cy.get('.card-title').contains('Senior Full-Stack Engineer').parents('.card').within(() => {
            cy.contains('button', 'Ver proceso').click();
        });

        // Verifica que se muestran las columnas de etapas
        cy.get('.card-header').contains('Initial Screening').should('be.visible');
        cy.get('.card-header').contains('Technical Interview').should('be.visible');
        cy.get('.card-header').contains('Manager Interview').should('be.visible');

        cy.wait(1000);

        // Verifica que los candidatos están en la columna correcta
        cy.get('.card-header').contains('Technical Interview').parents('.card').within(() => {
            cy.get('.mb-2 .card-title').contains('John Doe').should('be.visible');
            cy.get('.mb-2 .card-title').contains('Jane Smith').should('be.visible');
        });
        cy.get('.card-header').contains('Initial Screening').parents('.card').within(() => {
            cy.get('.mb-2 .card-title').contains('Carlos García').should('be.visible');
        });
    });

    // 3. Movimiento de un candidato entre etapas (drag & drop)
    it('Debe mover un candidato de una etapa a otra y reflejar el cambio', () => {
        cy.visit('http://localhost:3000/positions');
        cy.get('.card-title').contains('Senior Full-Stack Engineer').parents('.card').within(() => {
            cy.contains('button', 'Ver proceso').click();
        });

        // Espera a que los elementos sean visibles
        cy.get('[data-rbd-draggable-id="3"]').should('be.visible');
        cy.get('[data-rbd-droppable-id="1"]').should('be.visible');

        // Coordenadas de origen y destino
        let sourceCoords;
        let targetCoords;

        // Obtener coordenadas del elemento origen (Carlos García)
        cy.get('[data-rbd-draggable-id="3"]')
            .then($source => {
                const rect = $source[0].getBoundingClientRect();
                sourceCoords = {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                };
            });

        // Obtener coordenadas del elemento destino (columna Technical Interview)
        cy.get('[data-rbd-droppable-id="1"]')
            .then($target => {
                const rect = $target[0].getBoundingClientRect();
                targetCoords = {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                };
            });

        // Simular toda la secuencia de eventos para react-beautiful-dnd
        cy.get('[data-rbd-draggable-id="3"]')
            .then(() => {
                // Comenzar el drag (mousedown)
                cy.get('[data-rbd-draggable-id="3"]')
                    .trigger('mousedown', { button: 0, clientX: sourceCoords.x, clientY: sourceCoords.y })
                    .trigger('mousemove', { button: 0, clientX: sourceCoords.x + 5, clientY: sourceCoords.y + 5, force: true });

                // Realizar movimiento intermedio
                cy.wait(100);
                cy.get('body')
                    .trigger('mousemove', { button: 0, clientX: targetCoords.x - 10, clientY: targetCoords.y - 10, force: true });

                cy.wait(100);

                // Soltar en el destino (mouseup)
                cy.get('[data-rbd-droppable-id="1"]')
                    .trigger('mousemove', { button: 0, clientX: targetCoords.x, clientY: targetCoords.y, force: true })
                    .trigger('mouseup', { force: true });
            });

        // Esperar a que se complete la operación
        cy.wait(1000);

        // Verificar el resultado
        cy.get('[data-rbd-droppable-id="1"]').within(() => {
            cy.get('.card-title').contains('Carlos García').should('be.visible');
        });

        cy.wait(1000);

        // Verificar que ya no aparece en la columna original
        cy.get('[data-rbd-droppable-id="0"]').should('not.contain.text', 'Carlos García');

        // Verificar el cambio en el backend
        cy.request('GET', 'http://localhost:3010/positions/1/candidates').then((response) => {
            expect(response.status).to.eq(200);
            const carlos = response.body.find(c => c.fullName.includes('Carlos García'));
            expect(carlos.currentInterviewStep).to.eq('Technical Interview');
        });
    });


});