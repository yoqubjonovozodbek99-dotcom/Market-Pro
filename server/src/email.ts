import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Xush kelibsiz! 🎉 MarketPro Academyga',
      html: `
        <h2>Salom, ${name}!</h2>
        <p>Siz MarketPro Academyga muvaffaqiyatli ro'yxatdan o'tdingiz.</p>
        <p>Kurslarni o'rganishni boshlash uchun <a href="${process.env.CLIENT_URL}/login">shu yerga</a> kiring.</p>
        <p>Agar savol bo'lsa, biz <a href="mailto:${process.env.GMAIL_USER}">shunga</a> yozavering.</p>
        <p>Muvaffaqiyatlar! 🚀</p>
      `,
    })
  } catch (error) {
    console.error('Failed to send email:', error)
  }
}

export async function sendPasswordResetEmail(email: string, resetToken: string) {
  const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Parolni tiklash',
      html: `
        <h2>Parolni tiklash</h2>
        <p>Parolni tiklash uchun <a href="${resetLink}">shu havolani</a> bosing.</p>
        <p>Ushbu havola 1 soat amal qiladi.</p>
        <p>Agar bu so'rovni siz yo'q qilgan bo'lsangiz, bu xabarni e'tiborsiz qoldiring.</p>
      `,
    })
  } catch (error) {
    console.error('Failed to send email:', error)
  }
}
