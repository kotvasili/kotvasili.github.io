import nodemailer from "nodemailer";

const email = 'v.saladar@sdventures.com';
const pass = 'jkgyvxqckebfvaqu';

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email,
        pass,
    },
});

export const mailOptions = {
    from: email,
    to: 'k.saifulina@sdventures.com',
};
