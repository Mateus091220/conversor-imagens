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

    // Esconde o botão de download enquanto a conversão não terminar
    downloadLink.classList.add('d-none');
    
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Aqui você pode adicionar o código para converter o canvas para o formato desejado
            const selectedFormat = formatSelect.value;
            let dataUrl;
            let progress = 0;

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

            // Simulando a atualização do progresso (isso pode ser ajustado conforme a necessidade)
            let interval = setInterval(function() {
                if (progress < 100) {
                    progress += 10; // Avançando o progresso
                    progressBar.value = progress;
                } else {
                    clearInterval(interval); // Quando o progresso atingir 100%, para
                    downloadLink.href = dataUrl;
                    downloadLink.download = `imagem-convertida.${selectedFormat}`;
                    downloadLink.classList.remove('d-none'); // Mostra o botão de download
                }
            }, 100); // Atualiza o progresso a cada 100ms
        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
}
