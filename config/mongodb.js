const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB!');
}).catch(err => {
  console.error('Could not connect to MongoDB', err);
});

// // PatientDocuments Schema:
// const PatientDocumentSchema = new mongoose.Schema({
//   patientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Patient",
//     required: true,
//   },
//   documentType: { type: String, required: true }, // e.g., doctor's notes, diagnostic images, lab results
//   content: { type: String, required: true },
//   date: { type: Date, default: Date.now },
// });
// module.exports = mongoose.model("PatientDocument", PatientDocumentSchema);

// // StaffDocuments Schema:
// const StaffDocumentSchema = new mongoose.Schema({
//   staffId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Staff",
//     required: true,
//   },
//   documentType: { type: String, required: true }, // e.g., certificates, training materials
//   content: { type: String, required: true },
//   date: { type: Date, default: Date.now },
// });
// module.exports = mongoose.model("StaffDocument", StaffDocumentSchema);

// // Example 2
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://quynguyen2436:<password>@cluster0.8xjsbu3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
