const Joi = require('joi')

const schema = Joi.object({
    firstName: Joi.string()
        .trim()
        .regex(/^[a-zA-Z]*$/)
        .min(1)
        .max(50)
        .required(),
    surname: Joi.string()
        .trim()
        .regex(/^[a-zA-Z]*$/)
        .min(1)
        .max(50)
        .required(),
    country: Joi.string()
        .trim()
        .regex(/^[a-zA-Z]*$/)
        .min(1)
        .max(50)
        .required(),
    birthday: Joi.string()
        .trim()
        .length(10)
        .pattern(
            /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.]((?:19|20)\d\d)/
        )
        /* .date()
        .max('now') */
        .required(),
    id: Joi.string().guid({
        version: ['uuidv4']
    }),
    day: Joi.number().min(1).max(31),
    month: Joi.number().min(0).max(11),
    age: Joi.number().min(0)
})

module.exports = {
    async index(request, response) {
        const {
            data: { firstName, surname, country, birthday, id },
            dayMonthAge: { day, month, inputMonth, age }
        } = request.body

        //console.log(day, inputMonth, age, birthday)

        try {
            const value = await schema.validateAsync({
                firstName: firstName,
                surname: surname,
                country: country,
                birthday: birthday,
                id: id,
                day: day,
                month: inputMonth,
                age: age
            })
            //console.log(value)
            let promis = await new Promise((resolve, reject) => {
                resolve({
                    data: { firstName, surname, country, birthday, id },
                    dayMonthAge: { day, month, age }
                })
            })

            return response.json(promis)
        } catch (error) {
            // console.log('error on server')
            return response
                .status(400)
                .json(`Error: ${error} on validating user data.`)
        }
    }
}
