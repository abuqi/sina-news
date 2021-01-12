const fetch = require('node-fetch');
const process = require('process');


const GARMIN_CN_URL_DICT = {
    "BASE_URL": "https://connect.garmin.cn",
    "SSO_URL_ORIGIN": "https://sso.garmin.com",
    "SSO_URL": "https://sso.garmin.cn/sso",
    "MODERN_URL": "https://connect.garmin.cn/modern",
    "SIGNIN_URL": "https://sso.garmin.cn/sso/signin",
    "CSS_URL": "https://static.garmincdn.cn/cn.garmin.connect/ui/css/gauth-custom-v1.2-min.css",
}

const LOGIN_INFO = {
	"EMAIL": "",
	"PASSWORD": "",
}


async function main(){
	const params = new URLSearchParams({
        "webhost": GARMIN_CN_URL_DICT.BASE_URL,
        "service": GARMIN_CN_URL_DICT.MODERN_URL,
        "source": GARMIN_CN_URL_DICT.SIGNIN_URL,
        "redirectAfterAccountLoginUrl": GARMIN_CN_URL_DICT.MODERN_URL,
        "redirectAfterAccountCreationUrl": GARMIN_CN_URL_DICT.MODERN_URL,
        "gauthHost": GARMIN_CN_URL_DICT.SSO_URL,
        "locale": "en_US",
        "id": "gauth-widget",
        "cssUrl": GARMIN_CN_URL_DICT.CSS_URL,
        "clientId": "GarminConnect",
        "rememberMeShown": "true",
        "rememberMeChecked": "false",
        "createAccountShown": "true",
        "openCreateAccount": "false",
        "usernameShown": "false",
        "displayNameShown": "false",
        "consumeServiceTicket": "false",
        "initialFocus": "true",
        "embedWidget": "false",
        "generateExtraServiceTicket": "false",
    });

    const data = new URLSearchParams({
        "username": LOGIN_INFO.EMAIL,
        "password": LOGIN_INFO.PASSWORD,
        "embed": "true",
        "lt": "e1s1",
        "_eventId": "submit",
        "displayNameRequired": "false",
    });
    const headers = {
    	"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36",
        "origin": GARMIN_CN_URL_DICT.SSO_URL_ORIGIN,
    };
    const url = GARMIN_CN_URL_DICT.SIGNIN_URL + '?' + params.toString();
    const response = await fetch(url, {
    	headers: headers,
		method: 'POST',
		body: data,
	});

	if(response.status < 200 || response.status >= 300){
        // throw new Error('wrong status code: ' + response.status);
        throw new Error(`worng status code: ${response.status}  message:${response.statusText}`)
	}

	const json = await response.json();
	console.log(`response(JSON): ${json}`);
	console.log(`successfully fetch the login.`);

}

main().catch(err => {
	console.log(err);
	process.exit(1);
});