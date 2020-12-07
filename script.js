const apiKey = 'PQ7q59BDNRjuJthl0zQabCtFJmoP9lfgpchSdAeB';
const searchURL = 'https://developer.nps.gov/api/v1/parks'

function displayParksList(responseJson) {
    //empty results
    //for loop through response
    //remove hidden class
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURICompnent(key)}=${encodeURICompnent(params[key])}`);
    return queryItems.join('&');
}

function getParksList(state, maxResults=10) {
    //const params
    const params = {
        api_key: apiKey,
        stateCode: state,
        limit: maxResults
    };
    //const queryString - pass params to formatQParams
    const queryString = formatQueryParams(params);
    //const url
    const url = searchURL + '?' + queryString;
    //fetch
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => console.log(responseJson))  //displayParksList(responseJson)
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