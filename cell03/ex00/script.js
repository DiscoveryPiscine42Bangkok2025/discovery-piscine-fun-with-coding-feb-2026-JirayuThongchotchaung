const btn = document.getElementById('btn');

btn.onclick = function() {
    const rd = '#' + Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = rd;
};