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
    
    // Simulando a barra de progresso (não é 100% precisa, mas serve para exibir o progresso)
    reader.onprogress = function (event) {
        if (event.lengthComputable) {
            let percent = (event.loaded / event.total) * 100;
            progressBar.value = percent;
        }
    };

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
                // Lógica para conversão para AVIF
                dataUrl = canvas.toDataURL('image/avif');
            } else if (selectedFormat === 'heif') {
                // Lógica para conversão para HEIF
                dataUrl = canvas.toDataURL('image/heif');
            }
            // Adicionar mais condições para outros formatos, como SVG, ICO, HEIC, PDF, EPS, etc.

            // Atualizar o link para download
            downloadLink.href = dataUrl;
            downloadLink.download = `imagem-convertida.${selectedFormat}`;
            downloadLink.classList.remove('d-none');
            
            // Atualizar a barra de progresso para 100% após a conversão
            progressBar.value = 100;
        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
}
