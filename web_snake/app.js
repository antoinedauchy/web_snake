var canvas;
var ctx;
var TOP = 1;
var BOT = 2;
var LEFT = 3;
var RIGHT = 4;
var nb_blocks_x;
var nb_blocks_y;
var height_snake;
var lenght_snake;
var direction;
var stack_dir;
var size_stack;
var block = {
    pos_x: 0,
    pos_y: 0
};
var new_color;
var snake;
var apple;
var snake_ate;
var d;
var speed;
var speed_game;
var last_move_time;
var colors_lvl;
var score;
var skill;
var time_start;
var best_way;
var way;
var img;
var size_skill;
var size_collision;
var expl;
var nb_expl;
var last_move_time;
var last_print_time;
var fps;
var game_over;
var size_combo;
var combo;
var total_combo;
var tail;
var canvas2;
var ctx2;
var pause;
var blue;
var fant;
var purple;
var scint;
var sparkle;
var sparkle_x;
var sparkle_y;
var sparkle_s;
var size_hearts;
var tab_hearts;
var heart_count;
var map;
var size_combo_img;
var stat_print_combo;

function print_line(ax, ay, bx, by, color, width) {
    var line;
    line = new Path2D();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    line.moveTo(ax, ay);
    line.lineTo(bx, by);
    ctx.stroke(line);
    ctx.lineWidth = 1;
}

function print_circle_body(pos_x, pos_y, color, size)
{

    circle = new Path2D();
    circle2 = new Path2D();
    circle3 = new Path2D();
    ctx.fillStyle = color;
    circle.arc(pos_x + height_snake / 2,
        pos_y + height_snake / 2,
        size, 0, 2 * Math.PI);
    ctx.fill(circle);
    ctx.strokeStyle = "black";
    circle2.arc(pos_x + height_snake / 2,
        pos_y + height_snake / 2,
        size * 3 / 4, 0, 2 * Math.PI);
    circle3.arc(pos_x + height_snake / 2,
        pos_y + height_snake / 2,
        size / 3, 0, 2 * Math.PI);
    ctx.stroke(circle2);
    ctx.stroke(circle3);
}

