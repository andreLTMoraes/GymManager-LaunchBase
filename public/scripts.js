const modalOverlay = document.querySelector('.modalOverlay');
const cards = document.querySelectorAll('.card');

for (let card of cards) {
    card.addEventListener("click", function () {
        let videoId = card.getAttribute("id");
        window.location.href = `/video?id=${videoId}`;
        //modalOverlay.classList.add("active");
        //modalOverlay.querySelector('iframe').src = `https://www.youtube.com/embed/${videoId}`;
    });
}

/* document.querySelector(".closeModal").addEventListener("click", function () {
    modalOverlay.classList.remove("active");
    modalOverlay.querySelector('iframe').src = "";
}); */
