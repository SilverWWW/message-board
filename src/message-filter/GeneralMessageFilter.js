

async function GeneralMessageFilter({text}) {

    const $ = require('jquery');

    try {
        const response = await $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/profanityfilter?text=' + encodeURIComponent(text),
            headers: { 'X-Api-Key': 'd3aa3fATbXD6RKfBJdiNiw==KekLFNpP84ibsuSz'},
            contentType: 'application/json',
        });

        return response;
    } catch (error) {
        console.log('Error: ', error.responseText);
        return text;
    }
}

export default GeneralMessageFilter;