function print_line_body(pos, count, x)
{
    pos.pos_x1 = snake[count].pos_x;
    pos.pos_y1 = snake[count].pos_y;
    pos.pos_x2 = snake[count + 1].pos_x;
    pos.pos_y2 = snake[count + 1].pos_y;
    if (snake[count + 1].pos_x < snake[count].pos_x)
    {
        if (snake[count].pos_x - snake[count + 1].pos_x > 36)
        {
            if (x < 18)
                pos.pos_x1 = snake[count + 1].pos_x - x;
            else
                pos.pos_x1 = canvas.width + 12 - x;
        }
        else
            pos.pos_x1 = snake[count + 1].pos_x + x;
    }
    else if (snake[count + 1].pos_x > snake[count].pos_x)
    {

        if (snake[count + 1].pos_x - snake[count].pos_x > 36)
        {
            if (x < 18)
                pos.pos_x1 = snake[count + 1].pos_x + x;
            else
                pos.pos_x1 = -36 + x;
        }
        else
            pos.pos_x1 = snake[count + 1].pos_x - x;
    }
    else if (snake[count + 1].pos_y > snake[count].pos_y)
    {
        if (snake[count + 1].pos_y - snake[count].pos_y > 36)
        {
            if (x < 18)
                pos.pos_y1 = snake[count + 1].pos_y + x;
            else
                pos.pos_y1 = -36 + x;
        }
        else
            pos.pos_y1 = snake[count + 1].pos_y - x;
    }
    else if (snake[count + 1].pos_y < snake[count].pos_y)
    {
        if (snake[count].pos_y - snake[count + 1].pos_y > 36)
        {
            if (x < 18)
                pos.pos_y1 = snake[count + 1].pos_y - x;
            else
                pos.pos_y1 = canvas.height + 12 - x;
        }
        else
            pos.pos_y1 = snake[count + 1].pos_y + x;
    }

    if (count != lenght_snake - 2)
    {
        if (snake[count + 2].pos_x < snake[count + 1].pos_x)
        {
            if (snake[count + 1].pos_x - snake[count + 2].pos_x > 36)
            {
                if (x < 18)
                    pos.pos_x2 = snake[count + 2].pos_x - x;
                else
                    pos.pos_x2 = canvas.width + 12 - x;
            }
            else
                pos.pos_x2 = snake[count + 2].pos_x + x;
        }
        else if (snake[count + 2].pos_x > snake[count + 1].pos_x)
        {
            if (snake[count + 2].pos_x - snake[count + 1].pos_x > 36)
            {
                if (x < 18)
                    pos.pos_x2 = snake[count + 2].pos_x + x;
                else
                    pos.pos_x2 = -36 + x;
            }
            else
                pos.pos_x2 = snake[count + 2].pos_x - x;
        }
        else if (snake[count + 2].pos_y > snake[count + 1].pos_y)
        {
            if (snake[count + 2].pos_y - snake[count + 1].pos_y > 36)
            {
                if (x < 18)
                    pos.pos_y2 = snake[count + 2].pos_y + x;
                else
                    pos.pos_y2 = -36 + x;
            }
            else
                pos.pos_y2 = snake[count + 2].pos_y - x;
        }
        else if (snake[count + 2].pos_y < snake[count + 1].pos_y)
        {
            if (snake[count + 1].pos_y - snake[count + 2].pos_y > 36)
            {
                if (x < 18)
                    pos.pos_y2 = snake[count + 2].pos_y - x;
                else
                    pos.pos_y2 = canvas.height + 12 - x;
            }
            else
                pos.pos_y2 = snake[count + 2].pos_y + x;
        }
    }

    else
    {
        if (tail.pos_x < snake[count + 1].pos_x)
        {
            if (snake[count + 1].pos_x - tail.pos_x > 36)
            {
                if (x < 18)
                    pos.pos_x2 = tail.pos_x - x;
                else
                    pos.pos_x2 = canvas.width + 12 - x;
            }
            else
                pos.pos_x2 = tail.pos_x + x;
        }
        else if (tail.pos_x > snake[count + 1].pos_x)
        {
            if (tail.pos_x - snake[count + 1].pos_x > 36)
            {
                if (x < 18)
                    pos.pos_x2 = tail.pos_x + x;
                else
                    pos.pos_x2 = -36 + x;
            }
            else
                pos.pos_x2 = tail.pos_x - x;
        }
        else if (tail.pos_y > snake[count + 1].pos_y)
        {
            if (tail.pos_y - snake[count + 1].pos_y > 36)
            {
                if (x < 18)
                    pos.pos_y2 = tail.pos_y + x;
                else
                    pos.pos_y2 = -36 + x;
            }
            else
                pos.pos_y2 = tail.pos_y - x;
        }
        else if (tail.pos_y < snake[count + 1].pos_y)
        {
            if (snake[count + 1].pos_y - tail.pos_y > 36)
            {
                if (x < 18)
                    pos.pos_y2 = tail.pos_y - x;
                else
                    pos.pos_y2 = canvas.height + 12 - x;
            }
            else
                pos.pos_y2 = tail.pos_y + x;
        }
    }

    if (Math.abs(pos.pos_x1 - pos.pos_x2) <= 36 &&
        Math.abs(pos.pos_y1 - pos.pos_y2) <= 36)
        {
            print_line(pos.pos_x1 + height_snake / 2,
                pos.pos_y1 + height_snake / 2,
                pos.pos_x2 + height_snake / 2,
                pos.pos_y2 + height_snake / 2,
                snake[count].color, 14);
            print_line(pos.pos_x1 + height_snake / 2,
                pos.pos_y1 + height_snake / 2,
                pos.pos_x2 + height_snake / 2,
                pos.pos_y2 + height_snake / 2,
                "black", 2);
        }
}

