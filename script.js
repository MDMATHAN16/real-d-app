function create(pri,name,loc,info)
{
    // Create the section element
var section = document.createElement("section");

// Set the id attribute of the image
var image = document.createElement("img");
image.setAttribute("id", "image");
image.setAttribute("src", "image.jpeg");
image.setAttribute("alt", "");
section.appendChild(image);

// Create and set the heading element
var heading = document.createElement("h1");
heading.textContent = loc;
section.appendChild(heading);

// Create and set the owner paragraph
var ownerParagraph = document.createElement("p");
ownerParagraph.setAttribute("class", "owner");
ownerParagraph.innerHTML = "Owner: <span>"+name+"</span>";
section.appendChild(ownerParagraph);

// Create and set the details paragraph
var detailsParagraph = document.createElement("p");
detailsParagraph.innerHTML = "<span>size</span> <span>type</span> <span>Active</span>";
section.appendChild(detailsParagraph);

// Create and set the description paragraph
var descriptionParagraph = document.createElement("p");
descriptionParagraph.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, eaq tecto sequi, repellendus deserunt nam!";
section.appendChild(descriptionParagraph);

// Create and set the price paragraph
var priceParagraph = document.createElement("p");
priceParagraph.innerHTML = "Price: <span>$"+pri+"</span>";
section.appendChild(priceParagraph);

// Create the buy button
var buyButton = document.createElement("button");
buyButton.textContent = "BUY";
buyButton.id = info;
buyButton.onclick = function(){
    buyProperty(buyButton.id);
}
buyButton.style.backgroundColor = "green";
section.appendChild(buyButton);

// Append the section to the document body or any desired parent element
document.body.appendChild(section);

}
