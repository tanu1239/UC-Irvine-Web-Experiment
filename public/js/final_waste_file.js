
var numss = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54],//all numbers to be randomized
    ranNums = [],
    i = numss.length,
    j = 0;

while (i--) {
    j = Math.floor(Math.random() * (i+1));
    ranNums.push(numss[j]);
    numss.splice(j,1);
}

console.log(ranNums)


trialss = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54]


var index = 0;
var sensor_pic = trialss[0];
var temps = 0;
var reveal = trialss[0];
var experiment = [];

// All HTML pages to be loaded
var pages = [
    "demographics.html",
    "ELS.html",
    // "pss.html",
    "instruct-1.html",
    "instruct-2.html",
];



/********************
 * HTML manipulation
 * All HTML files in the templates directory are requested
 * from the server when the PsiTurk object is created above. We
 * need code to get those pages from the PsiTurk object and
 * insert them into the document.
 *
 ********************/

var check_demo = function() {
    var demoNames = ["Gender", "Ethnicity", "Race"];
    var demoResponses = [];
    for (var j = 0; j < demoNames.length; j++) {
        var checkit = 0;
        var demoVal = document.getElementsByName(demoNames[j]);
        for (var i = 0, l = demoVal.length; i < l; i++) {
            if (demoVal[i].checked) {
                demoResponses[j] = demoVal[i].value;
                checkit++;
            }
        }
        if (checkit === 0) {
            alert("If you wish to participate, you must answer the demographic questions.'");
            result=true
            return false;
        } else {
            result=false
        }
        function save() {
            localStorage.setItem('demoResponses', JSON.stringify(demoResponses));
        }
        function load() {
            score = JSON.parse(localStorage.getItem('demoResponses'));
        }
    }


    var ageN=document.getElementById("Age").value
    if (ageN.length < 2){
        alert("Please enter your age, or N/A")
        result2=true;
    }else{
        demoResponses.push(ageN);
        jsPsych.data.addProperties({demographics: demoResponses});
        result2=false;
    }
    if (result === true || result2 === true) {
        return false;
    } else {
        return true;
    }
}
//
// var check_PSS = function() {
//     var pssNames = ["1","2","3","4","5","6","7","8","9","10"];
//     var pssResponses = [];
//     let result;
//     for (var j = 0; j < pssNames.length; j++) {
//         var checkit = 0;
//         var pssVal = document.getElementsByName(pssNames[j]);
//         for (var i = 0; i < pssVal.length; i++) {
//             if (pssVal[i].checked) {
//                 pssResponses[j] = pssVal[i].value; //
//                 checkit++;
//             }
//         }
//         if (checkit === 0) {
//             alert("Please answer all of the questions on this page to complete the study.");
//             result = true;
//             return false;
//         } else {
//             result = false
//         }
//     }
//     if (result === true) {
//         return false;
//     } else {
//         jsPsych.data.addProperties({pssResp: pssResponses});
//         return true;
//     }
// };


var check_ELS = function() {
    var elsNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"];
    var ageIDs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"];
    var elsResponses = [];
    var elsAges = [];
    let result;
    for (var j = 0; j < elsNames.length; j++) {
        var checkit = 0;
        var checktxt = 0;
        var checkNotxt = 0;
        var elsVal = document.getElementsByName(elsNames[j]);
        var elsText = document.getElementById(ageIDs[j]).value;
        for (var i = 0; i < elsVal.length; i++) {
            if (elsVal[i].checked) {
                elsResponses[j] = elsVal[i].value; // yes=0 and no=1
                checkit++;
                if (elsVal[i].value === "0/" && elsText.length < 1) { //if question marked yes & no txt
                    checktxt++;
                } else if (elsVal[i].value === "1/" && elsText.length >=1) { //if question marked yes & no txt
                    checkNotxt++;
                } else if (elsVal[i].value === "0/" && elsText.length >=1) {
                    elsAges[j]=elsText;
                } else if (elsVal[i].value === "1/" ) {
                    elsAges[j]=0;
                }
            }
        }
        if (checkit > 0 && checktxt+checkNotxt > 0) {
            if (checktxt > 0) {
                alert("For every item checked Yes, please enter your age in the corresponding text box.");
                result = true;
                return false;
            } else if (checkNotxt > 0) {
                alert("Do not enter an age unless checking Yes.");
                result = true;
                return false;
            }
        } else if (checkit === 0) {
            alert("Please answer all of the questions on this page to complete the study.");
            result = true;
            return false;
        } else if (checkit > 0 && checktxt+checkNotxt === 0) {
            result = false;
        }
    }
    if (result === true) {
        return false;
    } else {
        jsPsych.data.addProperties({elsResp: elsResponses});
        jsPsych.data.addProperties({elsAge: elsAges});
        return true;
    }
};

// specify the questionnaire files
var demographics = {
    type: 'external-html',
    url: "demographics.html",
    cont_btn: "submitDemo",
    check_fn: check_demo
}
//
// var pssquestionnaire = {
//     type:'external-html',
//     url: "PSS.html",
//     execute_script: true,
//     cont_btn: "submitPSS",
//     check_fn: check_PSS
// };

var elsquestionnaire = {
    type:'external-html',
    url: "ELS.html",
    execute_script: true,
    cont_btn: "submitELSQ",
    check_fn: check_ELS
};

/********************
 * EXPLORATION GAME*
 ********************/

// Welcome & Instruction Pages
var instruction1 = {
    type: 'external-html',
    url: "instruct-1.html",
    cont_btn: "next",
};

var instruction2 = {
    type: 'external-html',
    url: "instruct-2.html",
    cont_btn: "next",
};


var instructions = {
    type: "instructions",
    pages: ['<img src="images/Instructions/Instructions1_light.jpg">',
        '<img src="images/Instructions/Instructions2.jpg">',
        '<img src="images/Instructions/Instructions3_light.jpg">',
        '<img src="images/Instructions/Instructions4_light.jpg">',
        '<img src="images/Instructions/Instructions5_light.jpg">',
        '<img src="images/Instructions/Instructions6_light.jpg">',
        '<img src="images/Instructions/Instructions8.JPG">',
        '<img src="images/Instructions/Instructions9.jpg">',
        '<img src="images/Instructions/Instructions10.jpg">',],
    show_clickable_nav: true
};


