const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const nodemailer = require("nodemailer");
const ConnectionRequest = require("../models/ConnectionRequest");

cron.schedule("0 8 * * *", async () => {
  try {
    const yesterday = subDays(new Date(), 1);

    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequest = await ConnectionRequest.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId ToUserId");

    const listofEmails = [
      ...new Set(pendingRequest.map((req) => req.ToUserId.emailId)),
    ];

    // console.log(listofEmails);


    //Creating the Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });


    for (const email of listofEmails) {
      await transporter.sendMail({
        from: "DevTinder by CEO, Deepanshu",
        to:email,
        subject: "🔔 Reminder: Someone is Interested in Connecting!",
        html: `<h1>You Have a New Connection Request!</h1>
               <p>Someone showed interest in connecting with you. Login to DevTinder to respond.</p>`,
      });
    }
  } catch (err) {
    console.log(err);
  }
});
