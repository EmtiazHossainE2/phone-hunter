// keyup event added 
document.getElementById("search-text").addEventListener("keyup", function (event) {
    const searchInput = document.getElementById('search-text')
    const searchText = searchInput.value
    // console.log(event.key);
    if (event.key == 'Enter') {
        document.getElementById("spinner").classList.remove("d-none");
        document.getElementById("search-result").classList.add("d-none");
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data.data.slice(0, 20)))
        searchInput.value = ''
    }
});

const searchBtn = () => {
    const searchInput = document.getElementById('search-text')
    const searchText = searchInput.value
    searchInput.value = ''
    if (searchText == '') {
        alert('Oppps ! Write your favourite Phone name')
    }
    else {
        document.getElementById("spinner").classList.remove("d-none");
        document.getElementById("search-result").classList.add("d-none");
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data.data.slice(0, 20)))
    }

}
//display search result 
const displaySearchResult = phones => {
    document.getElementById("spinner").classList.add("d-none");
    document.getElementById("search-result").classList.remove("d-none");
    const searchResult = document.getElementById('search-result')
    searchResult.textContent = ''
    if (phones[0] == null) {
        const section = document.createElement('section')
        section.innerHTML = `
            <h4 class="text-light ms-5">Sorry ! Nothing To Show</h4>
        `
        searchResult.appendChild(section)
    }
    else {
        phones.forEach(phone => {
            const div = document.createElement('div')
            div.classList.add('col')
            div.innerHTML = `
                <div class="card h-100 py-4">
                    <img src="${phone.image}" class="card-img-top w-50 mx-auto"  alt="...">
                    <div class="card-body">
                        <h4 class="card-title text-center">${phone.phone_name}</h4>
                        <h5 class="card-title text-center mb-4">${phone.brand}</h5>
                        <button  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-success d-block mx-auto">Details Info</button>
                    </div>
                    </div>
                </div>
            `
            searchResult.appendChild(div)
        })
    }

}

const loadPhoneDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayPhoneDetails(data.data))
}

//Single phone details

const displayPhoneDetails = phone => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details')
    phoneDetails.innerHTML = `
        <div class="w-50 mx-auto">
            <img src="${phone.image}" class="card-img-top "  alt="...">
        </div>
        <div>
            <p class="mt-4"> <strong>Release Date : </strong> ${phone.releaseDate ? phone.releaseDate : 'Comming Soon'} </p>
            <p class="my-2"> <strong>Display Size : </strong> ${phone.mainFeatures.displaySize} </p>
            <p class="my-2"> <strong>Chip Set : </strong> ${phone.mainFeatures.chipSet} </p>
            <p class="my-2"> <strong>Momory : </strong> ${phone.mainFeatures.memory} </p>
            <p class="my-2"> <strong>Storage : </strong> ${phone.mainFeatures.storage} </p>
            <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        <h5>Senssor</h5>
                    </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">${phone.mainFeatures.sensors}</div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                        <h5>Other Features</h5>
                    </button>
                </h2>
                <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo"
                    data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>✅  ${phone.others?.WLAN ? phone.others?.WLAN : 'Not Included'} </p>
                        <p>✅  ${phone.others?.Bluetooth ? phone.others?.Bluetooth : 'Not Included'}</p>
                        <p>✅  ${phone.others?.GPS ? phone.others?.GPS : 'Not Included'}</p>
                    </div>
                </div>
            </div>
        </div>                  

    `
}