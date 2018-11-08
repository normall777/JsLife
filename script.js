var defX = 600; // Начальные размеры поля
var defY = 300;
var numX = document.getElementsByName("numX")[0]; // Элементы input для ввода размеров поля
var numY = document.getElementsByName("numY")[0];
var field_canvas = document.getElementById("field_canvas"); // Получение канваса и его контекста
var field_canvas_context = field_canvas.getContext("2d");
var generation = document.getElementById("generation") // Счетчик поколения
var mas = [];
var _010_defX, _010_defY;
var work = false;

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
    //debugger
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
    y = Math.floor(y / 10);
    (mas[y][x] == 1) ? mas[y][x] = 0 : mas[y][x] = 1;
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

function find_number_neighbors() {
    var mas2 = [];
    for (var i = 0; i < _010_defY; i++) {
        mas2[i] = [];
        for (var j = 0; j < _010_defX; j++) {
            //debugger
            var neighbors = 0;
            // top
            if (mas[(i - 1 >= 0) ? i - 1 : _010_defY - 1][j] == 1) neighbors++;
            // right
            if (mas[i][(j + 1 <= _010_defX - 1 )? j + 1 : 0] == 1) neighbors++;
            // bottom
            if (mas[(i + 1 <= _010_defY - 1 )? i + 1 : 0][j] == 1) neighbors++;
            // left
            if (mas[i][(j - 1 >= 0 )? j - 1 : _010_defX - 1] == 1) neighbors++;
            // up-right
            if (mas[(i - 1 >= 0 )? i - 1 : _010_defY - 1][(j + 1 <= _010_defX - 1 ? j + 1 : 0)] == 1) neighbors++;
            // bottom-right
            if (mas[(i + 1 <= _010_defY - 1) ? i + 1 : 0][(j + 1 <= _010_defX - 1 ? j + 1 : 0)] == 1) neighbors++;
            // bottom-left
            if (mas[(i + 1 <= _010_defY - 1) ? i + 1 : 0][(j - 1 >= 0 ? j - 1 : _010_defX - 1)] == 1) neighbors++;
            // top-left
            if (mas[(i - 1 >= 0 )? i - 1 : _010_defY - 1][(j - 1 >= 0 ? j - 1 : _010_defX - 1)] == 1) neighbors++;


            /// Действия для клеток
            if (mas[i][j] == 1) {
                if (neighbors < 2 || neighbors > 3)
                    mas2[i][j] = 0;
                else if (neighbors == 2 || neighbors == 3)
                    mas2[i][j] = 1;
            }
            else {
                if (neighbors == 3)
                    mas2[i][j] = 1;
            }
        }
    }

    /// Если не изменился
    if (isEqualArray2(mas, mas2))
        work = false;

    else if (mas != mas2) {
        mas = mas2;

        drawField();
        if (work) {
            generation.innerHTML++;
            timer = setTimeout(find_number_neighbors, 1000 / input_speed.value);
        }
    }


}

function isEqualArray1(a1, a2) {
    return a1.every((v, i) => v === a2[i]);
}

function isEqualArray2(a1, a2) {
    return a1.every((v, i) => isEqualArray1(v, a2[i]));
}




function apply_sizes(){ //Меняет размеры поля
    field_canvas.width = numX.value;
    defX = numX.value;
    field_canvas.height = numY.value;
    defY = numY.value;
    work = false;
    goLife();
    drawField();
    generation.innerHTML = 0;
    work = false;

}


var btn_apply = document.getElementById("btn_apply"); // Кнопка применить
    btn_apply.addEventListener("click", apply_sizes); // Событие на клик - изменить размеры поля



var btn_start = document.getElementById("btn_start"); // Кнопка старт 
btn_start.addEventListener("click", function() {
    //TODO:

    work = true;

    find_number_neighbors();
    console.log("Кнопка start нажата.");
});

var btn_stop = document.getElementById("btn_stop"); // Кнопка стоп
btn_stop.addEventListener("click", function() {
    //TODO:

    work = false;
    console.log("Кнопка stop нажата.");
});

var btn_reset = document.getElementById("btn_reset"); // Кнопка сброс
btn_reset.addEventListener("click", function() {
    //TODO:
    work = false;
    goLife();
    drawField();
    generation.innerHTML = 0;
    work = false;
    console.log("Кнопка reset нажата.");
});

var btn_random = document.getElementById("btn_random"); // Кнопка случайно
btn_random.addEventListener("click", function () {
    //TODO:

    for (var i = 0; i < _010_defY; i++) {
        for (var j = 0; j < _010_defX; j++) {
            mas[i][j] = (Math.random() > 0.5) ? 1 : 0;
        }
    }
    drawField();
    
    console.log("Кнопка random нажата.");
});


var input_speed = document.getElementById("in_speed"); // Ползунок скорости
input_speed.addEventListener("change", function() { // Событие на продвижение ползунка
    console.log(input_speed.value);
    document.getElementById("out_speed").innerHTML = input_speed.value; // Вывод скорости на экран

})


