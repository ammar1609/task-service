const paypal = require('paypal-rest-sdk')

const { PAYPAL_MODE, PAYPAL_CLIENT_ID, PAYPAL_SECRET } = process.env


paypal.configure({
    mode: PAYPAL_MODE,
    client_id: PAYPAL_CLIENT_ID,
    client_secret: PAYPAL_SECRET
})

const payProduct = async (req, res) => {
    try {
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "https://prototype-sq8s.onrender.com/success",
                "cancel_url": "https://prototype-sq8s.onrender.com/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Book",
                        "sku": "item",
                        "price": 25.00,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": 25.00
                },
                "description": "Book purchase."
            }]
        }

        paypal.payment.create(create_payment_json, (error, payment) => {
            if (error) {
                return res.status(error.response.httpStatusCode).json(error.response)
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        res.redirect(payment.links[i].href)
                    }
                }
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}

const successPayment = (req, res) => {
    try {
        const payerId = req.query.PayerID
        const paymentId = req.query.paymentId

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "25.00"
                }
            }]
        }

        paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
            if (error) {
                console.log(error.response)
                return res.status(error.response.httpStatusCode).json(error.response)
                // throw error
            } else {
                console.log(JSON.stringify(payment))
                return res.send('Success')
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}

const cancelPayment = (req, res) => {
    try {
        return res.send('Cancelled')
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    payProduct,
    successPayment,
    cancelPayment
}