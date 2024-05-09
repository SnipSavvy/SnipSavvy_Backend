export function send_snippet(data: any) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html dir="ltr" lang="en">
    <head>
      <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    </head>
    <body
      style="
        background-color: rgb(255, 255, 255);
        margin: auto;
        font-family: 'ui-sans-serif', system-ui, -apple-system, BlinkMacSystemFont,
          'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
          'Noto Color Emoji';
        padding: 0.5rem;
      "
    >
      <table
        align="center"
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
        role="presentation"
        style="
          max-width: 465px;
          border: 1px solid rgb(234, 234, 234);
          border-radius: 0.25rem;
          margin: 40px auto;
          padding: 20px;
        "
      >
        <tbody>
          <tr>
            <td>
              <table
                align="center"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                role="presentation"
                style="margin-top: 32px"
              >
              </table>
              <h1
                style="
                  color: rgb(0, 0, 0);
                  font-size: 24px;
                  font-weight: 400;
                  text-align: center;
                  padding: 0;
                  margin: 30px 0;
                "
              >
                Access <strong>Snippet</strong> on <strong>Snippsavvy</strong>
              </h1>
              <p
                style="
                  font-size: 14px;
                  line-height: 24px;
                  margin: 16px 0;
                  color: rgb(0, 0, 0);
                "
              >
                Hello <strong> ${data.email} </strong>,
              </p>
              <p
                style="
                  font-size: 14px;
                  line-height: 24px;
                  margin: 16px 0;
                  color: rgb(0, 0, 0);
                "
              >
                <strong> ${data.user_name} </strong> has shared a code snippet with you, Via
                <strong>Snippsavvy</strong>.
              </p>
              <table
                align="center"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                role="presentation"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        width="100%"
                        border="0"
                        cellspacing="0"
                        cellpadding="0"
                        role="presentation"
                      >
                        <tbody>
                          <tr>
                            <td align="right">
                              <img
                                height="64"
                                src="https://lh3.googleusercontent.com/a/AAcHTtd38qKc5ggQqfZASEPrQ7qOpDf7oWFHwqVmD9B6wGphBQ=s96-c"
                                style="
                                  display: block;
                                  outline: none;
                                  border: none;
                                  text-decoration: none;
                                  border-radius: 9999px;
                                "
                                width="64"
                              />
                            </td>
                            <td align="center">
                              <img
                                alt="invited you to"
                                height="9"
                                src="https://react-email-demo-jsqyb0z9w-resend.vercel.app/static/vercel-arrow.png"
                                style="
                                  display: block;
                                  outline: none;
                                  border: none;
                                  text-decoration: none;
                                "
                                width="12"
                              />
                            </td>
                            <td align="left">
                              <img
                                height="64"
                                src="https://react-email-demo-jsqyb0z9w-resend.vercel.app/static/vercel-team.png"
                                style="
                                  display: block;
                                  outline: none;
                                  border: none;
                                  text-decoration: none;
                                  border-radius: 9999px;
                                "
                                width="64"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                role="presentation"
                style="text-align: center; margin: 32px auto"
              >
                <tbody>
                  <tr>
                    <td>
                      <a
                        href=${data.url}
                        style="
                          background-color: rgb(0, 0, 0);
                          border-radius: 0.25rem;
                          color: rgb(255, 255, 255);
                          font-size: 12px;
                          font-weight: 600;
                          text-decoration: none;
                          text-align: center;
                          padding: 0.75rem;
                          line-height: 100%;
                          display: inline-block;
                          max-width: 100%;
                        "
                        target="_blank"
                        >View the Snippet</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
              <p
                style="
                  font-size: 14px;
                  line-height: 24px;
                  margin: 16px 0;
                  color: rgb(0, 0, 0);
                "
              >
                or copy and paste this URL into your browser:
                <a
                  href=${data.url}
                  style="color: rgb(37, 99, 235); text-decoration: none"
                  target="_blank"
                  >${data.url}</a
                >
              </p>
              <hr
                style="
                  width: 100%;
                  border: none;
                  border-top: 1px solid #eaeaea;
                  margin: 26px 0;
                "
              />
              <p
                style="
                  font-size: 12px;
                  line-height: 24px;
                  margin: 16px 0;
                  color: rgb(102, 102, 102);
                "
              >
                This invitation was intended for
                <span style="color: rgb(0, 0, 0)">alanturing</span>. This invite
                was sent from
                <span style="color: rgb(0, 0, 0)">204.13.186.218</span> located in
                <span style="color: rgb(0, 0, 0)">São Paulo, Brazil</span>. If you
                were not expecting this invitation, you can ignore this email. If
                you are concerned about your account's safety, please reply to
                this email to get in touch with us.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
  `;
}
