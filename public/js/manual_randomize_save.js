
var numss = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],//all numbers to be randomized
    ranNums1 = [],
    ranNums2 = [],
    ranNums3 = [],
    i = numss.length,
    j = 0;

while (i--) {
    j = Math.floor(Math.random() * (i+1));
    ranNums1.push(numss[j]);
    numss.splice(j,1);
    j = Math.floor(Math.random() * (i+1));
    ranNums2.push(numss[j]);
    numss.splice(j,1);
    j = Math.floor(Math.random() * (i+1));
    ranNums3.push(numss[j]);
    numss.splice(j,1);
}

console.log(ranNums1)
console.log(ranNums2)
console.log(ranNums3)

order = []



var trial_order = [1, 2, 3],//all numbers to be randomized
    randisps = [],
    i = trial_order.length,
    j = 0;

while (i--) {
    j = Math.floor(Math.random() * (i+1));
    randisps.push(trial_order[j]);
    trial_order.splice(j,1);
}

console.log(randisps)


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
        '<img src="images/Instructions/Instructions2_light.jpg">',
        '<img src="images/Instructions/Instructions3_extralight.jpg">',
        '<img src="images/Instructions/Instructions4_extralight.jpg">',
        '<img src="images/Instructions/Instructions5_extralight.jpg">',
        '<img src="images/Instructions/Instructions6_final5.jpg">',
        '<img src="images/Instructions/Instructions8_light.jpg">',
        '<img src="images/Instructions/Instructions9_light.jpg">',
        '<img src="images/Instructions/Instructions10_light.jpg">',],
    show_clickable_nav: true
};
//"images/Instructions/Instructions1_light.jpg", "images/Instructions/Instructions2_light.jpg", "images/Instructions/Instructions3_extralight.jpg", 'images/Instructions/Instructions4_extralight.jpg', "images/Instructions/Instructions5_extralight.jpg", "images/Instructions/Instructions6_final5.jpg", "images/Instructions/Instructions8_light.jpg", "images/Instructions/Instructions9_light.jpg", "images/Instructions/Instructions10_light.jpg"

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
        'images/skip1.JPG', 'images/skip2.JPG', 'images/skip3.JPG', 'images/skip4.JPG', 'images/skip5.JPG', 'images/skip6.JPG', 'images/skip7.JPG', 'images/skip8.JPG', 'images/skip9.JPG', 'images/skip10.JPG', 'images/skip11.JPG', 'images/skip12.JPG', 'images/skip13.JPG', 'images/skip14.JPG', 'images/skip15.JPG', 'images/skip16.JPG', 'images/skip17.JPG', 'images/skip18.JPG', 'images/skip19.JPG', 'images/skip20.JPG', "images/tempimages/set4/blueans_2squarebox1_resized.png", "images/tempimages/set4/blueans_2squarebox2_resized.png", "images/tempimages/set4/blueans_2squarebox3_resized.png", "images/tempimages/set4/blueans_2squarebox4_resized.png", "images/tempimages/set4/blueans_2squarebox5_resized.png", "images/tempimages/set4/blueans_2squarebox6_resized.png", "images/tempimages/set4/blueans_2squarebox7_resized.png", "images/tempimages/set4/blueans_2squarebox8_resized.png",
        "images/tempimages/set4/blueans_2squarebox9_resized.png", "images/tempimages/set4/blueans_2squarebox10_resized.png", "images/tempimages/set4/blueans_2squarebox11_resized.png", "images/tempimages/set4/blueans_2squarebox12_resized.png", "images/tempimages/set4/blueans_2squarebox13_resized.png", "images/tempimages/set4/blueans_2squarebox14_resized.png", "images/tempimages/set4/blueans_2squarebox15_resized.png", "images/tempimages/set4/blueans_2squarebox16_resized.png", "images/tempimages/set4/blueans_2squarebox17_resized.png", "images/tempimages/set4/blueans_2squarebox18_resized.png", "images/tempimages/set4/blueans_2squarebox19_resized.png", "images/tempimages/set4/blueans_2squarebox20_resized.png", "images/tempimages/set4/blueans_2squarebox21_resized.png", "images/tempimages/set4/blueans_2squarebox22_resized.png", "images/tempimages/set4/blueans_2squarebox23_resized.png",
        "images/tempimages/set4/blueans_2squarebox24_resized.png", "images/tempimages/set4/blueans_2squarebox25_resized.png", "images/tempimages/set4/blueans_2squarebox26_resized.png", "images/tempimages/set4/blueans_2squarebox27_resized.png", "images/tempimages/set4/blueans_2squarebox28_resized.png", "images/tempimages/set4/blueans_2squarebox29_resized.png", "images/tempimages/set4/blueans_2squarebox30_resized.png", "images/tempimages/set4/blueans_2squarebox31_resized.png", "images/tempimages/set4/blueans_2squarebox32_resized.png", "images/tempimages/set4/blueans_2squarebox33_resized.png", "images/tempimages/set4/blueans_2squarebox34_resized.png", "images/tempimages/set4/blueans_2squarebox35_resized.png", "images/tempimages/set4/blueans_2squarebox36_resized.png", "images/tempimages/set4/blueans_2squarebox37_resized.png", "images/tempimages/set4/blueans_2squarebox38_resized.png",
        "images/tempimages/set4/blueans_2squarebox39_resized.png", "images/tempimages/set4/blueans_2squarebox40_resized.png", "images/tempimages/set4/blueans_2squarebox41_resized.png", "images/tempimages/set4/blueans_2squarebox42_resized.png", "images/tempimages/set4/blueans_2squarebox43_resized.png", "images/tempimages/set4/blueans_2squarebox44_resized.png", "images/tempimages/set4/blueans_2squarebox45_resized.png", "images/tempimages/set4/blueans_2squarebox47_resized.png", "images/tempimages/set4/blueans_2squarebox48_resized.png", "images/tempimages/set4/blueans_2squarebox49_resized.png", "images/tempimages/set4/blueans_2squarebox50_resized.png", "images/tempimages/set4/blueans_2squarebox51_resized.png", "images/tempimages/set4/blueans_2squarebox52_resized.png", "images/tempimages/set4/blueans_2squarebox53_resized.png",
        "images/tempimages/set4/blueans_2squarebox54_resized.png", "images/tempimages/set4/blueans_2squarebox55_resized.png", "images/tempimages/set4/blueans_2squarebox56_resized.png", "images/tempimages/set4/blueans_2squarebox57_resized.png", "images/tempimages/set4/blueans_2squarebox58_resized.png", "images/tempimages/set4/blueans_2squarebox59_resized.png", "images/tempimages/set4/blueans_2squarebox60_resized.png", "images/tempimages/set4/blue_2squarebox1_resized.png", "images/tempimages/set4/blue_2squarebox2_resized.png", "images/tempimages/set4/blue_2squarebox3_resized.png", "images/tempimages/set4/blue_2squarebox4_resized.png", "images/tempimages/set4/blue_2squarebox5_resized.png", "images/tempimages/set4/blue_2squarebox6_resized.png", "images/tempimages/set4/blue_2squarebox7_resized.png", "images/tempimages/set4/blue_2squarebox8_resized.png",
        "images/tempimages/set4/blue_2squarebox9_resized.png", "images/tempimages/set4/blue_2squarebox10_resized.png", "images/tempimages/set4/blue_2squarebox11_resized.png", "images/tempimages/set4/blue_2squarebox12_resized.png", "images/tempimages/set4/blue_2squarebox13_resized.png", "images/tempimages/set4/blue_2squarebox14_resized.png", "images/tempimages/set4/blue_2squarebox15_resized.png", "images/tempimages/set4/blue_2squarebox16_resized.png", "images/tempimages/set4/blue_2squarebox17_resized.png", "images/tempimages/set4/blue_2squarebox18_resized.png", "images/tempimages/set4/blue_2squarebox19_resized.png", "images/tempimages/set4/blue_2squarebox20_resized.png", "images/tempimages/set4/blue_2squarebox21_resized.png", "images/tempimages/set4/blue_2squarebox22_resized.png", "images/tempimages/set4/blue_2squarebox23_resized.png", "images/tempimages/set4/blue_2squarebox24_resized.png",
        "images/tempimages/set4/blue_2squarebox25_resized.png", "images/tempimages/set4/blue_2squarebox27_resized.png", "images/tempimages/set4/blue_2squarebox28_resized.png", "images/tempimages/set4/blue_2squarebox29_resized.png", "images/tempimages/set4/blue_2squarebox30_resized.png", "images/tempimages/set4/blue_2squarebox31_resized.png", "images/tempimages/set4/blue_2squarebox32_resized.png", "images/tempimages/set4/blue_2squarebox33_resized.png", "images/tempimages/set4/blue_2squarebox34_resized.png", "images/tempimages/set4/blue_2squarebox35_resized.png", "images/tempimages/set4/blue_2squarebox36_resized.png", "images/tempimages/set4/blue_2squarebox37_resized.png", "images/tempimages/set4/blue_2squarebox38_resized.png", "images/tempimages/set4/blue_2squarebox39_resized.png", "images/tempimages/set4/blue_2squarebox40_resized.png",
        "images/tempimages/set4/blue_2squarebox41_resized.png", "images/tempimages/set4/blue_2squarebox42_resized.png", "images/tempimages/set4/blue_2squarebox43_resized.png", "images/tempimages/set4/blue_2squarebox44_resized.png", "images/tempimages/set4/blue_2squarebox45_resized.png", "images/tempimages/set4/blue_2squarebox47_resized.png", "images/tempimages/set4/blue_2squarebox48_resized.png", "images/tempimages/set4/blue_2squarebox49_resized.png", "images/tempimages/set4/blue_2squarebox50_resized.png", "images/tempimages/set4/blue_2squarebox51_resized.png", "images/tempimages/set4/blue_2squarebox52_resized.png", "images/tempimages/set4/blue_2squarebox53_resized.png", "images/tempimages/set4/blue_2squarebox54_resized.png", "images/tempimages/set4/blue_2squarebox55_resized.png", "images/tempimages/set4/blue_2squarebox56_resized.png",
        "images/tempimages/set4/blue_2squarebox57_resized.png", "images/tempimages/set4/blue_2squarebox58_resized.png", "images/tempimages/set4/blue_2squarebox59_resized.png", "images/tempimages/set4/blue_2squarebox60_resized.png", "images/tempimages/set4/blue_2squarebox27_resized.jpg", "images/tempimages/set4/blue_2squarebox28_resized.jpg", "images/tempimages/set4/blue_2squarebox29_resized.jpg", "images/tempimages/set4/blue_2squarebox30_resized.jpg", "images/tempimages/set4/blue_2squarebox31_resized.jpg", "images/tempimages/set4/blue_2squarebox32_resized.jpg", "images/tempimages/set4/blue_2squarebox33_resized.jpg", "images/tempimages/set4/blue_2squarebox34_resized.jpg", "images/tempimages/set4/blue_2squarebox35_resized.jpg", "images/tempimages/set4/blue_2squarebox36_resized.jpg", "images/tempimages/set4/blue_2squarebox37_resized.jpg", "images/tempimages/set4/blue_2squarebox38_resized.jpg",
        "images/tempimages/set4/blue_2squarebox39_resized.jpg", "images/tempimages/set4/blue_2squarebox40_resized.jpg", "images/tempimages/set4/blueans_2squarebox27_resized.jpg", "images/tempimages/set4/blueans_2squarebox28_resized.jpg", "images/tempimages/set4/blueans_2squarebox29_resized.jpg", "images/tempimages/set4/blueans_2squarebox30_resized.jpg", "images/tempimages/set4/blueans_2squarebox31_resized.jpg", "images/tempimages/set4/blueans_2squarebox32_resized.jpg", "images/tempimages/set4/blueans_2squarebox33_resized.jpg", "images/tempimages/set4/blueans_2squarebox34_resized.jpg", "images/tempimages/set4/blueans_2squarebox35_resized.jpg", "images/tempimages/set4/blueans_2squarebox36_resized.jpg", "images/tempimages/set4/blueans_2squarebox37_resized.jpg", "images/tempimages/set4/blueans_2squarebox38_resized.jpg", "images/tempimages/set4/blueans_2squarebox39_resized.jpg", "images/tempimages/set4/blueans_2squarebox40_resized.jpg",
        "images/tempimages/set4/blueans_2squarebox15_resized.jpg", "images/tempimages/set4/blueans_2squarebox16_resized.jpg", "images/tempimages/set4/blueans_2squarebox17_resized.jpg", "images/tempimages/set4/blueans_2squarebox18_resized.jpg", "images/tempimages/set4/blueans_2squarebox19_resized.jpg", "images/tempimages/set4/blueans_2squarebox20_resized.jpg", "images/tempimages/set4/blue_2squarebox15_resized.jpg", "images/tempimages/set4/blue_2squarebox16_resized.jpg", "images/tempimages/set4/blue_2squarebox17_resized.jpg", "images/tempimages/set4/blue_2squarebox18_resized.jpg", "images/tempimages/set4/blue_2squarebox19_resized.jpg", "images/tempimages/set4/blue_2squarebox20_resized.jpg", "images/Instructions/Instructions1_light.jpg", "images/Instructions/Instructions2_light.jpg", "images/Instructions/Instructions3_extralight.jpg", 'images/Instructions/Instructions4_extralight.jpg', "images/Instructions/Instructions5_extralight.jpg", "images/Instructions/Instructions6_final5.jpg", "images/Instructions/Instructions8_light.jpg", "images/Instructions/Instructions9_light.jpg", "images/Instructions/Instructions10_light.jpg"
    ]
}


