const { paymentService } = require('../services');


class PaymentController {
    async getAll(req, res, next) {
        try {
            const allPayments = await paymentService.getAllPayments();

            res.json(allPayments);
        } catch(e) {
            next(e);
        }
    }
    async createPayment(req, res, next) {
        try {
            const allPayments = await paymentService.createPayment(req.body);

            res.json(allPayments);
        } catch (e) {
            next(e)
        }
    }
    async deletePayment(req, res, next) {
        try {
            const payment = await paymentService.deleteById(req.body);

            res.json(payment)
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new PaymentController();
