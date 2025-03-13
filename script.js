function convertImage() {
    const fileInput = document.getElementById('upload');
    const formatSelect = document.getElementById('format');
    const selectedFormat = formatSelect.value; // Obtém o formato escolhido

    if (fileInput.files.length === 0) {
        alert('Selecione uma imagem!');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            let mimeType = `image/${selectedFormat}`;
            if (selectedFormat === "jpg") mimeType = "image/jpeg";

            const dataUrl = canvas.toDataURL(mimeType); // Gera a imagem no formato escolhido

            const downloadLink = document.getElementById('download');
            downloadLink.href = dataUrl;
            downloadLink.download = `convertido.${selectedFormat}`;
            downloadLink.classList.remove('hidden');
            downloadLink.innerText = `Baixar ${selectedFormat.toUpperCase()}`;
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}
