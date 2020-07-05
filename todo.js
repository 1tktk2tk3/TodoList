// querySelectorを使い、HTML内のクラス要素の取得

const container2 = document.querySelector('.container');
var inputValue = document.querySelector('.input');
const add = document.querySelector('.add');

// localStorageを使い、データの取得と保存を実施
// JSON.stringify(todos)を使用し、todosにデータを格納する
if(window.localStorage.getItem("todos") == undefined){
     var todos = [];
     window.localStorage.setItem("todos", JSON.stringify(todos));
}

// データの保存がJSON形式になるため、JSON.parseを使い、JavaScriptのオブジェクトへ変換
var todosEX = window.localStorage.getItem("todos");
var todos = JSON.parse(todosEX);


class item{
	constructor(name){
		this.createItem(name);
  }
  // document.createElement('div')を使い、要素を作成
  // classList.addを使い、クラスの追加を行う
    createItem(name){
    	var itemBox = document.createElement('div');
        itemBox.classList.add('item');

  // disabledを使い、入力を禁止にする
    	var input = document.createElement('input');
    	input.type = "text";
    	input.disabled = true;
    	input.value = name;
    	input.classList.add('item_input');

  // innerHTMLを使い、"編集"ボタンを作成
  // addEventListenerでクリックの際、内容の追加
    	var edit = document.createElement('button');
    	edit.classList.add('edit');
    	edit.innerHTML = "編集";
    	edit.addEventListener('click', () => this.edit(input, name));
  
  // addEventListenerでクリックした際、削除を行う
    	var remove = document.createElement('button');
    	remove.classList.add('remove');
    	remove.innerHTML = "削除";
    	remove.addEventListener('click', () => this.remove(itemBox, name));
  
  // appendChildを使い、各要素を下に追加していく 
    	container2.appendChild(itemBox);
  // input、edit、removeのそれぞれの要素を追加
        itemBox.appendChild(input);
        itemBox.appendChild(edit);
        itemBox.appendChild(remove);

    }

  // disabledを使い、編集ボタンを押したときに、入力できるできないを切り替える
  // indexOfを使い、todosの中にnameが含まれているかを確認
  // indexOfで取得した、要素数をtodosの配列に使用し、リストを管理
    edit(input, name){
        if(input.disabled == true){
           input.disabled = !input.disabled;
        }
    	else{
            input.disabled = !input.disabled;
            let indexof = todos.indexOf(name);
            todos[indexof] = input.value;
            window.localStorage.setItem("todos", JSON.stringify(todos));
        }
    }
   // spliceを使い、該当する要素を削除
    remove(itemBox, name){
        itemBox.parentNode.removeChild(itemBox);
        let index = todos.indexOf(name);
        todos.splice(index, 1);
        window.localStorage.setItem("todos", JSON.stringify(todos));
    }
}
  // Keycodeを使用し、13(enter)の際にcheckを起動
add.addEventListener('click', check);
window.addEventListener('keydown', (e) => {
	if(e.which == 13){
		check();
	}
})

// pushを使い、配列に要素を追加
function check(){
	if(inputValue.value != ""){
		new item(inputValue.value);
        todos.push(inputValue.value);
        window.localStorage.setItem("todos", JSON.stringify(todos));
		inputValue.value = "";
	}
}


for (var v = 0 ; v < todos.length ; v++){
    new item(todos[v]);
}


