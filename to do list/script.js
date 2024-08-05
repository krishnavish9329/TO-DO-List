// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get all elements with the class "doneBut"
    let doneButtons = document.querySelectorAll(".doneBut");

    // Loop through each "Done" button and attach a click event listener
    doneButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            // Get the closest ancestor "thredBox" element
            var thredBox = this.closest(".thredBox");

            // Find the child "samp" element within the "thredBox"
            var sampElement = thredBox.querySelector(".output");

            // Toggle a class to apply the underline style
            sampElement.classList.toggle("underline");
        });
    });
});


