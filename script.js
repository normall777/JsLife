var defX = 600; // Начальные размеры поля
var defY = 300;
var numX = document.getElementsByName("numX")[0]; // Элементы input для ввода размеров поля
var numY = document.getElementsByName("numY")[0];
var field_canvas = document.getElementById("field_canvas"); // Получение канваса и его контекста
var field_canvas_context = field_canvas.getContext("2d");
var generation =  document.getElementById("generation") // Счетчик поколения
init();

function init(){
    generation.innerHTML = 0; //Нулевое поколение
    numX.value = defX; //Инициализация размеров поля
    numY.value = defY;
    apply_sizes();

}


function apply_sizes(){ //Меняет размеры поля
    field_canvas.width = numX.value;
    field_canvas.height = numY.value;
}


var btn_apply = document.getElementById("btn_apply"); // Кнопка применить
    btn_apply.addEventListener("click", apply_sizes); // Событие на клик - изменить размеры поля



var btn_start = document.getElementById("btn_start"); // Кнопка старт 
btn_start.addEventListener("click", function() {
    //TODO:
    console.log("Кнопка start нажата.");
});

var btn_stop = document.getElementById("btn_stop"); // Кнопка стоп
btn_stop.addEventListener("click", function() {
    //TODO:
    console.log("Кнопка stop нажата.");
});

var btn_reset = document.getElementById("btn_reset"); // Кнопка сброс
btn_reset.addEventListener("click", function() {
    //TODO:
    console.log("Кнопка reset нажата.");
});


var input_speed = document.getElementById("in_speed"); // Ползунок скорости
input_speed.addEventListener("change", function() { // Событие на продвижение ползунка
    console.log(input_speed.value);
    document.getElementById("out_speed").innerHTML = input_speed.value; // Вывод скорости на экран

})


