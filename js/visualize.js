// js file for visualizer

// instantiate
let countyData = {};

// these correspond to elements in the HTML
const yearSelect = document.getElementById('year-select');
const typeSelect = document.getElementById('type-select');

let currentYear = yearSelect.value;
let currentType = typeSelect.value;
// types: tor (tornado) , svr (severe thunderstorm) , ffw (flash flood warning)

// load county data from JSON file
// run async
// TODO : Allow user to select year of data
// TODO : support multiple warning types
async function loadCountyData(year, type) {
    try {
        // define path
        const url = `data/${year}/counties-${type}.json`;

        //load this path
        const load = await fetch(url);
        
        // load data
        countyData = await load.json();

        // run this when we do loadCountyData so an icon is always visible
        changeImg(type);
        
        //logging for my sake
        // TODO: remove logging before final
        console.log(`Success Loaded data for ${year} (${type}):`, countyData);
    } catch (error) {
        console.error(`something blew up in year ${year}: `, error);

        countyData = {};

        document.getElementById("hoverData").innerHTML = "ERROR Data not found for this selection.";
    }
}

// run immediately
loadCountyData(currentYear, currentType);

// Listen for Year changes
yearSelect.addEventListener('change', (e) => {
    currentYear = e.target.value;
    loadCountyData(currentYear, currentType);
});

// Listen for Warning Type changes
typeSelect.addEventListener('change', (e) => {
    currentType = e.target.value;
    loadCountyData(currentYear, currentType);
});

// change the image displayed in the data box
function changeImg(type) {
    document.getElementById("typeDisplay").src = `assets\/${type}-graphic.svg`; // have to use a stupid escape
}

function addData(countyId) {
    // if countyData[countyId] exists we will use it 
    // if it returns undefined (not present in JSON file) we will set it to 0
    // so user knows there is no warnings and not just leave it blank
    const count = countyData[countyId] || 0; 

    // format name to look nice to the user
    const displayName = countyId.charAt(0).toUpperCase() + countyId.slice(1);

    // so it doesn't look bad
    if (currentType == "tor") {
        fancyType = "Tornado";
    } else if (currentType == "svr") {
        fancyType = "Severe Thunderstorm";
    } else if (currentType == "ffw") {
        fancyType = "Flash Flood";
    }

    // update the element
    document.getElementById("hoverData").innerHTML = `<h5><strong>${displayName} County</strong></h5>${currentYear} ${fancyType} Warnings: <strong>${count}</strong>`;
}

// clear when user hovers off
function clearField() {
    document.getElementById("hoverData").innerHTML = "Hover over a county to view warning data!";
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

const yearSelectionElement = document.getElementById("year-selector");

if (yearSelectionElement) {
    yearSelectionElement.addEventListener('change', (event) => {
        // Update the global currentYear variable
        currentYear = event.target.value;
        
        // Reload the data with the new year
        loadCountyData(currentYear, currentType);
    });
}