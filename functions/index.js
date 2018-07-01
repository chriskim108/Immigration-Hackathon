const express = require('express');
const app = express() 

const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const cors = require('cors');

var LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3');
var languageTranslator = new LanguageTranslatorV3({
    version: '2018-05-01',
    iam_apikey: "yLEDbjvd1fxV4C0h82BrNkmTMuTzP3RFJeJN2kFl_nkH"
});

var parameters = {
    text: 'Surprse mother fucker ',
    model_id: 'en-es'
};

app.use(cors({origin: true}))


app.get('/', (req, res) => {
    console.log('Here in the routes?')
    return languageTranslator.translate(
        parameters,
        function (error, response) {
            if (error)
                console.log(error)
            else
                console.log(JSON.stringify(response, null, 2))
        }
    );
})

app.post('/trans/', (req,res,next) => {
    let lang = req.body.lang;
    let text = req.body.text;
    console.log(lang)
    let model_id = `${lang}-en`

    let parameters = {text, model_id}
    console.log(parameters)
    
    return languageTranslator.translate(
        parameters,
        function (error, response) {
            if (error)
                console.log(error)
            else
                console.log(JSON.stringify(response, null, 2))
                res.json(response)
        }
    );
    
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
//     (request, response) => {
//     // console.log(request, response)
//     // var languageTranslator = new LanguageTranslatorV3({
//     //     version: '2018-05-01',
//     //     iam_apikey: "yLEDbjvd1fxV4C0h82BrNkmTMuTzP3RFJeJN2kFl_nkH"
//     //      url: "https://gateway.watsonplatform.net/language-translator/api""
//     // });

  


//     console.log('hi')
//     // return cors(request, response, () => {
//     //     languageTranslator.listIdentifiableLanguages(
//     //         {},
//     //         function (err, response) {
//     //             if (err)
//     //                 console.log(err)
//     //             else
//     //                 console.log(JSON.stringify(response, null, 2));
//     //         }
//     //     );
//     // })

//     return cors(request, response, () => {
//         languageTranslator.translate(
//             parameters,
//             function (error, response) {
//                 if (error)
//                     console.log(error)
//                 else
//                     console.log(JSON.stringify(response, null, 2))
//             }
//         );
//     })

// })