function print_snake(position)
{
    var count;
    var pos;
    var x;

    count = 0;
    pos =
    {
        pos_x1: 0,
        pos_y1: 0,
        pos_x2: 0,
        pos_y2: 0
    }
    if (position > 1000 / speed)
        position = 1000 / speed;
    x = Math.floor(position * (height_snake + height_snake / 2) / (1000 / speed));
   while (count < lenght_snake - 2)
    {
        print_line_body(pos, count, x);
        if (count == 0)
            print_circle_body(pos.pos_x1, pos.pos_y1, snake[count].color, height_snake / 2);
        else
            print_circle_body(pos.pos_x1, pos.pos_y1, snake[count].color, height_snake / 2);
        count += 1;
    }
        if (lenght_snake > 2)
        {
            print_line_body(pos, count, x);
            print_circle_body(pos.pos_x2, pos.pos_y2, snake[count + 1].color, height_snake / 2);  
            print_circle_body(pos.pos_x1, pos.pos_y1, snake[count].color, height_snake / 2);
        }
    
    ctx.fillStyle = apple.color;
    ctx.fillRect(apple.pos_x, apple.pos_y, height_snake, height_snake);
}

function extend_snake() {
    snake[lenght_snake] =
        {
            pos_x: snake[lenght_snake - 1].pos_x,
            pos_y: snake[lenght_snake - 1].pos_y,
            color: new_color
        };
    lenght_snake += 1;
}

function move_snake() {
    var count;
    var tmp;
    count = lenght_snake - 1;
   
    map[snake[0].pos_y * 2 / (3 * height_snake)]
       [snake[0].pos_x * 2 / (3 * height_snake )] = "black";
    tail.pos_x = snake[lenght_snake - 1].pos_x;
    tail.pos_y = snake[lenght_snake - 1].pos_y;
    tail.color = snake[lenght_snake - 1].color;
    while (count >= 0) {
        if (count == 0) {
            if (direction == RIGHT)
                snake[count].pos_x += height_snake + height_snake / 2;
            else if (direction == LEFT)
                snake[count].pos_x -= height_snake + height_snake / 2;
            else if (direction == TOP)
                snake[count].pos_y -= height_snake + height_snake / 2;
            else if (direction == BOT)
                snake[count].pos_y += height_snake + height_snake / 2;
            if (snake[count].pos_x < 0)
                snake[count].pos_x = canvas.width - height_snake;
            else if (snake[count].pos_x > canvas.width - height_snake)
                snake[count].pos_x = 0;
            else if (snake[count].pos_y < 0)
                snake[count].pos_y = canvas.height - height_snake;
            else if (snake[count].pos_y > canvas.height - height_snake)
                snake[count].pos_y = 0;
        }
        else {
            snake[count].pos_x = snake[count - 1].pos_x;
            snake[count].pos_y = snake[count - 1].pos_y;
        }
        count -= 1;
    }
}

function add_heart(nb_hearts, pos_x, pos_y)
{
    var count;

    count = 0;
    while (count < nb_hearts)
    {
        tab_hearts[count + size_hearts] =
        {
            id: (count == 0 ? "start" : (count == nb_hearts - 1 ? "end" : "null")),
            img: "heart" + (heart_count % 100 + 1),
            pos_x: pos_x,
            pos_y: pos_y,
            x: 1.2,
            y: 1.2 * (pos_y - 9.1) / (pos_x - 54.16),
            stat: 1
        }
        document.getElementById(tab_hearts[count + size_hearts].img).style.width = "2vw";
        count += 1;
        heart_count += 1;
    }
    size_hearts += nb_hearts;
}

function get_skill(way, best_way) {
    if (way < best_way && (size_skill = 7)) {
        combo += 1;
        add_heart(10 + best_way - way, 77.16, 20.8);
    }
    else if (way == best_way && (size_skill = 7)) {
        combo += 1;
        add_heart(10, 77.16, 29.8);
    }
    else if (way == best_way + 2 && (size_skill = 7)) {
        combo += 1;
        add_heart(8, 77.16, 33.2);
    }
    else if (way < best_way + 10 && (size_skill = 7)) {
            if (10 - (way - best_way) == 6)
                add_heart(6, 77.16, 36.5);
            else if (10 - (way - best_way) == 4)
                add_heart(4, 77.16, 39.7);
            else if (10 - (way - best_way) == 2)
                add_heart(2, 77.16, 43.3);
        combo += 1;
    }
    else
    {
        size_skill = 7.0;
        combo = 0;
    }
}

function print_score()
{
    var str;

    str = "";
    str += Math.floor((score + total_combo) / 1000);
    str += Math.floor((score + total_combo) / 100) % 10;
    str += Math.floor((score + total_combo) / 10) % 10;
    str += (score + total_combo) % 10;
    document.getElementById("score_value").innerHTML = str;
}

