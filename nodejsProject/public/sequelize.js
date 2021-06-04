window.onload = function () {
  const btn = document.querySelectorAll('#nav-asd');
  for (let i = 0; i < btn.length; i++) {
    let item = btn.item(i);
    item.addEventListener('click', (e) => {
      e.preventDefault();
      for (let j = 0; j < btn.length; j++) {
        let classItem = btn.item(j);
        classItem.classList.remove('active');
      }
      item.classList.add('active');
    });
  }
};

const nav = document.querySelector('.nav-links');
const navlinks = document.querySelectorAll('.nav-links li');

const navAnimation = () => {
  navlinks.forEach((link, index) => {
    // 애니메이션이 있을 때
    if (link.style.animation) {
      // 애니메이션 비움
      link.style.animation = '';
    } else {
      // 애니메이션 없을 때 애니메이션을 추가
      // 딜레이 간격을 줘서 li가 하나씩 차례대로 나타나도록 설정
      link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
    }
  });
};
const handleNav = () => {
  nav.classList.toggle('nav-active');

  navAnimation();
};

const setNavTransition = (width) => {
  if (width > 768) {
    nav.style.transition = '';
  } else {
    nav.style.transition = 'transform 0.5s ease-in';
  }
};

const handleResize = () => {
  const width = event.target.innerWidth;
  setNavTransition(width);
};

const init = () => {
  // Toggle Nav
  window.addEventListener('resize', handleResize);
};

init();

// document.getElementById('home').addEventListener('click', async (e) => {
//   e.preventDefault();
//   try {
//     const res = await axios.get('/');
//     document.write(res.data);
//     console.log(res.data);
//   } catch (err) {
//     console.error(err);
//   }
// });
// document.getElementById('selfintro').addEventListener('click', async (e) => {
//   e.preventDefault();
//   try {
//     const res = await axios.get('/selfintro');
//     document.write(res.data);
//     console.log(res.data);
//   } catch (err) {
//     console.error(err);
//   }
// });
// document.getElementById('japanintro').addEventListener('click', async (e) => {
//   e.preventDefault();
//   try {
//     const res = await axios.get('/japanintro');
//     document.write(res.data);
//     console.log(res.data);
//   } catch (err) {
//     console.error(err);
//   }
// });