experiment.push(preload1221, instruction1, demographics, instruction2, instructions);
/* create timeline */




/* define welcome message trial */
var welcome = {
    type: "html-keyboard-response",
    stimulus: "Welcome to the experiment. Press any key to begin."
};
experiment.push(welcome);


var trialStimTemplate =
    "<p id='left_selection_prompt' ></p>";

var collection = firebase.firestore().collection('realrun2349802342');

temps1 = 0;

var test_stimuli1 = [

    { stimulus: '<img src="images/2actual_resized/red4_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox4_resized.png">', statement: '<img src="images/tempimages/set4/blue_2squarebox4_resized.png">', order: 4},
    { stimulus: '<img src="images/2actual_resized/red1_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox1_resized.png">', statement: '<img src="images/tempimages/set4/blue_2squarebox1_resized.png">', order: 1},
    { stimulus: '<img src="images/2actual_resized/red19_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox19_resized.jpg">', statement: '<img src="images/tempimages/set4/blue_2squarebox19_resized.jpg">', order: 19},
    { stimulus: '<img src="images/2actual_resized/red3_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox3_resized.png">', statement: '<img src="images/tempimages/set4/blue_2squarebox3_resized.png">', order: 3},
    { stimulus: '<img src="images/2actual_resized/red5_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox5_resized.png">', statement: '<img src="images/tempimages/set4/blue_2squarebox5_resized.png">', order: 5},
    { stimulus: '<img src="images/2actual_resized/red12_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox12_resized.png">', statement: '<img src="images/tempimages/set4/blue_2squarebox12_resized.png">', order: 12},
    { stimulus: '<img src="images/2actual_resized/red18_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox18_resized.jpg">', statement: '<img src="images/tempimages/set4/blue_2squarebox18_resized.jpg">', order: 18},
    { stimulus: '<img src="images/2actual_resized/red6_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox6_resized.png">', statement: '<img src="images/tempimages/set4/blue_2squarebox6_resized.png">', order: 6},
    { stimulus: '<img src="images/2actual_resized/red16_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox16_resized.jpg">', statement: '<img src="images/tempimages/set4/blue_2squarebox16_resized.jpg">', order: 16},
    { stimulus: '<img src="images/2actual_resized/red8_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox8_resized.png">', statement: '<img src="images/tempimages/set4/blue_2squarebox8_resized.png">', order: 8},
    { stimulus: '<img src="images/2actual_resized/red9_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox9_resized.png">', statement: '<img src="images/tempimages/set4/blue_2squarebox9_resized.png">', order: 9},
    { stimulus: '<img src="images/2actual_resized/red13_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox13_resized.png">', statement: '<img src="images/tempimages/set4/blue_2squarebox13_resized.png">', order: 13},
    { stimulus: '<img src="images/2actual_resized/red10_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox10_resized.png">', statement: '<img src="images/tempimages/set4/blue_2squarebox10_resized.png">', order: 10},
    { stimulus: '<img src="images/2actual_resized/red15_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox15_resized.jpg">', statement: '<img src="images/tempimages/set4/blue_2squarebox15_resized.jpg">', order: 15},
    { stimulus: '<img src="images/2actual_resized/red7_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox7_resized.png">', statement: '<img src="images/tempimages/set4/blue_2squarebox7_resized.png">', order: 7},
    { stimulus: '<img src="images/2actual_resized/red17_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox17_resized.jpg">', statement: '<img src="images/tempimages/set4/blue_2squarebox17_resized.jpg">', order: 17},
    { stimulus: '<img src="images/2actual_resized/red2_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox2_resized.png">', statement: '<img src="images/tempimages/set4/blue_2squarebox2_resized.png">', order: 2},
    { stimulus: '<img src="images/2actual_resized/red20_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox20_resized.jpg">', statement: '<img src="images/tempimages/set4/blue_2squarebox20_resized.jpg">', order: 20},
    { stimulus: '<img src="images/2actual_resized/red14_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox14_resized.png">', statement: '<img src="images/tempimages/set4/blue_2squarebox14_resized.png">', order: 14},
    { stimulus: '<img src="images/2actual_resized/red11_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox11_resized.png">', statement: '<img src="images/tempimages/set4/blue_2squarebox11_resized.png">', order: 11},
]

