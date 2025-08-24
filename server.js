const express = require('express')
const axios = require('axios')
//const cors = require('cors');
const app = express()
// const bodyParser = require('body-parser');
const xml2js = require('xml2js')
 
// const parser = new xml2js.Parser({
// explicitArray: false,
// tagNameProcessors: [xml2js.processors.stripPrefix]
// });
const cors = require('cors');
app.use(cors());

const {Parser} = require('xml2js')
app.use(express.json());
 
app.get(
  "/",
  (req, res)=>{
    res.send("hello")
  }
)
 
app.post("/login",
  async (req, res)=>{
    const {CustomerId, Passcode} = {...req.body}
    const result = await fun(CustomerId, Passcode)
    console.log(result,"456")
    res.send({
  status: 'success',
  result
});
  }
)
 
app.post("/profile",
  async (req, res)=>{
    const {CustomerId} = {...req.body}
    const prof = await profile(CustomerId)
    console.log(prof,"456")
    res.send({
  status: 'success',
  prof
});
  }
)
 
app.post("/inquiry",
  async (req, res)=>{
    const {CustomerId} = {...req.body}
    const dash = await inquirydash(CustomerId)
    console.log(dash,"456")
    res.send({
  status: 'success',
  dash
});
  }
)
 
app.post("/salesorder",
  async (req, res)=>{
    const {CustomerId} = {...req.body}
    const order = await sales(CustomerId)
    console.log(order,"456")
    res.send({
  status: 'success',
  order
});
  }
)
 
 
app.post("/listofdelivery",
  async (req, res)=>{
    const {CustomerId} = {...req.body}
    const list = await delivery(CustomerId)
    console.log(list,"456")
    res.send({
  status: 'success',
  list
});
  }
)
 
 
app.post("/payments",
  async (req, res)=>{
    const {CustomerId} = {...req.body}
    const aging = await paymentage(CustomerId)
    console.log(aging,"456")
    res.send({
  status: 'success',
  aging
});
  }
)
 
 
app.post("/memo",
  async (req, res)=>{
    const {CustomerId} = {...req.body}
    const debit = await creditdebit(CustomerId)
    console.log(debit,"456")
    res.send({
  status: 'success',
  debit
});
  }
)
 
app.post("/overallsales",
  async (req, res)=>{
    const {CustomerId} = {...req.body}
    const sales = await salesover(CustomerId)
    console.log(sales,"456")
    res.send({
  status: 'success',
  sales
});
  }
)
 
 
app.post("/invoice",
  async (req, res)=>{
    const {ICustomer} = {...req.body}
    const invo = await cuinvoice(ICustomer)
    console.log(invo,"456")
    res.send({
  status: 'success',
  invo
});
  }
)
 
app.post("/invoiceforms",
  async (req, res)=>{
    const {PCustId,PDocNo} = {...req.body}
    const invoice = await custinvoice(PCustId,PDocNo)
    console.log(invoice,"456")
    res.send({
  status: 'success',
  invoice
});
  }
)
 
//login
async function fun(u, p){
  try{
   const respoonse = await axios.post('http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zrfc_loginpage_a?sap-client=100',
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
 xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZsasiLoginpageFm1>
<CustomerId>${u}</CustomerId>
<Passcode>${p}</Passcode>
</urn:ZsasiLoginpageFm1>
   </soapenv:Body>
</soapenv:Envelope>`,
      {headers:{
        'SOAPAction':'',
        'Content-Type':'text/xml',
        'Accept':'text/xml'
      },
      auth:{
        username:'K901655',
        password:'Sasidharan@03'
      },
    responseType: 'text'
  }
   )
const parserf = new Parser({explicitArray: false})
const result = await parserf.parseStringPromise(respoonse.data);
console.log(result,"123")
 
const responseBody = result['soap-env:Envelope']['soap-env:Body']['n0:ZsasiLoginpageFm1Response'];
return responseBody
}catch(error){
  console.log(error)
}
  }
 
 
//profile
  async function profile(u){
  try{
   const respoonse = await axios.post('http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zrfc_cust_profile_b?sap-client=100',
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZsasiProfileFm2>
         <!-- Replace the below with actual input parameters -->
         <CustomerId>${u}</CustomerId>
         <!-- Add other input fields as needed -->
      </urn:ZsasiProfileFm2>
   </soapenv:Body>
</soapenv:Envelope>
`,
      {headers:{
        'SOAPAction':'',
        'Content-Type':'text/xml',
        'Accept':'text/xml'
      },
      auth:{
        username:'K901655',
        password:'Sasidharan@03'
      },
    responseType: 'text'
  }
   )
const parserf = new Parser({explicitArray: false})
const result = await parserf.parseStringPromise(respoonse.data);
console.log(result,"123")
 
const responseBody = result['soap-env:Envelope']['soap-env:Body']['n0:ZsasiProfileFm2Response'];
return responseBody
}catch(error){
  console.log(error)
}
  }
 
 
