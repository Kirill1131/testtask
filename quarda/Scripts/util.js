
//$(function () {

    $('#chatBody').hide();
    $('#loginBlock').show();
    // Ссылка на автоматически-сгенерированный прокси хаба
    var chat = $.connection.chatHub;
    // Объявление функции, которая хаб вызывает при получении сообщений
    chat.client.addMessage = function (name, message) {
        // Добавление сообщений на веб-страницу 
        $('#chatroom').append('<p><b>' + htmlEncode(name)
            + '</b>: ' + htmlEncode(message) + '</p>');
    };

    // Функция, вызываемая при подключении нового пользователя
    chat.client.onConnected = function (id, userName, allUsers) {

        $('#loginBlock').hide();
        $('#chatBody').show();
        // установка в скрытых полях имени и id текущего пользователя
        $('#hdId').val(id);
        $('#username').val(userName);
        $('#header').html('<h3>Добро пожаловать, ' + userName + '</h3>');

        // Добавление всех пользователей
        for (i = 0; i < allUsers.length; i++) {

            AddUser(allUsers[i].ConnectionId, allUsers[i].Name);
        }
    }

    // Добавляем нового пользователя
    chat.client.onNewUserConnected = function (id, name) {

        AddUser(id, name);
    }

    // Удаляем пользователя
    chat.client.onUserDisconnected = function (id, userName) {

        $('#' + id).remove();
    }

    // Открываем соединение
    $.connection.hub.start().done(function () {

        canvas.addEventListener("mousedown", mousedown, false);
        canvas.addEventListener("mousemove", mousemove, false);
        canvas.addEventListener("mouseup", mouseup, false);

        $('#sendmessage').click(function () {
            // Вызываем у хаба метод Send
            chat.server.send($('#username').val(), $('#message').val());
            $('#message').val('');
        });

        // обработка логина
        $("#btnLogin").click(function () {

            var name = $("#txtUserName").val();
            if (name.length > 0) {
                chat.server.connect(name);
            }
            else {
                alert("Введите имя");
            }
        });
    });
//});
// Кодирование тегов
function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}
//Добавление нового пользователя
function AddUser(id, name) {

    var userId = $('#hdId').val();

    if (userId != id) {

        $("#chatusers").append('<p id="' + id + '"><b>' + name + '</b></p>');
    }
}




var drawGame = {
    // указывает, происходит ли отрисовка
    isDrawing: false,
    // начальная точка следующей линии
    startX: 0,
    startY: 0,
};
// модель линий
var data = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0
};
// контекст элемента canvas
var canvas = document.getElementById('drawingpad');
var ctx = canvas.getContext('2d');

// Ссылка на автоматически-сгенерированный прокси хаба
//var chat = $.connection.chathub;
// Объявление функции, которая хаб вызывает при получении сообщений
chat.client.addLine = function (data) {

    // Добавление линий
    drawLine(ctx, data.startX, data.startY, data.endX, data.endY, 1);
};

// Открываем соединение
$.connection.hub.start().done(function () {
    // после открытия соединения устанавливаем обработчики мыши

    //canvas.addEventListener("mousemove", mousemove, false);
    //canvas.addEventListener("mouseup", mouseup, false);
    //canvas.addEventListener("mousedown", mousedown, false);
});
// просто рисуем линию
function drawLine(ctx, x1, y1, x2, y2, thickness) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = thickness;
    ctx.strokeStyle = "#444";
    ctx.stroke();
}
// нажите мыши
function mousedown(e) {

    // получаем позиции x и y относительно верхнего левого угла элемента canvas
    var mouseX = e.layerX || 0;
    var mouseY = e.layerY || 0;
    drawGame.startX = mouseX;
    drawGame.startY = mouseY;
    drawGame.isDrawing = true;
};

// перемещение мыши
function mousemove(e) {

    // рисуем линию, если isdrawing==true
    if (drawGame.isDrawing) {

        // получаем позиции x и y относительно верхнего левого угла элемента canvas
        var mouseX = e.layerX || 0;
        var mouseY = e.layerY || 0;
        if (!(mouseX == drawGame.startX &&
            mouseY == drawGame.startY)) {
            drawLine(ctx, drawGame.startX,
                drawGame.startY, mouseX, mouseY, 1);

            data.startX = drawGame.startX;
            data.startY = drawGame.startY;
            data.endX = mouseX;
            data.endY = mouseY;
            chat.server.send(data);

            drawGame.startX = mouseX;
            drawGame.startY = mouseY;
        }
    }
};

function mouseup(e) {
    drawGame.isDrawing = false;
}