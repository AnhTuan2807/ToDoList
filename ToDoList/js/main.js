var validation = new Validation();
var tasklist = new TaskList();
// var idtask = 1;
// var i = 0;
// getLocalStorage();
getEle("btn_add").addEventListener("click", function() {
    var value = getEle('input_task').value;

    if (validation.CheckValid("input_task", "card__err", "Is not a vaid (*)") == true &&
        validation.CheckDupli("input_task", "card__err", "Is a duplicate (*)", tasklist.arr) == false) {
        // idtask += i;
        var idtask = Math.random();
        var task = new Task(idtask, value, 'progressing');
        tasklist.addTask(task);
        getEle('progressing').innerHTML = addItem(task);
        console.log(tasklist.arr);
        alert('Thêm thành công');
    } else {
        alert('Thêm thất bại');
    }
    // i++;
    rsInput();
    listTask(tasklist.arr);
    SetLocalStorage();
});

function delTask(id) {
    tasklist.deleteTask(id);
    listTask(tasklist.arr);
    console.log(tasklist.arr);
    alert("Xóa Thành Công");
    SetLocalStorage();

}

function changeStt(id) {
    var task = tasklist.getTaskById(id);
    if (task.status === "progressing") {
        task.status = "completed";
        alert('Change stt to completed');
        console.log(tasklist.arr);
    } else if (task.status === "completed") {
        task.status = "progressing"
        alert('Change stt to progresing');
        console.log(tasklist.arr);
    }
    listTask(tasklist.arr);
    SetLocalStorage();
}


function getLocalStorage() {
    // if (localStorage.getItem('ListTask')) {
    tasklist.arr = JSON.parse(localStorage.getItem('ListTask'));
    // }
    listTask(tasklist.arr);
}

function SetLocalStorage() {
    localStorage.setItem('ListTask', JSON.stringify(tasklist.arr));
}

function listTask(arr) {
    var progressing = "";
    var completed = "";

    getEle('progressing').innerHTML = "";

    arr.forEach(function(task) {
        if (task.status === 'progressing') {
            progressing += addItem(task);
        } else if (task.status === 'completed') {
            completed += addItem(task);
        }
    })
    getEle('progressing').innerHTML = progressing;
    getEle('completed').innerHTML = completed;

}

function addItem(task) {
    return `<li id="item${task.id}">
        <span class="name">${task.name}</span>
        <div class="option_btn">
            <button class="remove" onclick="delTask(${task.id})">
                <span class="material-icons-outlined">
                    delete
                </span>
            </button>
            <button class="status" onclick="changeStt(${task.id})">
                <span class="material-icons-outlined">
                    check_circle
                </span>
            </button>
        </div>
    </li>`
}

function rsInput() {
    getEle('input_task').value = "";
}

function getEle(id) {
    return document.getElementById(id);
}

function toString(m) {
    switch (m) {
        case 12:
            return 'January';
        case 1:
            return 'February';
        case 2:
            return 'March';
        case 3:
            return 'April';
        case 4:
            return 'May';
        case 5:
            return 'Jun';
        case 6:
            return 'July';
        case 7:
            return 'August';
        case 8:
            return 'September';
        case 9:
            return 'Octorber';
        case 10:
            return 'November';
        case 11:
            return 'December';
    }
}



var d = new Date();
getEle('date').innerHTML = `${toString(d.getMonth())} ${d.getDate()} ${d.getFullYear()}`;


var currentTheme = localStorage.getItem('theme');


function abc() {
    var check = getEle('theme');
    var el = document.querySelectorAll('.rays');

    if (check.checked === true) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');

        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            for (i = 0; i < el.length; i++) {
                el[i].style.strokeDashoffset = '12';
                el[i].style.strokeDasharray = '12';
            }
            getEle('cloudy_sun').style.animationName = "slideS";
            getEle('cloudy_moon').style.animationName = "";
            getEle('sun_center').style.animationName = "fade";
            getEle('moon').style.opacity = "1";
            bgNight();
            // if (document.documentElement.getAttribute('data-theme') === 'dark') {
            //     console.log(document.documentElement.getAttribute('data-theme'));
        }
        // }
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        if (document.documentElement.getAttribute('data-theme') === 'light') {
            for (i = 0; i < el.length; i++) {
                el[i].style.strokeDashoffset = '0';
                el[i].style.strokeDasharray = '12';
            }
            getEle('cloudy_moon').style.animationName = "slideM";
            getEle('cloudy_sun').style.animationName = "";
            getEle('cloudy_sun').style.opacity = "0";
            getEle('sun_center').style.animationName = "";
            getEle('moon').style.opacity = "0";

        }


        // if (document.documentElement.getAttribute('data-theme') === 'light') {
        //     console.log(document.documentElement.getAttribute('data-theme'));


        // }
    }
}
var canvas = document.getElementById('bg-night');
var ctx = canvas.getContext("2d");

var w = window.innerWidth;
var h = window.innerHeight;

canvas.width = w;
canvas.height = h;
var angle = 0;


var flake = [];

function bgNight() {

    angle += 0.01;
    var mf = 100; // max flake

    //loop
    for (i = 0; i < mf; i++) {
        flake.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.floor(Math.random() * 6), //min 2px max 7 px
            d: Math.random() + 1
        })
    }

    function drawflake() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "white";
        ctx.beginPath();
        for (var i = 0; i < mf; i++) {

            var f = flake[i];
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        }
        ctx.fill();

        moveFlakes();
        ctx.closePath();
    }
    console.log(flake);

    function moveFlakes() {
        for (i = 0; i < mf; i++) {
            var f = flake[i];
            f.y += Math.pow(f.d, 2) + 1;
            f.x += Math.sin(angle) * 2;
            //if snowflake reach to the bottom , send new one to the top
            if (f.y > h) {
                flake[i] = { x: Math.random() * w, y: 0, r: f.r, d: f.d };
            }
        }
    }

    setInterval(drawflake, 25);
}


getEle('theme').addEventListener('change', abc);