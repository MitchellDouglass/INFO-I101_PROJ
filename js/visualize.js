// js file for visualizer

// instantiate
let countyData = {};

// load county data from JSON file
// run async
// TODO : Allow user to select year of data
// TODO : support multiple warning types
async function loadCountyData() {
    try {
        // open file
        const load = await fetch('../data/counties.json');
        
        // load data
        countyData = await load.json();
        
        //logging for my sake
        // TODO: remove logging before final
        console.log("worked! ", countyData);
    } catch (error) {
        console.error("something blew up: ", error);
    }
}

// run immediately
loadCountyData();

function addData(countyId) {
    // if countyData[countyId] exists we will use it 
    // if it returns undefined (not present in JSON file) we will set it to 0
    // so user knows there is no warnings and not just leave it blank
    const count = countyData[countyId] || 0; 

    // format name to look nice to the user
    const displayName = countyId.charAt(0).toUpperCase() + countyId.slice(1);

    // update the element
    document.getElementById("hoverData").innerHTML = `<br> ${displayName} County: ${count}`;
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