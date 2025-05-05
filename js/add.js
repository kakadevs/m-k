
        document.getElementById('addProjectBtn').addEventListener('click', () => {
            document.getElementById('imageInput').click();
        });
        
        document.getElementById('imageInput').addEventListener('change', async (event) => {
            const file = event.target.files[0];
            if (!file) return;
        
            const formData = new FormData();
            formData.append('image', file);
        
            // Nome padrão inicial
            formData.append('projectName', '...');
        
            try {
                const response = await fetch('upload.php', {
                    method: 'POST',
                    body: formData
                });
        
                const result = await response.text();
        
                if (response.ok) {
                    // Adiciona visualmente na tela
                    const section = document.querySelector('.projects');
                    const newProject = document.createElement('div');
                    newProject.classList.add('project-management');
        
                    // Cria a imagem com a nova URL salva
                    const imageUrl = result.trim();
        
                    newProject.innerHTML = `
                        <h2 contenteditable="true">...</h2>
                        <img src="${imageUrl}" alt="imagem">
                        <p>Administrar Projeto de uma maneira segura e eficiente.</p>
                        <button onclick="startLoading('${imageUrl}')">Administrar Projeto</button>
                    `;
        
                    section.appendChild(newProject);
                } else {
                    alert("Erro ao adicionar projeto: " + result);
                }
        
            } catch (error) {
                console.error('Erro:', error);
            }
        });