//Inquiry
 async function inquirydash(u){
  try{
   const respoonse = await axios.post('http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zrfc_dash_inquiry_c?sap-client=100',
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZsasiGetInquiryFm3>
         <CustomerId>${u}</CustomerId>
      </urn:ZsasiGetInquiryFm3>
   </soapenv:Body>
</soapenv:Envelope>
`,
      {headers:{
        'SOAPAction':'',
        'Content-Type':'text/xml',
        'Accept':'text/xml'
      },
      auth:{
        username:'K901655',
        password:'Sasidharan@03'
      },
    responseType: 'text'
  }
   )
const parserf = new Parser({explicitArray: false})
const result = await parserf.parseStringPromise(respoonse.data);
console.log(result,"123")
 
const responseBody = result['soap-env:Envelope']['soap-env:Body']['n0:ZsasiGetInquiryFm3Response'];
return responseBody
}catch(error){
  console.log(error)
}
  }
 
 
//salesorder
 async function sales(u){
  try{
   const respoonse = await axios.post('http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zrfc_dash_salesorder_d?sap-client=100',
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZsasiGetSalesOrderFm4>
         <CustomerId>${u}</CustomerId>
      </urn:ZsasiGetSalesOrderFm4>
   </soapenv:Body>
</soapenv:Envelope>
 
`,
      {headers:{
        'SOAPAction':'',
        'Content-Type':'text/xml',
        'Accept':'text/xml'
      },
      auth:{
        username:'K901655',
        password:'Sasidharan@03'
      },
    responseType: 'text'
  }
   )
const parserf = new Parser({explicitArray: false})
const result = await parserf.parseStringPromise(respoonse.data);
console.log(result,"123")
 
const responseBody = result['soap-env:Envelope']['soap-env:Body']['n0:ZsasiGetSalesOrderFm4Response'];
return responseBody
}catch(error){
  console.log(error)
}
  }
 
 
//listofdelivery
async function delivery(u){
  try{
   const respoonse = await axios.post('http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zrfc_dash_delivery_e?sap-client=100',
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZsasiGetDeliveryFm5>
         <CustomerId>${u}</CustomerId>
      </urn:ZsasiGetDeliveryFm5>
   </soapenv:Body>
</soapenv:Envelope>
`,
      {headers:{
        'SOAPAction':'',
        'Content-Type':'text/xml',
        'Accept':'text/xml'
      },
      auth:{
        username:'K901655',
        password:'Sasidharan@03'
      },
    responseType: 'text'
  }
   )
const parserf = new Parser({explicitArray: false})
const result = await parserf.parseStringPromise(respoonse.data);
console.log(result,"123")
 
const responseBody = result['soap-env:Envelope']['soap-env:Body']['n0:ZsasiGetDeliveryFm5Response'];
return responseBody
}catch(error){
  console.log(error)
}
  }
 
//payments and aging
async function paymentage(u){
  try{
   const respoonse = await axios.post('http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zrfc_payments_aging_g?sap-client=100',
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZsasiGetPaymentsAgingFm7>
         <CustomerId>${u}</CustomerId>
      </urn:ZsasiGetPaymentsAgingFm7>
   </soapenv:Body>
</soapenv:Envelope>
`,
      {headers:{
        'SOAPAction':'',
        'Content-Type':'text/xml',
        'Accept':'text/xml'
      },
      auth:{
        username:'K901655',
        password:'Sasidharan@03'
      },
    responseType: 'text'
  }
   )
const parserf = new Parser({explicitArray: false})
const result = await parserf.parseStringPromise(respoonse.data);
console.log(result,"123")
 
const responseBody = result['soap-env:Envelope']['soap-env:Body']['n0:ZsasiGetPaymentsAgingFm7Response'];
return responseBody
}catch(error){
  console.log(error)
}
  }
 
 
