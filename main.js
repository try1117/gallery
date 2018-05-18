let defaultImageURL = "http://seismonepal.gov.np/assets/img/no_image.jpg";

let imagesURL = [
    "https://upload.wikimedia.org/wikipedia/commons/9/93/20030820-antelope-canyon.jpg",
    "https://cdn.pixabay.com/photo/2017/11/07/00/07/fantasy-2925250_960_720.jpg",
    "https://images.pexels.com/photos/34950/pexels-photo.jpg",
    "https://images.pexels.com/photos/34923/pexels-photo.jpg",
    "https://images.pexels.com/photos/34913/pexels-photo.jpg",
    "https://images.pexels.com/photos/34942/pexels-photo.jpg",
    "https://images.pexels.com/photos/34953/pexels-photo.jpg",
    "https://images.pexels.com/photos/34922/pexels-photo.jpg",
    "https://images.pexels.com/photos/34930/pexels-photo.jpg",
    "https://images.pexels.com/photos/349/pexels-photo.jpg",
];

window.onload = function() {
    let calendarContainers = document.getElementsByClassName('gallery');
    for (let container of calendarContainers) {
        new Gallery(container, imagesURL, defaultImageURL);
    }
}