function print_life()
{
    var str;
    str = "";
    str += Math.floor(skill / 1000);
    str += Math.floor(skill / 100) % 10;
    str += Math.floor(skill / 10) % 10;
    str += skill % 10;
    document.getElementById("life_value").innerHTML = str;
}

function apple_is_on_snake()
{
    var count;
    var x;
    var y;

    count = 0;
    x = apple.pos_x * height_snake + apple.pos_x * height_snake / 2;
    y = apple.pos_y * height_snake + apple.pos_y * height_snake / 2;
    while (count < lenght_snake)
    {
        if (x == snake[count].pos_x && y == snake[count].pos_y)
            return (1);
        count += 1;
    }
    return (0);
}

function place_apple()
{
    apple.pos_x = random_between(0, nb_blocks_x - 1);
    apple.pos_y = random_between(0, nb_blocks_y - 1);
    apple.color = colors_lvl[Math.floor(score / 10) % 10];
    while (apple_is_on_snake())
    {
        if (apple.pos_x < nb_blocks_x - 1)
            apple.pos_x += 1;
        else if (apple.pos_y < nb_blocks_y - 1)
        {
            apple.pos_y += 1;
            apple.pos_x = 0;
        }
        else
        {
            apple.pos_x = 0;
            apple.pos_y = 0;
        }
    }
    apple.pos_x = apple.pos_x * height_snake + apple.pos_x * height_snake / 2;
    apple.pos_y = apple.pos_y * height_snake + apple.pos_y * height_snake / 2;
}

function snake_eating() {
    if (!(snake[0].pos_x == apple.pos_x &&
        snake[0].pos_y == apple.pos_y))
        return ;
    new_color = apple.color;
    get_skill(way, best_way);
    if (combo >= 2)
    {
        stat_print_combo = 1;
        size_combo = 7;
        size_combo_img = 10;
        document.getElementById("combo").innerHTML = "+" + combo;
    }
    score += 1;
    if (combo >= 2)
        total_combo += combo - 1;
    print_score();
    way = 0;
    place_apple();
    sparkle_s = 1;
    sparkle_x = apple.pos_x + height_snake / 2;
    sparkle_y = apple.pos_y + height_snake / 2;
    best_way = Math.abs(snake[0].pos_x - apple.pos_x) / (height_snake + height_snake / 2) +
            Math.abs(snake[0].pos_y - apple.pos_y) / (height_snake + height_snake / 2);
    extend_snake();
}

function get_collision() {
    var m;
    var n;
    var nb_collisions;

    m = 0;
    nb_collisions = 0;
    while (m < lenght_snake - 1)
    {
        n = m + 1;
        while (n < lenght_snake)
        {
            if (snake[m].pos_x == snake[n].pos_x &&
            snake[m].pos_y == snake[n].pos_y)
            {
                expl[nb_expl] =
                {
                    pos_x: snake[m].pos_x + height_snake / 2,
                    pos_y: snake[m].pos_y + height_snake / 2,
                    n: 0
                }
                nb_collisions += 1;
                nb_expl += 1;
            }
            n += 1;
        }
        m += 1;
    }
    if (nb_collisions)
    {
        size_collision = 7.0;
        document.getElementById("collision").innerHTML = "-" + nb_collisions;
        skill -= nb_collisions;
        if (skill <= 0)
            {
                skill = 0;
                game_over = 1;
            }
        print_life();
    }
}
function print_time(current_time) {
    var res;
    var since_start;
    var minutes;
    var seconds;
    since_start = current_time - time_start;
    res = "";
    minutes = since_start / 60000 % 60;
    seconds = since_start / 1000 % 60;
    res += (Math.floor(minutes / 10)).toString();
    res += (Math.floor(minutes % 10)).toString();
    res += ":";
    res += (Math.floor(seconds / 10)).toString();
    res += (Math.floor(seconds % 10)).toString();
    document.getElementById("time_value").innerHTML = res;
}

function manage_stack_dir() {
    var count;
    var d;
    if (stack_dir[0] == 0)
        return;
    d = stack_dir[0];
    if (!(d == RIGHT && direction == LEFT) &&
        !(d == LEFT && direction == RIGHT) &&
        !(d == TOP && direction == BOT) &&
        !(d == BOT && direction == TOP))
        direction = d;
    count = 0;
    while (count < size_stack - 1) {
        stack_dir[count] = stack_dir[count + 1];
        count += 1;
    }
    stack_dir[count] = 0;
}