var orderingfunc1 = function() {
    order.push(jsPsych.timelineVariable('order'))
}

var ordering1 = {
    type: 'call-function',
    func: orderingfunc1,
}


var fixation1 = {
    type: 'html-keyboard-response',
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
    data: {
        task: 'fixation'
    }
};

var test1 = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: jsPsych.NO_KEYS,
    trial_duration: 700,
}


var stimuli_pics1 = ['<img src="images/tempimages/set4/blueans_2squarebox1_resized.png">', '<img src="images/tempimages/set4/blueans_2squarebox2_resized.png">', '<img src="images/tempimages/set4/blueans_2squarebox3_resized.png">', '<img src="images/tempimages/set4/blueans_2squarebox4_resized.png">', '<img src="images/tempimages/set4/blueans_2squarebox5_resized.png">', '<img src="images/tempimages/set4/blueans_2squarebox6_resized.png">', '<img src="images/tempimages/set4/blueans_2squarebox7_resized.png">', '<img src="images/tempimages/set4/blueans_2squarebox8_resized.png">', '<img src="images/tempimages/set4/blueans_2squarebox9_resized.png">', '<img src="images/tempimages/set4/blueans_2squarebox10_resized.png">', '<img src="images/tempimages/set4/blueans_2squarebox11_resized.png">', '<img src="images/tempimages/set4/blueans_2squarebox12_resized.png">', '<img src="images/tempimages/set4/blueans_2squarebox13_resized.png">', '<img src="images/tempimages/set4/blueans_2squarebox14_resized.png">', '<img src="images/tempimages/set4/blueans_2squarebox15_resized.jpg">', '<img src="images/tempimages/set4/blueans_2squarebox16_resized.jpg">', '<img src="images/tempimages/set4/blueans_2squarebox17_resized.jpg">', '<img src="images/tempimages/set4/blueans_2squarebox18_resized.jpg">', '<img src="images/tempimages/set4/blueans_2squarebox19_resized.jpg">', '<img src="images/tempimages/set4/blueans_2squarebox20_resized.jpg">']