var preload1221 = {
    type: 'preload',
    images: ['images/snip1.JPG', 'images/snip2.JPG', 'images/snip3.JPG', 'images/snip4.JPG', 'images/snip5.JPG', 'images/snip6.JPG', 'images/snip7.JPG', 'images/snip8.JPG',
        'images/snip9.JPG', 'images/snip10.JPG', 'images/snip11.JPG', 'images/snip12.JPG', 'images/snip13.JPG', 'images/snip14.JPG', 'images/snip15.JPG', 'images/snip16.JPG', 'images/snip17.JPG',
        'images/snip18.JPG', 'images/snip19.JPG', 'images/snip20.JPG', 'images/snip21.JPG', 'images/snip22.JPG', 'images/snip23.JPG', 'images/snip24.JPG', 'images/snip25.JPG', 'images/snip26.JPG',
        'images/snip27.JPG', 'images/snip28.JPG', 'images/snip29.JPG', 'images/snip30.JPG', 'images/snip31.JPG', 'images/snip32.JPG', 'images/snip33.JPG', 'images/snip34.JPG', 'images/snip35.JPG',
        'images/snip36.JPG', 'images/snip37.JPG', 'images/snip38.JPG', 'images/snip39.JPG', 'images/snip40.JPG', 'images/snip41.JPG', 'images/snip42.JPG', 'images/snip43.JPG', 'images/snip44.JPG',
        'images/snip45.JPG', 'images/snip46.JPG', 'images/snip47.JPG', 'images/snip48.JPG', 'images/imagetints/2Instructions321.JPG', 'images/imagetints/2Instructions4.JPG', 'images/imagetints/2Instructions42.jpg', 'images/imagetints/2Instructions5.JPG', 'images/imagetints/2Instructions52.jpg',
        'images/imagetints/3Instructions621.JPG', 'images/imagetints/2Instructions52.jpg', 'images/imagetints/2Instructions42.jpg', 'images/imagetints/Instructions62222.jpg', 'images/imagetints/3Instructions7.JPG', 'images/imagetints/Instructions9.JPG', 'images/imagetints/Instructions10.JPG', 'images/imagetints/Instructions11.JPG', 'images/imagetints/Instructions12.JPG',
        'images/snip1real.jpg', 'images/snip12real.jpg', 'images/snip3real.jpg', 'images/snip4real.jpg', 'images/snip5real.jpg', 'images/snip6real.jpg', 'images/snip7real.jpg', 'images/snip8real.jpg', 'images/snip9real.jpg', 'images/snip10real.jpg', 'images/snip11real.jpg', 'images/snip12real.jpg', 'images/snip13real.jpg',
        'images/snip14real.jpg', 'images/snip15real.jpg', 'images/snip16real.jpg', 'images/snip17real.jpg', 'images/snip18real.jpg', 'images/snip19real.jpg', 'images/snip20real.jpg', 'images/snip21real.jpg', 'images/snip22real.jpg', 'images/snip23real.jpg', 'images/snip24real.jpg', 'images/snip25real.jpg',
        'images/snip26real.jpg', 'images/snip27real.jpg', 'images/snip28real.jpg', 'images/snip29real.jpg', 'images/snip30real.jpg', 'images/snip31real.jpg', 'images/snip32real.jpg', 'images/snip33real.jpg', 'images/snip34real.jpg', 'images/snip35real.jpg', 'images/snip36real.jpg', 'images/snip37real.jpg',
        'images/snip38real.jpg', 'images/snip39real.jpg', 'images/snip40real.jpg', 'images/snip41real.jpg', 'images/snip42real.jpg', 'images/snip43real.jpg', 'images/snip44real.jpg', 'images/snip45real.jpg', 'images/snip46real.jpg', 'images/snip47real.jpg',
        'images/snip48real.jpg', 'images/tempimages/set1/2temp15.JPG', 'images/tempimages/set1/2temp9.JPG', 'images/tempimages/set1/2temp16.JPG', 'images/tempimages/set1/2temp10.JPG', 'images/tempimages/set1/2temp13.JPG', 'images/tempimages/set1/2temp3.JPG',
        'images/tempimages/set1/2temp20.JPG', 'images/tempimages/set1/2temp19.JPG', 'images/tempimages/set1/2temp8.JPG', 'images/tempimages/set1/2temp4.JPG', 'images/tempimages/set1/2temp14.JPG', 'images/tempimages/set1/2temp18.JPG', 'images/tempimages/set1/2temp1.JPG',
        'images/tempimages/set1/2temp11.JPG', 'images/tempimages/set1/2temp6.JPG', 'images/tempimages/set1/2temp5.JPG', 'images/tempimages/set1/2temp2.JPG', 'images/tempimages/set1/between_1.JPG', 'images/tempimages/set1/between_2.JPG', 'images/tempimages/set1/2temp31.JPG', 'images/tempimages/set1/2temp32.JPG',
        'images/tempimages/set1/2temp24.JPG', 'images/tempimages/set1/2temp23.JPG', 'images/tempimages/set1/2temp11.JPG', 'images/tempimages/set1/2temp40.JPG', 'images/tempimages/set1/2temp30.JPG', 'images/tempimages/set1/2temp25.JPG', 'images/tempimages/set1/2temp29.JPG',
        'images/tempimages/set1/2temp37.JPG', 'images/tempimages/set1/2temp28.JPG', 'images/tempimages/set1/2temp34.JPG', 'images/tempimages/set1/2temp27.JPG', 'images/tempimages/set1/2temp33.JPG', 'images/tempimages/set1/2temp39.JPG', 'images/tempimages/set1/2temp22.JPG',
        'images/tempimages/set1/2temp21.JPG', 'images/tempimages/set1/2temp35.JPG', 'images/tempimages/set1/2temp36.JPG', 'images/tempimages/set1/2temp26.JPG', 'images/tempimages/set1/2temp53.JPG', 'images/tempimages/set1/2temp49.JPG', 'images/tempimages/set1/2temp58.JPG',
        'images/tempimages/set1/2temp43.JPG', 'images/tempimages/set1/2temp55.JPG', 'images/tempimages/set1/2temp44.JPG', 'images/tempimages/set1/2temp51.JPG', 'images/tempimages/set1/2temp54.JPG', 'images/tempimages/set1/2temp48.JPG', 'images/tempimages/set1/2temp42.JPG',
        'images/tempimages/set1/2temp60.JPG', 'images/tempimages/set1/2temp41.JPG', 'images/tempimages/set1/2temp47.JPG', 'images/tempimages/set1/2temp56.JPG', 'images/tempimages/set1/2temp50.JPG', 'images/tempimages/set1/2temp46.JPG', 'images/tempimages/set1/2temp52.JPG',
        'images/tempimages/set1/2temp45.JPG', 'images/tempimages/set1/squarebox1.jpg', 'images/tempimages/set1/squarebox1.jpg', 'images/tempimages/set1/squarebox1.jpg', 'images/tempimages/set1/squarebox1.jpg', 'images/tempimages/set1/squarebox1.jpg', 'images/tempimages/set1/squarebox1.jpg', 'images/tempimages/set1/squarebox1.jpg',
        'images/tempimages/set1/squarebox1.jpg', 'images/tempimages/set1/squarebox2.jpg', 'images/tempimages/set1/squarebox3.jpg', 'images/tempimages/set1/squarebox4.jpg', 'images/tempimages/set1/squarebox5.jpg', 'images/tempimages/set1/squarebox6.jpg', 'images/tempimages/set1/squarebox8.jpg', 'images/tempimages/set1/squarebox9.jpg',
        'images/tempimages/set1/squarebox10.jpg', 'images/tempimages/set1/squarebox11.jpg', 'images/tempimages/set1/squarebox12.jpg', 'images/tempimages/set1/squarebox13.jpg', 'images/tempimages/set1/squarebox14.jpg', 'images/tempimages/set1/squarebox15.jpg', 'images/tempimages/set1/squarebox16.jpg', 'images/tempimages/set1/squarebox17.jpg',
        'images/tempimages/set1/squarebox18.jpg', 'images/tempimages/set1/squarebox19.jpg', 'images/tempimages/set1/squarebox20.jpg', 'images/tempimages/set1/squarebox21.jpg', 'images/tempimages/set1/squarebox22.jpg', 'images/tempimages/set1/squarebox23.jpg', 'images/tempimages/set1/squarebox24.jpg', 'images/tempimages/set1/squarebox25.jpg', 'images/tempimages/set1/squarebox26.jpg', 'images/tempimages/set1/squarebox27.jpg',
        'images/tempimages/set1/squarebox28.jpg', 'images/tempimages/set1/squarebox29.jpg', 'images/tempimages/set1/squarebox30.jpg', 'images/tempimages/set1/squarebox31.jpg', 'images/tempimages/set1/squarebox32.jpg', 'images/tempimages/set1/squarebox33.jpg', 'images/tempimages/set1/squarebox34.jpg', 'images/tempimages/set1/squarebox35.jpg', 'images/tempimages/set1/squarebox36.jpg', 'images/tempimages/set1/squarebox37.jpg',
        'images/tempimages/set1/squarebox39.jpg', 'images/tempimages/set1/squarebox40.jpg', 'images/tempimages/set1/squarebox41.jpg', 'images/tempimages/set1/squarebox42.jpg', 'images/tempimages/set1/squarebox43.jpg', 'images/tempimages/set1/squarebox44.jpg', 'images/tempimages/set1/squarebox45.jpg', 'images/tempimages/set1/squarebox46.jpg', 'images/tempimages/set1/squarebox47.jpg', 'images/tempimages/set1/squarebox48.jpg', 'images/tempimages/set1/squarebox49.jpg',
        'images/tempimages/set1/squarebox50.jpg', 'images/tempimages/set1/squarebox51.jpg', 'images/tempimages/set1/squarebox52.jpg', 'images/tempimages/set1/squarebox53.jpg','images/tempimages/set1/squarebox54.jpg','images/tempimages/set1/squarebox55.jpg','images/tempimages/set1/squarebox56.jpg','images/tempimages/set1/squarebox58.jpg','images/tempimages/set1/squarebox60.jpg', "images/actual_resized/2expred1resized.jpg", "images/actual_resized/2expred2resized.jpg", "images/actual_resized/2expred20resized.jpg", "images/actual_resized/2expred12resized.jpg", "images/actual_resized/2expred10resized.jpg", "images/actual_resized/2expred8resized.jpg", "images/actual_resized/2expred7resized.jpg", "images/actual_resized/2expred6resized.jpg", "images/actual_resized/2expred15resized.jpg", "images/actual_resized/2expred18resized.jpg",
        "images/actual_resized/2expred17resized.jpg", "images/actual_resized/2expred4resized.jpg", "images/actual_resized/2expred16resized.jpg", "images/actual_resized/2expred14resized.jpg", "images/actual_resized/2expred13resized.jpg", "images/actual_resized/2expred11resized.jpg", "images/actual_resized/2expred3resized.jpg", "images/actual_resized/2expyel11resized.jpg", "images/actual_resized/2expyel12resized.jpg", "images/actual_resized/2expyel14resized.jpg", "images/actual_resized/2expyel1resized.jpg",
        "images/actual_resized/2expyel18resized.jpg", "images/actual_resized/2expyel17resized.jpg", "images/actual_resized/2expyel20resized.jpg", "images/actual_resized/2expyel2resized.jpg", "images/actual_resized/2expyel3resized.jpg", "images/actual_resized/2expyel4resized.jpg", "images/actual_resized/2expyel13resized.jpg", "images/actual_resized/2expyel10resized.jpg", "images/actual_resized/2expyel9resized.jpg", "images/actual_resized/2expyel5resized.jpg", "images/actual_resized/2expyel6resized.jpg",
        "images/actual_resized/2expyel7resized.jpg", "images/actual_resized/2expyel15resized.jpg", "images/actual_resized/2expyel16resized.jpg", "images/actual_resized/2expyel8resized.jpg", "images/actual_resized/blue4resized.jpg", "images/actual_resized/blue7resized.jpg", "images/actual_resized/blue20resized.jpg", "images/actual_resized/blue13resized.jpg", "images/actual_resized/blue6resized.jpg", "images/actual_resized/blue15resized.jpg", "images/actual_resized/blue2resized.jpg", "images/actual_resized/blue5resized.jpg",
        "images/actual_resized/blue8resized.jpg", "images/actual_resized/blue19resized.jpg", "images/actual_resized/blue17resized.jpg", "images/actual_resized/blue9resized.jpg", "images/actual_resized/blue10resized.jpg", "images/actual_resized/blue16resized.jpg", "images/actual_resized/blue18resized.jpg", "images/actual_resized/blue11resized.jpg", "images/actual_resized/blue12resized.jpg", "images/actual_resized/blue3resized.jpg", "images/blank.png",
        'images/tempimages/set1/squarebox1ans.jpg', 'images/tempimages/set1/squarebox2ans.jpg', 'images/tempimages/set1/squarebox3ans.jpg', 'images/tempimages/set1/squarebox4ans.jpg', 'images/tempimages/set1/squarebox5ans.jpg', 'images/tempimages/set1/squarebox6ans.jpg', 'images/tempimages/set1/squarebox8ans.jpg', 'images/tempimages/set1/squarebox9ans.jpg',
        'images/tempimages/set1/squarebox10ans.jpg', 'images/tempimages/set1/squarebox11ans.jpg', 'images/tempimages/set1/squarebox12ans.jpg', 'images/tempimages/set1/squarebox13ans.jpg', 'images/tempimages/set1/squarebox14ans.jpg', 'images/tempimages/set1/squarebox15ans.jpg', 'images/tempimages/set1/squarebox16ans.jpg', 'images/tempimages/set1/squarebox17ans.jpg',
        'images/tempimages/set1/squarebox18ans.jpg', 'images/tempimages/set1/squarebox19ans.jpg', 'images/tempimages/set1/squarebox20ans.jpg', 'images/tempimages/set1/squarebox21ans.jpg', 'images/tempimages/set1/squarebox22ans.jpg', 'images/tempimages/set1/squarebox23ans.jpg', 'images/tempimages/set1/squarebox24ans.jpg', 'images/tempimages/set1/squarebox25ans.jpg', 'images/tempimages/set1/squarebox26ans.jpg', 'images/tempimages/set1/squarebox27ans.jpg',
        'images/tempimages/set1/squarebox28ans.jpg', 'images/tempimages/set1/squarebox29ans.jpg', 'images/tempimages/set1/squarebox30ans.jpg', 'images/tempimages/set1/squarebox31ans.jpg', 'images/tempimages/set1/squarebox32ans.jpg', 'images/tempimages/set1/squarebox33ans.jpg', 'images/tempimages/set1/squarebox34ans.jpg', 'images/tempimages/set1/squarebox35ans.jpg', 'images/tempimages/set1/squarebox36ans.jpg', 'images/tempimages/set1/squarebox37ans.jpg',
        'images/tempimages/set1/squarebox39ans.jpg', 'images/tempimages/set1/squarebox40ans.jpg', 'images/tempimages/set1/squarebox41ans.jpg', 'images/tempimages/set1/squarebox42ans.jpg', 'images/tempimages/set1/squarebox43ans.jpg', 'images/tempimages/set1/squarebox44ans.jpg', 'images/tempimages/set1/squarebox45ans.jpg', 'images/tempimages/set1/squarebox46ans.jpg', 'images/tempimages/set1/squarebox47ans.jpg', 'images/tempimages/set1/squarebox48ans.jpg', 'images/tempimages/set1/squarebox49ans.jpg',
        'images/tempimages/set1/squarebox50ans.jpg', 'images/tempimages/set1/squarebox51ans.jpg', 'images/tempimages/set1/squarebox52ans.jpg', 'images/tempimages/set1/squarebox53ans.jpg','images/tempimages/set1/squarebox54ans.jpg','images/tempimages/set1/squarebox55ans.jpg','images/tempimages/set1/squarebox56ans.jpg','images/tempimages/set1/squarebox58ans.jpg','images/tempimages/set1/squarebox60ans.jpg', 'images/2actual_resized/red1_175x175.png', 'images/2actual_resized/red2_175x175.png', 'images/2actual_resized/red3_175x175.png',
        'images/2actual_resized/red4_175x175.png', 'images/2actual_resized/red5_175x175.png', 'images/2actual_resized/red6_175x175.png', 'images/2actual_resized/red7_175x175.png', 'images/2actual_resized/red8_175x175.png', 'images/2actual_resized/red9_175x175.png', 'images/2actual_resized/red10_175x175.png', 'images/2actual_resized/red11_175x175.png', 'images/2actual_resized/red12_175x175.png', 'images/2actual_resized/red13_175x175.png', 'images/2actual_resized/red14_175x175.png', 'images/2actual_resized/red15_175x175.png',
        'images/2actual_resized/red16_175x175.png', 'images/2actual_resized/red17_175x175.png', 'images/2actual_resized/red18_175x175.png', 'images/2actual_resized/red19_175x175.png', 'images/2actual_resized/red20_175x175.png', 'images/2actual_resized/yellow1_175x175.png', 'images/2actual_resized/yellow2_175x175.png', 'images/2actual_resized/yellow3_175x175.png', 'images/2actual_resized/yellow4_175x175.png', 'images/2actual_resized/yellow5_175x175.png', 'images/2actual_resized/yellow6_175x175.png', 'images/2actual_resized/yellow7_175x175.png', 'images/2actual_resized/yellow8_175x175.png',
        'images/2actual_resized/yellow9_175x175.png', 'images/2actual_resized/yellow10_175x175.png', 'images/2actual_resized/yellow11_175x175.png', 'images/2actual_resized/yellow12_175x175.png', 'images/2actual_resized/yellow13_175x175.png', 'images/2actual_resized/yellow14_175x175.png', 'images/2actual_resized/yellow15_175x175.png', 'images/2actual_resized/yellow16_175x175.png', 'images/2actual_resized/yellow17_175x175.png', 'images/2actual_resized/yellow18_175x175.png', 'images/2actual_resized/yellow19_175x175.png', 'images/2actual_resized/yellow20_175x175.png', 'images/2actual_resized/blue1_175x175.png',
        'images/2actual_resized/blue2_175x175.png', 'images/2actual_resized/blue3_175x175.png', 'images/2actual_resized/blue4_175x175.png', 'images/2actual_resized/blue5_175x175.png', 'images/2actual_resized/blue6_175x175.png', 'images/2actual_resized/blue7_175x175.png', 'images/2actual_resized/blue8_175x175.png', 'images/2actual_resized/blue9_175x175.png', 'images/2actual_resized/blue10_175x175.png', 'images/2actual_resized/blue11_175x175.png', 'images/2actual_resized/blue12_175x175.png', 'images/2actual_resized/blue13_175x175.png', 'images/2actual_resized/blue14_175x175.png', 'images/2actual_resized/blue15_175x175.png',
        'images/2actual_resized/blue16_175x175.png', 'images/2actual_resized/blue17_175x175.png', 'images/2actual_resized/blue18_175x175.png', 'images/2actual_resized/blue19_175x175.png', 'images/2actual_resized/blue20_175x175.png', 'images/Instructions/Instructions3_light.jpg', 'images/Instructions/Instructions4_light.jpg', 'images/Instructions/Instructions5_light.jpg', 'images/Instructions/Instructions6_light.jpg', 'images/2actual_resized/red1_122x122.png', 'images/2actual_resized/red2_122x122.png', 'images/2actual_resized/red3_122x122.png', 'images/2actual_resized/red4_122x122.png', 'images/2actual_resized/red5_122x122.png', 'images/2actual_resized/red6_122x122.png', 'images/2actual_resized/red7_122x122.png',
        'images/2actual_resized/red8_122x122.png', 'images/2actual_resized/red9_122x122.png', 'images/2actual_resized/red10_122x122.png', 'images/2actual_resized/red11_122x122.png', 'images/2actual_resized/red12_122x122.png', 'images/2actual_resized/red13_122x122.png', 'images/2actual_resized/red14_122x122.png', 'images/2actual_resized/red15_122x122.png', 'images/2actual_resized/red16_122x122.png', 'images/2actual_resized/red17_122x122.png', 'images/2actual_resized/red18_122x122.png', 'images/2actual_resized/red19_122x122.png', 'images/2actual_resized/red20_122x122.png', 'images/2actual_resized/yellow1_122x122.png', 'images/2actual_resized/yellow2_122x122.png', 'images/2actual_resized/yellow3_122x122.png', 'images/2actual_resized/yellow4_122x122.png',
        'images/2actual_resized/yellow5_122x122.png', 'images/2actual_resized/yellow6_122x122.png', 'images/2actual_resized/yellow7_122x122.png', 'images/2actual_resized/yellow8_122x122.png', 'images/2actual_resized/yellow9_122x122.png', 'images/2actual_resized/yellow10_122x122.png', 'images/2actual_resized/yellow11_122x122.png', 'images/2actual_resized/yellow12_122x122.png', 'images/2actual_resized/yellow13_122x122.png', 'images/2actual_resized/yellow14_122x122.png', 'images/2actual_resized/yellow15_122x122.png', 'images/2actual_resized/yellow16_122x122.png', 'images/2actual_resized/yellow17_122x122.png', 'images/2actual_resized/yellow18_122x122.png', 'images/2actual_resized/yellow19_122x122.png', 'images/2actual_resized/yellow20_122x122.png',
        'images/2actual_resized/blue1_122x122.png', 'images/2actual_resized/blue2_122x122.png', 'images/2actual_resized/blue3_122x122.png', 'images/2actual_resized/blue4_122x122.png', 'images/2actual_resized/blue5_122x122.png', 'images/2actual_resized/blue6_122x122.png', 'images/2actual_resized/blue7_122x122.png', 'images/2actual_resized/blue8_122x122.png', 'images/2actual_resized/blue9_122x122.png', 'images/2actual_resized/blue10_122x122.png', 'images/2actual_resized/blue11_122x122.png', 'images/2actual_resized/blue12_122x122.png', 'images/2actual_resized/blue13_122x122.png', 'images/2actual_resized/blue14_122x122.png', 'images/2actual_resized/blue15_122x122.png', 'images/2actual_resized/blue16_122x122.png', 'images/2actual_resized/blue17_122x122.png',
        'images/2actual_resized/blue18_122x122.png', 'images/2actual_resized/blue19_122x122.png', 'images/2actual_resized/blue20_122x122.png', 'images/tempimages/set1/blueans_squarebox1_resized.png', 'images/tempimages/set1/blueans_squarebox2_resized.png', 'images/tempimages/set1/blueans_squarebox3_resized.png', 'images/tempimages/set1/blueans_squarebox4_resized.png', 'images/tempimages/set1/blueans_squarebox5_resized.png', 'images/tempimages/set1/blueans_squarebox6_resized.png', 'images/tempimages/set1/blueans_squarebox7_resized.png', 'images/tempimages/set1/blueans_squarebox8_resized.png', 'images/tempimages/set1/blueans_squarebox9_resized.png', 'images/tempimages/set1/blueans_squarebox10_resized.png', 'images/tempimages/set1/blueans_squarebox11_resized.png',
        'images/tempimages/set1/blueans_squarebox12_resized.png', 'images/tempimages/set1/blueans_squarebox13_resized.png', 'images/tempimages/set1/blueans_squarebox14_resized.png', 'images/tempimages/set1/blueans_squarebox15_resized.png', 'images/tempimages/set1/blueans_squarebox16_resized.png', 'images/tempimages/set1/blueans_squarebox17_resized.png', 'images/tempimages/set1/blueans_squarebox18_resized.png', 'images/tempimages/set1/blueans_squarebox19_resized.png', 'images/tempimages/set1/blueans_squarebox20_resized.png', 'images/tempimages/set1/blueans_squarebox21_resized.png', 'images/tempimages/set1/blueans_squarebox22_resized.png', 'images/tempimages/set1/blueans_squarebox23_resized.png', 'images/tempimages/set1/blueans_squarebox24_resized.png',
        'images/tempimages/set1/blueans_squarebox25_resized.png', 'images/tempimages/set1/blueans_squarebox26_resized.png', 'images/tempimages/set1/blueans_squarebox27_resized.png', 'images/tempimages/set1/blueans_squarebox28_resized.png', 'images/tempimages/set1/blueans_squarebox29_resized.png', 'images/tempimages/set1/blueans_squarebox30_resized.png', 'images/tempimages/set1/blueans_squarebox31_resized.png', 'images/tempimages/set1/blueans_squarebox32_resized.png', 'images/tempimages/set1/blueans_squarebox33_resized.png', 'images/tempimages/set1/blueans_squarebox34_resized.png', 'images/tempimages/set1/blueans_squarebox35_resized.png', 'images/tempimages/set1/blueans_squarebox36_resized.png', 'images/tempimages/set1/blueans_squarebox37_resized.png',
        'images/tempimages/set1/blueans_squarebox38_resized.png', 'images/tempimages/set1/blueans_squarebox39_resized.png', 'images/tempimages/set1/blueans_squarebox40_resized.png', 'images/tempimages/set1/blueans_squarebox41_resized.png', 'images/tempimages/set1/blueans_squarebox42_resized.png', 'images/tempimages/set1/blueans_squarebox43_resized.png', 'images/tempimages/set1/blueans_squarebox44_resized.png', 'images/tempimages/set1/blueans_squarebox45_resized.png', 'images/tempimages/set1/blueans_squarebox46_resized.png', 'images/tempimages/set1/blueans_squarebox47_resized.png', 'images/tempimages/set1/blueans_squarebox48_resized.png', 'images/tempimages/set1/blueans_squarebox49_resized.png', 'images/tempimages/set1/blueans_squarebox50_resized.png',
        'images/tempimages/set1/blueans_squarebox51_resized.png', 'images/tempimages/set1/blueans_squarebox52_resized.png', 'images/tempimages/set1/blueans_squarebox53_resized.png', 'images/tempimages/set1/blueans_squarebox54_resized.png', 'images/tempimages/set1/blueans_squarebox55_resized.png', 'images/tempimages/set1/blueans_squarebox56_resized.png', 'images/tempimages/set1/blueans_squarebox57_resized.png', 'images/tempimages/set1/blueans_squarebox58_resized.png', 'images/tempimages/set1/blueans_squarebox59_resized.png', 'images/tempimages/set1/blueans_squarebox60_resized.png', 'images/tempimages/set1/blue_squarebox1_resized.png', 'images/tempimages/set1/blue_squarebox2_resized.png', 'images/tempimages/set1/blue_squarebox3_resized.png', 'images/tempimages/set1/blue_squarebox4_resized.png',
        'images/tempimages/set1/blue_squarebox5_resized.png', 'images/tempimages/set1/blue_squarebox6_resized.png', 'images/tempimages/set1/blue_squarebox7_resized.png', 'images/tempimages/set1/blue_squarebox8_resized.png', 'images/tempimages/set1/blue_squarebox9_resized.png', 'images/tempimages/set1/blue_squarebox10_resized.png', 'images/tempimages/set1/blue_squarebox11_resized.png', 'images/tempimages/set1/blue_squarebox12_resized.png', 'images/tempimages/set1/blue_squarebox13_resized.png', 'images/tempimages/set1/blue_squarebox14_resized.png', 'images/tempimages/set1/blue_squarebox15_resized.png', 'images/tempimages/set1/blue_squarebox16_resized.png', 'images/tempimages/set1/blue_squarebox17_resized.png', 'images/tempimages/set1/blue_squarebox18_resized.png', 'images/tempimages/set1/blue_squarebox19_resized.png', 'images/tempimages/set1/blue_squarebox20_resized.png',
        'images/skip1.JPG', 'images/skip2.JPG', 'images/skip3.JPG', 'images/skip4.JPG', 'images/skip5.JPG', 'images/skip6.JPG', 'images/skip7.JPG', 'images/skip8.JPG', 'images/skip9.JPG', 'images/skip10.JPG', 'images/skip11.JPG', 'images/skip12.JPG', 'images/skip13.JPG', 'images/skip14.JPG', 'images/skip15.JPG', 'images/skip16.JPG', 'images/skip17.JPG', 'images/skip18.JPG', 'images/skip19.JPG', 'images/skip20.JPG']
}


