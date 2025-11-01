import mongoose from 'mongoose';


const EnquirySchema = new mongoose.Schema({
name: String,
email: String,
phone: String,
message: String,
carId: String,
status: { type: String, default: 'Pending' },
}, { timestamps: true });


export default mongoose.models.Enquiry || mongoose.model('Contact', EnquirySchema);