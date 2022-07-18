const adminModel = require('../models/adminmodel');
const paymentModel = require('../models/paymentmodel');
const userModel = require('../models/usermodel');
const donationModel = require('../models/donationmodel');
const categoryModel = require('../models/categorymodel');

exports.adminLogin = async (req,res) => {
    try {
        console.log("Admin Login method");
        const username = req.body.username;
        const password = req.body.password;
        console.log(username);
        console.log(password);
        
        const data = await adminModel.count({username:username, password:password}); 
        console.log(data);
        if(data == 1){
            req.session = username;
            res.json({ status:200, msg:"Login Successfully..."});
        }else{
            res.json({ status:400, msg:"Invalid Username or Password..." });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

// Home 

exports.Summary = async(req,res) => {
    try {
        console.log("Summary method");
        const totalDoner = await userModel.count();
        const totalPayment = await paymentModel.count();
        const totalCategory = await categoryModel.count();
        const totalDonation = await donationModel.find();
        const cat = await categoryModel.find();

        res.json({
            "status":200,
            "totalDoner":totalDoner,
            "totalDonation":totalDonation,
            "totalPayment":totalPayment,
            "totalCategory":totalCategory,
            "cat":cat
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

exports.categoryWiseDonation = async(req,res) => {
    try {
        console.log("categoryWiseDonation method");
        const category = req.body.category;
        const data = await donationModel.find({dcategory:category});
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

// Admin profile

exports.fetchAdminProfile = async (req,res) => {
    try {
        console.log("fetchAdminProfile method");
        const username = req.body.username;
        console.log(username);
        const data = await adminModel.find({username:username});
        console.log(data);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

exports.updateAdminProfile = async (req,res) => {
    try {
        console.log("updateAdminProfile method");
        const id = req.body.id;
        const data = await adminModel.findByIdAndUpdate(id, {
            username:req.body.username,
            password:req.body.password,
            email:req.body.email,
            mobile:req.body.mobile
        });
        console.log(data);
        if(data){
            res.json({
                status:200,
                msg:"Update Successfully..."
            })
        }else{
            res.json({
                status:400,
                msg:"Try Again..."
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

// Doner Module

exports.fetchDoners = async (req,res) => {
    try {
        console.log('fetchDoners method');
        const data = await userModel.find();
        console.log(data);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};
exports.DeleteDoner = async (req,res) => {
    try {
        console.log('Doner Delete method');
        const data = await userModel.findByIdAndRemove(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};
exports.DonerView = async (req,res) => {
    try {
        console.log("DonerView method");
        const id = req.params.id;
        console.log(id);
        const data = await userModel.findById(id);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

exports.fetchDonerDonation = async(req,res) => {
    try {
        console.log("fetchDonerDonation method");
        const email = req.body.email;
        const data = await donationModel.find({email:email});
        console.log(data);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

// Payment Module

exports.AddPayment = async (req,res) => {
    try {
        console.log("AddPayment method");
        console.log(req.body);
        const payment = req.body.payment;
        const mobile = req.body.mobile;
        const upi = req.body.upi;
        const bank = req.body.bank;
        const account = req.body.account;
        const ifsc = req.body.ifsc;

        const p1 = new paymentModel({payment:payment, mobile:mobile, upi:upi, bank:bank, account:account, ifsc:ifsc});
        const data = await p1.save();
        if(data){
            console.log(data);
            res.json({
                status : 200,
                msg : "Payment Method Added Successfully..."
            });
        }
        else{
            res.json({
                status : 400,
                msg : "Try Again..."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};
exports.fetchPayments = async (req,res) => {
    try {
        console.log("fetchPayment method");
        const data = await paymentModel.find();
        console.log(data);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};
exports.deletePayment = async (req,res) => {
    try {
        console.log("deletePayment method");
        const data = await paymentModel.findByIdAndRemove(req.params.id);
        if(data){
            res.json({
                status:200,
                msg:"Delete Successfully..."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};
exports.viewPayment = async (req,res) => {
    try {
        console.log("viewPayment method");
        const id = req.params.id;
        console.log(id);
        const data = await paymentModel.findById(id);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

// Donation Module

exports.fetchDonation = async (req,res) => {
    try {
        console.log('fetcDonation method');
        const data = await donationModel.find();
        console.log(data);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

exports.deleteDonation = async (req,res) => {
    try {
        console.log("deleteDonation method");
        const data = await donationModel.findByIdAndRemove(req.params.id);
        if(data){
            res.json({
                status:200,
                msg:"Delete Successfully..."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

exports.viewDonation = async (req,res) => {
    try {
        console.log("viewDonation method");
        const id = req.params.id;
        console.log(id);
        const data = await donationModel.findById(id);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

// category

exports.addCategory = async (req,res) => {
    try {
        console.log("addCategory method");
        const category = req.body.category;
        const details = req.body.details;
        const c1 = categoryModel({category:category, details:details});
        const data = await c1.save();
        if(data){
            console.log(data);
            res.json({
                status : 200,
                msg : "Category Added Successfully..."
            });
        }
        else{
            res.json({
                status : 400,
                msg : "Try Again..."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

exports.fetchCategory = async (req,res) => {
    try {
        console.log("fetchCategory method");
        const data = await categoryModel.find();
        console.log(data);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};
exports.deleteCategory = async (req,res) => {
    try {
        console.log("deleteCategory method");
        const data = await categoryModel.findByIdAndRemove(req.params.id);
        if(data){
            res.json({
                status:200,
                msg:"Delete Successfully..."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};