experiment.push(preload1221, instruction1, demographics, instruction2, instructions);
/* create timeline */




/* define welcome message trial */
var welcome = {
    type: "html-keyboard-response",
    stimulus: "Welcome to the experiment. Press any key to begin."
};
experiment.push(welcome);



// function UniformDistribution() {
//     min = 1;
//     max = 10;
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     barlength = Math.floor(Math.random() * (max - min + 1)) + min;
//     return barlength;
// };
//
//
// timeline.push(UniformDistribution);

var trialStimTemplate =
    "<p id='left_selection_prompt' ></p>";


// function trials() {
//     numberoftrials = 2;
//     for (let i=0; i<numberoftrials; i++){
//         min = 1;
//         max = 10;
//         number = Math.floor(Math.random() * 10);
//         if (number === 1){
//             var length1 = {
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">_</div>',
//                 choices: jsPsych.NO_KEYS,
//                 trial_duration: 1000,
//             }
//             var estimate1 = {
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">Press the number key on your keyboard that corresponds to your estimated length of the bar that was just flashed</div>',
//                 choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
//             }
//             var fixation = {
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">+</div>',
//                 choices: jsPsych.NO_KEYS,
//                 trial_duration: 1000,
//             };
//
//             experiment.push(length1, estimate1, fixation);
//
//         }
//         if (number === 2){
//             var length2 ={
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">__</div>',
//                 choices: jsPsych.NO_KEYS,
//                 trial_duration: 1000,
//             }
//             var estimate2 = {
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">Press the number key on your keyboard that corresponds to your estimated length of the bar that was just flashed</div>',
//                 choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
//             }
//             var fixation = {
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">+</div>',
//                 choices: jsPsych.NO_KEYS,
//                 trial_duration: 1000,
//             };
//
//             experiment.push(length2, estimate2, fixation);
//         }
//         if (number === 3){
//             var length3 ={
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">___</div>',
//                 choices: jsPsych.NO_KEYS,
//                 trial_duration: 1000,
//             }
//             var estimate3 = {
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">Press the number key on your keyboard that corresponds to your estimated length of the bar that was just flashed</div>',
//                 choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
//             }
//             var fixation = {
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">+</div>',
//                 choices: jsPsych.NO_KEYS,
//                 trial_duration: 1000,
//             };
//
//             experiment.push(length3, estimate3, fixation);
//         }
//         if (number === 4){
//             var length4 ={
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">____</div>',
//                 choices: jsPsych.NO_KEYS,
//                 trial_duration: 1000,
//             }
//             var estimate4 = {
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">Press the number key on your keyboard that corresponds to your estimated length of the bar that was just flashed</div>',
//                 choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
//             }
//             var fixation = {
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">+</div>',
//                 choices: jsPsych.NO_KEYS,
//                 trial_duration: 1000,
//             };
//
//             experiment.push(length4, estimate4, fixation);
//         }
//         if (number === 5){
//             var length5 ={
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">_____</div>',
//                 choices: jsPsych.NO_KEYS,
//                 trial_duration: 1000,
//             }
//             var estimate5 = {
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">Press the number key on your keyboard that corresponds to your estimated length of the bar that was just flashed</div>',
//                 choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
//             }
//             var fixation = {
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">+</div>',
//                 choices: jsPsych.NO_KEYS,
//                 trial_duration: 1000,
//             };
//
//             experiment.push(length5, estimate5, fixation);
//         }
//         if (number === 6){
//             var length6 ={
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">______</div>',
//                 choices: jsPsych.NO_KEYS,
//                 trial_duration: 1000,
//             }
//             var estimate6 = {
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">Press the number key on your keyboard that corresponds to your estimated length of the bar that was just flashed</div>',
//                 choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
//             }
//             var fixation = {
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">+</div>',
//                 choices: jsPsych.NO_KEYS,
//                 trial_duration: 1000,
//             };
//
//             experiment.push(length6, estimate6, fixation);
//
//         }
//         if (number === 7){
//             var length7 ={
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">_______</div>',
//                 choices: jsPsych.NO_KEYS,
//                 trial_duration: 1000,
//             }
//             var estimate7 = {
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">Press the number key on your keyboard that corresponds to your estimated length of the bar that was just flashed</div>',
//                 choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
//             }
//             var fixation = {
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">+</div>',
//                 choices: jsPsych.NO_KEYS,
//                 trial_duration: 1000,
//             };
//
//             experiment.push(length7, estimate7, fixation);
//         }
//         if (number === 8){
//             var length8 ={
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">________</div>',
//                 choices: jsPsych.NO_KEYS,
//                 trial_duration: 1000,
//             }
//             var estimate8 = {
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">Press the number key on your keyboard that corresponds to your estimated length of the bar that was just flashed</div>',
//                 choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
//             }
//             var fixation = {
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">+</div>',
//                 choices: jsPsych.NO_KEYS,
//                 trial_duration: 1000,
//             };
//
//             experiment.push(length8, estimate8, fixation);
//         }
//         if (number === 9){
//             var length9 ={
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">_________</div>',
//                 choices: jsPsych.NO_KEYS,
//                 trial_duration: 1000,
//             }
//             var estimate9 = {
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">Press the number key on your keyboard that corresponds to your estimated length of the bar that was just flashed</div>',
//                 choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
//             }
//             var fixation = {
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">+</div>',
//                 choices: jsPsych.NO_KEYS,
//                 trial_duration: 1000,
//             };
//
//             experiment.push(length9, estimate9, fixation);
//         }
//         if (number === 10){
//             var length10 ={
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">__________</div>',
//                 choices: jsPsych.NO_KEYS,
//                 trial_duration: 1000,
//             }
//             var estimate10 = {
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">Press the number key on your keyboard that corresponds to your estimated length of the bar that was just flashed</div>',
//                 choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
//             }
//             var fixation = {
//                 type: 'html-keyboard-response',
//                 stimulus: '<div style="font-size:60px;">+</div>',
//                 choices: jsPsych.NO_KEYS,
//                 trial_duration: 1000,
//             };
//
//             experiment.push(length10, estimate10, fixation);
//         }
//     }
// }
// trials();
//
// var fixation = {
//     type: 'html-keyboard-response',
//     stimulus: '<div style="font-size:60px;">+</div>',
//     choices: jsPsych.NO_KEYS,
//     trial_duration: 1000,
// };
//
// var blank = {
//     type: 'html-keyboard-response',
//     stimulus: '<div style="font-size:60px;"></div>',
//     choices: jsPsych.NO_KEYS,
//     trial_duration: 1000,
// };