//var snips1 = ['<img src="images/skip13.JPG", style="width: 400px; height: 77px;">' + jsPsych.timelineVariable('correct_response', true)];

var sample_function1 = function(param){


    if (stimuli_pics1[temps1] == '<img src="images/tempimages/set1/between_2.JPG">'){
        var html = stimuli_pics[temps1];
    }
    if (stimuli_pics1[temps1] == '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = stimuli_pics[temps1];
    }
    if (param >= 0.00 && param < 0.0208333333 && stimuli_pics1[temps1] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics1[temps1] != '<img src="images/tempimages/set1/between_1.JPG">'){
        // index = index + 1;
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>' + '<img src="images/skip1.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        snips1 = '<img src="images/skip1.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.0208333333 && param < 0.0416666666 && stimuli_pics1[temps1] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics1[temps1] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip2.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip2.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.0416666666 && param < 0.0624999999 && stimuli_pics1[temps1] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics1[temps1] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip3.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip3.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.0624999999 && param < 0.0833333332 && stimuli_pics1[temps1] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics1[temps1] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip4.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip4.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.0833333332 && param < 0.1041666665 && stimuli_pics1[temps1] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics1[temps1] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip5.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip5.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.1041666665 && param < 0.1249999998 && stimuli_pics1[temps1] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics1[temps1] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip6.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip6.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.1249999998 && param < 0.1458333331 && stimuli_pics1[temps1] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics1[temps1] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip7.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip7.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.1458333331 && param < 0.1666666664 && stimuli_pics1[temps1] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics1[temps1] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip8.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip8.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.1666666664 && param < 0.1874999997 && stimuli_pics1[temps1] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics1[temps1] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip9.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip9.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.1874999997 && param < 0.208333333){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip10.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip10.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.208333333 && param < 0.2291666663){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip11.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip11.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.2291666663 && param < 0.2499999996){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>' + '<img src="images/skip12.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip12.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.2499999996 && param < 0.2708333329){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+ '<img src="images/skip13.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip13.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.2708333329 && param < 0.2916666662){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip14.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip14.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.2916666662 && param < 0.3124999995){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip15.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip15.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.3124999995 && param < 0.3333333328){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip16.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip16.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.3333333328 && param < 0.3541666661){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip17.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip17.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.3541666661 && param < 0.3749999994){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip18.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip18.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.3749999994 && param < 0.3958333327){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip19.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip19.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.3958333327 && param < 0.416666666){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip20.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip20.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.416666666 && param < 0.4374999993){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip21.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip21.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.4374999993 && param < 0.4583333326){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip22.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip22.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.4583333326 && param < 0.4791666666){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip23.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip23.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.4791666666 && param < 0.50){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip24.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip24.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.50 && param < 0.5208333333){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip25.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip25.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.5208333333 && param < 0.5416666666){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip26.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip26.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.5416666666 && param < 0.5625){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip27.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip27.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.5625 && param < 0.5833333333){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip28.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip28.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.5833333333 && param < 0.6041666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip29.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip29.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.6041666666 && param < 0.625){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip30.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip30.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.625 && param < 0.6458333333){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip31.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip31.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.6458333333 && param < 0.6666666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip32.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip32.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.6666666666 && param < 0.6875){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip33.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip33.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.6875 && param < 0.7083333333){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip34.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip34.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.7083333333 && param < 0.7291666666){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip35.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip35.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.7291666666 && param < 0.75){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip36.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip36.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.75 && param < 0.7708333333){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip37.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip37.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.7708333333 && param < 0.7916666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip38.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip38.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.7916666666 && param < 0.8125){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip39.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip39.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.8125 && param < 0.8333333333){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip40.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip40.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.8333333333 && param < 0.8541666666){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip41.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip41.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.8541666666 && param < 0.875){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip42.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip42.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.875 && param < 0.8958333333){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip43.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip43.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.8958333333 && param < 0.9166666666){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip44.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip44.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.9166666666 && param < 0.9375){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip45.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip45.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.9375 && param < 0.9583333333){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip46.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip46.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.9583333333 && param < 0.9791666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip47.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip47.JPG", style="width: 400px; height: 77px;">'
    }
    if (param >= 0.9791666666){
        var html =  '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>' + '<img src="images/skip48.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
        var snips1 = '<img src="images/skip48.JPG", style="width: 400px; height: 77px;">'
    }

    return html;
}


var correct_pic1 = stimuli_pics1[temps1];

var estimate1 = {
    type: 'reconstruction',
    stim_function: sample_function1,
    starting_value: 0,
    key_increase: '2',
    key_decrease: '1',
    step_size: 0.0208333333,
}

var correctresponse1 = jsPsych.timelineVariable('correct_response')

