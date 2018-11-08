var defX = 600; // Начальные размеры поля
var defY = 300;
var numX = document.getElementsByName("numX")[0]; // Элементы input для ввода размеров поля
var numY = document.getElementsByName("numY")[0];
var field_canvas = document.getElementById("field_canvas"); // Получение канваса и его контекста
var field_canvas_context = field_canvas.getContext("2d");
var generation = document.getElementById("generation") // Счетчик поколения
var mas = [];
var _010_defX, _010_defY;

init();


function init() {
    
    generation.innerHTML = 0; //Нулевое поколение
    numX.value = defX; //Инициализация размеров поля
    numY.value = defY;
    apply_sizes();

  
    goLife();

}
/////
// Создание массива (для работы с массивом отдельно от картинки)
// Массив размеров в 10 раз меньше (для размерности ячеек)
function goLife() {
    //////////////////
    // Для создания больших точек (10х10)
    _010_defX = defX / 10;
    _010_defY = defY / 10;
    debugger
    mas = [];
    var n = _010_defX, m = _010_defY;
    for (var i = 0; i < m; i++) {
        mas[i] = [];
        for (var j = 0; j < n; j++) {
            mas[i][j] = 0;
        }
    }
}




/////
// Событие на шелчок по полю
// Для создания ячейки
// При нажатии на любую из 100 составляющих пикселей
field_canvas.onclick = function (event) {
    var x = event.offsetX;
    var y = event.offsetY;
    console.log(x);
    console.log(y);
    x = Math.floor(x/10 ); 
    y = Math.floor(y/10 ); 
    mas[y][x] = 1;
    console.log(mas);
    drawField();
}

/////
// Отображение ячейки на поле

function drawField() {
    field_canvas_context.clearRect(0, 0, defX, defY);
    for (var i = 0; i < _010_defY; i++) {
        for (var j = 0; j < _010_defX; j++) {
            if (mas[i][j] == 1) {
                field_canvas_context.fillRect(j*10 , i*10 , 10, 10);
            }
        }
    }
}


/////
// Проверка



function apply_sizes(){ //Меняет размеры поля
    field_canvas.width = numX.value;
    defX = numX.value;
    field_canvas.height = numY.value;
    defY = numY.value;
    goLife();
    drawField();

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
    goLife();
    drawField();

    console.log("Кнопка reset нажата.");
});


var input_speed = document.getElementById("in_speed"); // Ползунок скорости
input_speed.addEventListener("change", function() { // Событие на продвижение ползунка
    console.log(input_speed.value);
    document.getElementById("out_speed").innerHTML = input_speed.value; // Вывод скорости на экран

})


