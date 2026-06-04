onload = function() {

    // Fetch the images from the JSON file and display them in the grid
    fetch("images.json")
        .then(res => res.json())
        .then(images => {
        const grid = document.querySelector(".archive-grid-container");
        images.forEach(item => {
            console.log("Total images: " + images.length);

            // Create a grid item for each image
            const gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");

            // Create an image element and set its source and alt text
            const img = document.createElement("img");
            img.src = "images/" + item.filename;
            img.alt = "Bom dia image";
            img.loading = "lazy";

            gridItem.appendChild(img);
            grid.appendChild(gridItem);
        });
    });

};