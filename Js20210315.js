/*

var sayNode = function(){
    console.log('node');
};// sayNode라는 함수를 선언
var es = 'ES';// es라는 변수를 선언
var oldObj = {
    sayJs: function(){//oldObj이라는 객체를 만들어 sayJs라는 컴포넌트에
        console.log('Js');//function을 담았음
    },
    sayN:sayNode,//sayN이라는 컴포넌트에 sayNodes라는 함수를 담았음
}
oldObj[es + 6]='Fantastic';// oldObj라는 객체에 es변수에 포함된 ES에 6을 붙여
// ES6이라는 컴포넌트에 Fantastic이라는 값으로 초기화하고 추가함
oldObj.sayN();
oldObj.sayJs();
console.log(oldObj.ES6);

*/
/*
const sayNode = function(){
    console.log('노드');
};
const es = '이에스';
const newObj = {
    sayJS(){//컴포넌트에 메서드를 추가할 때 :function이 들어가지 않아도 됨
        console.log('JS');
    },
    sayNode,//컴포넌트와 밖 함수를 가져올 때 이름이 같으면 하나 생략 할 수 있다
    [es+6]:'판타스틱',//[변수+값]의 동적인 속성명을 사용 할 수 있음
};
newObj.sayJS();
newObj.sayNode();
console.log((newObj.이에스6));

*/

const candyMachine = {//선언
    status:{//컴포넌트 생성
        name: 'node',
        count: 5,
    },
    getCandy(){//내부 함수
        this.status.count--;//구식에선 자기자신을 받아 올 수 없기 때문에
        //변수에다 자기자신을 받아야 하지만 현재는 this로 이용하여 사용 가능
        return this.status.count;
    },
};
const {getCandy, status: {count}} = candyMachine;
//구조를 분해해 어디에 뭐가 있는지 알고있기 때문에
//candyMachine의 status: count값에다가 getCandy를 실행시키고 값을 수정