// var preload = {
//     type: 'preload',
//     auto_preload: true
// }

var collection = firebase.firestore().collection('realrun2349802342');

// var test_stimuli = [
//     { stimulus: '<img src="images/imagetints/2expred1.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp15ans.JPG">', statement: '<img src="images/tempimages/set1/temp15.JPG">'},
//     { stimulus: '<img src="images/imagetints/blue4.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp53ans.JPG">', statement: '<img src="images/images/tempimages/set1/temp53.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expred2.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp9ans.JPG">', statement: '<img src="images/tempimages/set1/temp9.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expred20.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp16ans.JPG">', statement: '<img src="images/tempimages/set1/temp16.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expred12.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp10ans.JPG">', statement: '<img src="images/tempimages/set1/temp10.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expyel11.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp31ans.JPG">', statement: '<img src="images/tempimages/set1/temp31.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expred10.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp13ans.JPG">', statement: '<img src="images/tempimages/set1/temp13.JPG">'},
//     //{ stimulus: '<img src="images/imagetints/2expred9.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp7ans.JPG">', statement: '<img src="images/tempimages/set1/temp7.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expred8.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp3ans.JPG">', statement: '<img src="images/tempimages/set1/temp3.JPG">'},
//     { stimulus: '<img src="images/imagetints/blue7.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp49ans.JPG">', statement: '<img src="images/images/tempimages/set1/temp49.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expred7.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp20ans.JPG">', statement: '<img src="images/tempimages/set1/temp20.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expred6.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp19ans.JPG">', statement: '<img src="images/tempimages/set1/temp19.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expred15.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp8ans.JPG">', statement: '<img src="images/tempimages/set1/temp8.JPG">'},
//     { stimulus: '<img src="images/imagetints/blue20.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp58ans.JPG">', statement: '<img src="images/tempimages/set1/temp58.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expred18.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp4ans.JPG">', statement: '<img src="images/tempimages/set1/temp4.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expred17.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp14ans.JPG">', statement: '<img src="images/tempimages/set1/temp14.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expred4.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp18ans.JPG">', statement: '<img src="images/tempimages/set1/temp18.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expred16.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp1ans.JPG">', statement: '<img src="images/tempimages/set1/temp1.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expyel12.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp32ans.JPG">', statement: '<img src="images/tempimages/set1/temp32.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expyel14.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp24ans.JPG">', statement: '<img src="images/tempimages/set1/temp24.JPG">'},
//     { stimulus: '<img src="images/imagetints/blue13.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp43ans.JPG">', statement: '<img src="images/images/tempimages/set1/temp43.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expyel18.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp23ans.JPG">', statement: '<img src="images/tempimages/set1/temp23.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expyel1.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp40ans.JPG">', statement: '<img src="images/tempimages/set1/temp40.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expyel17.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp30ans.JPG">', statement: '<img src="images/tempimages/set1/temp30.JPG">'},
//     //{ stimulus: '<img src="images/imagetints/2expyel19.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp38ans.JPG">', statement: '<img src="images/tempimages/set1/temp38.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expyel20.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp25ans.JPG">', statement: '<img src="images/tempimages/set1/temp25.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expyel2.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp29ans.JPG">', statement: '<img src="images/tempimages/set1/temp29.JPG">'},
//     { stimulus: '<img src="images/imagetints/blue6.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp55ans.JPG">', statement: '<img src="images/tempimages/set1/temp55.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expyel3.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp37ans.JPG">', statement: '<img src="images/tempimages/set1/temp37.JPG">'},
//     { stimulus: '<img src="images/imagetints/blue15.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp44ans.JPG">', statement: '<img src="images/tempimages/set1/temp44.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expyel4.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp28ans.JPG">', statement: '<img src="images/tempimages/set1/temp28.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expred14.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp11ans.JPG">', statement: '<img src="images/tempimages/set1/temp11.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expyel13.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp34ans.JPG">', statement: '<img src="images/tempimages/set1/temp34.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expred13.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp6ans.JPG">', statement: '<img src="images/tempimages/set1/temp6.JPG">'},
//     { stimulus: '<img src="images/imagetints/blue2.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp51ans.JPG">', statement: '<img src="images/tempimages/set1/temp51.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expyel10.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp27ans.JPG">', statement: '<img src="images/tempimages/set1/temp27.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expyel9.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp33ans.JPG">', statement: '<img src="images/tempimages/set1/temp33.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expyel5.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp39ans.JPG">', statement: '<img src="images/tempimages/set1/temp39.JPG">'},
//     { stimulus: '<img src="images/imagetints/blue5.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp54ans.JPG">', statement: '<img src="images/tempimages/set1/temp54.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expyel6.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp22ans.JPG">', statement: '<img src="images/tempimages/set1/temp22.JPG">'},
//     { stimulus: '<img src="images/imagetints/blue8.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp48ans.JPG">', statement: '<img src="images/tempimages/set1/temp48.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expyel7.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp21ans.JPG">', statement: '<img src="images/tempimages/set1/temp21.JPG">'},
//     { stimulus: '<img src="images/imagetints/blue19.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp42ans.JPG">', statement: '<img src="images/tempimages/set1/temp42.JPG">'},
//     { stimulus: '<img src="images/imagetints/blue17.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp60ans.JPG">', statement: '<img src="images/tempimages/set1/temp60.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expred11.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp5ans.JPG">', statement: '<img src="images/tempimages/set1/temp5.JPG">'},
//     { stimulus: '<img src="images/imagetints/blue9.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp41ans.JPG">', statement: '<img src="images/tempimages/set1/temp41.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expyel15.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp35ans.JPG">', statement: '<img src="images/tempimages/set1/temp35.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expred3.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp2ans.JPG">', statement: '<img src="images/tempimages/set1/temp2.JPG">'},
//     { stimulus: '<img src="images/imagetints/blue10.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp47ans.JPG">', statement: '<img src="images/tempimages/set1/temp47.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expyel16.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp36ans.JPG">', statement: '<img src="images/tempimages/set1/temp36.JPG">'},
//     { stimulus: '<img src="images/imagetints/blue16.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp56ans.JPG">', statement: '<img src="images/tempimages/set1/temp56.JPG">'},
//     //{ stimulus: '<img src="images/imagetints/blue14.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp57ans.JPG">', statement: '<img src="images/tempimages/set1/temp57.JPG">'},
//     { stimulus: '<img src="images/imagetints/blue18.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp50ans.JPG">', statement: '<img src="images/tempimages/set1/temp50.JPG">'},
//    // { stimulus: '<img src="images/imagetints/blue1.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp59ans.JPG">', statement: '<img src="images/tempimages/set1/temp59.JPG">'},
//     { stimulus: '<img src="images/imagetints/blue11.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp46ans.JPG">', statement: '<img src="images/tempimages/set1/temp46.JPG">'},
//     { stimulus: '<img src="images/imagetints/blue12.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp52ans.JPG">', statement: '<img src="images/tempimages/set1/temp52.JPG">'},
//     { stimulus: '<img src="images/imagetints/2expyel8.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp26ans.JPG">', statement: '<img src="images/tempimages/set1/temp26.JPG">'},
//     { stimulus: '<img src="images/imagetints/blue3.JPG">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/temp45ans.JPG">', statement: '<img src="images/images/tempimages/set1/temp45.JPG">'},
//
//
// ]



