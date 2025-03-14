let selectedFormat = ''; // Variável global para armazenar o formato escolhido
let ffmpegInstance = null; // Instância do FFmpeg

// Função para carregar o FFmpeg
async function loadFFmpeg() {
    if (!ffmpegInstance) {
        const { createFFmpeg, fetchFile } = FFmpeg;
        ffmpegInstance = createFFmpeg({ log: true });
        await ffmpegInstance.load();
    }
}

// Conversor de vídeos usando FFmpeg
async function convertVideo(format) {
    const ffmpeg = ffmpegInstance;
    const fileInput = document.getElementById('videoUpload');
    const progressBar = document.getElementById('progressBar');
    const downloadLink = document.getElementById('downloadLink');

    if (!fileInput.files.length) {
        alert("Escolha um vídeo!");
        return;
    }

    await loadFFmpeg(); // Carrega o FFmpeg antes de continuar

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
        downloadLink.classList.remove('d-none'); // Exibe o botão de download

    } catch (error) {
        alert("Erro ao converter o vídeo. Tente novamente.");
        console.error("Erro ao converter:", error);
    }
}

// Seleciona o formato da imagem
function setFormat(event, format) {
    selectedFormat = format;

    document.querySelectorAll('.btn-outline-primary').forEach(button => {
        button.classList.remove('active');
    });

    event.target.classList.add('active');
}

// Conversor de imagens usando Canvas
function convertImage() {
    const fileInput = document.getElementById('upload');
    const progressBar = document.getElementById('progress');
    const canvas = document.createElement('canvas'); // Criar o canvas dinamicamente
    const downloadLink = document.getElementById('download');

    if (!fileInput.files.length) {
        alert("Por favor, escolha uma imagem!");
        return;
    }

    if (!selectedFormat) {
        alert("Por favor, selecione um formato para conversão!");
        return;
    }

    downloadLink.classList.add('d-none'); // Esconde o botão de download

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            let progress = 0;
            progressBar.value = progress;

            const interval = setInterval(() => {
                progress += 10;
                progressBar.value = progress;

                if (progress >= 100) {
                    clearInterval(interval);

                    let dataUrl = '';

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
                            alert(`Conversão para ${selectedFormat.toUpperCase()} não disponível.`);
                            return;
                    }

                    downloadLink.href = dataUrl;
                    downloadLink.download = `imagem-convertida.${selectedFormat}`;
                    downloadLink.classList.remove('d-none'); // Mostra o botão de download
                }
            }, 500);
        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
}

// Alternar entre abas de conversor de imagem e vídeo
function showTab(tab) {
    document.querySelectorAll(".tab-content").forEach(section => {
        section.classList.add("d-none");
    });

    if (tab === "image") {
        document.getElementById("imageConverter").classList.remove("d-none");
        document.querySelector(".btn-tab:nth-child(1)").classList.add("active");
        document.querySelector(".btn-tab:nth-child(2)").classList.remove("active");
    } else {
        document.getElementById("videoConverter").classList.remove("d-none");
        document.querySelector(".btn-tab:nth-child(2)").classList.add("active");
        document.querySelector(".btn-tab:nth-child(1)").classList.remove("active");
    }
}
