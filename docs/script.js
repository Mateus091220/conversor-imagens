function convertImage() {
    const fileInput = document.getElementById('upload');
    const formatSelect = document.getElementById('format');
    const progressBar = document.getElementById('progress');
    const canvas = document.getElementById('canvas');
    const downloadLink = document.getElementById('download');
    
    if (!fileInput.files.length) {
        alert("Por favor, escolha uma imagem!");
        return;
    }

    // Inicializa o botão de download como oculto
    downloadLink.classList.add('d-none');
    
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Começar o processo de conversão
            const selectedFormat = formatSelect.value;
            let dataUrl;

            // Simula o progresso da conversão
            let progress = 0;
            progressBar.value = progress;

            const interval = setInterval(() => {
                progress += 10; // Aumenta o progresso a cada intervalo
                progressBar.value = progress; // Atualiza a barra de progresso

                // Quando o progresso atingir 100%, faz a conversão e mostra o botão de download
                if (progress >= 100) {
                    clearInterval(interval); // Limpa o intervalo quando chegar a 100%
                    
                    // Realiza a conversão para o formato desejado
                    if (selectedFormat === 'png') {
                        dataUrl = canvas.toDataURL('image/png');
                    } else if (selectedFormat === 'jpeg') {
                        dataUrl = canvas.toDataURL('image/jpeg');
                    } else if (selectedFormat === 'bmp') {
                        dataUrl = canvas.toDataURL('image/bmp');
                    } else if (selectedFormat === 'gif') {
                        dataUrl = canvas.toDataURL('image/gif');
                    } else if (selectedFormat === 'webp') {
                        dataUrl = canvas.toDataURL('image/webp');
                    } else if (selectedFormat === 'avif') {
                        dataUrl = canvas.toDataURL('image/avif');
                    } else if (selectedFormat === 'heif') {
                        dataUrl = canvas.toDataURL('image/heif');
                    }
                    // Adicionar mais condições para outros formatos, como SVG, ICO, HEIC, PDF, EPS, etc.
                    
                    // Atualiza o link para download
                    downloadLink.href = dataUrl;
                    downloadLink.download = `imagem-convertida.${selectedFormat}`;
                    downloadLink.classList.remove('d-none'); // Mostra o botão de download
                }
            }, 500); // Intervalo de 500ms (ajustável para simular o progresso)
        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
}
