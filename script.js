// Script JavaScript untuk watermarking
const imageInput = document.getElementById("imageInput");
const watermarkImageInput = document.getElementById("watermarkImageInput");
const watermarkTextInput = document.getElementById("watermarkTextInput");
const watermarkedCanvas = document.getElementById("watermarkedCanvas");
const addWatermarkButton = document.getElementById("addWatermark");
const downloadButton = document.getElementById("downloadButton");

let watermarkedDataUrl = null;

let watermarkImage = new Image();
let watermarkText;

watermarkImageInput.addEventListener("change", function () {
  const watermarkFile = watermarkImageInput.files[0];
  watermarkImage.src = URL.createObjectURL(watermarkFile);
});

watermarkTextInput.addEventListener("input", function () {
  watermarkText = watermarkTextInput.value;
});

imageInput.addEventListener("change", function () {
  const file = imageInput.files[0];
  const img = new Image();
  const canvas = watermarkedCanvas;
  const ctx = canvas.getContext("2d");

  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    downloadButton.disabled = true;
  };

  img.src = URL.createObjectURL(file);
});

addWatermarkButton.addEventListener("click", function () {
  const canvas = watermarkedCanvas;
  const ctx = canvas.getContext("2d");

  if (watermarkImage.complete) {
    // Menggambar gambar watermark dengan lebar tetap 150px
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.drawImage(
      watermarkImage,
      20,
      40,
      150,
      (150 / watermarkImage.width) * watermarkImage.height
    );
    ctx.globalAlpha = 1;
  }

  if (watermarkText) {
    ctx.font = "48px serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.textAlign = "center";
    ctx.fillText(watermarkText, canvas.width / 2, canvas.height / 2);

    canvas.style.display = "block";
  }

  watermarkedDataUrl = canvas.toDataURL("image/jpeg");
  downloadButton.disabled = false;
});

downloadButton.addEventListener("click", function () {
  if (watermarkedDataUrl) {
    const a = document.createElement("a");
    a.href = watermarkedDataUrl;
    a.download = "watermarked_image.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
});