var stimuli_preload = ["images/actual_resized/2expred1resized.jpg", "images/actual_resized/2expred2resized.jpg", "images/actual_resized/2expred20resized.jpg", "images/actual_resized/2expred12resized.jpg", "images/actual_resized/2expred10resized.jpg", "images/actual_resized/2expred8resized.jpg", "images/actual_resized/2expred7resized.jpg", "images/actual_resized/2expred6resized.jpg", "images/actual_resized/2expred15resized.jpg", "images/actual_resized/2expred18resized.jpg",
    "images/actual_resized/2expred17resized.jpg", "images/actual_resized/2expred4resized.jpg", "images/actual_resized/2expred16resized.jpg", "images/actual_resized/2expred14resized.jpg", "images/actual_resized/2expred13resized.jpg", "images/actual_resized/2expred11resized.jpg", "images/actual_resized/2expred3resized.jpg", "images/actual_resized/2expyel11resized.jpg", "images/actual_resized/2expyel12resized.jpg", "images/actual_resized/2expyel14resized.jpg", "images/actual_resized/2expyel1resized.jpg",
    "images/actual_resized/2expyel18resized.jpg", "images/actual_resized/2expyel17resized.jpg", "images/actual_resized/2expyel20resized.jpg", "images/actual_resized/2expyel2resized.jpg", "images/actual_resized/2expyel3resized.jpg", "images/actual_resized/2expyel4resized.jpg", "images/actual_resized/2expyel13resized.jpg", "images/actual_resized/2expyel10resized.jpg", "images/actual_resized/2expyel9resized.jpg", "images/actual_resized/2expyel5resized.jpg", "images/actual_resized/2expyel6resized.jpg",
    "images/actual_resized/2expyel7resized.jpg", "images/actual_resized/2expyel15resized.jpg", "images/actual_resized/2expyel16resized.jpg", "images/actual_resized/2expyel8resized.jpg", "images/actual_resized/blue4resized.jpg", "images/actual_resized/blue7resized.jpg", "images/actual_resized/blue20resized.jpg", "images/actual_resized/blue13resized.jpg", "images/actual_resized/blue6resized.jpg", "images/actual_resized/blue15resized.jpg", "images/actual_resized/blue2resized.jpg", "images/actual_resized/blue5resized.jpg",
    "images/actual_resized/blue8resized.jpg", "images/actual_resized/blue19resized.jpg", "images/actual_resized/blue17resized.jpg", "images/actual_resized/blue9resized.jpg", "images/actual_resized/blue10resized.jpg", "images/actual_resized/blue16resized.jpg", "images/actual_resized/blue18resized.jpg", "images/actual_resized/blue11resized.jpg", "images/actual_resized/blue12resized.jpg", "images/actual_resized/blue3resized.jpg", "images/blank.png"

]


var test_stimuli = [

    { stimulus: '<img src="images/2actual_resized/red4_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox11_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox11.PNG">'},
    { stimulus: '<img src="images/2actual_resized/red1_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox12_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox12.PNG">'},
    { stimulus: '<img src="images/2actual_resized/red19_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox15_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox15.PNG">'},
    { stimulus: '<img src="images/2actual_resized/red3_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox1_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox1.PNG">'},
    { stimulus: '<img src="images/2actual_resized/red5_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox6_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox6.PNG">'},
    { stimulus: '<img src="images/2actual_resized/red12_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox7_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox7.PNG">'},
    { stimulus: '<img src="images/2actual_resized/red18_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox9_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox9.PNG">'},
    { stimulus: '<img src="images/2actual_resized/red6_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox20_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox20.PNG">'},
    { stimulus: '<img src="images/2actual_resized/red16_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox16_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox16.PNG">'},
    { stimulus: '<img src="images/2actual_resized/red8_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox8_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox8.PNG">'},
    { stimulus: '<img src="images/2actual_resized/red9_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox3_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox3.PNG">'},
    { stimulus: '<img src="images/2actual_resized/red13_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox17_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox17.PNG">'},
    { stimulus: '<img src="images/2actual_resized/red10_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox19_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox19.PNG">'},
    { stimulus: '<img src="images/2actual_resized/red15_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox10_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox10.PNG">'},
    { stimulus: '<img src="images/2actual_resized/red7_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox4_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox4.PNG">'},
    { stimulus: '<img src="images/2actual_resized/red17_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox2_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox2.PNG">'},
    { stimulus: '<img src="images/2actual_resized/red2_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox14_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox14.PNG">'},
    { stimulus: '<img src="images/2actual_resized/red20_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox18_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox18.PNG">'},
    { stimulus: '<img src="images/2actual_resized/red14_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox5_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox5.PNG">'},
    { stimulus: '<img src="images/2actual_resized/red11_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox13_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox13.PNG">'},
    { stimulus: '<img src="images/blank.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/between_2.JPG">', statement: '<img src="images/tempimages/set1/between_1.JPG">'},
    { stimulus: '<img src="images/2actual_resized/yellow13_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox28_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox28.PNG">'},
    { stimulus: '<img src="images/2actual_resized/yellow1_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox21_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox21.PNG">'},
    { stimulus: '<img src="images/2actual_resized/yellow2_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox27_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox27.PNG">'},
    { stimulus: '<img src="images/2actual_resized/yellow12_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox31_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox31.PNG">'},
    { stimulus: '<img src="images/2actual_resized/yellow3_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox38_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox38.PNG">'},
    { stimulus: '<img src="images/2actual_resized/yellow4_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox22_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox22.PNG">'},
    { stimulus: '<img src="images/2actual_resized/yellow19_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox40_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox40.PNG">'},
    { stimulus: '<img src="images/2actual_resized/yellow5_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox39_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox39.PNG">'},
    { stimulus: '<img src="images/2actual_resized/yellow16_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox23_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox23.PNG">'},
    { stimulus: '<img src="images/2actual_resized/yellow6_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox26_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox26.PNG">'},
    { stimulus: '<img src="images/2actual_resized/yellow8_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox32_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox32.PNG">'},
    { stimulus: '<img src="images/2actual_resized/yellow14_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox37_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox37.PNG">'},
    { stimulus: '<img src="images/2actual_resized/yellow10_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox29_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox29.PNG">'},
    { stimulus: '<img src="images/2actual_resized/yellow18_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox30_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox30.PNG">'},
    { stimulus: '<img src="images/2actual_resized/yellow11_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox25_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox25.PNG">'},
    { stimulus: '<img src="images/2actual_resized/yellow15_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox35_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox35.PNG">'},
    { stimulus: '<img src="images/2actual_resized/yellow17_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox36_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox36.PNG">'},
    { stimulus: '<img src="images/2actual_resized/yellow7_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox33_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox33.PNG">'},
    { stimulus: '<img src="images/2actual_resized/yellow20_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox24_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox24.PNG">'},
    { stimulus: '<img src="images/2actual_resized/yellow9_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox34_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox34.PNG">'},
    { stimulus: '<img src="images/blank.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/between_2.JPG">', statement: '<img src="images/tempimages/set1/between_1.JPG">'},
    { stimulus: '<img src="images/2actual_resized/blue19_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox56_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox56.PNG">'},
    { stimulus: '<img src="images/2actual_resized/blue1_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox43_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox43.PNG">'},
    { stimulus: '<img src="images/2actual_resized/blue3_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox53_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/images/tempimages/set1/blue_squarebox53.PNG">'},
    { stimulus: '<img src="images/2actual_resized/blue4_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox49_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox49.PNG">'},
    { stimulus: '<img src="images/2actual_resized/blue16_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox57_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox57.PNG">'},
    { stimulus: '<img src="images/2actual_resized/blue5_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox44_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/images/tempimages/set1/blue_squarebox44.PNG">'},
    { stimulus: '<img src="images/2actual_resized/blue2_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox45_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox45.PNG">'},
    { stimulus: '<img src="images/2actual_resized/blue8_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox46_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox46.PNG">'},
    { stimulus: '<img src="images/2actual_resized/blue10_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox58_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox58.PNG">'},
    { stimulus: '<img src="images/2actual_resized/blue11_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox59_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox59.PNG">'},
    { stimulus: '<img src="images/2actual_resized/blue12_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox51_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox51.PNG">'},
    { stimulus: '<img src="images/2actual_resized/blue13_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox50_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox50.PNG">'},
    { stimulus: '<img src="images/2actual_resized/blue7_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox48_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox48.PNG">'},
    { stimulus: '<img src="images/2actual_resized/blue14_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox55_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox55.PNG">'},
    { stimulus: '<img src="images/2actual_resized/blue9_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox41_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox41.PNG">'},
    { stimulus: '<img src="images/2actual_resized/blue6_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox52_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox52.PNG">'},
    { stimulus: '<img src="images/2actual_resized/blue17_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox54_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox54.PNG">'},
    { stimulus: '<img src="images/2actual_resized/blue18_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox47_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox47.PNG">'},
    { stimulus: '<img src="images/2actual_resized/blue15_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox42_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox42.PNG">'},
    { stimulus: '<img src="images/2actual_resized/blue20_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/blueans_squarebox60_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set1/blue_squarebox60.PNG">'},
]


// var others = [
//     { stimulus: '<img src="images/other1.JPG">, <img src="images/other2.JPG">, <img src="images/other3.JPG">'},
// ];

var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
    data: {
        task: 'fixation'
    }
};
var real_stimuli_pics = ['<img src="images/imagetints/2expred1.JPG">', '<img src="images/imagetints/2expred2.JPG">', '<img src="images/imagetints/2expred3.JPG">', '<img src="images/imagetints/2expred4.JPG">', '<img src="images/imagetints/2expred20.JPG">', '<img src="images/imagetints/2expred12.JPG">', '<img src="images/imagetints/2expred19.JPG">', '<img src="images/imagetints/2expred11.JPG">', '<img src="images/imagetints/2expred10.JPG">',
    '<img src="images/imagetints/2expred8.JPG">', '<img src="images/imagetints/2expred7.JPG">', '<img src="images/imagetints/2expred6.JPG">', '<img src="images/imagetints/2expred15.JPG">', '<img src="images/imagetints/2expred18.JPG">', '<img src="images/imagetints/2expred13.JPG">', '<img src="images/imagetints/2expred14.JPG">', '<img src="images/imagetints/2expred17.JPG">', '<img src="images/imagetints/2expred16.JPG">',
    '<img src="images/imagetints/2expyel16.JPG">', '<img src="images/imagetints/2expyel15.JPG">', '<img src="images/imagetints/2expyel14.JPG">', '<img src="images/imagetints/2expyel18.JPG">', '<img src="images/imagetints/2expyel1.JPG">', '<img src="images/imagetints/2expyel17.JPG">', '<img src="images/imagetints/2expyel20.JPG">', '<img src="images/imagetints/2expyel2.JPG">', '<img src="images/imagetints/2expyel3.JPG">',
    '<img src="images/imagetints/2expyel4.JPG">', '<img src="images/imagetints/2expyel13.JPG">', '<img src="images/imagetints/2expyel12.JPG">', '<img src="images/imagetints/2expyel11.JPG">', '<img src="images/imagetints/2expyel10.JPG">', '<img src="images/imagetints/2expyel9.JPG">', '<img src="images/imagetints/2expyel8.JPG">', '<img src="images/imagetints/2expyel5.JPG">', '<img src="images/imagetints/2expyel6.JPG">',
    '<img src="images/imagetints/2expyel7.JPG">', '<img src="images/imagetints/blue6.JPG">', '<img src="images/imagetints/blue5.JPG">', '<img src="images/imagetints/blue19.JPG">', '<img src="images/imagetints/blue17.JPG">', '<img src="images/imagetints/blue10.JPG">', '<img src="images/imagetints/blue16.JPG">', '<img src="images/imagetints/blue18.JPG">', '<img src="images/imagetints/blue9.JPG">', '<img src="images/imagetints/blue8.JPG">',
    '<img src="images/imagetints/blue2.JPG">', '<img src="images/imagetints/blue11.JPG">', '<img src="images/imagetints/blue20.JPG">', '<img src="images/imagetints/blue15.JPG">', '<img src="images/imagetints/blue7.JPG">', '<img src="images/imagetints/blue12.JPG">', '<img src="images/imagetints/blue13.JPG">', '<img src="images/imagetints/blue3.JPG">', '<img src="images/imagetints/blue4.JPG">']

// var draw_temps = function(c) {
//     var ctx = c.getContext('2d');
//     ctx.beginPath();
//     ctx.rect(30, 30, 200, 50);
//     ctx.stroke();
// }

