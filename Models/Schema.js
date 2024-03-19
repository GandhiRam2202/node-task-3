import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mail: { type: String, required: true },
    stud_id: { type: String, required: true },
    mentor_id: {
      prev_mentor_id: { type: String, default: null },
      curr_mentor_id: { type: String, default: null }
    }
  });
  
  const mentorSchema = new mongoose.Schema({
    mentor_name: { type: String, required: true },
    mentor_id: { type: String, required: true },
    mentor_mail: { type: String, required: true }
  });

const Mentor = mongoose.model('Mentor', mentorSchema);
const Student = mongoose.model('Student', studentSchema);

export { Mentor, Student };
