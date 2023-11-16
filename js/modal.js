const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeModalButton = document.getElementById('closeModal');

function openModal(imageSrc, title) {
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modal.showModal();
}

function closeModal() {
    modal.close();
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('img-noticia')) {
        const section = event.target.closest('section');
        const imageSrc = section.querySelector('.img-noticia').src;
        const title = section.querySelector('h2').textContent;

        openModal(imageSrc, title);
    }
});

closeModalButton.addEventListener('click', closeModal);