var test = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: jsPsych.NO_KEYS,
    trial_duration: 700,
}

// var estimate = {
//     type: 'html-keyboard-response',
//     prompt: jsPsych.timelineVariable('statement'),
//     choices: ['y', 'n'],
//     timeline: [
//         {stimulus:'<img src="images/imagetints/Instructions5.JPG">'},
//         {stimulus: '<img src="images/imagetints/Instructions621.JPG">'},
//         {stimulus: '<img src="images/imagetints/Instructions7.JPG">'},
//     ],
//     data: {
//         task: 'response',
//         correct_response: jsPsych.timelineVariable('correct_response')
//     },
// }

// var estimate = {
//     type: 'html-slider-response',
//     slider_width: ['20'],
//     labels: ['25', '50', '75', '100'],
//     prompt: jsPsych.timelineVariable('statement'),
//     stimulus:
//     "<p>Choose a thermometer you think most accurately represents the temperature of the sensor.</p>",
//     data: {
//     task: 'response',
//     correct_response: jsPsych.timelineVariable('correct_response')
//     },
// }

// var colors;
//
// function twoSquares(c, colors) {
//     '<img src="images/Instructions8.JPG">'
//
// }
//
// var estimate = {
//     type: 'canvas-slider-response',
//     // slider_width: ['20'],
//     // labels: ['25', '50', '75', '100'],
//     prompt: jsPsych.timelineVariable('statement'),
//     stimulus: function(c) {
//         colors = ['darkred', 'cyan'];
//         twoSquares(c, colors);
//     },
//     data: {
//         task: 'response',
//         correct_response: jsPsych.timelineVariable('correct_response')
//     },
// }

// var stimuli_pics = ['<img src="images/tempimages/set1/2temp15.JPG">', '<img src="images/tempimages/set1/2temp9.JPG">', '<img src="images/tempimages/set1/2temp2.JPG">']

// var stimuli_pics = ['<img src="images/tempimages/set1/2temp15.JPG">', '<img src="images/tempimages/set1/2temp9.JPG">', '<img src="images/tempimages/set1/2temp2.JPG">', '<img src="images/tempimages/set1/2temp18.JPG">', '<img src="images/tempimages/set1/2temp16.JPG">', '<img src="images/tempimages/set1/2temp10.JPG">', '<img src="images/tempimages/set1/2temp17.JPG">', '<img src="images/tempimages/set1/2temp5.JPG">', '<img src="images/tempimages/set1/2temp13.JPG">',  '<img src="images/tempimages/set1/2temp3.JPG">', '<img src="images/tempimages/set1/2temp19.JPG">', '<img src="images/tempimages/set1/2temp8.JPG">', '<img src="images/tempimages/set1/2temp4.JPG">', '<img src="images/tempimages/set1/2temp20.JPG">', '<img src="images/tempimages/set1/2temp6.JPG">', '<img src="images/tempimages/set1/2temp11.JPG">', '<img src="images/tempimages/set1/2temp14.JPG">', '<img src="images/tempimages/set1/2temp1.JPG">', '<img src="images/tempimages/set1/2temp36.JPG">', '<img src="images/tempimages/set1/2temp35.JPG">', '<img src="images/tempimages/set1/2temp24.JPG">', '<img src="images/tempimages/set1/2temp23.JPG">', '<img src="images/tempimages/set1/2temp40.JPG">', '<img src="images/tempimages/set1/2temp30.JPG">',
//     '<img src="images/tempimages/set1/2temp25.JPG">', '<img src="images/tempimages/set1/2temp29.JPG">', '<img src="images/tempimages/set1/2temp37.JPG">', '<img src="images/tempimages/set1/2temp28.JPG">', '<img src="images/tempimages/set1/2temp34.JPG">', '<img src="images/tempimages/set1/2temp32.JPG">', '<img src="images/tempimages/set1/2temp31.JPG">', '<img src="images/tempimages/set1/2temp27.JPG">', '<img src="images/tempimages/set1/2temp33.JPG">', '<img src="images/tempimages/set1/2temp26.JPG">', '<img src="images/tempimages/set1/2temp39.JPG">', '<img src="images/tempimages/set1/2temp22.JPG">', '<img src="images/tempimages/set1/2temp21.JPG">', '<img src="images/tempimages/set1/2temp55.JPG">',
//     '<img src="images/tempimages/set1/2temp54.JPG">', '<img src="images/tempimages/set1/2temp42.JPG">', '<img src="images/tempimages/set1/2temp60.JPG">', '<img src="images/tempimages/set1/2temp47.JPG">', '<img src="images/tempimages/set1/2temp56.JPG">', '<img src="images/tempimages/set1/2temp50.JPG">', '<img src="images/tempimages/set1/2temp41.JPG">', '<img src="images/tempimages/set1/2temp48.JPG">', '<img src="images/tempimages/set1/2temp51.JPG">', '<img src="images/tempimages/set1/2temp46.JPG">', '<img src="images/tempimages/set1/2temp58.JPG">', '<img src="images/tempimages/set1/2temp44.JPG">', '<img src="images/tempimages/set1/2temp49.JPG">', '<img src="images/tempimages/set1/2temp52.JPG">', '<img src="images/tempimages/set1/2temp43.JPG">', '<img src="images/tempimages/set1/2temp45.JPG">', '<img src="images/tempimages/set1/2temp43.JPG">']

// var stimuli_pics = ['<img src="images/tempimages/set1/2temp15.JPG">', '<img src="images/tempimages/set1/2temp53.JPG">', '<img src="images/tempimages/set1/2temp9.JPG">', '<img src="images/tempimages/set1/2temp16.JPG">', '<img src="images/tempimages/set1/2temp10.JPG">', '<img src="images/tempimages/set1/2temp31.JPG">', '<img src="images/tempimages/set1/2temp13.JPG">', '<img src="images/tempimages/set1/2temp3.JPG">', '<img src="images/tempimages/set1/2temp49.JPG">',  '<img src="images/tempimages/set1/2temp20.JPG">', '<img src="images/tempimages/set1/2temp19.JPG">', '<img src="images/tempimages/set1/2temp8.JPG">', '<img src="images/tempimages/set1/2temp58.JPG">', '<img src="images/tempimages/set1/2temp4.JPG">', '<img src="images/tempimages/set1/2temp14.JPG">', '<img src="images/tempimages/set1/2temp18.JPG">', '<img src="images/tempimages/set1/2temp1.JPG">', '<img src="images/tempimages/set1/2temp32.JPG">', '<img src="images/tempimages/set1/2temp24.JPG">', '<img src="images/tempimages/set1/2temp43.JPG">', '<img src="images/tempimages/set1/2temp23.JPG">', '<img src="images/tempimages/set1/2temp40.JPG">', '<img src="images/tempimages/set1/2temp30.JPG">', '<img src="images/tempimages/set1/2temp25.JPG">',
//     '<img src="images/tempimages/set1/2temp29.JPG">', '<img src="images/tempimages/set1/2temp55.JPG">', '<img src="images/tempimages/set1/2temp37.JPG">', '<img src="images/tempimages/set1/2temp44.JPG">', '<img src="images/tempimages/set1/2temp28.JPG">', '<img src="images/tempimages/set1/2temp11.JPG">', '<img src="images/tempimages/set1/2temp34.JPG">', '<img src="images/tempimages/set1/2temp6.JPG">', '<img src="images/tempimages/set1/2temp51.JPG">', '<img src="images/tempimages/set1/2temp27.JPG">', '<img src="images/tempimages/set1/2temp33.JPG">', '<img src="images/tempimages/set1/2temp39.JPG">', '<img src="images/tempimages/set1/2temp54.JPG">', '<img src="images/tempimages/set1/2temp22.JPG">',
//     '<img src="images/tempimages/set1/2temp48.JPG">', '<img src="images/tempimages/set1/2temp21.JPG">', '<img src="images/tempimages/set1/2temp42.JPG">', '<img src="images/tempimages/set1/2temp60.JPG">', '<img src="images/tempimages/set1/2temp5.JPG">', '<img src="images/tempimages/set1/2temp41.JPG">', '<img src="images/tempimages/set1/2temp35.JPG">', '<img src="images/tempimages/set1/2temp2.JPG">', '<img src="images/tempimages/set1/2temp47.JPG">', '<img src="images/tempimages/set1/2temp36.JPG">', '<img src="images/tempimages/set1/2temp56.JPG">', '<img src="images/tempimages/set1/2temp50.JPG">', '<img src="images/tempimages/set1/2temp46.JPG">', '<img src="images/tempimages/set1/2temp52.JPG">', '<img src="images/tempimages/set1/2temp26.JPG">', '<img src="images/tempimages/set1/2temp45.JPG">']


// between2 was between 26 and 53

// var stimuli_pics = ['<img src="images/tempimages/set1/2temp15.JPG">', '<img src="images/tempimages/set1/2temp9.JPG">', '<img src="images/tempimages/set1/2temp16.JPG">', '<img src="images/tempimages/set1/2temp10.JPG">', '<img src="images/tempimages/set1/2temp13.JPG">', '<img src="images/tempimages/set1/2temp3.JPG">', '<img src="images/tempimages/set1/2temp20.JPG">', '<img src="images/tempimages/set1/2temp19.JPG">', '<img src="images/tempimages/set1/2temp8.JPG">',  '<img src="images/tempimages/set1/2temp4.JPG">', '<img src="images/tempimages/set1/2temp14.JPG">', '<img src="images/tempimages/set1/2temp18.JPG">', '<img src="images/tempimages/set1/2temp1.JPG">', '<img src="images/tempimages/set1/2temp11.JPG">', '<img src="images/tempimages/set1/2temp6.JPG">', '<img src="images/tempimages/set1/2temp5.JPG">', '<img src="images/tempimages/set1/2temp2.JPG">', '<img src="images/tempimages/set1/between_1.JPG">', '<img src="images/tempimages/set1/2temp31.JPG">', '<img src="images/tempimages/set1/2temp32.JPG">', '<img src="images/tempimages/set1/2temp24.JPG">', '<img src="images/tempimages/set1/2temp23.JPG">', '<img src="images/tempimages/set1/2temp40.JPG">', '<img src="images/tempimages/set1/2temp30.JPG">', '<img src="images/tempimages/set1/2temp25.JPG">',
//     '<img src="images/tempimages/set1/2temp29.JPG">', '<img src="images/tempimages/set1/2temp37.JPG">', '<img src="images/tempimages/set1/2temp28.JPG">', '<img src="images/tempimages/set1/2temp34.JPG">', '<img src="images/tempimages/set1/2temp27.JPG">', '<img src="images/tempimages/set1/2temp33.JPG">', '<img src="images/tempimages/set1/2temp39.JPG">', '<img src="images/tempimages/set1/2temp22.JPG">', '<img src="images/tempimages/set1/2temp21.JPG">', '<img src="images/tempimages/set1/2temp35.JPG">', '<img src="images/tempimages/set1/2temp36.JPG">', '<img src="images/tempimages/set1/2temp26.JPG">', '<img src="images/tempimages/set1/between_1.JPG">', '<img src="images/tempimages/set1/2temp53.JPG">', '<img src="images/tempimages/set1/2temp49.JPG">',
//     '<img src="images/tempimages/set1/2temp58.JPG">', '<img src="images/tempimages/set1/2temp43.JPG">', '<img src="images/tempimages/set1/2temp55.JPG">', '<img src="images/tempimages/set1/2temp44.JPG">', '<img src="images/tempimages/set1/2temp51.JPG">', '<img src="images/tempimages/set1/2temp54.JPG">', '<img src="images/tempimages/set1/2temp48.JPG">', '<img src="images/tempimages/set1/2temp42.JPG">', '<img src="images/tempimages/set1/2temp60.JPG">', '<img src="images/tempimages/set1/2temp41.JPG">', '<img src="images/tempimages/set1/2temp47.JPG">', '<img src="images/tempimages/set1/2temp56.JPG">', '<img src="images/tempimages/set1/2temp50.JPG">', '<img src="images/tempimages/set1/2temp46.JPG">', '<img src="images/tempimages/set1/2temp52.JPG">', '<img src="images/tempimages/set1/2temp45.JPG">']

