import nodemailer from 'nodemailer'


export const sendEmail =async (user,otp)=>{
    
    const transporter = nodemailer.createTransport({

        service:"gmail",
        auth:{
            user:"totaemel69@gmail.com",
            pass:"akghxdwmxxdgypkg",
        },
    });



const info = await transporter.sendMail({
 from: ' "Nardeen Samuel 😄"  <totaemel69@gmail.com>',
 to:user.email,
 subject:'Reset Password',
 html:`

				<table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px">
					<tbody>
						<tr>
							<td align="center" valign="top">
								<table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;">
									<tbody>
										<tr>
											<td style="background-color:#000;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td>
										</tr>
									
										<tr>
										
										</tr>
										<tr>
											<td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle">
											<h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0;padding: 10px 0 0 0; ">Hi ${user.userName}</h2>
											</td>
										</tr>
										<tr>
											<td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle">
												<h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0">OTP code </h4>
											</td>
										</tr>
										<tr>
											<td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable">
												<table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style="">
													<tbody>
														<tr>
															<td style="padding-bottom: 20px;" align="center" valign="top" class="description">
																<p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:48px;text-transform:none;text-align:center;padding:0;margin:0;color: #000;font-size:40px ">${otp}</p>
															</td>
														</tr>
													</tbody>
												</table>
												
											</td>
										</tr>
										<h1 style="text-align:center;font-family:'Open Sans'; ">NarDeen Samuel</h1>
										<tr>
											<td style="font-size:1px;line-height:1px" height="20">&nbsp;</td>
										</tr>
									
									</tbody>
								</table>
								
							</td>
						</tr>
					</tbody>
				</table>
				
			</td>
		</tr>
	</tbody>
</table>`,



});
console.log("Message sent: %s",info.messageId);








}