'use strict';

let progressCircleCnt = 0;

class Gallery {
    constructor(containerId, totalProgressBarId, imagesURL, defaultImageURL,
        createImageProgressBar, createTotalProgressBar, maxRequestsAllowed = 5)
    {
        this.container = document.getElementById(containerId);
        this.totalProgressBarId = totalProgressBarId;
        this.imagesURL = imagesURL;
        this.defaultImageURL = defaultImageURL;
        this.createImageProgressBar = createImageProgressBar;
        this.createTotalProgressBar = createTotalProgressBar;
        this.maxRequestsAllowed = maxRequestsAllowed;
        this.imagesLoaded = 0;

        for (this.imagesLoaded = 0; this.imagesLoaded < Math.min(this.maxRequestsAllowed, imagesURL.length); ++this.imagesLoaded) {
            this.loadImage(imagesURL[this.imagesLoaded], defaultImageURL);
        }
    }

    loadImage(imageURL, defaultImageURL) {
        let imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        this.container.appendChild(imageContainer);

        let image = document.createElement('img');
        imageContainer.appendChild(image);
        image.classList.toggle('m-fadeOut');

        let progressCircleElement = document.createElement('div');
        progressCircleElement.classList.add('progress');
        progressCircleElement.id = 'progressCircle_' + progressCircleCnt++;
        imageContainer.appendChild(progressCircleElement);

        let progressCircle = new ProgressBar.Circle("#" + progressCircleElement.id, {
            strokeWidth: 3,
            color: 'grey',
            duration: 30,
            easing: 'easeInOut'
        });

        let self = this;
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            let minProgress = 0.05;

            if (xhr.readyState == 2) {
                // alert(123);
                progressCircle.animate(minProgress);
            }
            if (xhr.readyState == 3) {
                xhr.onprogress = function(e) {
                    // let done = Math.max(minProgress, e.loaded / e.total);
                    progressCircle.animate(Math.max(minProgress, e.loaded / e.total));
                    // progressCircle.setText(Math.round(done));
                    console.log(e.loaded / e.total);
                }
            }
            if (xhr.readyState == 4) {
                progressCircleElement.remove();
                if (xhr.status == 200) {
                    let blob = new Blob([xhr.response], {
                        type: xhr.getResponseHeader('Content-Type')
                    });
                    let blobUrl = window.URL.createObjectURL(blob);
                    image.src = blobUrl;
                    }
                else {
                    image.src = defaultImageURL;
                }
                image.classList.toggle('m-fadeOut');
                image.classList.toggle("m-fadeIn");

                ++self.imagesLoaded;
                if (self.imagesLoaded < self.imagesURL.length) {
                    self.loadImage(self.imagesURL[self.imagesLoaded]);

                }
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