var stimuli_pics = ['<img src="images/tempimages/set1/blue_squarebox11_resized.png">', '<img src="images/tempimages/set1/blue_squarebox12_resized.png">', '<img src="images/tempimages/set1/blue_squarebox15_resized.png">', '<img src="images/tempimages/set1/blue_squarebox1_resized.png">', '<img src="images/tempimages/set1/blue_squarebox6_resized.png">', '<img src="images/tempimages/set1/blue_squarebox7_resized.png">', '<img src="images/tempimages/set1/blue_squarebox9_resized.png">', '<img src="images/tempimages/set1/blue_squarebox20_resized.png">', '<img src="images/tempimages/set1/blue_squarebox16_resized.png">',  '<img src="images/tempimages/set1/blue_squarebox8_resized.png">', '<img src="images/tempimages/set1/blue_squarebox3_resized.png">', '<img src="images/tempimages/set1/blue_squarebox17_resized.png">', '<img src="images/tempimages/set1/blue_squarebox19_resized.png">', '<img src="images/tempimages/set1/blue_squarebox10_resized.png">', '<img src="images/tempimages/set1/blue_squarebox4_resized.png">', '<img src="images/tempimages/set1/blue_squarebox2_resized.png">', '<img src="images/tempimages/set1/blue_squarebox14_resized.png">', '<img src="images/tempimages/set1/blue_squarebox18_resized.png">', '<img src="images/tempimages/set1/blue_squarebox5_resized.png">', '<img src="images/tempimages/set1/blue_squarebox13_resized.png">', '<img src="images/tempimages/set1/between_1.JPG">', '<img src="images/tempimages/set1/blue_squarebox28_resized.png">', '<img src="images/tempimages/set1/blue_squarebox21_resized.png">', '<img src="images/tempimages/set1/blue_squarebox27_resized.png">', '<img src="images/tempimages/set1/blue_squarebox31_resized.png">',
    '<img src="images/tempimages/set1/blue_squarebox38_resized.png">', '<img src="images/tempimages/set1/blue_squarebox22_resized.png">', '<img src="images/tempimages/set1/blue_squarebox40_resized.png">', '<img src="images/tempimages/set1/blue_squarebox39_resized.png">', '<img src="images/tempimages/set1/blue_squarebox23_resized.png">', '<img src="images/tempimages/set1/blue_squarebox26_resized.png">', '<img src="images/tempimages/set1/blue_squarebox32_resized.png">', '<img src="images/tempimages/set1/blue_squarebox37_resized.png">', '<img src="images/tempimages/set1/blue_squarebox29_resized.png">', '<img src="images/tempimages/set1/blue_squarebox30_resized.png">', '<img src="images/tempimages/set1/blue_squarebox25_resized.png">', '<img src="images/tempimages/set1/blue_squarebox35_resized.png">',  '<img src="images/tempimages/set1/blue_squarebox36_resized.png">', '<img src="images/tempimages/set1/blue_squarebox33_resized.png">',
    '<img src="images/tempimages/set1/blue_squarebox24_resized.png">', '<img src="images/tempimages/set1/blue_squarebox34_resized.png">', '<img src="images/tempimages/set1/between_1.JPG">','<img src="images/tempimages/set1/blue_squarebox56_resized.png">', '<img src="images/tempimages/set1/blue_squarebox43_resized.png">', '<img src="images/tempimages/set1/blue_squarebox53_resized.png">', '<img src="images/tempimages/set1/blue_squarebox49_resized.png">', '<img src="images/tempimages/set1/blue_squarebox57_resized.png">', '<img src="images/tempimages/set1/blue_squarebox44_resized.png">', '<img src="images/tempimages/set1/blue_squarebox45_resized.png">', '<img src="images/tempimages/set1/blue_squarebox46_resized.png">', '<img src="images/tempimages/set1/blue_squarebox58_resized.png">', '<img src="images/tempimages/set1/blue_squarebox59_resized.png">', '<img src="images/tempimages/set1/blue_squarebox51_resized.png">', '<img src="images/tempimages/set1/blue_squarebox50_resized.png">', '<img src="images/tempimages/set1/blue_squarebox48_resized.png">', '<img src="images/tempimages/set1/blue_squarebox55_resized.png">', '<img src="images/tempimages/set1/blue_squarebox41_resized.png">', '<img src="images/tempimages/set1/blue_squarebox52_resized.png">', '<img src="images/tempimages/set1/blue_squarebox54_resized.png">', '<img src="images/tempimages/set1/blue_squarebox47_resized.png">', '<img src="images/tempimages/set1/blue_squarebox42_resized.png">', '<img src="images/tempimages/set1/blue_squarebox60_resized.png">']