var image1assign = function() {
    if (console.log(jsPsych.timelineVariable('order')) == 1){
        var image1 = '<img src="images/tempimages/set4/blueans_2squarebox1_resized.png">';
        return image1;
    }
    else if (console.log(jsPsych.timelineVariable('order')) == 2){
        var image1 = '<img src="images/tempimages/set4/blueans_2squarebox2_resized.png">';
        return image1;
    }
    else if (console.log(jsPsych.timelineVariable('order')) == 3){
        var image1 = '<img src="images/tempimages/set4/blueans_2squarebox3_resized.png">';
        return image1;
    }
    else if (console.log(jsPsych.timelineVariable('order')) == 4){
        var image1 = '<img src="images/tempimages/set4/blueans_2squarebox4_resized.png">';
        return image1;
    }
    else if (console.log(jsPsych.timelineVariable('order')) == 5){
        var image1 = '<img src="images/tempimages/set4/blueans_2squarebox5_resized.png">';
        return image1;
    }
    else if (console.log(jsPsych.timelineVariable('order')) == 6){
        var image1 = '<img src="images/tempimages/set4/blueans_2squarebox6_resized.png">';
        return image1;
    }
    else if (console.log(jsPsych.timelineVariable('order')) == 7){
        var image1 = '<img src="images/tempimages/set4/blueans_2squarebox7_resized.png">';
        return image1;
    }
    else if (console.log(jsPsych.timelineVariable('order')) == 8){
        var image1 = '<img src="images/tempimages/set4/blueans_2squarebox8_resized.png">';
        return image1;
    }
    else if (console.log(jsPsych.timelineVariable('order')) == 9){
        var image1 = '<img src="images/tempimages/set4/blueans_2squarebox9_resized.png">';
        return image1;
    }
    else if (console.log(jsPsych.timelineVariable('order')) == 10){
        var image1 = '<img src="images/tempimages/set4/blueans_2squarebox10_resized.png">';
        return image1;
    }
    else if (console.log(jsPsych.timelineVariable('order')) == 11){
        var image1 = '<img src="images/tempimages/set4/blueans_2squarebox11_resized.png">';
        return image1;
    }
    else if (console.log(jsPsych.timelineVariable('order')) == 12){
        var image1 = '<img src="images/tempimages/set4/blueans_2squarebox12_resized.png">';
        return image1;
    }
    else if (console.log(jsPsych.timelineVariable('order')) == 13){
        var image1 = '<img src="images/tempimages/set4/blueans_2squarebox13_resized.png">';
        return image1;
    }
    else if (console.log(jsPsych.timelineVariable('order')) == 14){
        var image1 = '<img src="images/tempimages/set4/blueans_2squarebox14_resized.png">';
        return image1;
    }
    else if (console.log(jsPsych.timelineVariable('order')) == 15){
        var image1 = '<img src="images/tempimages/set4/blueans_2squarebox15_resized.jpg">';
        return image1;
    }
    else if (console.log(jsPsych.timelineVariable('order')) == 16){
        var image1 = '<img src="images/tempimages/set4/blueans_2squarebox16_resized.jpg">';
        return image1;
    }
    else if (console.log(jsPsych.timelineVariable('order')) == 17){
        var image1 = '<img src="images/tempimages/set4/blueans_2squarebox17_resized.jpg">';
        return image1;
    }
    else if (console.log(jsPsych.timelineVariable('order')) == 18){
        var image1 = '<img src="images/tempimages/set4/blueans_2squarebox18_resized.jpg">';
        return image1;
    }
    else if (console.log(jsPsych.timelineVariable('order')) == 19){
        var image1 = '<img src="images/tempimages/set4/blueans_2squarebox19_resized.jpg">';
        return image1;
    }
    else if (console.log(jsPsych.timelineVariable('order')) == 20){
        var image1 = '<img src="images/tempimages/set4/blueans_2squarebox20_resized.jpg">';
        return image1;
    }
    else{
        console.log(jsPsych.timelineVariable('order'));
        // var image1 = '<img src="images/tempimages/set4/blueans_2squarebox20_resized.jpg">';
        // return image1;
    }
}


// var image1assign = function() {
//     console = stimuli_pics1[temps1];
//     return console;
// }

var imagecall1 = {
    type: 'call-function',
    func: image1assign,
}

var reveal1 = {
    type: 'html-keyboard-response',
    stimulus: function(){
        return '<img src="images/skip45.JPG", style="width: 400px; height: 77px;">' + stimuli_pics1[temps1];
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: 2000,
    data: {
        task: 'response',
        correct_response: jsPsych.timelineVariable('correct_response')
    },
}

var update1 = function() {
    console.log(jsPsych.timelineVariable('stimulus'))
    sensor_pic = ranNums[index]
    console.log(jsPsych.timelineVariable('statement'))
    temps1 = temps1 + 1;
    console.log(jsPsych.timelineVariable('order'))
    console.log(image1assign()),
        console.log(jsPsych.timelineVariable('correct_response'))
}

var func1 = {
    type: 'call-function',
    func: update1,
}

var test_procedure1 = {
    timeline: [ordering1, fixation1, test1, imagecall1, estimate1, reveal1, func1],
    timeline_variables: test_stimuli1, stimuli_pics1, temps1, correctresponse1, correct_pic1, console,
    repetitions: 1,
    randomize_order: true
}

temps2 = 0;

var test_stimuli2 = [
    //{ stimulus: '<img src="images/blank.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/between_2.JPG">', statement: '<img src="images/tempimages/set1/between_1.JPG">'},
    { stimulus: '<img src="images/2actual_resized/yellow13_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox33_resized.jpg">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox33_resized.jpg">', order: 33},
    { stimulus: '<img src="images/2actual_resized/yellow1_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox21_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox21_resized.png">', order: 21},
    { stimulus: '<img src="images/2actual_resized/yellow2_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox22_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox22_resized.png">', order: 22},
    { stimulus: '<img src="images/2actual_resized/yellow12_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox32_resized.jpg">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox32_resized.jpg">', order: 32},
    { stimulus: '<img src="images/2actual_resized/yellow3_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox23_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox23_resized.png">', order: 23},
    { stimulus: '<img src="images/2actual_resized/yellow4_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox24_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox24_resized.png">', order: 24},
    { stimulus: '<img src="images/2actual_resized/yellow19_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox39_resized.jpg">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox39_resized.jpg">', order: 39},
    { stimulus: '<img src="images/2actual_resized/yellow5_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox25_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox25_resized.png">', order: 25},
    { stimulus: '<img src="images/2actual_resized/yellow16_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox36_resized.jpg">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox36_resized.jpg">', order: 36},
    { stimulus: '<img src="images/2actual_resized/yellow6_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox26_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox26_resized.png">', order: 26},
    { stimulus: '<img src="images/2actual_resized/yellow8_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox28_resized.jpg">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox28_resized.jpg">', order: 28},
    { stimulus: '<img src="images/2actual_resized/yellow14_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox34_resized.jpg">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox34_resized.jpg">', order: 34},
    { stimulus: '<img src="images/2actual_resized/yellow10_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox30_resized.jpg">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox30_resized.jpg">', order: 30},
    { stimulus: '<img src="images/2actual_resized/yellow18_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox38_resized.jpg">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox38_resized.jpg">', order: 38},
    { stimulus: '<img src="images/2actual_resized/yellow11_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox31_resized.jpg">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox31_resized.jpg">', order: 31},
    { stimulus: '<img src="images/2actual_resized/yellow15_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox35_resized.jpg">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox35_resized.jpg">', order: 35},
    { stimulus: '<img src="images/2actual_resized/yellow17_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox37_resized.jpg">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox37_resized.jpg">', order: 37},
    { stimulus: '<img src="images/2actual_resized/yellow7_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox27_resized.jpg">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox27_resized.jpg">', order: 27},
    { stimulus: '<img src="images/2actual_resized/yellow20_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox40_resized.jpg">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox40_resized.jpg">', order: 40},
    { stimulus: '<img src="images/2actual_resized/yellow9_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox29_resized.jpg">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox29_resized.jpg">', order: 29},
]

var orderingfunc2 = function() {
    order.push(jsPsych.timelineVariable('order'))
}

var ordering2 = {
    type: 'call-function',
    func: orderingfunc2,
}

var fixation2 = {
    type: 'html-keyboard-response',
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
    data: {
        task: 'fixation'
    }
};

var test2 = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: jsPsych.NO_KEYS,
    trial_duration: 700,
}

