# SAP CAP SSO Prototype with SuccessFactors

**Project Goal:** Demonstrates how a SAP CAP (NodeJS) application achieves Single Sign-On (SSO) with a remote SuccessFactors system using an SAP BTP destination.

## Prototype Scope

- **Core Functionality:**
  - User authentication with SAP BTP using XSUAA
  - Securely redirects to SuccessFactors for SSO (JWT token forwarding)
- **Assumptions/Limitations**
  - Assumes basic familiarity with SAP CAP, BTP, SuccessFactors
  - Not production-ready; focuses on core SSO flow
  - Error handling/edge cases may be minimal

## Getting Started

1. **Prerequisites**

   - SAP BTP (trial) account
     - Configure destination to SuccessFactors that includes both destination configuration (BTP) and OAuth client definition in SuccessFactors.
     - Follow the following link for setup instructions. <https://help.sap.com/docs/btp/sap-business-technology-platform/using-oauth-client-with-saml-bearer-assertion-authentication?locale=en-US>
   - SuccessFactors (demo) account
     - Make sure there is an employee with the same email addres as the authenticated BTP user
     - Make sure the SuccessFactors user has the right access

2. **Installation**

   - `npm install`

3. **Configuration**

   The following instructions will configure your local project to connect to the cloud foundry destination and authentication services so you can test in hybrid mode. You can use the following as reference. <https://cap.cloud.sap/docs/advanced/hybrid-testing#hybrid-testing>

   - Bind local application to destination service usign `cds bind destination --to extproto-dest`
   - Bind local application to authentication service using `cds bind auth --to extproto-xsuaa`

4. **Running the Prototype**

   Use two command line sessions.

   1. Run the application using `cds watch --profile hybrid`
   2. Run the application router using the bindings `cds bind --exec -- npm start --prefix app/router`

   Access the prototype application <http://localhost:5000/>

## Key Implementation Points

- **Authentication Flow**
  - When accessing the list report web application, the application will automatically redirect to the authentication defined in SAP BTP. (e.g. SAP Accounts)
  - In case you were previously authenticated, the previous step immediately return the token.
  - Execute the query in the list report (Click Go). This will initiate the forwarding of this request to the remote service.
  - The request headers contain the JWT (Authentication header) and will pass this on to the destination (SAP Cloud SDK) processing.
  - SuccessFactors will validate the roles to identify the information that this authenticated user is allowed to see.
- **BTP Destination**
  - The destination is setup as `OAuthSAMLBearerAssertion` to ensure the authenticated user is being used, rather than a technical user.
  - In complex scenarios, please note that the service implementation might have to use a combination of technical and authenicated user to perform more complex queries. For instance, org structure information might have to be queried with a technical user to identify the set of employee records to fetch for a manager. Subsequently, the authenticated user will be used to perform the query that is provided with the list of IDs to fetch.
- **CAP Service/Entity Definition**
  - We used a very simple scenario in this case. More advanced examples can use navigation properties as well. More information on this, you can find at <https://cap.cloud.sap/docs/guides/using-services#consuming-services>.

## Additional Notes

- **Disclaimer:** This is a prototype; use for educational/demonstration purposes only.
