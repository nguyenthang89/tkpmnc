const sid = "AC888225993b7238cb5a9f58d02d206c02";
const auth_token = "7821282e5db78aa63205c5580887bae4";

const twilio = require("twilio")(sid, auth_token);
export default class SMSService {

// twilio.messages.create({
//     from: '+15134509344', 
//     to: '+84981599008',
//     body: "Tài xế sẽ đến đón bạn, hãy ra điểm hẹn :v :v",
//   })
//   .then(function(res) {console.log("Đã gửi tin nhắn!")})
//   .catch(function(err)  {
//     console.log(err);
//   });
  static async sendSMS(msg){
    twilio.messages.create({
      from: '+15134509344', 
      to: '+84981599008',
      body: msg,
    })
    .then((messages) => {
      console.log("Đã gửi tin nhắn");
    }).catch((error)=> {
      console.error(error);
    })
  }
  // export function sendSMS(msg){
  //   // body: "Tài xế sẽ đến đón bạn, hãy ra điểm hẹn :v :v",
  //   twilio.messages.create({
  //     from: '+15134509344', 
  //     to: '+84981599008',
  //     body: msg,
  //   })
  //   .then((messages) => {
  //     console.log("Đã gửi tin nhắn");
  //   }).catch((error)=> {
  //     console.error(error);
  //   })
    
  // };

}