var stimuli_pics2 = ['<img src="images/tempimages/set1/blue_squarebox28_resized.png">', '<img src="images/tempimages/set1/blue_squarebox21_resized.png">', '<img src="images/tempimages/set1/blue_squarebox27_resized.png">', '<img src="images/tempimages/set1/blue_squarebox31_resized.png">',
    '<img src="images/tempimages/set1/blue_squarebox38_resized.png">', '<img src="images/tempimages/set1/blue_squarebox22_resized.png">', '<img src="images/tempimages/set1/blue_squarebox40_resized.png">', '<img src="images/tempimages/set1/blue_squarebox39_resized.png">', '<img src="images/tempimages/set1/blue_squarebox23_resized.png">', '<img src="images/tempimages/set1/blue_squarebox26_resized.png">', '<img src="images/tempimages/set1/blue_squarebox32_resized.png">', '<img src="images/tempimages/set1/blue_squarebox37_resized.png">', '<img src="images/tempimages/set1/blue_squarebox29_resized.png">', '<img src="images/tempimages/set1/blue_squarebox30_resized.png">', '<img src="images/tempimages/set1/blue_squarebox25_resized.png">', '<img src="images/tempimages/set1/blue_squarebox35_resized.png">',  '<img src="images/tempimages/set1/blue_squarebox36_resized.png">', '<img src="images/tempimages/set1/blue_squarebox33_resized.png">',
    '<img src="images/tempimages/set1/blue_squarebox24_resized.png">', '<img src="images/tempimages/set1/blue_squarebox34_resized.png">']

var sample_function2 = function(param){
    if (stimuli_pics2[temps2] == '<img src="images/tempimages/set1/between_2.JPG">'){
        var html = stimuli_pics2[temps2];
    }
    if (stimuli_pics2[temps2] == '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = stimuli_pics2[temps2];
    }
    if (param >= 0.00 && param < 0.0208333333 && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_1.JPG">'){
        // index = index + 1;
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>' + '<img src="images/skip1.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.0208333333 && param < 0.0416666666 && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip2.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.0416666666 && param < 0.0624999999 && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip3.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.0624999999 && param < 0.0833333332 && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip4.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.0833333332 && param < 0.1041666665 && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip5.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.1041666665 && param < 0.1249999998 && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip6.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.1249999998 && param < 0.1458333331 && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip7.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.1458333331 && param < 0.1666666664 && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip8.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.1666666664 && param < 0.1874999997 && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip9.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.1874999997 && param < 0.208333333){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip10.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.208333333 && param < 0.2291666663){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip11.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.2291666663 && param < 0.2499999996){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>' + '<img src="images/skip12.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.2499999996 && param < 0.2708333329){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+ '<img src="images/skip13.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.2708333329 && param < 0.2916666662){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip14.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.2916666662 && param < 0.3124999995){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip15.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.3124999995 && param < 0.3333333328){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip16.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.3333333328 && param < 0.3541666661){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip17.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.3541666661 && param < 0.3749999994){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip18.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.3749999994 && param < 0.3958333327){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip19.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.3958333327 && param < 0.416666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip20.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.416666666 && param < 0.4374999993){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip21.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.4374999993 && param < 0.4583333326){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip22.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.4583333326 && param < 0.4791666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip23.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.4791666666 && param < 0.50){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip24.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.50 && param < 0.5208333333){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip25.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.5208333333 && param < 0.5416666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip26.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.5416666666 && param < 0.5625){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip27.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.5625 && param < 0.5833333333){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip28.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.5833333333 && param < 0.6041666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip29.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.6041666666 && param < 0.625){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip30.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.625 && param < 0.6458333333){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip31.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.6458333333 && param < 0.6666666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip32.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.6666666666 && param < 0.6875){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip33.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.6875 && param < 0.7083333333){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip34.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.7083333333 && param < 0.7291666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip35.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.7291666666 && param < 0.75){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip36.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.75 && param < 0.7708333333){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip37.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.7708333333 && param < 0.7916666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip38.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.7916666666 && param < 0.8125){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip39.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.8125 && param < 0.8333333333){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip40.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.8333333333 && param < 0.8541666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip41.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.8541666666 && param < 0.875){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip42.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.875 && param < 0.8958333333){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip43.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.8958333333 && param < 0.9166666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip44.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.9166666666 && param < 0.9375){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip45.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.9375 && param < 0.9583333333){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip46.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.9583333333 && param < 0.9791666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip47.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.9791666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>' + '<img src="images/skip48.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }

    return html;
}


var estimate2 = {
    type: 'reconstruction',
    stim_function: sample_function2,
    starting_value: 0,
    key_increase: '2',
    key_decrease: '1',
    step_size: 0.0208333333,
}

var reveal2 = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('correct_response'),
    choices: jsPsych.NO_KEYS,
    trial_duration: 2000,
    data: {
        task: 'response',
        correct_response: jsPsych.timelineVariable('correct_response')
    },
}