var sample_function = function(param){
    if (stimuli_pics[temps] == '<img src="images/tempimages/set1/between_2.JPG">'){
        var html = stimuli_pics[temps];
    }
    if (stimuli_pics[temps] == '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = stimuli_pics[temps];
    }
    if (param >= 0.00 && param < 0.0208333333 && stimuli_pics[temps] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics[temps] != '<img src="images/tempimages/set1/between_1.JPG">'){
        // index = index + 1;
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>' + '<img src="images/skip1.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.0208333333 && param < 0.0416666666 && stimuli_pics[temps] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics[temps] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip2.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.0416666666 && param < 0.0624999999 && stimuli_pics[temps] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics[temps] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip3.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.0624999999 && param < 0.0833333332 && stimuli_pics[temps] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics[temps] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip4.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.0833333332 && param < 0.1041666665 && stimuli_pics[temps] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics[temps] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip5.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.1041666665 && param < 0.1249999998 && stimuli_pics[temps] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics[temps] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip6.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.1249999998 && param < 0.1458333331 && stimuli_pics[temps] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics[temps] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip7.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.1458333331 && param < 0.1666666664 && stimuli_pics[temps] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics[temps] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip8.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.1666666664 && param < 0.1874999997 && stimuli_pics[temps] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics[temps] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip9.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.1874999997 && param < 0.208333333){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip10.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.208333333 && param < 0.2291666663){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip11.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.2291666663 && param < 0.2499999996){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>' + '<img src="images/skip12.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.2499999996 && param < 0.2708333329){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+ '<img src="images/skip13.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.2708333329 && param < 0.2916666662){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip14.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.2916666662 && param < 0.3124999995){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip15.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.3124999995 && param < 0.3333333328){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip16.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.3333333328 && param < 0.3541666661){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip17.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.3541666661 && param < 0.3749999994){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip18.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.3749999994 && param < 0.3958333327){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip19.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.3958333327 && param < 0.416666666){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip20.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.416666666 && param < 0.4374999993){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip21.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.4374999993 && param < 0.4583333326){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip22.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.4583333326 && param < 0.4791666666){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip23.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.4791666666 && param < 0.50){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip24.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.50 && param < 0.5208333333){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip25.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.5208333333 && param < 0.5416666666){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip26.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.5416666666 && param < 0.5625){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip27.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.5625 && param < 0.5833333333){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip28.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.5833333333 && param < 0.6041666666){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip29.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.6041666666 && param < 0.625){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip30.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.625 && param < 0.6458333333){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip31.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.6458333333 && param < 0.6666666666){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip32.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.6666666666 && param < 0.6875){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip33.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.6875 && param < 0.7083333333){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip34.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.7083333333 && param < 0.7291666666){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip35.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.7291666666 && param < 0.75){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip36.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.75 && param < 0.7708333333){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip37.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.7708333333 && param < 0.7916666666){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip38.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.7916666666 && param < 0.8125){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip39.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.8125 && param < 0.8333333333){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip40.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.8333333333 && param < 0.8541666666){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip41.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.8541666666 && param < 0.875){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip42.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.875 && param < 0.8958333333){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip43.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.8958333333 && param < 0.9166666666){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip44.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.9166666666 && param < 0.9375){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip45.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.9375 && param < 0.9583333333){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip46.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.9583333333 && param < 0.9791666666){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>'+'<img src="images/skip47.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.9791666666){
        var html = '<br>' + stimuli_pics[temps] + '<br>' + '<br>' + '<img src="images/skip48.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }

    // temps = temps + 1;
    return html;
}

var estimate = {
    type: 'reconstruction',
    stim_function: sample_function,
    starting_value: 0,
    key_increase: '2',
    key_decrease: '1',
    step_size: 0.0208333333,
    // labels: ['25', '50', '75', '100'],
}

// var estimate = {
//     type: 'html-slider-response',
//     display (type) {
//         image = 'html-slider-response'.response
//         if (image == 100){
//             display = 'images/imagetints/Instructions5.JPG'
//         }
//     },
//     display(type),
//     stimulus: display,
//     data: {
//         task: 'response',
//         correct_response: jsPsych.timelineVariable('correct_response')
//     },
// }


// choices = {choices: jsPsych.timelineVariableValue('statement')}
// collection.add(choices)

// var answer = ['<img src="images/tempimages/set1/temp15ans.JPG">', '<img src="images/tempimages/set1/temp15ans.JPG">', '<img src="images/tempimages/set1/temp9ans.JPG">', '<img src="images/tempimages/set1/temp2ans.JPG">', '<img src="images/tempimages/set1/temp18ans.JPG">', '<img src="images/tempimages/set1/temp16ans.JPG">', '<img src="images/tempimages/set1/temp10ans.JPG">',
//     '<img src="images/tempimages/set1/temp17ans.JPG">', '<img src="images/tempimages/set1/temp5ans.JPG">', '<img src="images/tempimages/set1/temp13ans.JPG">', '<img src="images/tempimages/set1/temp3ans.JPG">', '<img src="images/tempimages/set1/temp20ans.JPG">', '<img src="images/tempimages/set1/temp19ans.JPG">',
//     '<img src="images/tempimages/set1/temp8ans.JPG">', '<img src="images/tempimages/set1/temp4ans.JPG">', '<img src="images/tempimages/set1/temp6ans.JPG">', '<img src="images/tempimages/set1/temp11ans.JPG">', '<img src="images/tempimages/set1/temp14ans.JPG">', '<img src="images/tempimages/set1/temp1ans.JPG">', '<img src="images/tempimages/set1/temp36ans.JPG">', '<img src="images/tempimages/set1/temp35ans.JPG">',
//     '<img src="images/tempimages/set1/temp24ans.JPG">', '<img src="images/tempimages/set1/temp23ans.JPG">', '<img src="images/tempimages/set1/temp40ans.JPG">', '<img src="images/tempimages/set1/temp30ans.JPG">', '<img src="images/tempimages/set1/temp25ans.JPG">', '<img src="images/tempimages/set1/temp29ans.JPG">',
//     '<img src="images/tempimages/set1/temp37ans.JPG">', '<img src="images/tempimages/set1/temp28ans.JPG">', '<img src="images/tempimages/set1/temp34ans.JPG">', '<img src="images/tempimages/set1/temp32ans.JPG">', '<img src="images/tempimages/set1/temp31ans.JPG">', '<img src="images/tempimages/set1/temp27ans.JPG">',
//     '<img src="images/tempimages/set1/temp33ans.JPG">', '<img src="images/tempimages/set1/temp26ans.JPG">', '<img src="images/tempimages/set1/temp39ans.JPG">', '<img src="images/tempimages/set1/temp22ans.JPG">', '<img src="images/tempimages/set1/temp21ans.JPG">', '<img src="images/tempimages/set1/temp55ans.JPG">',
//     '<img src="images/tempimages/set1/temp54ans.JPG">', '<img src="images/tempimages/set1/temp42ans.JPG">', '<img src="images/tempimages/set1/temp60ans.JPG">', '<img src="images/tempimages/set1/temp47ans.JPG">', '<img src="images/tempimages/set1/temp56ans.JPG">', '<img src="images/tempimages/set1/temp50ans.JPG">', '<img src="images/tempimages/set1/temp41ans.JPG">',
//     '<img src="images/tempimages/set1/temp48ans.JPG">', '<img src="images/tempimages/set1/temp51ans.JPG">', '<img src="images/tempimages/set1/temp46ans.JPG">', '<img src="images/tempimages/set1/temp58ans.JPG">', '<img src="images/tempimages/set1/temp44ans.JPG">', '<img src="images/tempimages/set1/temp49ans.JPG">', '<img src="images/tempimages/set1/temp52ans.JPG">',
//     '<img src="images/tempimages/set1/temp43ans.JPG">', '<img src="images/tempimages/set1/temp45ans.JPG">', '<img src="images/tempimages/set1/temp53ans.JPG">']

// var answer = ['<img src="images/tempimages/set1/temp15ans.JPG">', '<img src="images/tempimages/set1/temp9ans.JPG">', '<img src="images/tempimages/set1/temp2ans.JPG">', '<img src="images/tempimages/set1/temp18ans.JPG">', '<img src="images/tempimages/set1/temp16ans.JPG">', '<img src="images/tempimages/set1/temp10ans.JPG">',
//     '<img src="images/tempimages/set1/temp17ans.JPG">', '<img src="images/tempimages/set1/temp5ans.JPG">', '<img src="images/tempimages/set1/temp13ans.JPG">', '<img src="images/tempimages/set1/temp3ans.JPG">', '<img src="images/tempimages/set1/temp19ans.JPG">',
//     '<img src="images/tempimages/set1/temp8ans.JPG">', '<img src="images/tempimages/set1/temp4ans.JPG">', '<img src="images/tempimages/set1/temp20ans.JPG">', '<img src="images/tempimages/set1/temp6ans.JPG">', '<img src="images/tempimages/set1/temp11ans.JPG">', '<img src="images/tempimages/set1/temp14ans.JPG">', '<img src="images/tempimages/set1/temp1ans.JPG">', '<img src="images/tempimages/set1/temp36ans.JPG">', '<img src="images/tempimages/set1/temp35ans.JPG">',
//     '<img src="images/tempimages/set1/temp24ans.JPG">', '<img src="images/tempimages/set1/temp23ans.JPG">', '<img src="images/tempimages/set1/temp40ans.JPG">', '<img src="images/tempimages/set1/temp30ans.JPG">', '<img src="images/tempimages/set1/temp25ans.JPG">', '<img src="images/tempimages/set1/temp29ans.JPG">',
//     '<img src="images/tempimages/set1/temp37ans.JPG">', '<img src="images/tempimages/set1/temp28ans.JPG">', '<img src="images/tempimages/set1/temp34ans.JPG">', '<img src="images/tempimages/set1/temp32ans.JPG">', '<img src="images/tempimages/set1/temp31ans.JPG">', '<img src="images/tempimages/set1/temp27ans.JPG">',
//     '<img src="images/tempimages/set1/temp33ans.JPG">', '<img src="images/tempimages/set1/temp26ans.JPG">', '<img src="images/tempimages/set1/temp39ans.JPG">', '<img src="images/tempimages/set1/temp22ans.JPG">', '<img src="images/tempimages/set1/temp21ans.JPG">', '<img src="images/tempimages/set1/temp55ans.JPG">',
//     '<img src="images/tempimages/set1/temp54ans.JPG">', '<img src="images/tempimages/set1/temp42ans.JPG">', '<img src="images/tempimages/set1/temp60ans.JPG">', '<img src="images/tempimages/set1/temp47ans.JPG">', '<img src="images/tempimages/set1/temp56ans.JPG">', '<img src="images/tempimages/set1/temp50ans.JPG">', '<img src="images/tempimages/set1/temp41ans.JPG">',
//     '<img src="images/tempimages/set1/temp48ans.JPG">', '<img src="images/tempimages/set1/temp51ans.JPG">', '<img src="images/tempimages/set1/temp46ans.JPG">', '<img src="images/tempimages/set1/temp58ans.JPG">', '<img src="images/tempimages/set1/temp44ans.JPG">', '<img src="images/tempimages/set1/temp49ans.JPG">', '<img src="images/tempimages/set1/temp52ans.JPG">',
//     '<img src="images/tempimages/set1/temp43ans.JPG">', '<img src="images/tempimages/set1/temp45ans.JPG">', '<img src="images/tempimages/set1/temp53ans.JPG">']

// var answer = ['<img src="images/tempimages/set1/squarebox11ans.jpg">', '<img src="images/tempimages/set1/squarebox12ans.jpg">', '<img src="images/tempimages/set1/squarebox15ans.jpg">', '<img src="images/tempimages/set1/squarebox1ans.jpg">', '<img src="images/tempimages/set1/squarebox6ans.jpg">', '<img src="images/tempimages/set1/squarebox7ans.jpg">', '<img src="images/tempimages/set1/squarebox9ans.jpg">', '<img src="images/tempimages/set1/squarebox20ans.jpg">', '<img src="images/tempimages/set1/squarebox16ans.jpg">',  '<img src="images/tempimages/set1/squarebox8ans.jpg">', '<img src="images/tempimages/set1/squarebox3ans.jpg">', '<img src="images/tempimages/set1/squarebox17ans.jpg">', '<img src="images/tempimages/set1/squarebox19ans.jpg">', '<img src="images/tempimages/set1/squarebox10ans.jpg">', '<img src="images/tempimages/set1/squarebox4ans.jpg">', '<img src="images/tempimages/set1/squarebox2ans.jpg">', '<img src="images/tempimages/set1/squarebox14ans.jpg">', '<img src="images/tempimages/set1/squarebox18ans.jpg">', '<img src="images/tempimages/set1/squarebox5ans.jpg">', '<img src="images/tempimages/set1/squarebox13ans.jpg">', '<img src="images/tempimages/set1/between_1.JPG">', '<img src="images/tempimages/set1/squarebox28ans.jpg">', '<img src="images/tempimages/set1/squarebox21ans.jpg">', '<img src="images/tempimages/set1/squarebox27ans.jpg">', '<img src="images/tempimages/set1/squarebox31ans.jpg">',
//     '<img src="images/tempimages/set1/squarebox38ans.jpg">', '<img src="images/tempimages/set1/squarebox22ans.jpg">', '<img src="images/tempimages/set1/squarebox40ans.jpg">', '<img src="images/tempimages/set1/squarebox39ans.jpg">', '<img src="images/tempimages/set1/squarebox23ans.jpg">', '<img src="images/tempimages/set1/squarebox26ans.jpg">', '<img src="images/tempimages/set1/squarebox32ans.jpg">', '<img src="images/tempimages/set1/squarebox37ans.jpg">', '<img src="images/tempimages/set1/squarebox29ans.jpg">', '<img src="images/tempimages/set1/squarebox30ans.jpg">', '<img src="images/tempimages/set1/squarebox25ans.jpg">', '<img src="images/tempimages/set1/squarebox35ans.jpg">',  '<img src="images/tempimages/set1/squarebox36ans.jpg">', '<img src="images/tempimages/set1/squarebox33ans.jpg">',
//     '<img src="images/tempimages/set1/squarebox24ans.jpg">', '<img src="images/tempimages/set1/squarebox34ans.jpg">', '<img src="images/tempimages/set1/between_1.JPG">','<img src="images/tempimages/set1/squarebox56ans.jpg">', '<img src="images/tempimages/set1/squarebox43ans.jpg">', '<img src="images/tempimages/set1/squarebox53ans.jpg">', '<img src="images/tempimages/set1/squarebox49ans.jpg">', '<img src="images/tempimages/set1/squarebox57ans.jpg">', '<img src="images/tempimages/set1/squarebox44ans.jpg">', '<img src="images/tempimages/set1/squarebox45ans.jpg">', '<img src="images/tempimages/set1/squarebox46ans.jpg">', '<img src="images/tempimages/set1/squarebox58ans.jpg">', '<img src="images/tempimages/set1/squarebox59ans.jpg">', '<img src="images/tempimages/set1/squarebox51ans.jpg">', '<img src="images/tempimages/set1/squarebox50ans.jpg">', '<img src="images/tempimages/set1/squarebox48ans.jpg">', '<img src="images/tempimages/set1/squarebox55ans.jpg">', '<img src="images/tempimages/set1/squarebox41ans.jpg">', '<img src="images/tempimages/set1/squarebox52ans.jpg">', '<img src="images/tempimages/set1/squarebox54ans.jpg">', '<img src="images/tempimages/set1/squarebox47ans.jpg">', '<img src="images/tempimages/set1/squarebox42ans.jpg">', '<img src="images/tempimages/set1/squarebox60ans.jpg">']

var reveal = function(){
    var html = answer[temps]
    return html;
}

var reveal = {
    // type: 'survey-text',
    type: 'html-keyboard-response',
    // type: 'html-keyboard-response',
    // questions: [ {prompt: jsPsych.timelineVariable('statement')}],
    stimulus: jsPsych.timelineVariable('correct_response'),
    // stimulus: answer[ranNums[index]],
    // stimulus: '<img src="images/tint1A.JPG">, <img src="images/tint1B.JPG">',
    // stimulus: '<img src="images/tint1B.JPG">',
    choices: jsPsych.NO_KEYS,
    trial_duration: 2000,
    data: {
        task: 'response',
        correct_response: jsPsych.timelineVariable('correct_response')
    },
    // choice: {choice: response},
    // collection.add(choice),
}

var update = function() {
    index = index + 1;
    console.log(index)
    console.log(stimuli_pics[temps])
    sensor_pic = ranNums[index]
    temps = temps + 1;
    reveal = ranNums[index]
    // console.log(ranNums[index])
    // console.log(answer[reveal])
    // console.log(stimuli_pics[temps])
    console.log(temps)
}

var func = {
    type: 'call-function',
    func: update,

}

var test_procedure = {
    timeline: [fixation, test, estimate, reveal, func],
    timeline_variables: test_stimuli, real_stimuli_pics,
    repetitions: 1
}

experiment.push(test_procedure);


// let saveData;
// data = jsPsych.data.displayData();
// saveData = jsPsych.data.get().ignore(['stimulus', 'trial_type', 'trial_index', 'internal_node_id']).filterCustom(function(trial) {return trial.key_press != null});



// heatmaps = {heatmap: jsPsych.timelineVariable('stimulus')}
// predictions_given = {predictions_given: jsPsych.timelineVariable('statement')}
// correct_response = {correct_response: jsPsych.timelineVariable('correct_response')}


// var collection = firebase.firestore().collection('realrun99');
// data = jsPsych.data.displayData('csv');
// console.log(jsPsych.data.get().csv());


/*******************
 * * Run Task
 ******************/

jsPsych.init({

    timeline: experiment,

    on_finish: function () {
        alert("The experiment has finished. Thank you for participating.");
        // data = jsPsych.data.get().localSave('csv', 'testdata.csv');
        // data.localSave('csv', 'testdata.csv');
        data111 = jsPsych.data.get().filter({trial_type: 'reconstruction'}).csv();
        // jsPsych.data.displayData(data111);
        console.log(data111);
        // jsPsych.data.displayData();
        // save = localSave(data111)
        var collection = firebase.firestore().collection('squareblocktest');
        // data1111 = data111.csv()
        datafinal = {data: data111}
        collection.add(datafinal);
    }
});

//
//
// alert("The experiment has finished.");
// // data = jsPsych.data.localSave('csv', 'testdata.csv');
// // data.localSave('csv', 'testdata.csv');
// data111 = jsPsych.data.get().filter({trial_type: 'image-slider-response'}).csv();
// jsPsych.data.displayData(data111);
// jsPsych.data.displayData();
// // save = localSave(data111)
// var collection = firebase.firestore().collection('demoruiyang');
// // data1111 = data111.csv()
// datafinal = {data: data111}
// collection.add(datafinal)






// function generateTableHead(data111, objects) {
//     let thead = table.createTHead();
//     let row = thead.insertRow();
//     for (let key of objects) {
//         let th = document.createElement("th");
//         let text = document.createTextNode(key);
//         th.appendChild(text);
//         row.appendChild(th);
//     }
// }
//
// let objects = ["rt", "response", "stimulus", "task", "correct_response", "trial_type", "trial_index"
// , "time_elapsed", "internal_node_id", "demographics", "pssResp"]
//
//
// function generateTable(data111, objects) {
//     for (let element of objects) {
//         let row = table.insertRow();
//         for (key in element) {
//             let cell = row.insertCell();
//             let text = document.createTextNode(element[key]);
//             cell.appendChild(text);
//         }
//     }
// }
//
// generateTable(data111);
//
// // saveData.localSave('csv', 'testdata.csv');



