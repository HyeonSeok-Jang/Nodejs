// function test() {
//   alert('성공!');
// }
window.onload = function () {
  document.getElementById('nav-asd').addEventListener('click', (e) => {
    e.preventDefault();
    console.log('asdf');
    alert('성공!');
  });
};
