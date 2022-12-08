'use strict';

let second = document.querySelector('.timer span');
let btn1 = document.querySelector('.control #start');
let btn2 = document.querySelector('.control #restart');
let btn3 = document.querySelector('.prac button');
let showWord = document.querySelector('.remind span');
let enterWord = document.querySelector('.enter .input');
let points = document.querySelector('.detail span');
let tips1 = document.querySelector('.enter .correct');
let tips2 = document.querySelector('.enter .incorrect');
let newDate = new Date().toString().substring(0, 15);
let result = document.querySelector('.result');
let resultDate = document.querySelector('.result .date');
let resultHit = document.querySelector('.result .hit');
let resultPer = document.querySelector('.result .percentage');
let scoreItems = document.querySelectorAll('.score span');
let board = document.querySelector('.score');
let arr = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
    'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
    'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
    'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
    'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
    'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
    'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
    'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
    'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
    'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
    'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
    'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
    'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
    'keyboard', 'window'];
let arr2 = [];


const bgMusic = new Audio('assets/audio/bgMusic.mp3');
bgMusic.type = 'audio/mp3';
const correct = new Audio('assets/audio/correct.mp3');
correct.type = 'audio/mp3';
const incorrect = new Audio('assets/audio/incorrect.mp3');
incorrect.type = 'audio/mp3';
const success = new Audio('assets/audio/success.mp3');
success.type = 'audio/mp3';
const failure = new Audio('assets/audio/failure.mp3');
failure.type = 'audio/mp3';


class Score {
    #date;
    #hits;
    #percentage;

    constructor(date, hits, percentage) {
        this.#date = date;
        this.#hits = hits;
        this.#percentage = percentage;
    }

