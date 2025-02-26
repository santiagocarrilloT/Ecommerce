const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AST2O697NCx8YXy0-WMM6tOCHhl9fcXGe-Ubnfolq_540kbN3Hzb2mvLmKZwvxjs1OwmLrKQVvUYBuJg",
  client_secret:
    "EA5Ixe8kbEwMO_OeITSXyes7NDV35lrelIA5U9VTZkFlN-nqbjQxlSCWGmWpWSqmP_g-CIYRyi4L36VC",
});

module.exports = paypal;
