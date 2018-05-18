'use strict';

// (function() {
    class Gallery {
        constructor(container, imagesURL, defaultImageURL) {
            for (let imageURL of imagesURL) {
                let image = document.createElement('img');
                container.appendChild(image);
                this.loadImage(image, imageURL, defaultImageURL);
            }
        }

        loadImage(image, imageURL, defaultImageURL) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 2) {
                    alert(2);
                }
                if (xhr.readyState == 3) {
                    // loading
                    image.src = defaultImageURL;
                }
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var blob = new Blob([xhr.response], {
                        type: xhr.getResponseHeader('Content-Type')
                    });
                    var blobUrl = window.URL.createObjectURL(blob);
                    image.src = blobUrl;
                }
            }

            xhr.responseType = 'arraybuffer';
            xhr.open('GET', imageURL, true);
            xhr.send();
        }
    }
    //
    // let defaultImageURL = ;
    //
    // let imagesURL = [
    //     "https://upload.wikimedia.org/wikipedia/commons/9/93/20030820-antelope-canyon.jpg",
    //     "https://cdn.pixabay.com/photo/2017/11/07/00/07/fantasy-2925250_960_720.jpg",
    //     "https://images.pexels.com/photos/34950/pexels-photo.jpg",
    //     "https://images.pexels.com/photos/34923/pexels-photo.jpg",
    //     "https://images.pexels.com/photos/34913/pexels-photo.jpg",
    //     "https://images.pexels.com/photos/34942/pexels-photo.jpg",
    //     "https://images.pexels.com/photos/34953/pexels-photo.jpg",
    //     "https://images.pexels.com/photos/34922/pexels-photo.jpg",
    //     "https://images.pexels.com/photos/34930/pexels-photo.jpg",
    //     "https://images.pexels.com/photos/349/pexels-photo.jpg",
    // ];
    //
    // window.onload = function() {
    //     let calendarContainers = document.getElementsByClassName('gallery');
    //     for (let container of calendarContainers) {
    //         new Gallery(container, imagesURL);
    //     }
    // }
// })();
