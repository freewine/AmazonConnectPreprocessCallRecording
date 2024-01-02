/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

export const lambdaHandler = async (event, context) => {

    console.log(event);
    console.log(event.Details.ContactData.Attributes);

    const cloudfrontDomain = process.env.CLOUDFRONT_DOMAIN;
    const s3KeyPrefix = process.env.RECORDINGS_KEY_PREFIX;


    var contactId = event.Details.ContactData.ContactId;
    var recordingAuth = event.Details.ContactData.Attributes.recordingAuth;
    var audioFromCustomer = '';
    var audioToCustomer = '';
    var audioMixed = '';

    if(recordingAuth === '1'){
        audioFromCustomer = cloudfrontDomain + '/' + s3KeyPrefix + contactId + '_audio_from_customer.wav';
    } else if(recordingAuth === '2'){
        audioToCustomer = cloudfrontDomain + '/' + s3KeyPrefix + contactId + '_audio_to_customer.wav';
    } else if(recordingAuth === '3'){
        audioFromCustomer = cloudfrontDomain + '/' + s3KeyPrefix + contactId + '_audio_from_customer.wav';
        audioToCustomer = cloudfrontDomain + '/' + s3KeyPrefix + contactId + '_audio_to_customer.wav';
        audioMixed = cloudfrontDomain + '/' + s3KeyPrefix + contactId + '_audio_mixed.wav';
    }

    let payload = {
        AudioFromCustomer: audioFromCustomer,
        AudioToCustomer: audioToCustomer,
        AudioMixed: audioMixed
    };
    console.log(payload);

    return payload;
};
