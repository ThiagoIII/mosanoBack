//const fetch = require('node-fetch') if needed to fetch https stuff on the server side

module.exports = {
    async index(request, response) {
        try {
            // let res = await fetch('https://restcountries.eu/rest/v2/all')
            // let data = await res.json()
            //if (res.ok) return response.status(200).json(data)
            let promis = await new Promise((resolve, reject) => {
                resolve([
                    { country: 'Portugal', continent: 'Europe', id: 0001 },
                    {
                        country: 'USA',
                        continent: 'North America',
                        id: 0002
                    }
                ])
            })

            return response.json(promis)
        } catch (error) {
            return response
                .status(400)
                .json(`Error: ${error} on fetching countries list.`)
        }
    }
}
