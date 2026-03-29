document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const color = btn.getAttribute('data-color');
        document.body.style.backgroundColor = color;
    });
});