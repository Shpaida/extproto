const cds = require("@sap/cds");

module.exports = cds.service.impl(async function () {
  const sf_data = await cds.connect.to("ECPersonalInformation");

  this.on("READ", "Employees", async (req) => {
    // return sf_data.run(req.query);
    try {
      // Handover to the SF OData Service to fecth the requested data
      const tx = sf_data.tx(req);
      return await tx.run(req.query);
    } catch (err) {
      req.error(err.code, err.message);
    }
  });
});
