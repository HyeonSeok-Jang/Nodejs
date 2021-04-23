const candyMachine = {
  status: {
    name: 'node',
    count: 5,
  },
  getCandy() {
    this.status.count--;
    return this.status.count;
  },
};
const {
  getCandy,
  status: { count },
} = candyMachine;
//내가 선언한 candyMachine에서
//getCandy와 status의 count라는 값을
//getCandy와 status변수에 삽입한다.
