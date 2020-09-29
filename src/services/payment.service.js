const paymentModel = require('../mongo-models');

class PaymentService {
    getAllPayments() {
        return paymentModel.find({});
    }

    createPayment(obj) {
        return new paymentModel(obj).save();
    }

    deleteById() {
        return paymentModel.findByIdAndRemove()
    }
}
