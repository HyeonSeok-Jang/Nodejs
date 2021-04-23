let cnt = {
  pass: true,
  count: 0,
};

const promise = async (cnt) => {
  try {
    cnt.count = await (Math.random() * 10 > 5 && cnt.pass ? cnt.count + 1 : (cnt.pass = false));
    cnt.count = await (Math.random() * 10 > 5 && cnt.pass ? cnt.count + 1 : (cnt.pass = false));
    cnt.count = await (Math.random() * 10 > 5 && cnt.pass ? cnt.count + 1 : (cnt.pass = false));
    cnt.count = await (Math.random() * 10 > 5 && cnt.pass ? cnt.count + 1 : (cnt.pass = false));
    cnt.count = await (Math.random() * 10 > 5 && cnt.pass ? cnt.count + 1 : (cnt.pass = false));
    console.log(cnt.count + '만큼 성공했습니다.');
  } catch (err) {
    console.error(err);
  }
}; // 단순하게 값 받는게 아니면 하기 힘들듯...
// let cnt = 0;

// const promise = async (cnt) => {
//   try {
//     cnt = await (Math.random() * 10 > 5 ? cnt + 1 : cnt);
//     cnt = await (Math.random() * 10 > 5 ? cnt + 1 : cnt);
//     cnt = await (Math.random() * 10 > 5 ? cnt + 1 : cnt);
//     cnt = await (Math.random() * 10 > 5 ? cnt + 1 : cnt);
//     cnt = await (Math.random() * 10 > 5 ? cnt + 1 : cnt);
//     console.log(cnt + '만큼 성공했습니다.');
//   } catch (err) {
//     console.error(err);
//   }
// };
promise(cnt);