var update2 = function() {
    index = index + 1;
    sensor_pic = ranNums[index]
    temps = temps + 1;
    reveal = ranNums[index]
    console.log(jsPsych.timelineVariable('stimulus'))
    console.log(jsPsych.timelineVariable('statement'))
    temps2 = temps2 + 1;
}

var func2 = {
    type: 'call-function',
    func: update2,
}

var test_procedure2 = {
    timeline: [ordering2, fixation2, test2, estimate2, reveal2, func2],
    timeline_variables: test_stimuli2, stimuli_pics2, temps2,
    repetitions: 1,
    randomize_order: true
}

var temps3 = 0

var test_stimuli3 = [
    //{ stimulus: '<img src="images/blank.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/between_2.JPG">', statement: '<img src="images/tempimages/set1/between_1.JPG">'},
    { stimulus: '<img src="images/2actual_resized/blue19_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox59_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox59_resized.png">', order: 59},
    { stimulus: '<img src="images/2actual_resized/blue1_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox41_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox41_resized.png">', order: 41},
    { stimulus: '<img src="images/2actual_resized/blue3_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox43_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox43_resized.png">', order: 43},
    { stimulus: '<img src="images/2actual_resized/blue4_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox44_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox44_resized.png">', order: 44},
    { stimulus: '<img src="images/2actual_resized/blue16_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox56_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox56_resized.png">', order: 56},
    { stimulus: '<img src="images/2actual_resized/blue5_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox45_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox45_resized.png">', order: 45},
    { stimulus: '<img src="images/2actual_resized/blue2_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox42_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox42_resized.png">', order: 42},
    { stimulus: '<img src="images/2actual_resized/blue8_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox48_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox48_resized.png">', order: 48},
    { stimulus: '<img src="images/2actual_resized/blue10_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox50_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox50_resized.png">', order: 50},
    { stimulus: '<img src="images/2actual_resized/blue11_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox51_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox51_resized.png">', order: 51},
    { stimulus: '<img src="images/2actual_resized/blue12_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox52_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox52_resized.png">', order: 52},
    { stimulus: '<img src="images/2actual_resized/blue13_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox53_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox53_resized.png">', order: 53},
    { stimulus: '<img src="images/2actual_resized/blue7_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox47_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox47_resized.png">', order: 47},
    { stimulus: '<img src="images/2actual_resized/blue14_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox54_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox54_resized.png">', order: 54},
    { stimulus: '<img src="images/2actual_resized/blue9_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox49_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox49_resized.png">', order: 49},
    { stimulus: '<img src="images/2actual_resized/blue6_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox46_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox46_resized.png">', order: 46},
    { stimulus: '<img src="images/2actual_resized/blue17_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox57_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox57_resized.png">', order: 57},
    { stimulus: '<img src="images/2actual_resized/blue18_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox58_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox58_resized.png">', order: 58},
    { stimulus: '<img src="images/2actual_resized/blue15_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox55_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox55_resized.png">', order: 55},
    { stimulus: '<img src="images/2actual_resized/blue20_122x122.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set4/blueans_2squarebox60_resized.png">' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>'+ '<br>', statement: '<img src="images/tempimages/set4/blue_2squarebox60_resized.png">', order: 60},
]

var orderingfunc3 = function() {
    order.push(jsPsych.timelineVariable('order'))
}

var ordering3 = {
    type: 'call-function',
    func: orderingfunc3,
}

var fixation3 = {
    type: 'html-keyboard-response',
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
    data: {
        task: 'fixation'
    }
};

var test3 = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: jsPsych.NO_KEYS,
    trial_duration: 700,
}

var stimuli_pics3 = ['<img src="images/tempimages/set1/blue_squarebox56_resized.png">', '<img src="images/tempimages/set1/blue_squarebox43_resized.png">', '<img src="images/tempimages/set1/blue_squarebox53_resized.png">', '<img src="images/tempimages/set1/blue_squarebox49_resized.png">', '<img src="images/tempimages/set1/blue_squarebox57_resized.png">', '<img src="images/tempimages/set1/blue_squarebox44_resized.png">', '<img src="images/tempimages/set1/blue_squarebox45_resized.png">', '<img src="images/tempimages/set1/blue_squarebox46_resized.png">', '<img src="images/tempimages/set1/blue_squarebox58_resized.png">', '<img src="images/tempimages/set1/blue_squarebox59_resized.png">', '<img src="images/tempimages/set1/blue_squarebox51_resized.png">', '<img src="images/tempimages/set1/blue_squarebox50_resized.png">', '<img src="images/tempimages/set1/blue_squarebox48_resized.png">', '<img src="images/tempimages/set1/blue_squarebox55_resized.png">', '<img src="images/tempimages/set1/blue_squarebox41_resized.png">', '<img src="images/tempimages/set1/blue_squarebox52_resized.png">', '<img src="images/tempimages/set1/blue_squarebox54_resized.png">', '<img src="images/tempimages/set1/blue_squarebox47_resized.png">', '<img src="images/tempimages/set1/blue_squarebox42_resized.png">', '<img src="images/tempimages/set1/blue_squarebox60_resized.png">']

