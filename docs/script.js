let selectedFormat = ''; // Variável global para armazenar o formato escolhido
let ffmpegInstance = null; // Armazena a instância do FFmpeg para evitar múltiplos carregamentos

async function loadFFmpeg() {
    if (!ffmpegInstance) {
        const { createFFmpeg } = FFmpeg;
        ffmpegInstance = createFFmpeg({ log: true });
        await ffmpegInstance.load();
    }
}

async function convertVideo(format) {
    const { fetchFile } = FFmpeg;
    const ffmpeg = ffmpegInstance;

    const fileInput = document.getElementById('videoUpload');
    const progressBar = document.getElementById('progressBar');
    const downloadLink = document.getElementById('downloadLink');

    if (!fileInput.files.length) {
        alert("Escolha um vídeo!");
        return;
    }

    await loadFFmpeg(); // Garante que o FFmpeg esteja carregado

    const file = fileInput.files[0];
    const fileName = file.name.split('.').slice(0, -1).join('.');
    const outputFileName = `${fileName}.${format}`;

    try {
        ffmpeg.FS('writeFile', file.name, await fetchFile(file));

        ffmpeg.setProgress(({ ratio }) => {
            progressBar.value = Math.round(ratio * 100);
        });

        await ffmpeg.run('-i', file.name, outputFileName);

        const data = ffmpeg.FS('readFile', outputFileName);
        const videoBlob = new Blob([data.buffer], { type: `video/${format}` });
        const videoUrl = URL.createObjectURL(videoBlob);

        downloadLink.href = videoUrl;
        downloadLink.download = outputFileName;
        downloadLink.classList.remove('d-none');

    } catch (error) {
        alert("Erro ao converter o vídeo. Tente novamente.");
        console.error("Erro ao converter:", error);
    }
}

function setFormat(event, format) {
    selectedFormat = format; // Define o formato selecionado

    // Remove a classe 'active' de todos os botões
    document.querySelectorAll('.btn-outline-primary').forEach(button => {
        button.classList.remove('active');
    });

    // Adiciona a classe 'active' ao botão clicado
    event.target.classList.add('active');
}

function convertImage() {
    const fileInput = document.getElementById('upload');
    const progressBar = document.getElementById('progress');
    const canvas = document.getElementById('canvas');
    const downloadLink = document.getElementById('download');

    if (!fileInput.files.length) {
        alert("Por favor, escolha uma imagem!");
        return;
    }

    if (!selectedFormat) {
        alert("Por favor, selecione um formato para conversão!");
        return;
    }

    // Oculta o botão de download
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

            // Simula o progresso da conversão
            let progress = 0;
            progressBar.value = progress;

            const interval = setInterval(() => {
                progress += 10;
                progressBar.value = progress;

                if (progress >= 100) {
                    clearInterval(interval); // Para o progresso ao chegar em 100%

                    let dataUrl = '';

                    // Verifica o formato escolhido
                    switch (selectedFormat) {
                        case 'png':
                            dataUrl = canvas.toDataURL('image/png');
                            break;
                        case 'jpeg':
                            dataUrl = canvas.toDataURL('image/jpeg');
                            break;
                        case 'webp':
                            dataUrl = canvas.toDataURL('image/webp');
                            break;
                        default:
                            alert(`Conversão para ${selectedFormat.toUpperCase()} ainda não está disponível no navegador.`);
                            return;
                    }

                    // Atualiza o botão de download
                    downloadLink.href = dataUrl;
                    downloadLink.download = `imagem-convertida.${selectedFormat}`;
                    downloadLink.classList.remove('d-none'); // Mostra o botão de download
                }
            }, 500); // Intervalo de 500ms
        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
}