//creidt/debit memo
async function creditdebit(u){
  try{
   const respoonse = await axios.post('http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zrfc_memo_h?sap-client=100',
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZsasiGetMemoFm8>
         <CustomerId>${u}</CustomerId>
      </urn:ZsasiGetMemoFm8>
   </soapenv:Body>
</soapenv:Envelope>
`,
      {headers:{
        'SOAPAction':'',
        'Content-Type':'text/xml',
        'Accept':'text/xml'
      },
      auth:{
        username:'K901655',
        password:'Sasidharan@03'
      },
    responseType: 'text'
  }
   )
const parserf = new Parser({explicitArray: false})
const result = await parserf.parseStringPromise(respoonse.data);
console.log(result,"123")
 
const responseBody = result['soap-env:Envelope']['soap-env:Body']['n0:ZsasiGetMemoFm8Response'];
return responseBody
}catch(error){
  console.log(error)
}
  }
 
//overall sales
  async function salesover(u){
  try{
   const respoonse = await axios.post('http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zrfc_overall_sales_i?sap-client=100',
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZsasiGetSalesSummaryFm9>
         <CustomerId>${u}</CustomerId>
      </urn:ZsasiGetSalesSummaryFm9>
   </soapenv:Body>
</soapenv:Envelope>
`,
      {headers:{
        'SOAPAction':'',
        'Content-Type':'text/xml',
        'Accept':'text/xml'
      },
      auth:{
        username:'K901655',
        password:'Sasidharan@03'
      },
    responseType: 'text'
  }
   )
const parserf = new Parser({explicitArray: false})
const result = await parserf.parseStringPromise(respoonse.data);
console.log(result,"123")
 
const responseBody = result['soap-env:Envelope']['soap-env:Body']['n0:ZsasiGetSalesSummaryFm9Response'];
return responseBody
}catch(error){
  console.log(error)
}
  }
 
 
//invoice
 async function cuinvoice(u){
  try{
   const respoonse = await axios.post('http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zrfc_invoice_f1?sap-client=100',
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZsasiGetInvoiceFm6>
         <ICustomer>${u}</ICustomer>
      </urn:ZsasiGetInvoiceFm6>
   </soapenv:Body>
</soapenv:Envelope>
`,
      {headers:{
        'SOAPAction':'',
        'Content-Type':'text/xml',
        'Accept':'text/xml'
      },
      auth:{
        username:'K901655',
        password:'Sasidharan@03'
      },
    responseType: 'text'
  }
   )
const parserf = new Parser({explicitArray: false})
const result = await parserf.parseStringPromise(respoonse.data);
console.log(result,"123")
 
const responseBody = result['soap-env:Envelope']['soap-env:Body']['n0:ZsasiGetInvoiceFm6Response'];
return responseBody
}catch(error){
  console.log(error)
}
  }
 
//invoiceforms
 async function custinvoice(u,d){
  try{
   const respoonse = await axios.post('http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zrfc_invoice_forms_f2?sap-client=100',
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZsasiGetInvoiceFormsFm6>
         <!-- Replace with actual import parameters based on SE37 -->
         <PCustId>${u}</PCustId>
         <PDocNo>${d}</PDocNo>
      </urn:ZsasiGetInvoiceFormsFm6>
   </soapenv:Body>
</soapenv:Envelope>
`,
      {headers:{
        'SOAPAction':'',
        'Content-Type':'text/xml',
        'Accept':'text/xml'
      },
      auth:{
        username:'K901655',
        password:'Sasidharan@03'
      },
    responseType: 'text'
  }
   )
const parserf = new Parser({explicitArray: false})
const result = await parserf.parseStringPromise(respoonse.data);
console.log(result,"123")
 
const responseBody = result['soap-env:Envelope']['soap-env:Body']['n0:ZsasiGetInvoiceFormsFm6Response'];
return responseBody
}catch(error){
  console.log(error)
}
  }
 
 
// Invoice PDF endpoint
app.post('/invoice-pdf', async (req, res) => { 
  const { customerId, docNo } = req.body; 
  if (!customerId || !docNo) { 
    return res.status(400).json({ error: 'Missing customerId or docNo' }); 
  } 
  
  try { 
    // Use the existing custinvoice function to get the invoice data
    const invoiceData = await custinvoice(customerId, docNo);
    
    // Extract the PDF content from the response
    const match = invoiceData?.PPdf ? true : false;
    if (!match) { 
      throw new Error('No PDF data found in SAP response'); 
    }
    
    // Clean up the base64 string
    let base64PDF = invoiceData.PPdf
      .replace(/\s+/g, '')       // remove all whitespaces, line breaks 
      .replace(/&#xA;/g, '')     // remove encoded line breaks if present 
      .replace(/&#.*?;/g, '');   // remove any other HTML entities 
    
    // Convert base64 to buffer
    const pdfBuffer = Buffer.from(base64PDF, 'base64'); 
    
    // Send the PDF
    res.set({ 
      'Content-Type': 'application/pdf', 
      'Content-Disposition': 'inline; filename="invoice.pdf"', 
    }); 
    res.send(pdfBuffer); 
  
  } catch (err) { 
    console.error('❌ Invoice PDF Error:', err.message); 
    res.status(500).json({ error: 'Failed to generate PDF', details: err.message }); 
  } 
});

app.listen(3000)