export default function downloadQr() {
  const svg = document.getElementById("qrcode");
  if (!svg) {
    alert("다운받을 QR이 없습니다.");
    return;
  }
  const svgData = new XMLSerializer().serializeToString(svg);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    alert("다운로드 중 에러가 발생했습니다.");
    return;
  }
  const img = new Image();
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const pngFile = canvas.toDataURL("image/png");

    const downloadLink = document.createElement("a");
    downloadLink.download = "qrcode";
    downloadLink.href = `${pngFile}`;
    downloadLink.click();
  };

  img.src = "data:image/svg+xml;base64," + btoa(svgData);
}
