var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var nodemailer = require('nodemailer');


// Connect to DB
mongoose.connect('mongodb://hydrakimoni:kimoni1@ds235411.mlab.com:35411/hydraloan', {useNewUrlParser: true});
//Create Schema
var Schema = mongoose.Schema;
// var ObjectId = Schema.ObjectId;
// var reg_date = Date();

var applicationSchema = new Schema ({
    // reg_date: Date(),
    first_name: String,
    last_name: String,
    email: String,
    cell_phone: String,
    business_name: String,
    monthly_revenue: String,
    time_in_business: String,
    industry: String,
    requested_amount: String,
    business_address: String,
    business_city: String,
    business_state: String,
    business_zip: String,
    business_phone: String,
    company_structure: String,
    ownership_percent: String,
    ein: String,
    bank_routing_number: String,
    business_website: String,
    home_address: String,
    home_city: String,
    home_state: String,
    home_zip: String,
    ssn: String,
    dob: String,
    phone_opt_in: String,
    text_opt_in:String
});

//Create Model for /app
var applyModel = mongoose.model('Register', applicationSchema);


var urlencodedParser = bodyParser.urlencoded({ extended: false });

var tempApply = {
    // reg_date: '',
    first_name: '',
    last_name: '',
    email: '',
    cell_phone: '',
    business_name: '',
    monthly_revenue: '',
    time_in_business: '',
    industry: '',
    requested_amount: '',
    business_address: '',
    business_city: '',
    business_state: '',
    business_zip: '',
    business_phone: '',
    company_structure: '',
    ownership_percent: '',
    ein: '',
    bank_routing_number: '',
    business_website: '',
    home_address: '',
    home_city: '',
    home_state: '',
    home_zip: '',
    ssn: '',
    dob: '',
    phone_opt_in: '',
    text_opt_in:''
};

// Connect to DB
// var url = 'mongodb://hydrakimoni:kimoni1@ds235411.mlab.com:35411/hydraloan';



