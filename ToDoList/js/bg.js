function bgNight() {
    var check = getEle('theme');

    var canvas = document.getElementById('bg-night');
    var ctx = canvas.getContext("2d");

    var w = window.innerWidth;
    var h = window.innerHeight;

    canvas.width = w;
    canvas.height = h;

    var mf = 100; // max flake
    var flake = [];

    //loop
    for (i = 0; i < mf; i++) {
        flake.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 5 + 2, //min 2px max 7 px
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
    }

    var angle = 0;

    function moveFlakes() {
        angle += 0.01;
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