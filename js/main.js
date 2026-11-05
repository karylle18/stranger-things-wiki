
(function () {

    'use strict';

    var body = document.body;
    var toggle = document.getElementById('upsideToggle');

    function setUpside(on) {
        body.classList.toggle('upside', on);

        if (toggle) {
            toggle.setAttribute('aria-pressed', String(on));
            toggle.textContent = on ? 'Back to Hawkins' : 'Enter the Upside Down';
        }

        try {
            localStorage.setItem('upside', on ? '1' : '0');
        } catch (e) {}
    }

    var saved = false;

    try {
        saved = localStorage.getItem('upside') === '1';
    } catch (e) {}

    setUpside(saved);

    if (toggle) {
        toggle.addEventListener('click', function () {
            setUpside(!body.classList.contains('upside'));
        });
    }

    var wall = document.getElementById('bulbs');

    if (wall) {

        var colors = ['#ff4d4d', '#ffd23f', '#4da3ff', '#8bd450', '#ff7a2f', '#b68cff'];
        var message = 'RIGHT HERE';

        message.split('').forEach(function (ch, i) {

            var b = document.createElement('span');

            if (ch === ' ') {
                b.className = 'bulb gap';
            }
            else {
                b.className = 'bulb';
                b.textContent = ch;
                b.style.setProperty('--c', colors[i % colors.length]);
            }

            wall.appendChild(b);

        });

        var bulbs = wall.querySelectorAll('.bulb:not(.gap)');
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function spell(i) {

            if (i >= bulbs.length) return;

            bulbs[i].classList.add('on');

            setTimeout(function () {
                bulbs[i].classList.remove('on');
                spell(i + 1);
            }, 420);

        }

        if (reduce) {
            bulbs.forEach(function (b) {
                b.classList.add('on');
            });
        }
        else {
            spell(0);
        }

        wall.addEventListener('click', function () {
            if (!reduce) spell(0);
        });

    }

    var search = document.getElementById('search');
    var cards = document.querySelectorAll('[data-name]');
    var count = document.getElementById('count');

    if (search) {

        search.addEventListener('input', function () {

            var q = search.value.trim().toLowerCase(), shown = 0;

            cards.forEach(function (c) {

                var match = c.dataset.name.toLowerCase().indexOf(q) !== -1;

                c.classList.toggle('hidden', !match);

                if (match) {
                    shown++;
                }

            });

            count.textContent = shown ? shown + ' of ' + cards.length + ' characters' : 'No character matches "' + search.value + '". Try a first name.';

        });

    }

})();