function print_combo()
{
    if (!stat_print_combo)
        return ;
    if (size_combo_img > 15)
    {
        size_combo_img = 0;
        size_combo = 0;
        stat_print_combo = 0;
    }
    document.getElementById("combo").style.fontSize = size_combo + "vw";
    document.getElementById("combo_img").style.width = size_combo_img + "vw";
    size_combo_img += 0.2;
    size_combo -= 0.1;
}

function print_collision()
{
    if (size_collision == 0)
        return ;
    if (size_collision < 0)
        size_collision = 0;
    document.getElementById("collision").style.fontSize = size_collision + "vw";
    size_collision -= 0.2;
}

function print_explosion() {

    var count;
    var ret;

    ret = 0;
    count = 0;
    while (count < nb_expl)
    {
        if (expl[count].n < 81)
        {
            ret = 1;
           ctx.drawImage(img, Math.floor(expl[count].n % 9) * 100,
                            Math.floor(expl[count].n / 9) * 100,
                            100, 100, expl[count].pos_x - 30, expl[count].pos_y - 30,
                            60, 60);
            expl[count].n += 1;
        }
        count += 1;
    }
    return (ret);
}

function this_is_the_end()
{
    if (!game_over || !lenght_snake)
        return ;
    expl[nb_expl] =
    {
        pos_x: snake[lenght_snake - 1].pos_x + height_snake / 2,
        pos_y: snake[lenght_snake - 1].pos_y + height_snake / 2,
        n: 0
    }
    nb_expl += 1;
    lenght_snake -= 1;
    if (lenght_snake)
    {
        tail.pos_x = snake[lenght_snake - 1].pos_x;
        tail.pos_y = snake[lenght_snake - 1].pos_y;
    }
}

function print_evolution(position)
{
    var h;
    var b;
    var m;
    var b2;

    b = canvas2.height / 10;
    b2 = canvas2.height / 20;
    m = canvas2.height / 2;
    ctx2.fillStyle = "#FE7F00";
    ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
    ctx2.fillStyle = "#FEB200"
    ctx2.fillRect(0, m, canvas2.width, b);
    ctx2.fillStyle = "#FED400"
    ctx2.fillRect(0, m + b, canvas2.width, b);
    ctx2.fillStyle = "#FEED00"
    ctx2.fillRect(0, m + 2 * b, canvas2.width, b);
    ctx2.fillStyle = "#D4FE00"
    ctx2.fillRect(0, m + 3 * b, canvas2.width, b);
    ctx2.fillStyle = "#99FE00"
    ctx2.fillRect(0, m + 4 * b, canvas2.width, b);

    if (way <= best_way)
    {
        h =  Math.floor((way) * (canvas2.height / 2) / best_way);
        h += position * (m / best_way) / (1000 / speed);
        if (h > m)
            h = m;
    }
    else
    {
        h = m +  m * (way - best_way) / 10;
        h += position * (b2) / (1000 / speed);
    }
    ctx2.fillStyle = "#34864F";
       ctx2.fillRect(0, 0, canvas2.width, h);
}
var caca = 0;

function print_sparkle(position)
{
    var x;

    if (!sparkle_s)
        return ;
    x = position * 20 / (1000 / speed);
    ctx.drawImage(sparkle, sparkle_x - sparkle_s / 2, sparkle_y - sparkle_s / 2, sparkle_s, sparkle_s);
    if (way <= 1)
        sparkle_s = 140 - position * 60 / (1000 / speed);
    else if (way + 1 <= best_way + 8)
        sparkle_s = 80 - Math.trunc((way) * (100 - 70) / (best_way + 7));
    else
        sparkle_s = 70 - 70 * (way - best_way - 7) / 2 + position * 20 / (1000 / speed);
    if (sparkle_s <= 0)
        sparkle_s = 0;
}