var sample_function3 = function(param){
    if (stimuli_pics2[temps2] == '<img src="images/tempimages/set1/between_2.JPG">'){
        var html = stimuli_pics2[temps2];
    }
    if (stimuli_pics2[temps2] == '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = stimuli_pics2[temps2];
    }
    if (param >= 0.00 && param < 0.0208333333 && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_1.JPG">'){
        // index = index + 1;
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>' + '<img src="images/skip1.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.0208333333 && param < 0.0416666666 && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip2.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.0416666666 && param < 0.0624999999 && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip3.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.0624999999 && param < 0.0833333332 && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip4.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.0833333332 && param < 0.1041666665 && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip5.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.1041666665 && param < 0.1249999998 && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip6.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.1249999998 && param < 0.1458333331 && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip7.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.1458333331 && param < 0.1666666664 && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip8.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.1666666664 && param < 0.1874999997 && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_2.JPG">' && stimuli_pics2[temps2] != '<img src="images/tempimages/set1/between_1.JPG">'){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip9.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.1874999997 && param < 0.208333333){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip10.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.208333333 && param < 0.2291666663){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip11.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.2291666663 && param < 0.2499999996){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>' + '<img src="images/skip12.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.2499999996 && param < 0.2708333329){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+ '<img src="images/skip13.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.2708333329 && param < 0.2916666662){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip14.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.2916666662 && param < 0.3124999995){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip15.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.3124999995 && param < 0.3333333328){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip16.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.3333333328 && param < 0.3541666661){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip17.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.3541666661 && param < 0.3749999994){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip18.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.3749999994 && param < 0.3958333327){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip19.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.3958333327 && param < 0.416666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip20.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.416666666 && param < 0.4374999993){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip21.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.4374999993 && param < 0.4583333326){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip22.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.4583333326 && param < 0.4791666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip23.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.4791666666 && param < 0.50){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip24.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.50 && param < 0.5208333333){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip25.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.5208333333 && param < 0.5416666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip26.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.5416666666 && param < 0.5625){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip27.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.5625 && param < 0.5833333333){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip28.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.5833333333 && param < 0.6041666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip29.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.6041666666 && param < 0.625){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip30.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.625 && param < 0.6458333333){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip31.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.6458333333 && param < 0.6666666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip32.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.6666666666 && param < 0.6875){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip33.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.6875 && param < 0.7083333333){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip34.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.7083333333 && param < 0.7291666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip35.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.7291666666 && param < 0.75){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip36.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.75 && param < 0.7708333333){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip37.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.7708333333 && param < 0.7916666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip38.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.7916666666 && param < 0.8125){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip39.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.8125 && param < 0.8333333333){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip40.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.8333333333 && param < 0.8541666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip41.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.8541666666 && param < 0.875){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip42.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.875 && param < 0.8958333333){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip43.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.8958333333 && param < 0.9166666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip44.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.9166666666 && param < 0.9375){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip45.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.9375 && param < 0.9583333333){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip46.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.9583333333 && param < 0.9791666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>'+'<img src="images/skip47.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }
    if (param >= 0.9791666666){
        var html = '<br>' + jsPsych.timelineVariable('statement', true) + '<br>' + '<br>' + '<img src="images/skip48.JPG", style="width: 400px; height: 77px;">'+ '<br>'+ '<br>';
    }

    return html;
}

var estimate3 = {
    type: 'reconstruction',
    stim_function: sample_function3,
    starting_value: 0,
    key_increase: '2',
    key_decrease: '1',
    step_size: 0.0208333333,
}

var reveal3 = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('correct_response'),
    choices: jsPsych.NO_KEYS,
    trial_duration: 2000,
    data: {
        task: 'response',
        correct_response: jsPsych.timelineVariable('correct_response')
    },
}

var update3 = function() {
    index = index + 1;
    sensor_pic = ranNums[index]
    temps = temps + 1;
    reveal = ranNums[index]
    console.log(jsPsych.timelineVariable('stimulus'))
    console.log(jsPsych.timelineVariable('statement'))
    temps3 = temps3 + 1;
}

var func3 = {
    type: 'call-function',
    func: update3,
}

var test_procedure3 = {
    timeline: [ordering3, fixation3, test3, estimate3, reveal3, func3],
    timeline_variables: test_stimuli3, stimuli_pics3, temps3,
    repetitions: 1,
    randomize_order: true
}


var between_stimuli1 = [
    { stimulus: '<img src="images/blank.png">', trial_duration: 500, correct_response: '<img src="images/tempimages/set1/between_2.JPG">', statement: '<img src="images/tempimages/set1/between_1.JPG">'},
]

var between_stimuli2 = ['<img src="images/tempimages/set1/between_1.JPG">']

var between_function3 = function(){
    var html = between_stimuli2[0];
    return html;
}

var between_estimate = {
    type: 'reconstruction',
    stim_function: between_function3,
    starting_value: 0,
    key_increase: '2',
    key_decrease: '1',
    step_size: 0.0208333333,
    choices: jsPsych.NO_KEYS,
}

var between_reveal = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('correct_response'),
    choices: jsPsych.NO_KEYS,
    trial_duration: 2000,
    data: {
        task: 'response',
        correct_response: jsPsych.timelineVariable('correct_response')
    },
}

var between_procedure = {
    timeline: [between_estimate, between_reveal],
    timeline_variables: between_stimuli1, between_stimuli2,
    repetitions: 1
}


if (randisps[0] == 1){
    if(randisps[1] == 2){
        experiment.push(test_procedure1);
        experiment.push(between_procedure);
        experiment.push(test_procedure2);
        experiment.push(between_procedure);
        experiment.push(test_procedure3);
    }
    else{
        experiment.push(test_procedure1);
        experiment.push(between_procedure);
        experiment.push(test_procedure3);
        experiment.push(between_procedure);
        experiment.push(test_procedure2);
    }
}
if(randisps[0] == 2){
    if(randisps[1] == 1){
        experiment.push(test_procedure2);
        experiment.push(between_procedure);
        experiment.push(test_procedure1);
        experiment.push(between_procedure);
        experiment.push(test_procedure3);
    }
    else{
        experiment.push(test_procedure2);
        experiment.push(between_procedure);
        experiment.push(test_procedure3);
        experiment.push(between_procedure);
        experiment.push(test_procedure1);
    }
}
if(randisps[0] == 3){
    if(randisps[1] == 1){
        experiment.push(test_procedure3);
        experiment.push(between_procedure);
        experiment.push(test_procedure1);
        experiment.push(between_procedure);
        experiment.push(test_procedure2);
    }
    else{
        experiment.push(test_procedure3);
        experiment.push(between_procedure);
        experiment.push(test_procedure2);
        experiment.push(between_procedure);
        experiment.push(test_procedure1);
    }
}


/*******************
 * * Run Task
 ******************/


jsPsych.init({

    timeline: experiment,

    on_finish: function () {
        alert("The experiment has finished. Thank you for participating.");
        // data = jsPsych.data.get().localSave('csv', 'testdata.csv');
        // data.localSave('csv', 'testdata.csv');
        datavalues = jsPsych.data.get().filter({trial_type: 'reconstruction'}).csv();
        //datatrialorder = jsPsych.data.get().filter({trial_type: 'html-keyboard-response'}).csv();
        // jsPsych.data.displayData(data111);
        console.log(datavalues);
        console.log(order)
        // jsPsych.data.displayData();
        // save = localSave(data111)
        var collection = firebase.firestore().collection('randomize7');
        // data1111 = data111.csv()
        datavalues = {data: datavalues, order}
        datatrialorder = {data: order}
        // datacombine = datavalues.concat(datatrialorder)
        collection.add(datavalues);
    }
});

