function convertImage() {
    const fileInput = document.getElementById('upload');
    const formatSelect = document.getElementById('format');
    const downloadLink = document.getElementById('download');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                // Ajustando as dimensões do canvas para a imagem
                canvas.width = img.width;
                canvas.height = img.height;

                // Desenhando a imagem no canvas
                ctx.drawImage(img, 0, 0);

                // Gerando a imagem no formato desejado
                const format = formatSelect.value;
                canvas.toBlob(function (blob) {
                    const url = URL.createObjectURL(blob);
                    downloadLink.href = url;
                    downloadLink.download = 'imagem_convertida.' + format;
                    downloadLink.classList.remove('d-none'); // Mostra o link para download
                }, 'image/' + format);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}
