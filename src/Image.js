// function importAll(r) {
//   return r.keys().map(r);
// }
// const images = importAll(require.context("./img", false, /\.(png|jpe?g|svg)$/));
// export const ImageData = images.map((el) => {
//   let str = el.default.replace(/[static/media]/g, "");
//   return "./img/" + str.split(".")[0] + "." + str.split(".")[2];
// });

const ImageData = [
  "./img/6.jpg",
  "./img/2.jpg",
  "./img/3.jpg",
  "./img/4.jpg",
  "./img/5.jpg",
  "./img/1.jpg",
];
export default ImageData;
