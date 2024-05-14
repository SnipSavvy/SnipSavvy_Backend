// emailTemplates.ts

export function register_user(data: any) {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" lang="en">
      <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
      </head>
      <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
          <tbody>
            <tr style="width:100%">
              <td>
                <h1 style="font-size:24px;line-height:32px;margin:16px 0;">Welcome to SnipSavvy!</h1>
                <p style="font-size:16px;line-height:26px;margin:16px 0;">Hi ${data.name},</p>
                <p style="font-size:16px;line-height:26px;margin:16px 0;">Welcome to SnipSavvy! We're thrilled to have you on board.</p>
                <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align:center">
                  <tbody>
                    <tr>
                      <td>
                        <a href="https://snipsavvy.vercel.app/" style="line-height:100%;text-decoration:none;display:block;max-width:100%;background-color:#5F51E8;border-radius:3px;color:#fff;font-size:16px;text-align:center;padding:12px 12px 12px 12px" target="_blank">Get Started</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p style="font-size:16px;line-height:26px;margin:16px 0;">Best regards,<br/>The SnipSavvy Team</p>
                <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
                <p style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa">Your company details or contact information</p>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>`;
  }
  