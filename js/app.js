const searchBtn = () => {
    const searchInput = document.getElementById('search-text')
    const searchText = searchInput.value
    searchInput.value = ''
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(response => response.json())
        .then(data => displaySearchResult(data.data.slice(0, 20)))
}
const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result')
    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
            <div class="card h-100 py-4">
                <img src="${phone.image}" class="card-img-top w-50 mx-auto"  alt="...">
                <div class="card-body">
                    <h4 class="card-title text-center">${phone.phone_name}</h4>
                    <h5 class="card-title text-center">${phone.brand}</h5>
                    <button  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-success d-block mx-auto">Details Info</button>
                </div>
                </div>
            </div>
        `
        searchResult.appendChild(div)
    })
}

