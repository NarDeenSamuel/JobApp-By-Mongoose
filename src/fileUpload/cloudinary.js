import { v2 as cloudinary} from 'cloudinary';
 const cloudinaryUpload = async function() {
    cloudinary.config({ 
        cloud_name: 'dqvzbp4cm', 
        api_key: '691245949795419', 
        api_secret: 'rQc05kMjPQ02_o7j5sEWh3saiXQ' 
    });

    const uploadPDF = await cloudinary.uploader.upload('../../uploads/44b4aad2-f0f0-43f3-863e-509a23900953-3.pdf',{
        resource_type: 'raw',  
        public_id: 'pdfs',    
    }).catch((error) => {
        console.log(error);
    });
    console.log(uploadPDF);
}

export default cloudinaryUpload