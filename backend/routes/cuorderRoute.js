const path = require('path');
const express = require("express");
const cors = require('cors');
const nodemailer = require("nodemailer");
const fs = require("fs");
require('dotenv').config();

const router = express.Router();

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS
  }
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("ready to send");
  }
});


router.post("/", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const logo_n = req.body.logo_n;
  const r_format = req.body.r_format;
  const software = req.body.software;
  const dimensions = req.body.dimensions;
  const r_colors = req.body.r_colors;
  const no_of_colors = req.body.no_of_colors;
  const centerpoint = req.body.centerpoint;
  const comments = req.body.comments;
  const remarks = req.body.remarks;
  const file = req.files.file; // get the uploaded file object

  const storagePath = path.join(__dirname, "uploads", file.name); // specify the storage path for the uploaded file

  file.mv(storagePath, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to upload the file." });
    }

    const mail = {
      from: name,
      to: process.env.EMAIL_ADDRESS,
      subject: "RAA Custom Order Submission",
      html: `
        <p><b>Customer Name : </b> ${name}</p>
        <p><b>Email Address : </b> ${email}</p>
        <p><b>Phone Number : </b>${phone}</p>
        <p><b>Logo Name : </b> ${logo_n}</p>
        <p><b>Required Format : </b>${r_format}</p>
        <p><b>Software : </b>${software}</p>
        <p><b>Dimensions : </b>${dimensions}</p>
        <p><b>Required Colors : </b> ${r_colors}</p>
        <p><b>Number of Colors : </b> ${no_of_colors}</p>
        <p><b>Center Point : </b> ${centerpoint}</p>
        <p><b>Comments : </b> ${comments}</p>
        <p><b>Remarks : </b> ${remarks}</p>
      `,
      attachments: [
        {
          filename: file.name,
          path: storagePath,
        },
      ],
    };

    contactEmail.sendMail(mail, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to send the email." });
      }
      // Delete the file after the email has been sent
      fs.unlink(storagePath, (error) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Failed to delete the file." });
        }
        console.log("File deleted");
      });
      res.json({ code: 200, status: "Message Sent." });
    });
  });
});

module.exports = router;
