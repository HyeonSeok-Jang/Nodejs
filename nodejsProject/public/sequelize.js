// document.querySelectorAll('#qna-list').forEach((el) => {
//   el.addEventListener('click', async (e) => {
//     e.preventDefault();
//     try {
//       const qna = await axios.get('/qna');
//       const qnas = qna.data;
//       console.log('~1~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
//       console.log(qnas);
//       qnas.map
//     } catch (err) {
//       console.error(err);
//     }
//   });
// });

// // async function getQnA() {
// //   try {
// //     const res = await axios.get('/qna');
// //     console.log(res);
// //   } catch (error) {
// //     console.error(error);
// //   }
// // }

document.getElementById('qna-form').addEventListener('click', async (e) => {
  e.preventDefault();
  alert('test');
});
