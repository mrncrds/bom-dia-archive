onload = function() {
    const modal = document.querySelector("#modal");
    const modalImg = document.querySelector("#modalContent");
    const captionText = document.querySelector("#modalCaption");
    const close = document.querySelector("#modalClose");

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
                    captionText.innerHTML = clickedImg.alt;
                };
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    close.onclick = function() {
        modal.style.display = "none";
    };
};