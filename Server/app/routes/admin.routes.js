module.exports = (app) => {
    const adminCon = require('../controller/admincontroller');

    app.get('/summary',adminCon.Summary);
    app.post('/categoryWiseDonation',adminCon.categoryWiseDonation);

    app.post('/fetchAdminProfile',adminCon.fetchAdminProfile);
    app.patch('/updateAdminProfile',adminCon.updateAdminProfile);

    app.post('/adminLogin',adminCon.adminLogin);
    app.get('/fetchDoners',adminCon.fetchDoners);
    app.delete('/deleteDoner/:id',adminCon.DeleteDoner);
    app.post('/donerview/:id',adminCon.DonerView);
    app.post('/fetchDonerDonation',adminCon.fetchDonerDonation);

    app.post('/addpayment',adminCon.AddPayment);
    app.get('/fetchPayments',adminCon.fetchPayments);
    app.delete('/deletePayment/:id',adminCon.deletePayment);
    app.post('/paymentview/:id',adminCon.viewPayment); 

    app.get('/fetchDonation', adminCon.fetchDonation);
    app.delete('/deleteDonation/:id',adminCon.deleteDonation);
    app.post('/donationtview/:id',adminCon.viewDonation);

    app.get('/fetchCategory',adminCon.fetchCategory);
    app.post('/addcategory',adminCon.addCategory);
    app.delete('/deleteCategory/:id',adminCon.deleteCategory);
}