module.exports = function (app) {

    // app.use(session({
    //     secret: 'kimoni',
    //     resave: true,
    //     saveUninitialized: true,
    //     store: new MongoStore( {mongooseConnection: mongoose.connection} )
    //     }));
    // // Session

        //Route direct apply
        app.get('/', function(req, res){
            res.render('index');
        });
    
        app.get('/app', function(req, res){
            res.render('app/general_information');
        });
    
        app.get('/app/general_information', function(req, res){
            res.render('app/general_information');
        });
        app.post('/app/general_information', urlencodedParser, function(req, res){
            tempApply.first_name = req.body.first_name;
            tempApply.last_name = req.body.last_name;
            tempApply.email = req.body.email;
            tempApply.cell_phone = req.body.cell_phone;
            tempApply.business_name = req.body.business_name;
            tempApply.monthly_revenue = req.body.monthly_revenue;
            tempApply.time_in_business = req.body.time_in_business;
            tempApply.industry = req.body.industry;
            tempApply.requested_amount = req.body.requested_amount;
            tempApply.terms_and_conditions = req.body.terms_and_conditions;
            res.render('app/business_information');
            // var newApply = applyModel(req.body).save(function (err,data){
            //     if (err) throw err;
            //     res.render('app/business_information');
            // });
        });
    
        app.get('/app/business_information', function(req, res){
            res.render('app/business_information');
        });
        app.post('/app/business_information', urlencodedParser, function(req, res){
            tempApply.business_address = req.body.business_address;
            tempApply.business_city = req.body.business_city;
            tempApply.business_state = req.body.business_state;
            tempApply.business_zip = req.body.business_zip;
            tempApply.business_phone = req.body.business_phone;
            tempApply.company_structure = req.body.company_structure;
            tempApply.ownership_percent = req.body.ownership_percent;
            tempApply.ein = req.body.ein;
            tempApply.bank_routing_number = req.body.bank_routing_number;
            tempApply.business_website = req.body.business_website;
            res.render('app/personal_information');
            // var newApply = applyModel(req.body).save(function (err,data){
            //     if (err) throw err;
            //     res.render('app/personal_information');
            // });
        });
    
        app.get('/app/personal_information', function(req, res){
            res.render('app/personal_information');
        });
        app.post('/app/personal_information', urlencodedParser, function(req, res){
            tempApply.home_address = req.body.home_address;
            tempApply.home_city = req.body.home_city;
            tempApply.home_state = req.body.home_state;
            tempApply.home_zip = req.body.home_zip;
            tempApply.ssn = req.body.ssn;
            tempApply.dob = req.body.dob;
            tempApply.phone_opt_in = req.body.phone_opt_in;
            tempApply.text_opt_in = req.body.text_opt_in;
            var newApply = applyModel(tempApply).save(function (err,data){
                if (err) throw err;
                res.render('app/review');
            });
            let transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true, // true for 465, false for other ports
                        auth: {
                            user: 'support@hydrafunding.biz', // generated ethereal user
                            pass: 'Amidat2016!!' // generated ethereal password
                        },
                        tls:{
                            rejectUnauthorized: false
                        }
                    });
    
                    // setup email data with unicode symbols
                    let mailOptions = {
                        from: '"Hydra Finance" <support@hydrafunding.biz>', // sender address
                        to: tempApply.email, // list of receivers
                        subject: 'Loan Application successful!!!', // Subject line
                        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                        <html xmlns="http://www.w3.org/1999/xhtml"
                        xmlns:v="urn:schemas-microsoft-com:vml"
                        xmlns:o="urn:schemas-microsoft-com:office:office">
                        <head>
                            <!--[if gte mso 9]><xml>
                            <o:OfficeDocumentSettings>
                            <o:AllowPNG/>
                            <o:PixelsPerInch>96</o:PixelsPerInch>
                            </o:OfficeDocumentSettings>
                            </xml><![endif]-->
                            <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                            <meta name="format-detection" content="date=no" />
                            <meta name="format-detection" content="address=no" />
                            <meta name="format-detection" content="telephone=no" />
                            <title>Email Template</title>
                            

                            <style type="text/css" media="screen">
                                /* Linked Styles */
                                body { padding:0 !important; margin:0 !important; display:block !important; background:#1e1e1e; -webkit-text-size-adjust:none }
                                a { color:#a88123; text-decoration:none }
                                p { padding:0 !important; margin:0 !important } 

                                /* Mobile styles */
                                </style>
                                <style media="only screen and (max-device-width: 480px), only screen and (max-width: 480px)" type="text/css">
                                @media only screen and (max-device-width: 480px), only screen and (max-width: 480px) { 
                                    div[class='mobile-br-5'] { height: 5px !important; }
                                    div[class='mobile-br-10'] { height: 10px !important; }
                                    div[class='mobile-br-15'] { height: 15px !important; }
                                    div[class='mobile-br-20'] { height: 20px !important; }
                                    div[class='mobile-br-25'] { height: 25px !important; }
                                    div[class='mobile-br-30'] { height: 30px !important; }

                                    th[class='m-td'], 
                                    td[class='m-td'], 
                                    div[class='hide-for-mobile'], 
                                    span[class='hide-for-mobile'] { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }

                                    span[class='mobile-block'] { display: block !important; }

                                    div[class='wgmail'] img { min-width: 320px !important; width: 320px !important; }

                                    div[class='img-m-center'] { text-align: center !important; }

                                    div[class='fluid-img'] img,
                                    td[class='fluid-img'] img { width: 100% !important; max-width: 100% !important; height: auto !important; }

                                    table[class='mobile-shell'] { width: 100% !important; min-width: 100% !important; }
                                    td[class='td'] { width: 100% !important; min-width: 100% !important; }
                                    
                                    table[class='center'] { margin: 0 auto; }
                                    
                                    td[class='column-top'],
                                    th[class='column-top'],
                                    td[class='column'],
                                    th[class='column'] { float: left !important; width: 100% !important; display: block !important; }

                                    td[class='content-spacing'] { width: 15px !important; }

                                    div[class='h2'] { font-size: 44px !important; line-height: 48px !important; }
                                } 
                            </style>
                        </head>
                        <body class="body" style="padding:0 !important; margin:0 !important; display:block !important; background:#1e1e1e; -webkit-text-size-adjust:none">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#1e1e1e">
                                <tr>
                                    <td align="center" valign="top">
                                        <!-- Top -->
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#161616">
                                            <tr>
                                                <td align="center" valign="top">
                                                    <table width="600" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
                                                        <tr>
                                                            <td class="td" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; width:600px; min-width:600px; Margin:0" width="600">
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                    <tr>
                                                                        <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                                                        <td>
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="10" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>

                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                <tr>
                                                                                    <td>
                                                                                        <div class="text-header" style="color:#666666; font-family:Arial, sans-serif; min-width:auto !important; font-size:12px; line-height:16px; text-align:left">
                                                                                            <a href="#" target="_blank" class="link-1" style="color:#666666; text-decoration:none"><span class="link-1" style="color:#666666; text-decoration:none"><img src="https://d1pgqke3goo8l6.cloudfront.net/ZBZBRNHoQoCRD4F8SSN0_ico_webversion.jpg" border="0" width="14" height="16" alt="" style="vertical-align: middle;" />&nbsp; Web Version</span></a>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <div class="text-header-1" style="color:#666666; font-family:Arial, sans-serif; min-width:auto !important; font-size:12px; line-height:16px; text-align:right">
                                                                                            <a href="#" target="_blank" class="link-1" style="color:#666666; text-decoration:none"><span class="link-1" style="color:#666666; text-decoration:none"><img src="images/ico_forward.jpg" border="0" width="14" height="16" alt="" style="vertical-align: middle;" />&nbsp; Forward</span></a>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="10" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>

                                                                        </td>
                                                                        <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        <!-- END Top -->

                                        <table width="600" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
                                            <tr>
                                                <td class="td" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; width:600px; min-width:600px; Margin:0" width="600">
                                                    <!-- Header -->
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                                            <td>
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="30" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>

                                                                <div class="img-center" style="font-size:0pt; line-height:0pt; text-align:center"><a href="#" target="_blank"><img src="/assets/loanbuilder/images/logo.png" border="0" width="203" height="27" alt="" /></a></div>
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="30" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>


                                                                <!-- <div class="hide-for-mobile">
                                                                    <div class="text-nav" style="color:#ffffff; font-family:Arial, sans-serif; min-width:auto !important; font-size:12px; line-height:22px; text-align:center">
                                                                        <a href="#" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none"><span class="link-white" style="color:#ffffff; text-decoration:none">HOME</span></a>
                                                                        &nbsp;&nbsp;|&nbsp;&nbsp;
                                                                        <a href="#" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none"><span class="link-white" style="color:#ffffff; text-decoration:none">NEW PRODUCTS</span></a>
                                                                        &nbsp;&nbsp;|&nbsp;&nbsp;
                                                                        <a href="#" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none"><span class="link-white" style="color:#ffffff; text-decoration:none">CATALOGUE</span></a>
                                                                        &nbsp;&nbsp;|&nbsp;&nbsp;
                                                                        <a href="#" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none"><span class="link-white" style="color:#ffffff; text-decoration:none">CONTACT US</span></a>
                                                                    </div>
                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="20" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>

                                                                </div> -->
                                                            </td>
                                                            <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                                        </tr>
                                                    </table>
                                                    <!-- END Header -->

                                                    <!-- Main -->
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td>
                                                                <!-- Head -->
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#d2973b">
                                                                    <tr>
                                                                        <td>
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                <tr>
                                                                                    <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="27"><img src="https://d1pgqke3goo8l6.cloudfront.net/JJxrFRyVRr20CJD3pOx9_top_left.jpg" border="0" width="27" height="27" alt="" /></td>
                                                                                    <td>
                                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                            <tr>
                                                                                                <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" height="3" bgcolor="#e6ae57">&nbsp;</td>
                                                                                            </tr>
                                                                                        </table>
                                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="24" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>

                                                                                    </td>
                                                                                    <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="27"><img src="https://d1pgqke3goo8l6.cloudfront.net/SNcoUN5kSfCDagqSBEZ4_top_right.jpg" border="0" width="27" height="27" alt="" /></td>
                                                                                </tr>
                                                                            </table>
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                <tr>
                                                                                    <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="3" bgcolor="#e6ae57"></td>
                                                                                    <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="10"></td>
                                                                                    <td>
                                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="15" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>

                                                                                        <div class="h3-2-center" style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:20px; line-height:26px; text-align:center; letter-spacing:5px">Loan Application</div>
                                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="5" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>


                                                                                        <div class="h2" style="color:#ffffff; font-family:Georgia, serif; min-width:auto !important; font-size:60px; line-height:64px; text-align:center">
                                                                                            <em>Successful!</em>
                                                                                        </div>
                                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="35" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>

                                                                                    </td>
                                                                                    <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="10"></td>
                                                                                    <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="3" bgcolor="#e6ae57"></td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <!-- END Head -->

                                                                <!-- Body -->
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                                                    <tr>
                                                                        <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                                                        <td>
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="35" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>

                                                                            <div class="h3-1-center" style="color:#1e1e1e; font-family:Georgia, serif; min-width:auto !important; font-size:20px; line-height:26px; text-align:center">Dear ${tempApply.first_name},
                                                                                <br>We are pleased to inform you that your loan application is successful and after reviewing your informations, we will get back to you on our decision and disburse your loan in due time.<br> The loan amount you requested for is ${tempApply.requested_amount} and your business name is ${tempApply.business_name}. All other information have been safely stored and will only be visible to our dedicated staff who will ensure your loan is successful.</div>
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="20" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>

                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="40" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>

                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="35" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>


                                                                            <div class="h5-center" style="color:#1e1e1e; font-family:Georgia, serif; min-width:auto !important; font-size:16px; line-height:26px; text-align:center">
                                                                                <em>
                                                                                    Thank you. 
                                                                                    <br />
                                                                                    Please <a href="www.hydrafunding.com" target="_blank" class="link-u" style="color:#a88123; text-decoration:underline"><span class="link-u" style="color:#a88123; text-decoration:underline">contact us</span></a> with any questions regarding your loan.
                                                                                </em>
                                                                            </div>
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="35" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>

                                                                        </td>
                                                                        <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                                                    </tr>
                                                                </table>
                                                                <!-- END Body -->

                                                                <!-- Foot -->
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#d2973b">
                                                                    <tr>
                                                                        <td>
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                <tr>
                                                                                    <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="3" bgcolor="#e6ae57"></td>
                                                                                    <td>
                                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="30" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>

                                                                                        <div class="h3-1-center" style="color:#1e1e1e; font-family:Georgia, serif; min-width:auto !important; font-size:20px; line-height:26px; text-align:center">
                                                                                            <em>Hydra Funding</em>
                                                                                        </div>
                                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="15" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>


                                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="15" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>

                                                                                    </td>
                                                                                    <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="3" bgcolor="#e6ae57"></td>
                                                                                </tr>
                                                                            </table>
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                <tr>
                                                                                    <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="27"><img src="https://d1pgqke3goo8l6.cloudfront.net/nK8bYazcQWGAQt8sAH2g_bot_left.jpg" border="0" width="27" height="27" alt="" /></td>
                                                                                    <td>
                                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="24" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>

                                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                            <tr>
                                                                                                <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" height="3" bgcolor="#e6ae57">&nbsp;</td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </td>
                                                                                    <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="27"><img src="https://d1pgqke3goo8l6.cloudfront.net/v9RanaDRM2FzjQNT9PwV_bot_right.jpg" border="0" width="27" height="27" alt="" /></td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <!-- END Foot -->
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <!-- END Main -->
                                                    
                                                    <!-- Footer -->
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                                            <td>
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="30" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>

                                                                <div class="text-footer" style="color:#666666; font-family:Arial, sans-serif; min-width:auto !important; font-size:12px; line-height:18px; text-align:center">
                                                                        2310 W. 75th Street,<span class="mobile-block"></span> Prairie Village, KS 66208,<span class="mobile-block"></span> USA
                                                                    <br />
                                                                    <a href="https://hydrafunding.biz" target="_blank" class="link-1" style="color:#666666; text-decoration:none"><span class="link-1" style="color:#666666; text-decoration:none">hydrafunding.biz</span></a>
                                                                    <span class="mobile-block"><span class="hide-for-mobile">|</span></span>
                                                                    <a href="mailto:support@hydrafunding.biz" target="_blank" class="link-1" style="color:#666666; text-decoration:none"><span class="link-1" style="color:#666666; text-decoration:none">support@hydrafunding.biz</span></a>
                                                                    <span class="mobile-block"><span class="hide-for-mobile">|</span></span>
                                                                    Phone: <a href="tel:+15672339839" target="_blank" class="link-1" style="color:#666666; text-decoration:none"><span class="link-1" style="color:#666666; text-decoration:none">+1 (567) 2339839</span></a>
                                                                </div>
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="30" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>

                                                            </td>
                                                            <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                                        </tr>
                                                    </table>
                                                    <!-- END Footer -->
                                                </td>
                                            </tr>
                                        </table>
                                        <div class="wgmail" style="font-size:0pt; line-height:0pt; text-align:center"><img src="https://d1pgqke3goo8l6.cloudfront.net/oD2XPM6QQiajFKLdePkw_gmail_fix.gif" width="600" height="1" style="min-width:600px" alt="" border="0" /></div>
                                    </td>
                                </tr>
                            </table>
                        </body>
                        </html>`
                    };
    
                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message sent: %s', info.messageId);
                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                        res.render('app/success');
                    });
            res.render('app/review');
        });
    
        app.get('/app/review', function(req, res){
            res.render('app/review');
        });
        app.post('/app/review', function(req, res){
            var newApply = applyModel(tempApply).save(function (err,data){
                if (err) throw err;
                res.render('app/success');
            });
        });

        app.get('/app/success', function(req, res){
            res.render('app/success');
        });


        //page
        app.get('/page/contact', function(req, res){
            res.render('page/contact');
        });
    
        app.get('/page/e_sign', function(req, res){
            res.render('page/e_sign');
        });
    
        app.get('/page/privacy', function(req, res){
            res.render('page/privacy');
        });
    
        app.get('/page/terms', function(req, res){
            res.render('page/terms');
        });

        app.get('/kimoni', function(req, res){
                //retrieving information
                // MongoClient.connect(url, function(err, db) {
                //     if (err) throw err;
                //     var dbo = db.db("hydraloan");
                //     dbo.collection("registers").find({}).toArray(function(err, result) {
                //         if (err) throw err;
                //         res.render('kimoni', {registers: result});
                //         // console.log(result);
                //         db.close();
                //         });
                //     });
                applyModel.find({}, function(err, result){
                    if (err) throw err;
                    // console.log(result);
                    res.render('kimoni', {registers: result});
                });
        });
};