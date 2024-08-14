import { Schema,model } from "mongoose";

const applicationSchema = new Schema({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'Job'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userTechSkills: {
        type: [String]
    },
    userSoftSkills: {
        type: [String]
    },
    userResume: {
        type: String,
    },
}, {timestamps: true,});

applicationSchema.post('init',function(doc){
        doc.userResume='http://localhost:3000/uploads/'+doc.userResume
      
})



const applicationModel = model('Application', applicationSchema);


export default applicationModel;
