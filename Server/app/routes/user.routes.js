module.exports = (app) => {
    const userCon = require('../controller/usercontroller');

    app.get('/fetchContact',userCon.fetchContact);

    app.post('/fetchUserProfile',userCon.fetchUserProfile);
    app.patch('/updateUserProfile',userCon.updateUserProfile);

    app.post('/checkUser',userCon.checkUser);
    app.post('/registration', userCon.userReg);
    app.post('/userLogin', userCon.userLogin);
    app.get('/fetchallpayment', userCon.fetchAllPayment);
    app.get('/fetchallcategory', userCon.fetchAllCategory);
    app.post('/dodonat', userCon.doDonat);
    app.post('/fetchalldonation',userCon.fetchAllDonation);
}