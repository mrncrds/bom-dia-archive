onload = function() {
    const modal = document.querySelector("#modal");
    const modalImg = document.querySelector("#modalContent");
    const close = document.querySelector("#modalClose");
    const captionText = document.querySelector("#modalCaption");
    const imgFilename = captionText.querySelector("#imgFilename");
    const imgYear = captionText.querySelector("#imgYear");
    const imgWidth = captionText.querySelector("#imgWidth");
    const imgHeight = captionText.querySelector("#imgHeight");
    const imgSize = captionText.querySelector("#imgSize");
    const imgSource = captionText.querySelector("#imgSource");
    const imgSubject = captionText.querySelector("#imgSubject");

    // Fetch the images from the JSON file and create grid items
    fetch("images.json")
        .then(res => res.json())
        .then(images => {
            const grid = document.querySelector(".archive-grid-container");

            images.forEach(item => {
                console.log("Total images: " + images.length);

                const gridItem = document.createElement("div");
                gridItem.classList.add("grid-item");

                const img = document.createElement("img");
                img.src = "images/" + item.filename;
                img.alt = "Bom dia image";
                img.loading = "lazy";

                gridItem.appendChild(img);
                grid.appendChild(gridItem);
            });

            // Click to open image in modal
            const gridItems = document.querySelectorAll(".grid-item");
            gridItems.forEach(image => {
                image.onclick = function() {
                    const clickedImg = image.querySelector("img");
                    modal.style.display = "block";
                    modalImg.src = clickedImg.src;
                    modalImg.alt = clickedImg.alt;

                    // Change style of clicked image in grid
                    changeOpacity(clickedImg);

                    // Caption text: Get metadata from JSON based on clicked image filename
                    const imgData = images.find(img => img.filename === clickedImg.src.split("/").pop());
                    if (imgData) {
                        imgFilename.innerHTML = "Filename: <span class='metadata'>" + imgData.filename + "</span>";
                        imgYear.innerHTML = "Year: <span class='metadata'>" + imgData.year + "</span>";
                        imgWidth.innerHTML = "Width: <span class='metadata'>" + imgData.width + "px</span>";
                        imgHeight.innerHTML = "Height: <span class='metadata'>" + imgData.height + "px</span>";
                        imgSize.innerHTML = "Size: <span class='metadata'>" + imgData.file_size_bytes + " KB</span>";
                        imgSource.innerHTML = "Source: <span class='metadata blurry'>???</span>";
                        imgSubject.innerHTML = "Category: <span class='metadata blurry'>" + imgData.subject + "</span>";
                    } else {
                        imgFilename.innerHTML = "Filename: <span class='metadata blurry'>???</span>";
                        imgYear.innerHTML = "Year: <span class='metadata blurry'>???</span>";
                        imgWidth.innerHTML = "Width: <span class='metadata blurry'>???</span>";
                        imgHeight.innerHTML = "Height: <span class='metadata blurry'>???</span>";
                        imgSize.innerHTML = "Size: <span class='metadata blurry'>???</span>";
                        imgSource.innerHTML = "Source: <span class='metadata blurry'>???</span>";
                        imgSubject.innerHTML = "Category: <span class='metadata blurry'>???</span>";
                    }
                };
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    close.onclick = function() {
        modal.style.display = "none";
    };

    function changeOpacity(image) {
        console.log("Clicked image:", image);
        image.style.opacity = "0.2"; 
        image.style.filter = "grayscale(1) blur(2px)"; 
        image.parentElement.style.backgroundColor = "unset";
        image.parentElement.style.border = "unset";
    }
};