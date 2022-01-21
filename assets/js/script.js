$("document").ready(function() {
    let tick_delay = 1500;
    let tempo;
    let on_pause = false;
    let line_counter = 0;
    let level_counter = 0;
    let score_counter = 0;
    let game_over = false;
    let pre_gameover_counter = 0;
    let line_fall_counter = 0;
    let lines_to_fall = new Array();
    let falling = false;
    let stop_move = false;
    $("#main-music").prop("volume", 0.1);
    $("#sfx-move-block").prop("volume", 0.4);
    $("#sfx-full-line").prop("volume", 0.4);
    $("#sfx-fall").prop("volume", 0.4);
    $("#sfx-landed-block").prop("volume", 0.4);
    $("#sfx-rotate-block").prop("volume", 0.4);

    //origin: bottom left corner
    let barre = {
        x1: 2, y1: 3,
        x2: 2, y2: 2,
        x3: 2, y3: 1,
        x4: 2, y4: 0,
        name: "barre",
        frames: 2,
    };

    let carre = {
        x1: 1, y1: 2,
        x2: 2, y2: 2,
        x3: 1, y3: 1,
        x4: 2, y4: 1,
        name: "carre",
        frames: 1,
    };

    let l_droit = {
        x1: 1, y1: 3,
        x2: 1, y2: 2,
        x3: 1, y3: 1,
        x4: 2, y4: 1,
        name: "l_droit",
        frames: 4,
    };

    let l_gauche = {
        x1: 1, y1: 3,
        x2: 1, y2: 2,
        x3: 1, y3: 1,
        x4: 0, y4: 1,
        name: "l_gauche",
        frames: 4,
    };

    let serpent_a = {
        x1: 2, y1: 3,
        x2: 2, y2: 2,
        x3: 1, y3: 2,
        x4: 1, y4: 1,
        name: "serpent_a",
        frames: 2,
    };

    let serpent_b = {
        x1: 1, y1: 3,
        x2: 1, y2: 2,
        x3: 2, y3: 2,
        x4: 2, y4: 1,
        name: "serpent_b",
        frames: 2,
    };

    let t = {
        x1: 1, y1: 3,
        x2: 1, y2: 2,
        x3: 1, y3: 1,
        x4: 2, y4: 2,
        name: "t",
        frames: 4,
    };
    
    let current_block = {
        x1: 0, y1: 0,
        x2: 0, y2: 0,
        x3: 0, y3: 0,
        x4: 0, y4: 0,
        spin_x1: 0, spin_y1: 0,
        spin_x2: 0, spin_y2: 0,
        spin_x3: 0, spin_y3: 0,
        spin_x4: 0, spin_y4: 0,
        block_image: '',
        container_x: 5, container_y: 17,
        frames: 0,
        current_frame: 1,
        get_min_x: function() {
            let min = this.x1;
            if(this.x2 < min) { min = this.x2; }
            if(this.x3 < min) { min = this.x3; }
            if(this.x4 < min) { min = this.x4; }
            return min;
        },
        get_max_x: function() {
            let max = this.x1;
            if(this.x2 > max) { max = this.x2; }
            if(this.x3 > max) { max = this.x3; }
            if(this.x4 > max) { max = this.x4; }
            return max;
        },
        get_min_y: function() {
            let min = this.y1;
            if(this.y2 < min) { min = this.y2; }
            if(this.y3 < min) { min = this.y3; }
            if(this.y4 < min) { min = this.y4; }
            return min;
        },
        get_max_y: function() {
            let max = this.y1;
            if(this.y2 > max) { max = this.y2; }
            if(this.y3 > max) { max = this.y3; }
            if(this.y4 > max) { max = this.y4; }
            return max;
        },
    };

    let next_block;
    let presence_grid = new Array(14);
    for(let x=0; x<presence_grid.length; x++) {
        presence_grid[x] = new Array(23);
    }

    for(let x=0; x<presence_grid.length; x++) {
        for(let y=0; y<presence_grid.height; y++) {
            presence_grid[x][y] = false;
        }
    }

    function setBlocks() {
        stop_move = true;

        //only happens for the first block
        if(typeof(next_block) === "undefined") {
            next_block = determineBlocks();
        }

        current_block.frames = next_block.frames;
        current_block.current_frame = 1;
        current_block.container_x = 5;
        current_block.container_y = 17;
        //current_block gets next_block data
        current_block.x1 = next_block.x1 + current_block.container_x;
        current_block.y1 = next_block.y1 + current_block.container_y;
        current_block.x2 = next_block.x2 + current_block.container_x;
        current_block.y2 = next_block.y2 + current_block.container_y;
        current_block.x3 = next_block.x3 + current_block.container_x;
        current_block.y3 = next_block.y3 + current_block.container_y;
        current_block.x4 = next_block.x4 + current_block.container_x;
        current_block.y4 = next_block.y4 + current_block.container_y;        
        current_block.block_image =  "assets/images/briques/" + next_block.name + "/base.png";
        $("#tile-" + current_block.x1 + "-" + current_block.y1).attr("src", current_block.block_image);
        $("#tile-" + current_block.x2 + "-" + current_block.y2).attr("src", current_block.block_image);
        $("#tile-" + current_block.x3 + "-" + current_block.y3).attr("src", current_block.block_image);
        $("#tile-" + current_block.x4 + "-" + current_block.y4).attr("src", current_block.block_image);
        next_block = determineBlocks();
        $("#image-next-block").attr("src", "assets/images/briques/" + next_block.name + "/" + next_block.name + "_1.png");
        falling = true;
        stop_move = false;
    };

    function checkCollision(direction) {
        let increment_x = 0;
        let increment_y = 0;
        let target_1, target_2, target_3, target_4;

        //check block is on the edge of the grid
        switch(direction) {
            case "gauche":
                increment_x = -1;
                //left border
                if(current_block.get_min_x() + increment_x < 0) {
                    return true;
                }
                break;

            case "droite":
                increment_x = 1;
                //right border
                if(current_block.get_max_x() + increment_x > 13) {
                    return true;
                }
                break;

            case "bas":
                increment_y = -1;
                //bottom border
                if(current_block.get_min_y() + increment_y < 0) {
                    return true;
                }
                break;

            case "rotation":
                spinCalculus().then(() => {
                    target_1 = presence_grid[current_block.spin_x1][current_block.spin_y1];
                    target_2 = presence_grid[current_block.spin_x2][current_block.spin_y2];
                    target_3 = presence_grid[current_block.spin_x3][current_block.spin_y3];
                    target_4 = presence_grid[current_block.spin_x4][current_block.spin_y4];
                })
                break;

            default:
                break;
        }

        if(direction !== "rotation") {
            //check if there's a collision with another already present block 
            target_1 = presence_grid[current_block.x1 + increment_x][current_block.y1 + increment_y];
            target_2 = presence_grid[current_block.x2 + increment_x][current_block.y2 + increment_y];
            target_3 = presence_grid[current_block.x3 + increment_x][current_block.y3 + increment_y];
            target_4 = presence_grid[current_block.x4 + increment_x][current_block.y4 + increment_y];
        }

        return (target_1 || target_2 || target_3 || target_4);
    }

    function fullLineDetection() {
        falling = false;
        let full_lines = new Array();
        let presence_counter;

        for(let y=0; y<23; y++) {
            presence_counter = 0;

            for(let x=0; x<14; x++) {
                if(presence_grid[x][y]) {
                    presence_counter++;
                }
            }

            if(presence_counter === 14) {
                full_lines.push(y);
            }
        }

        if(full_lines.length > 0) {
            lines_to_fall = full_lines.reverse();
            $("#sfx-full-line")[0].oncanplaythrough = $("#sfx-full-line")[0].play();
            fadeOutLinesAnimation(full_lines).then(() => {
                $("#sfx-fall")[0].oncanplaythrough = $("#sfx-fall")[0].play();
                lineFall();
            });
        } else {
            $("#sfx-landed-block")[0].oncanplaythrough = $("#sfx-landed-block")[0].play();
            if(current_block.get_max_y() > 19) {
                pre_gameover_counter++;
            } else {
                pre_gameover_counter = 0;
            }

            if(pre_gameover_counter > 2) {
                gameOver();
            } else {
                setBlocks();
            }
        }

        setScore(full_lines);
    }

    function gameOver() {
        $('#main-music')[0].pause();
        $('#main-music').removeAttr("loop");
        $('#main-music').attr("src", "assets/sons/perdu.mp3");
        $('#main-music')[0].oncanplaythrough = $('#main-music')[0].play();

        for(let y=0; y<23; y++) {
            tick(y*150).then(() => {
                for(let x=0; x<14; x++) {
                    tick(10*x).then(() => {
                        $("#tile-" + x + "-" + y).attr("src", "assets/images/briques/mur.bmp");

                        if(y===22 && x===13) {
                            game_over = true;
                            falling = false;
                            stop_move = true;
                            clearInterval(tempo);
                            $("#game-start-button").removeAttr("disabled");
                            $("#game-pause-button").attr("disabled", true);
                            $('#main-music')[0].pause();
                            $('#main-music').attr("src", "assets/sons/game over.mp3");
                            $('#main-music')[0].oncanplaythrough = $('#main-music')[0].play();
                        }
                    })
                }
            })  
        }
    }

    function setScore(lines) {
        if(typeof(lines[0]) !== "undefined") {
            line_counter += lines.length;
            level_counter = Math.trunc(line_counter/10);

            switch(lines.length) {
                case 1:
                    score_counter += 100;
                    break;

                case 2:
                    score_counter += 300;
                    break;

                case 3:
                    score_counter += 800;
                    break;

                default: //4 lines or more
                    score_counter += 1200;
                    break;
            }

            $("#line-counter").html(line_counter);
            $("#level-counter").html(level_counter);
            $("#score-counter").html(score_counter);
            tick_delay = 1500 - (level_counter * 200);

            if(tick_delay < 500) {
                tick_delay = 500;
            }
        }
    }

    const fadeOutLinesAnimation = (lines) => {
        return new Promise((resolve) => {
            for(let y of lines) {
                for(let x=0; x<14; x++) {
                    $("#tile-" + x + "-" + y).fadeOut("slow", function() {
                        $(this).attr("src", "assets/images/briques/black.bmp");
                        $(this).fadeIn('fast', function() {
                            resolve();
                        });
                    })
                }
            }
        })
    }

    function lineFall() {        
        let line = lines_to_fall[line_fall_counter];
        for(let y=line; y<22; y++) {
            for(let x=0; x<14; x++) {
                presence_grid[x][y] = presence_grid[x][y+1];
                $("#tile-" + x + "-" + y).attr("src", $("#tile-" + x + "-" + (y+1)).attr("src"));
            }
        }

        if(line_fall_counter < lines_to_fall.length) {
            line_fall_counter++;
            lineFall();
        } else {
            line_fall_counter = 0;
            lines_to_fall = [];
            setBlocks();
        }
    }

    const spinCalculus = () => {
        return new Promise((resolve) => {
            if(current_block.frames === 1) {
                current_block.spin_x1 = current_block.x1;
                current_block.spin_x2 = current_block.x2;
                current_block.spin_x3 = current_block.x3;
                current_block.spin_x4 = current_block.x4;
                current_block.spin_y1 = current_block.y1;
                current_block.spin_y2 = current_block.y2;
                current_block.spin_y3 = current_block.y3;
                current_block.spin_y4 = current_block.y4;
            } else {
                convertToLocalCoordinatesAndInverseAxis();
    
                if(current_block.frames === 2) {
                    if(current_block.current_frame === 1) {
                        applyLocalMiddleSymetry("y");
                    } else {
                        applyLocalMiddleSymetry("x");
                    }
                } else {
                    applyLocalMiddleSymetry("y");
                    current_block.spin_x1 -=1;
                    current_block.spin_x2 -=1;
                    current_block.spin_x3 -=1;
                    current_block.spin_x4 -=1;
                }
    
                convertToGlobalCoordinates();
            }

            resolve();
        })
    }

    function convertToLocalCoordinatesAndInverseAxis() {
        current_block.spin_x1 = current_block.y1 - current_block.container_y;
        current_block.spin_x2 = current_block.y2 - current_block.container_y;
        current_block.spin_x3 = current_block.y3 - current_block.container_y;
        current_block.spin_x4 = current_block.y4 - current_block.container_y;
        current_block.spin_y1 = current_block.x1 - current_block.container_x;
        current_block.spin_y2 = current_block.x2 - current_block.container_x;
        current_block.spin_y3 = current_block.x3 - current_block.container_x;
        current_block.spin_y4 = current_block.x4 - current_block.container_x;
    }

    function convertToGlobalCoordinates() {
        current_block.spin_x1 += current_block.container_x;
        current_block.spin_x2 += current_block.container_x;
        current_block.spin_x3 += current_block.container_x;
        current_block.spin_x4 += current_block.container_x;
        current_block.spin_y1 += current_block.container_y;
        current_block.spin_y2 += current_block.container_y;
        current_block.spin_y3 += current_block.container_y;
        current_block.spin_y4 += current_block.container_y;
    }

    function applyLocalMiddleSymetry(axis) {
        if(axis === "x") {
            current_block.spin_x1 = 3 - current_block.spin_x1;
            current_block.spin_x2 = 3 - current_block.spin_x2;
            current_block.spin_x3 = 3 - current_block.spin_x3;
            current_block.spin_x4 = 3 - current_block.spin_x4;
        } else if(axis === "y") {
            current_block.spin_y1 = 3 - current_block.spin_y1;
            current_block.spin_y2 = 3 - current_block.spin_y2;
            current_block.spin_y3 = 3 - current_block.spin_y3;
            current_block.spin_y4 = 3 - current_block.spin_y4;
        }
    }

    function moveBlock(direction) {
        //at this point, we're sure there's is no collision
        //delete old position
        $("#tile-" + current_block.x1 + "-" + current_block.y1).attr("src", "assets/images/briques/black.bmp");
        $("#tile-" + current_block.x2 + "-" + current_block.y2).attr("src", "assets/images/briques/black.bmp");
        $("#tile-" + current_block.x3 + "-" + current_block.y3).attr("src", "assets/images/briques/black.bmp");
        $("#tile-" + current_block.x4 + "-" + current_block.y4).attr("src", "assets/images/briques/black.bmp");

        switch(direction) {
            case "gauche":
                current_block.x1 -=1;
                current_block.x2 -=1;
                current_block.x3 -=1;
                current_block.x4 -=1;
                current_block.container_x -=1;
                $("#sfx-move-block")[0].oncanplaythrough = $("#sfx-move-block")[0].play();
                break;

            case "droite":
                current_block.x1 +=1;
                current_block.x2 +=1;
                current_block.x3 +=1;
                current_block.x4 +=1;
                current_block.container_x +=1;
                $("#sfx-move-block")[0].oncanplaythrough = $("#sfx-move-block")[0].play();
                break;

            case "bas":
                current_block.y1 -=1;
                current_block.y2 -=1;
                current_block.y3 -=1;
                current_block.y4 -=1;
                current_block.container_y -=1;
                break;

            case "rotation":
                current_block.x1 = current_block.spin_x1;
                current_block.x2 = current_block.spin_x2;
                current_block.x3 = current_block.spin_x3;
                current_block.x4 = current_block.spin_x4;
                current_block.y1 = current_block.spin_y1;
                current_block.y2 = current_block.spin_y2;
                current_block.y3 = current_block.spin_y3;
                current_block.y4 = current_block.spin_y4;

                if(current_block.current_frame < current_block.frames) {
                    current_block.current_frame++;
                } else {
                    current_block.current_frame = 1;
                }

                $("#sfx-rotate-block")[0].oncanplaythrough = $("#sfx-rotate-block")[0].play();

                break;

            default:
                break;
        }

        //draw new position
        $("#tile-" + current_block.x1 + "-" + current_block.y1).attr("src", current_block.block_image);
        $("#tile-" + current_block.x2 + "-" + current_block.y2).attr("src", current_block.block_image);
        $("#tile-" + current_block.x3 + "-" + current_block.y3).attr("src", current_block.block_image);
        $("#tile-" + current_block.x4 + "-" + current_block.y4).attr("src", current_block.block_image);
    }

    const tick = (milliseconds) => {        
        return new Promise((resolve) => {
            setTimeout(() => {
            resolve(milliseconds);
            }, milliseconds);
        });
    }

    function autoFall() {
        if(falling) {
            jQuery.event.trigger({
                type: 'keydown',
                which: 40  //bas
            });
        }
    }

    const resetGame = () => {
        return new Promise((resolve) => {
            tick_delay = 1500;
            line_counter = 0;
            level_counter = 0;
            score_counter = 0;
            $("#line-counter").html(line_counter);
            $("#level-counter").html(level_counter);
            $("#score-counter").html(score_counter);
            game_over = false;
            pre_gameover_counter = 0;
            line_fall_counter = 0;
            lines_to_fall = [];
            stop_move = false;
            $("#main-music").attr("loop", true);
            $("#main-music").attr("src", "assets/sons/main.mp3");

            for(let y=0; y<23; y++) {
                for(let x=0; x<14; x++) {
                    presence_grid[x][y] = false;
                    $("#tile-" + x + "-" + y).attr("src", "assets/images/briques/black.bmp");

                    if(y===22 && x===13) {
                        resolve();
                    }
                }
            }
        })
    }

    function pause() {
        if(!on_pause) {
            falling = false;
            stop_move = true;
            on_pause = true;
            clearInterval(tempo);
            $("#game-pause-button").attr("class", "btn btn-warning");
            $("#game-pause-button").text("Jouer");

            if($("#sound-switch").is(":checked")) {
                $('#main-music')[0].pause();
            }
        } else {
            falling = true;
            stop_move = false;
            on_pause = false;
            tempo = setInterval(autoFall, tick_delay);
            $("#game-pause-button").attr("class", "btn btn-success");
            $("#game-pause-button").text("Pause");

            if($("#sound-switch").is(":checked")) {
                $('#main-music')[0].oncanplaythrough = $('#main-music')[0].play();
            }
        }

        hideGameScreen(on_pause);
    }

    function hideGameScreen(hide) {
        let opacity = 1;

        if(hide) {
            opacity = 0;
        }

        for(let y=0; y<23; y++) {
            for(let x=0; x<14; x++) {
                $("#tile-" + x + "-" + y).css('opacity', opacity);
            }
        }
    }

    function determineBlocks() {
        let id = Math.floor(Math.random() * Math.floor(7));

        switch(id) {
            case 0:
                return barre;

            case 1:
                return carre;

            case 2:
                return l_droit;

            case 3:
                return l_gauche;

            case 4:
                return serpent_a;

            case 5:
                return serpent_b;

            case 6:
                return t;
        }
    }

    $(document).keydown(function(e) {
        if(!stop_move || e.which === 13) {
            switch(e.which) {
                case 13: //enter
                    $("#game-pause-button").trigger("click");
                    break;
    
                case 32:  //space bar
                    if(!checkCollision("rotation")) {
                        moveBlock("rotation");
                    }
                    break;
    
                case 37:  //left arrow key
                    if(!checkCollision("gauche")) {
                        moveBlock("gauche");
                    }
                    break;
    
                case 39:  //right arrow key
                    if(!checkCollision("droite")) {
                        moveBlock("droite");
                    }
                    break;
    
                case 40:  //down arrow key
                    if(!checkCollision("bas")) {
                        moveBlock("bas");
                    } else {
                        stop_move = true;
                        presence_grid[current_block.x1][current_block.y1] = true;
                        presence_grid[current_block.x2][current_block.y2] = true;
                        presence_grid[current_block.x3][current_block.y3] = true;
                        presence_grid[current_block.x4][current_block.y4] = true;
                        fullLineDetection()
                    }
                    break;
            }
        }  
    })

    $("#game-start-button").on("click", function() {
        $(this).blur();
        $(this).attr("disabled", true);

        if(game_over) {
            resetGame().then(() => {
                $("#game-pause-button").removeAttr("disabled");
                falling = true;
                setBlocks();
                tempo = setInterval(autoFall, tick_delay);

                if($("#sound-switch").is(":checked")) {
                    $("#main-music")[0].oncanplaythrough = $("#main-music")[0].play();
                }
            })
        } else {
            $("#game-pause-button").removeAttr("disabled");
            falling = true;
            setBlocks();
            tempo = setInterval(autoFall, tick_delay);

            if($("#sound-switch").is(":checked")) {
                $("#main-music")[0].oncanplaythrough = $("#main-music")[0].play();
            }
        }
    })

    $("#sound-switch").on("change", function() {
        if($(this).is(":checked")) {
            $("#sound-switch-label").text("ON");
        } else {
            $("#sound-switch-label").text("OFF");
        }

        if($("#game-start-button").is(":disabled") && !on_pause) {
            if($(this).is(":checked")) {
                $("#main-music")[0].oncanplaythrough = $("#main-music")[0].play();
            } else {
                $("#main-music")[0].pause();
            }
        }

        $(this).blur();
    })

    $("#game-pause-button").on("click", function() {
        $(this).blur();
        pause();
    })
})