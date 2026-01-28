import emailjs from '@emailjs/nodejs';
import 'dotenv/config';

console.log('🔧 Testing EmailJS Configuration...\n');

console.log('Service ID:', process.env.EMAILJS_SERVICE_ID);
console.log('Public Key:', process.env.EMAILJS_PUBLIC_KEY);
console.log('Private Key:', process.env.EMAILJS_PRIVATE_KEY ? '✓ Set' : '✗ Missing');
console.log('Template ID: template_lqm9nad\n');

async function testEmail() {
    try {
        console.log('📧 Sending test email...');

        const result = await emailjs.send(
            process.env.EMAILJS_SERVICE_ID,
            "template_lqm9nad",
            {
                user_name: "Test Client",
                user_email: "test@example.com",
                time: new Date().toLocaleString('fr-FR'),
                doc_name: "test-document.pdf",
                doc_link: "https://example.com/doc.pdf",
                message: "Test d'envoi d'email depuis le backend"
            },
            {
                publicKey: process.env.EMAILJS_PUBLIC_KEY,
                privateKey: process.env.EMAILJS_PRIVATE_KEY,
            }
        );

        console.log('✅ Email sent successfully!');
        console.log('Response:', result);
    } catch (error) {
        console.error('❌ Email sending failed:');
        console.error('Error:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

testEmail();
