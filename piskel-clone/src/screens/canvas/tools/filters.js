export default class Filters {
  initTools() {
    const filterButton = document.querySelector('.filter');
    filterButton.addEventListener('click', this.filter);
  }

  filter() {
    const canvas = document.querySelector('.paint-field');
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const sepia = () => {
      const pixels = imageData.data;
      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        pixels[i] = (r * 0.393) + (g * 0.769) + (b * 0.189); // red
        pixels[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168); // green
        pixels[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131); // blue
      }
      return imageData;
    };
    const imageDataFiltered = sepia(imageData);
    context.putImageData(imageDataFiltered, 0, 0);
  }

  sepia(imageData) {
    const pixels = imageData.data;
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      pixels[i] = (r * 0.393) + (g * 0.769) + (b * 0.189); // red
      pixels[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168); // green
      pixels[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131); // blue
    }
    return imageData;
  }
}