function print_hearts()
{
    var count;

    count = 0;
    while (count < size_hearts)
    {
        if (tab_hearts[count].stat == 1)
        {
            document.getElementById(tab_hearts[count].img).style.marginLeft = tab_hearts[count].pos_x + "vw";
            document.getElementById(tab_hearts[count].img).style.marginTop = tab_hearts[count].pos_y + "vw";
            if (tab_hearts[count].pos_x == 54.16 && tab_hearts[count].pos_y == 9.1)
            {
                tab_hearts[count].stat = 0;
                skill += 1;
                print_life();
            }
            if (tab_hearts[count].id != "end")
            {
                tab_hearts[count].pos_x = tab_hearts[count + 1].pos_x;
                tab_hearts[count].pos_y = tab_hearts[count + 1].pos_y;                
            }
            else if (tab_hearts[count].id == "end")
            {
                tab_hearts[count].pos_x -= tab_hearts[count].x;
                tab_hearts[count].pos_y -= tab_hearts[count].y;
                if (tab_hearts[count].pos_x <= 54.16 && tab_hearts[count].pos_y <= 9.1)
                {
                    tab_hearts[count].pos_x = 54.16;
                    tab_hearts[count].pos_y = 9.1;
                }
            }   
        }
        else if (count > size_hearts - 100)
            document.getElementById(tab_hearts[count].img).style.width = 0;
        count += 1;
    }
}

function print_font_map()
{
    var x;
    var y;

    y = 0;
    while (y < nb_blocks_y)
    {
        x = 0;
        while (x < nb_blocks_x)
        {
            ctx.fillStyle = map[y][x];
            ctx.fillRect(x * height_snake + x * height_snake / 2,
                        y * height_snake + y * height_snake / 2,
                        height_snake, height_snake);
            x += 1;
        }
        y += 1;
    }
}

function snake_game() {
    var current_time;
    requestAnimationFrame(snake_game);
    var ret;

    if (pause)
        return ;
    d = new Date();
    current_time = d.getTime();
    ret = 1;
    if (current_time - last_print_time >= 1000 / fps)
    {
        last_print_time = current_time;
        print_time(current_time);
        ctx.fillStyle = "rgb(32, 90, 30)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        print_font_map();
        this_is_the_end();
        print_evolution(current_time - last_move_time);
        print_snake(current_time - last_move_time);
        ret = print_explosion();
        print_collision();
        print_combo();
        print_sparkle(current_time - last_move_time);
        print_hearts();
    }
    if (!game_over && current_time - last_move_time >= 1000 / speed)
    {
        manage_stack_dir();
        last_move_time = current_time;
        way += 1;
        move_snake();
        get_collision();
        snake_eating();
    }
    if (!ret && game_over && !lenght_snake)
        init_snake();
}

function random_between(min, max) {
    return (Math.floor(Math.random() * (max - min) + min));
}

function init_colors_lvl() {
    colors_lvl = [];
    colors_lvl[0] = "#B0B600";
    colors_lvl[1] = "#00D2A8";
    colors_lvl[2] = "#00AFD2";
    colors_lvl[3] = "#546A90";
    colors_lvl[4] = "#B354B6";
    colors_lvl[5] = "#C84479";
    colors_lvl[6] = "#B70000";
    colors_lvl[7] = "#D54406";
    colors_lvl[8] = "#80472F";
    colors_lvl[9] = "#7B7132";
}
function init_speed_game() {
    speed_game = [];
    speed_game[0] = 5;
    speed_game[1] = 9;
    speed_game[2] = 9;
    speed_game[3] = 9;
    speed_game[4] = 9;
    speed_game[5] = 9;
    speed_game[6] = 9;
    speed_game[7] = 9;
    speed_game[8] = 9;
    speed_game[9] = 9;
}

function init_combo()
{
    var elem;

    elem = document.createElement("img");
    document.body.appendChild(elem);
    elem.setAttribute("id", "combo_img");
    elem.setAttribute("src", "combo.png");
    elem.style.position = "absolute";
    elem.style.width = "0vw";
    elem.style.marginLeft = "60vw";
    elem.style.marginTop = "5.3vw";
    elem.style.zIndex = "4";
}

