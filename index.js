const axios = require('axios')
const writeCsv = require('./writeCsv')

const main = async (id, count) => {
    for (let i = 1; i <= count; i++) {
        try {
            const { data } = await axios.get(`https://api.nclbgc.org/v3/License?number=${id}`)

            const { name1, status, renewalDate, city, state, zip, telephone, qualifiers } = data

            const output = {
                lic_number: id,
                business_name: name1,
                name: qualifiers[0],
                phone_number: telephone,
                status,
                renewal_date: renewalDate,
                city,
                state,
                zip
            }

            writeCsv(output)
            console.log(`${i} | ${id} | Successfully scraped ${output.business_name}`)
        } catch (e) {
            console.log(`${i} | ${id} | No Data Found`)
        }

        id++
    }
}

main(77658, 10000)