    get date() { return this.#date };
    get hits() { return this.#hits };
    get percentage() { return this.#percentage };

    getInfo() {
        return `Date:${this.#date}<br>
                Point:${this.#hits}<br>
                percentage:${this.#percentage}`
    }

};
const score = new Score(newDate, arr2.length, (arr2.length / 99 * 100).toFixed(2));


const compare = function (prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    }
};

/* for (let i = 0; i < localStorage.length; i++) {
    console.log('localStorage里存储的第' + i + '条数据的名字为：' + localStorage.key(i) + ',值为：' + localStorage.getItem(localStorage.key(i)));
}; */

/* console.log(localStorage.removeItem('scores')); */



btn1.addEventListener('click', function () {
    let j = 1;
    arr2.splice(0, arr2.length);
    points.innerHTML = `90 / ${arr2.length}`
    let random = Math.floor(Math.random() * (90 - j));
    let word = arr[random];
    var t = setInterval(countDown, 1000);
    let i = 15;
    showWord.style.color = '#FFF';
    showWord.innerHTML = word;
    btn1.setAttribute("disabled", true);
    btn1.className = 'start2';
    btn2.className = 'restart';
    bgMusic.play();

    enterWord.addEventListener('keyup', function () {

        if (word.split('').length == enterWord.value.split('').length) {
            if (showWord.innerHTML == enterWord.value) {
                enterWord.style.color = '#33ab4e';
                arr2.push(word);
                arr.splice(random, 1);
                enterWord.value = '';
                points.innerHTML = `90 / ${arr2.length}`
                enterWord.setAttribute('class', 'input');
                tips1.style.visibility = 'visible';
                tips2.style.visibility = 'hidden';
                random = Math.floor(Math.random() * (90 - j));
                word = arr[random];
                showWord.innerHTML = word;
                correct.play();
                j++;

            } else {
                enterWord.style.color = '#ff3c57';
                enterWord.setAttribute('class', 'error');
                tips1.style.visibility = 'hidden';
                tips2.style.visibility = 'visible';
                incorrect.play();
            }

        }

    });

    /*  enterWord.onkeydown = function keyPress(e) {
     
         if (e.keyCode == 13) {
             
             if (enterWord.value == showWord.innerHTML) {
                 arr2.push(word);
                 arr.splice(random, 1);
                 enterWord.value = '';
                 points.innerHTML = `90 / ${arr2.length}`
                 enterWord.setAttribute('class', 'input');
                 tips1.style.visibility = 'visible';
                 tips2.style.visibility = 'hidden';
                 random = Math.floor(Math.random()* (90 - j));
                 word = arr[random];
                 showWord.innerHTML = word;
                 correct.play();
                 j++;
             } else {
                 enterWord.setAttribute('class', 'error'); 
                 tips1.style.visibility = 'hidden';
                 tips2.style.visibility = 'visible';
                 incorrect.play();
             }
     
         }
     } */

    function countDown() {

        second.innerHTML = i + 's';
        second.style.fontSize = '60px';
        second.style.fontFamily = `'Rubik Distressed', cursive`;

        if (i === 0) {
            const score = new Score(newDate, arr2.length, (arr2.length / 90 * 100).toFixed(2));
            clearInterval(t);
            showWord.innerHTML = 'Welcome to try again!';
            second.innerHTML = 'Time UP!';
            second.style.fontSize = '40px';
            result.style.visibility = 'visible';
            resultDate.innerHTML = `Date:<br>${score.date}`;
            resultHit.innerHTML = `Point:<br>${score.hits}`;
            resultPer.innerHTML = `Percentage:<br>${score.percentage}%`;
            let arrScore = getScore().sort(compare("hits")).reverse();

            function saveScore(date, hits, percentage) {
                const scoreObj = {};
                scoreObj.date = date;
                scoreObj.hits = hits;
                scoreObj.percentage = percentage;
                arrScore.push(scoreObj);

                localStorage.setItem("scores", JSON.stringify(arrScore.slice(0, 9)));
            }
            saveScore(score.date, score.hits, score.percentage);

            //Get score
            function getScore() {
                let arr = [];
                if (localStorage.getItem("scores") !== null) {
                    arr = JSON.parse(localStorage.getItem("scores"));
                };
               
                return arr;
            }
            arrScore.sort();

            for (let k = 0; k < arrScore.length; k++) {
                /*  let span = document.createElement('span');
                 board.appendChild(span); */
                 scoreItems[k].innerHTML = ` #${k + 1}&nbsp;&nbsp;&nbsp;&nbsp; ${arrScore[k].hits} words &nbsp;&nbsp;&nbsp;&nbsp;${arrScore[k].percentage}%`;
             };
             bgMusic.pause();
             failure.play();
         }

            if (arr2.length == 90) {
                showWord.innerHTML = 'Good job!';
                const score = new Score(newDate, arr2.length, (arr2.length / 90 * 100).toFixed(2));
                clearInterval(t);
                second.innerHTML = 'Time UP!';
                second.style.fontSize = '40px';
                result.style.visibility = 'visible';
                resultDate.innerHTML = `Date:<br>${score.date}`;
                resultHit.innerHTML = `Points:<br>${score.hits}`;
                resultPer.innerHTML = `Percentage:<br>${score.percentage}`;
                bgMusic.pause();
                success.play();
            }
            i--;
        };

        btn2.addEventListener('click', function () {
            clearInterval(t);
            btn1.className = 'start';
            btn2.className = 'restart2';
            btn1.removeAttribute("disabled");
            btn1.style.cursor = "pointer";
            bgMusic.currentTime = 0;
            bgMusic.pause();
            for (let i in arr2) {
                arr.push(arr2[i]);
            };
            showWord.innerHTML = 'Press start button';
            showWord.style.color = '#b2b2b2';
            arr2.splice(0, arr2.length);
            points.innerHTML = `90 / ${arr2.length}`;
            second.innerHTML = '<span>Countdown <br>99 seconds</span>';
            second.style.fontSize = '30px';
            second.style.fontFamily = `'Anton', sans-serif`;
            tips1.style.visibility = 'hidden';
            tips2.style.visibility = 'hidden';
            result.style.visibility = 'hidden';
        });
    });

/* function getDate() {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }
    return new Date().toLocaleDateString('en-ca', options);
}

console.log(getDate()); */



