function init_snake() {

    var count;
    var x;
    var y;

    lenght_snake = 5;
    height_snake = 24;
    direction = LEFT;
    init_speed_game();
    speed = speed_game[0];
    count = 0;
    d = new Date();
    last_move_time = d.getTime();
    time_start = last_move_time;
    last_print_time = last_move_time;
    nb_blocks_x = (2 * canvas.width + height_snake) / (3 * height_snake);
    nb_blocks_y = (2 * canvas.height + height_snake) / (3 * height_snake);
    snake = [];
    score = 0;
    skill = 0;
    document.getElementById("score_value").innerHTML = "0000";
    init_colors_lvl();
    stack_dir = [];
    stack_dir[0] = 0;
    stack_dir[1] = 0;
    stack_dir[2] = 0;
    size_stack = 3;
    fire = 81;
    document.getElementById("collision").style.color = "red";
    expl = [];
    nb_expl = 0;
    fps = 40;
    game_over = 0;
    size_combo = 0;
    combo = 0;
    total_combo = 0;
    pause = 0;
    size_hearts = 0;
    tab_hearts = [];
    var elem;
    count = 0;
    heart_count = 0;
    while (count < 100)
    {
        elem = document.createElement("img");
        document.body.appendChild(elem);
        elem.setAttribute("id", "heart" + (count + 1));
        elem.setAttribute("src", "coeur.png");
        elem.style.position = "absolute";
        elem.style.width = "0";
        elem.style.zIndex = "3";
        count += 1;
    }
    stat_print_combo = 0;
    init_combo();
    map = [];
    y = 0;
    while (y < nb_blocks_y)
    {
        map[y] = [];
        x = 0;
        while (x < nb_blocks_x)
        {
            map[y][x] =  "#34864F";
            x += 1;
        }
        y += 1;
    }
    count = 0;
    while (count < lenght_snake)
    {
        snake[count] =
            {
                pos_x: (count + 10) * height_snake + (count + 10) * height_snake / 2,
                pos_y: 5 * height_snake + 5 * height_snake / 2,
                color: "#F4C650"
            };
        count += 1;
    }
    tail = 
    {
        pos_x: (count + 10) * height_snake + (count + 10) * height_snake / 2,
        pos_y: 5 * height_snake + 5 * height_snake / 2,
        color: "#F4C650"
    }
    apple =
        {
            pos_x: 0,
            pos_y: 0,
            color: 0
        };
    apple.pos_x = random_between(0, nb_blocks_x - 1);
    apple.pos_x = apple.pos_x * height_snake + apple.pos_x * height_snake / 2;
    apple.pos_y = random_between(0, nb_blocks_y - 1);
    apple.pos_y = apple.pos_y * height_snake + apple.pos_y * height_snake / 2;
    apple.color = colors_lvl[0];
    best_way = Math.abs(snake[0].pos_x - apple.pos_x) / (height_snake + height_snake / 2) +
        Math.abs(snake[0].pos_y - apple.pos_y) / (height_snake + height_snake / 2);
    way = 0;
    sparkle_s = 142;
    sparkle_x = apple.pos_x + height_snake / 2;
    sparkle_y = apple.pos_y + height_snake / 2;
}

window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    img = new Image();
    img.src = "fire.png";
    init_snake();
    snake_game();
};

window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    canvas2 = document.getElementById('canvas2');
    ctx2 = canvas2.getContext("2d");
    img = new Image();
    img.src = "fire.png";
    fant = new Image();
    fant.src = "fant.png";
    blue = new Image();
    blue.src = "blue2.png";
    purple = new Image();
    purple.src = "purple.png";
    scint = new Image();
    scint.src = "scint.jpg";
    sparkle = new Image();
    sparkle.src = "sparkle.png";
    init_snake();
    snake_game();
};
function resize_all() {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
}

document.addEventListener("keydown", function (key) {
    var dir;
    var count;

    if (key.keyCode == 32)
    {
        if (!pause)
            pause = 1;
        else
            pause = 0;
    }
    if (key.keyCode == 38)
        dir = TOP;
    else if (key.keyCode == 40)
        dir = BOT;
    else if (key.keyCode == 37)
        dir = LEFT;
    else if (key.keyCode == 39)
        dir = RIGHT;
    else
        return ;
    count = 0;
    while (count < size_stack && stack_dir[count] != 0)
        count += 1;
    if (count != size_stack && !(!count && dir == direction) && !(count && dir == stack_dir[count - 1]))
        stack_dir[count] = dir;
});
