// js file for visualizer

// we are only using countyData temporarily (testing purpose)
// TODO: move to JSON storage for data
const countyData = {
    "marion": 8,
    "hancock": 6,
    "hamilton": 12,
    "boone": 4,
    "johnson": 9
};

// main function to add data for the specific county
function addData(countyId) {
    // this check prevents showing "XYZ County: undefined" to user (will just do nothing)
    if (countyData[countyId] !== undefined) {
        // capitalize the first letter of the countyId
        // data provided in lowercase
        const displayName = countyId.charAt(0).toUpperCase() + countyId.slice(1);
        
        // use a template for this to make it a bit less ugly
        const message = `<br> ${displayName} County: ${countyData[countyId]}`;
        
        document.getElementById("hoverData").innerHTML = message;
    }
}

// clear when user hovers off
function clearField() {
    document.getElementById("hoverData").innerHTML = "";
}

// loop through all elements with county-shape class instead of manually adding
// thank you gemini for this solution
const allCounties = document.querySelectorAll('.county-shape');

allCounties.forEach(countyElement => {
    
    // mouse enter
    countyElement.addEventListener("mouseenter", function() {
        // 'this.id' automatically grabs the id of the element hovered
        addData(this.id);
    });

    // mouse leave, so clear the field
    countyElement.addEventListener("mouseleave", () => clearField());
});