<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/css/style.css">
    <title>Tetris</title>
</head>
<body>
    <div class="jumbotron">
        <h3 class="text-center">TETRIS</h3>
        <hr>
        <div class="row text-center w-100" id="row-info">
            <div class="col-4">
                <h4>Controlles</h4>
                <span><u>bas / gauche / droite</u> : fleches directionnelles</span>
                <span><u>rotation</u> : barre espace</span>
                <span><u>pause</u> : entree</span>
            </div>

            <div class="col-4">
                <h4>Musique</h4>
                <div class="form-check form-switch" id="music-form">
                    <input class="form-check-input" type="checkbox" role="switch" id="sound-switch" checked>
                    <label class="form-check-label" for="sound-switch" id="sound-switch-label">ON</label>
                </div>
            </div>

            <div class="col-4">
                <h4>Partie</h4>
                <div>
                    <button id="game-start-button" class="btn btn-primary">Commencer</button><br/>
                    <button id="game-pause-button" class="btn btn-success" disabled>Pause</button>
                </div>
            </div>
        </div>
    </div>

    <div class="container" id="game-container">
        <audio src="assets/sons/main.mp3" id="main-music" loop></audio>
        <audio src="assets/sons/deplacement.mp3" id="sfx-move-block"></audio>
        <audio src="assets/sons/ligne.mp3" id="sfx-full-line"></audio>
        <audio src="assets/sons/nivele.mp3" id="sfx-fall"></audio>
        <audio src="assets/sons/pose.mp3" id="sfx-landed-block"></audio>
        <audio src="assets/sons/rotate.mp3" id="sfx-rotate-block"></audio>

        <div class="row">
            <div class="col-8" id="col-game-left">
                <div id="game-grid">
                    <?php for($y=22; $y>-1; $y--): ?>
                        <?php for($x=0; $x<14; $x++): ?>
                            <img src="assets/images/briques/black.bmp" class="basic-tile" id=<?php echo"tile-" . $x . "-" . $y ?> >
                        <?php endfor; ?><br>
                    <?php endfor; ?>
                </div>
            </div>

            <div class="col-4" id="col-game-right">
                <div>
                    <h5 class="mb-4">Brique suivante</h5>
                    <div id="div-next-block">
                        <img src="assets/images/briques/fantome.png" alt="image brique suivante" id="image-next-block">
                    </div>
                </div>

                <div>
                    <h5 class="mb-3 mt-3">Score</h5>
                    <div id="div-scores">
                        <u>Lignes</u>&nbsp;:&nbsp;<div class="badge bg-light text-dark" id="line-counter">0</div><br/>
                        <u>niveau</u>&nbsp;:&nbsp;<div class="badge bg-light text-dark" id="level-counter">0</div><br/>
                        <u>score</u>&nbsp;:&nbsp;<div class="badge bg-light text-dark" id="score-counter">0</div>
                    </div>
                </div>            
            </div>
        </div>
    </div>
    
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>