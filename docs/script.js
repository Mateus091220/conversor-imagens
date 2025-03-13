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

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Aqui, vamos adicionar o código para controlar o progresso
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10; // Simula o progresso (aumente conforme necessário)
                progressBar.value = progress;

                // Quando o progresso atingir 100%, mostra o botão de download
                if (progress >= 100) {
                    clearInterval(interval); // Interrompe o intervalo
                    downloadLink.classList.remove('d-none'); // Mostra o botão de download
                }
            }, 500); // Atualiza a cada 500ms (ajuste conforme a necessidade)

            // Agora, converta para o formato desejado
            const selectedFormat = formatSelect.value;
            let dataUrl;

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

            // Atualizar o link para download
            downloadLink.href = dataUrl;
            downloadLink.download = `imagem-convertida.${selectedFormat}`;
        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
}
