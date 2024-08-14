
import crypto from 'crypto'

export  function generateOTP(length = 6) {
    const otp = crypto.randomInt(0, Math.pow(10, length)).toString().padStart(length, '0');
    return otp;
}