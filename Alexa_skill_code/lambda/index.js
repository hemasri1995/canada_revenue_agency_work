// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
         const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
         const balance = sessionAttributes['Balance'];
         const speakOutput = 'Welcome,how can i help you regarding the canada revenue agency';
        if (balance){
            
            return dueDateForIncomeTax.handle(handlerInput);
            
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
        
        //  const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        //  const balance = sessionAttributes['Balance'];
        //  const sessionCounter = sessionAttributes['sessionCounter'];
        //  if(balance) {
        //      return dueDateForIncomeTax.handle(handlerInput);
        //  }
        
        // let speechText = !sessionCounter ? handlerInput.t('Welcome to canda revenue agency help desk') : handlerInput.t('Welcome back! !');
        // //speechText += handlerInput.t('MISSING_MSG');
        
        // // we use intent chaining to trigger income tax blace due date  multi-turn
        // return handlerInput.responseBuilder
        //     .speak(speechText)
        //     .addDelegateDirective({
        //         name: 'dueDateForIncomeTax',
        //         confirmationStatus: 'NONE',
        //         slots: {}
        //     })
        //     .getResponse();
    // }
        
    //   const
    //     return handlerInput.responseBuilder
    //         .speak(speechText)
    //       // .reprompt(speakOutput)
    //         .getResponse();
     }
};
const dueDateForMyBalance = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'dueDateForMyBalance';
    },
    
    handle(handlerInput) {
        // const {attributesManager, requestEnvelope} = handlerInput;
        // // the attributes manager allows us to access session attributes
        // const sessionAttributes = attributesManager.getSessionAttributes();
        // const {intent} = requestEnvelope.request;
        //  const balance = sessionAttributes['Balance'];
         
        const {requestEnvelope, responseBuilder} = handlerInput;
        const {intent} = requestEnvelope.request;
        const Balance = Alexa.getSlotValue(requestEnvelope, 'Balance');
             let speechText = 'please verify the option type for the balance type ';
         switch(Balance) {
         case 'income tax':
            return handlerInput.responseBuilder
             .addDelegateDirective({
                name: 'dueDateForIncomeTax',
                confirmationStatus: 'NONE',
                slots: {}
            })
            .getResponse();
         case 'sales tax':
              return handlerInput.responseBuilder
            .speak('your payroll deadline depends on your GST/HST filling period . Most payments are due at the same time of your GST/HST return.')
            //.reprompt('message error')
            .getResponse();
        case 'source deductions for payroll':
              return handlerInput.responseBuilder
            .speak('There are various due dates foe paying your payroll source deductions due date depends on the remitter type')
            //.reprompt('message error')
            .getResponse();
        default:
            //  return handlerInput.responseBuilder
            // .speak(speechText)
            // .reprompt('message error')
            // .getResponse();
        } 
        
         return handlerInput.responseBuilder
            .speak('please verify the option u entered ')
            .getResponse();
         
         
    }
};
const dueDateForIncomeTax = {
     canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'dueDateForIncomeTax';
    },
    handle(handlerInput) {
        //  const {attributesManager, requestEnvelope} = handlerInput;
        // // the attributes manager allows us to access session attributes
        // const sessionAttributes = attributesManager.getSessionAttributes();
        // const {intent} = requestEnvelope.request;
        const {requestEnvelope, responseBuilder} = handlerInput;
        const {intent} = requestEnvelope.request;
        const incomeTax = Alexa.getSlotValue(requestEnvelope, 'incomeTax');
         let speechText = 'please verify the option type for the income tax type ';
         switch(incomeTax) {
         case 'individual':
         case 'self employed':
                // speechText = 'this is for individual';
                return handlerInput.responseBuilder
            .speak('your blance is due to later thean april 30 2020. you donot have to make payment if owe less than $2.')
            //.reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
         case 'incorporated bussiness':
                speechText = 'generally , no later than 2 months after end of tax year.';
            break;
         case 'trusts':
                speechText = 'your balance due is no later than 90 days after yhe trusts tax year end';
            break;
         case 'deceased person':
                speechText = 'the due date of balance owing on find return on the date of death . if occured between january 1st and octiber 31st .';
            break;
        default:
             return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
        } 
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
         console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        dueDateForMyBalance,
        dueDateForIncomeTax,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
