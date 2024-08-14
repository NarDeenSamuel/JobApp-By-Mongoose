import mongoose from "mongoose"

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String
  },
  jobLocation: {
    type: String,
    enum: ['onsite', 'remotely', 'hybrid']
  },
  workingTime: {
    type: String,
    enum: ['part-time','full-time']
  },
  seniorityLevel: {
    type: String,
    enum: ['Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO']
  },
  jobDescription: {
    type: String,
  },
  technicalSkills: {
    type: [String]
  },
  softSkills: {
    type: [String]
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    },
}, {
  timestamps: true,
});

const JobModel = mongoose.model('Job', jobSchema);

export default JobModel;
