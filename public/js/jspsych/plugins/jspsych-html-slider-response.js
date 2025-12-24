/**
 * jspsych-html-slider-response
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['html-slider-response'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'html-slider-response',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The HTML string to be displayed'
      },
      min: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Min slider',
        default: 0,
        description: 'Sets the minimum value of the slider.'
      },
      max: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Max slider',
        default: 100,
        description: 'Sets the maximum value of the slider',
      },
      start: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Slider starting value',
        default: 50,
        description: 'Sets the starting value of the slider',
      },
      step: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Step',
        default: 1,
        description: 'Sets the step of the slider'
      },
      labels: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name:'Labels',
        default: [],
        array: true,
        description: 'Labels of the slider.',
      },
      slider_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name:'Slider width',
        default: 20,
        description: 'Width of the slider in pixels.'
      },
      // slider_number: {
      //   type: jsPsych.plugins.parameterType.BOOL,
      //   pretty_name:'Slider with number',
      //   default: true,
      //   description: 'Include a number with the selected value in the slider.'
      // },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        array: false,
        description: 'Label of the button to advance.'
      },
      require_movement: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Require movement',
        default: false,
        description: 'If true, the participant will have to move the slider before continuing.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the slider.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show the trial.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when user makes a response.'
      },
    }
  }





  plugin.trial = function(display_element, trial) {

    // var html = '<div id="jspsych-html-slider-response-wrapper" style="margin: 0px 100px;">';
    // html += '<div id="jspsych-html-slider-response-stimulus">' + trial.stimulus + '</div>';
    // html += '<div class="jspsych-html-slider-response-container" style="position:relative;">';
    var html = '<div id="jspsych-html-slider-response-wrapper" style="color: black; margin: 0px 100px;">';
    html += '<div id="jspsych-html-slider-response-stimulus" style="color: black;">' + trial.stimulus + '</div>';
    html += '<div class="jspsych-html-slider-response-container" style="color: black; position:relative;">';
    //html += '<input type="range" value="'+trial.start+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" style="color: black;" height: 120px; id="jspsych-html-slider-response-response";></input>';
    html += '<input type="range" value="'+trial.slider_start+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" style="width: 100%;" id="jspsych-html-slider-response-response" oninput="document.getElementById(&quot;output&quot;).value = this.value"></input>';
    // if(trial.slider_number){
    //   html += '<div class="font-weight-bold text-primary ml-2 " style="vertical-align: top; width: 107%; text-align: right; position: relative; top: -30px; z-index: -1;"><output id = "output">50</output></div>';
    // }
    html += '<div>'
    for(var j=0; j < trial.labels.length; j++){
      var width = 1/(trial.labels.length-1);
      var left_offset = (j * (100 /(trial.labels.length - 1))) - (width/2);
      html += '<div style="display: inline-block; position: absolute; style: black; left:'+left_offset+'%; text-align: start; width: '+width+'%; color: black;">';
      html += '<span style="text-align: start; font-size: 80%; style: black; color: black;">'+trial.labels[j]+'</span>';
      html += '</div>'
    }
    html += '</div>';
    html += '</div>';
    html += '</div>';

    if (trial.prompt !== null){
      html += trial.prompt;
    }

    // add submit button
    html += '<button id="jspsych-html-slider-response-next" class="jspsych-btn" style="color: black;">'+trial.button_label+'</button>';

    display_element.innerHTML = html;

    var response = {
      rt: null,
      response: null
    };

    display_element.querySelector('#jspsych-html-slider-response-next').addEventListener('click', function() {
      // measure response time
      var endTime = (new Date()).getTime();
      response.rt = endTime - startTime;
      response.response = display_element.querySelector('#jspsych-html-slider-response-response').value;

      if(trial.response_ends_trial){
        end_trial();
      } else {
        display_element.querySelector('#jspsych-html-slider-response-next').disabled = true;
      }

    });

    function end_trial(){

      jsPsych.pluginAPI.clearAllTimeouts();

      // save data
      var trialdata = {
        "rt": response.rt,
        "response": response.response,
        "stimulus": trial.stimulus
      };

      display_element.innerHTML = '';

      // next trial
      jsPsych.finishTrial(trialdata);
    }

    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-html-slider-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

    var startTime = (new Date()).getTime();
  };

  return plugin;
})();
