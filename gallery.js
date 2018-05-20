'use strict';

class Gallery {
    constructor(containerId, totalProgressBarId, imagesURL, defaultImageURL,
        createImageProgressBar, createTotalProgressBar, imageProgressBarStyles,
        maxRequestsAllowed = 5)
    {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.totalProgessBar = createTotalProgressBar(totalProgressBarId);
        this.imagesURL = imagesURL;
        this.defaultImageURL = defaultImageURL;
        this.createImageProgressBar = createImageProgressBar;
        this.createTotalProgressBar = createTotalProgressBar;
        this.imageProgressBarStyles = imageProgressBarStyles;
        this.maxRequestsAllowed = maxRequestsAllowed;

        console.log(this.totalProgessBar.text);
        // debugger;

        this.imagesQueueIdx = maxRequestsAllowed;
        this.progressBarCnt = 0;
        this.imagesLoaded = 0;

        for (let i = 0; i < Math.min(this.maxRequestsAllowed, imagesURL.length); ++i) {
            this.loadImage(imagesURL[i]);
        }
    }

    loadImage(imageURL) {
        console.log('loadImage ' + imageURL);

        let imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        this.container.appendChild(imageContainer);

        let image = document.createElement('img');
        imageContainer.appendChild(image);
        image.classList.toggle('m-fadeOut');

        let progressBarElement = document.createElement('div');
        progressBarElement.classList.add(...this.imageProgressBarStyles);
        progressBarElement.id = this.containerId + '_progressBar_' + this.progressBarCnt++;
        imageContainer.appendChild(progressBarElement);

        let progressBar = this.createImageProgressBar(progressBarElement.id);
        let self = this;
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            let minProgress = 0.05;

            if (xhr.readyState == 2) {
                progressBar.animate(minProgress);
            }
            else if (xhr.readyState == 3) {
                xhr.onprogress = function(e) {
                    progressBar.animate(Math.max(minProgress, e.loaded / e.total));
                    // console.log(e.loaded / e.total);
                }
            }
            else if (xhr.readyState == 4) {
                progressBarElement.remove();
                if (xhr.status == 200) {
                    let blob = new Blob([xhr.response], {
                        type: xhr.getResponseHeader('Content-Type')
                    });
                    let blobUrl = window.URL.createObjectURL(blob);
                    image.src = blobUrl;
                }
                else {
                    image.src = self.defaultImageURL;
                }
                image.classList.toggle('m-fadeOut');
                image.classList.toggle("m-fadeIn");

                ++self.imagesLoaded;
                console.log('TOTAL PROGRESS: ' + self.imagesLoaded / self.imagesURL.length);
                self.totalProgessBar.animate(self.imagesLoaded / self.imagesURL.length);

                if (self.imagesQueueIdx < self.imagesURL.length) {
                    self.loadImage(self.imagesURL[self.imagesQueueIdx++]);
                }
            }
        }

        xhr.responseType = 'arraybuffer';
        xhr.open('GET', imageURL, true);
        xhr.send();
    }
}
