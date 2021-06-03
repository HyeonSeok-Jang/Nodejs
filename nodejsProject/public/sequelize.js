// window.onload = function () {
//   alert('테스트중');
// };

async function first() {
  try {
    const res = await axios.get(`/axios/qna`);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
}

window.onload = function () {
  alert('asdf');
  first();
  alert('fdas');
  console.log(res);
};
