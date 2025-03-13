function convertImage() {
    const fileInput = document.getElementById('upload');
    const formatSelect = document.getElementById('format');
    const canvas = document.getElementById('canvas');
    const downloadLink = document.getElementById('download');
    const file = fileInput.files[0];
    const format = formatSelect.value;

    if (!file) {
        alert("Por favor, carregue uma imagem.");
        return;
    }

    const reader = new FileReader();
    
    reader.onload = function(event) {
        const img = new Image();
        
        img.onload = function() {
            // Desenhando a imagem no canvas
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            // Definindo o formato de saída
            let imageDataUrl;
            if (format === "png") {
                imageDataUrl = canvas.toDataURL("image/png");
            } else if (format === "jpeg" || format === "jpg") {
                imageDataUrl = canvas.toDataURL("image/jpeg");
            } else if (format === "bmp") {
                imageDataUrl = canvas.toDataURL("image/bmp");
            } else if (format === "gif") {
                imageDataUrl = canvas.toDataURL("image/gif");
            } else if (format === "webp") {
                imageDataUrl = canvas.toDataURL("image/webp");
            } else if (format === "tiff") {
                imageDataUrl = canvas.toDataURL("image/tiff");
            } else if (format === "svg") {
                // SVG não pode ser convertido diretamente com canvas, mas pode ser exportado como um arquivo
                const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${img.width}" height="${img.height}">
                                    <image href="${event.target.result}" width="100%" height="100%" />
                                  </svg>`;
                imageDataUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);
            } else if (format === "ico") {
                // Similar ao SVG, não pode ser feito via canvas, mas pode gerar um arquivo .ico
                imageDataUrl = canvas.toDataURL("image/x-icon");
            } else if (format === "heif") {
                imageDataUrl = canvas.toDataURL("image/heif");
            } else if (format === "heic") {
                imageDataUrl = canvas.toDataURL("image/heic");
            } else if (format === "avif") {
                imageDataUrl = canvas.toDataURL("image/avif");
            } else if (format === "pdf") {
                // PDF não pode ser convertido diretamente via canvas
                alert("PDF conversion is not supported.");
                return;
            } else if (format === "eps") {
                // EPS não pode ser convertido diretamente via canvas
                alert("EPS conversion is not supported.");
                return;
            }

            // Exibindo o link de download
            downloadLink.href = imageDataUrl;
            downloadLink.download = `imagem_convertida.${format}`;
            downloadLink.classList.remove('d-none');
        }

        img.src = event.target.result;
    }

    reader.readAsDataURL(file);
}
