const apiKey = 'PQ7q59BDNRjuJthl0zQabCtFJmoP9lfgpchSdAeB';
const searchURL = 'https://developer.nps.gov/api/v1/parks'

function displayParksList(responseJson) {
    console.log(reponseJson)
    $('.results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('.results-list').append(`
        <li><h4><a href=${responseJson.data[i].url}>${responseJson.data[i].fullName}</a></h4>
        <p>${responseJson.data[i].description}</p>
        <p>Visit this parks website: <a href=${responseJson.data[i].url}>${responseJson.data[i].url}</a></p>
        </li>`)
    }
    $('.results').removeClass('hidden');
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function getParksList(state, maxResults=10) {
    const params = {
        api_key: apiKey,
        stateCode: state,
        limit: maxResults
    };
    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayParksList(responseJson))
        .catch(err => {
            $('.js-error-message').text(`Uh oh! An error occured: ${err.message}`);
        });
}



function watchForm() {
    $('.js-form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getParksList(searchTerm, maxResults);
    })
}

$(watchForm);