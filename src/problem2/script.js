setTimeout(() => {
    const box = document.getElementById('loader');
    const text = document.getElementById('text');
    text.textContent = "Transaction sent!"
    box.style.display = 'none';
}, 5000);