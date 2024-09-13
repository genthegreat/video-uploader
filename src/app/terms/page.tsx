import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Terms & Conditions | Video Uploader by Prince Kwesi",
    description: "Terms of Service",
};  

export default function TermsPage() {
    return (
        <div className="container flex flex-col">
            <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>

            <h2 className="text-2xl font-bold mt-4 mb-2">1. Introduction</h2>
            <p className="mb-4">Welcome to Video Uploader by Prince Kwesi! By accessing or using our service, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using our services.</p>

            <h2 className="text-2xl font-bold mt-4 mb-2">2. Acceptance of Terms</h2>
            <p className="mb-4">By using this website or any of our services, you agree to these Terms and Conditions. If you do not agree to these terms, you should stop using our services immediately.</p>

            <h2 className="text-2xl font-bold mt-4 mb-2">3. Modifications to Terms</h2>
            <p className="mb-4">We reserve the right to update or modify these Terms and Conditions at any time without prior notice. Any changes will be effective immediately upon being posted on this page. It is your responsibility to review these terms periodically for any changes.</p>

            <h2 className="text-2xl font-bold mt-4 mb-2">4. Use of the Service</h2>
            <p className="mb-4">You agree to use the service only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else’s use of the service. Prohibited behavior includes harassing or causing distress to others, transmitting obscene or offensive content, or disrupting the normal flow of communication.</p>

            <h2 className="text-2xl font-bold mt-4 mb-2">5. User Accounts</h2>
            <p className="mb-4">To use certain features of our service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account details and for all activities that occur under your account. If you suspect any unauthorized use of your account, you must notify us immediately.</p>

            <h2 className="text-2xl font-bold mt-4 mb-2">6. Intellectual Property</h2>
            <p className="mb-4">All content, materials, and resources available on our website and services, including but not limited to text, images, code, and videos, are made available under the <a href="https://opensource.org/licenses/MIT" className="text-blue-500 underline" target="_blank">MIT License</a>.</p>

            <h3 className="text-xl font-bold mt-2 mb-2">License Terms</h3>
            <ul className="list-disc ml-5 mb-4">
                <li>Use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, subject to the conditions of the MIT License.</li>
            </ul>

            <h3 className="text-xl font-bold mt-2 mb-2">Restrictions</h3>
            <ul className="list-disc ml-5 mb-4">
                <li>You must include the original MIT license in all copies or substantial portions of the software.</li>
                <li>You may not claim ownership of the original software or misrepresent its origin.</li>
            </ul>

            <p className="mb-4">The software is provided &ldquo;as is&rdquo;, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.</p>
            <p className="mb-4">By using our software or content, you agree to abide by the terms of the MIT License.</p>

            <h2 className="text-2xl font-bold mt-4 mb-2">7. Privacy Policy</h2>
            <p className="mb-4">Our Privacy Policy outlines how we collect, use, and protect your personal information. By using our service, you agree to the collection and use of information in accordance with our <a href="/privacy" className="text-blue-500 underline">Privacy Policy</a>.</p>

            <h2 className="text-2xl font-bold mt-4 mb-2">8. Video Uploads and Content</h2>
            <p className="mb-4">By using our video upload service, you acknowledge that:</p>
            <ul className="list-disc ml-5 mb-4">
                <li>You own or have the necessary permissions to upload and distribute the video content.</li>
                <li>Your video content complies with YouTube’s Terms of Service and Community Guidelines.</li>
                <li>We are not liable for any issues that arise from your content being uploaded to YouTube.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-4 mb-2">9. Third-Party Services</h2>
            <p className="mb-4">Our service may include integrations with third-party services (such as Supabase, YouTube, etc.). We are not responsible for the terms, privacy practices, or content of these third-party services. Your use of these services is subject to their respective terms and conditions.</p>

            <h2 className="text-2xl font-bold mt-4 mb-2">10. Limitation of Liability</h2>
            <p className="mb-4">To the fullest extent permitted by applicable law, Video Uploader by Prince Kwesi shall not be liable for any damages arising out of or in connection with your use of our service. This includes, without limitation, indirect, incidental, or consequential damages.</p>

            <h2 className="text-2xl font-bold mt-4 mb-2">11. Termination</h2>
            <p className="mb-4">We reserve the right to terminate or suspend your access to our services, without notice, for conduct that we believe violates these Terms and Conditions or is harmful to other users of the service, us, or third parties, or for any other reason.</p>

            <h2 className="text-2xl font-bold mt-4 mb-2">12. Governing Law</h2>
            <p className="mb-4">These Terms and Conditions shall be governed by and construed in accordance with the laws of Zambia, without regard to its conflict of law provisions.</p>

            <h2 className="text-2xl font-bold mt-4 mb-2">13. Contact Us</h2>
            <p className="mb-4">If you have any questions about these Terms and Conditions, please contact us at:</p>
            <ul className="list-disc ml-5 mb-4">
                <li>By Email: <a href="mailto:prinjtax@princekwesi.website" className="text-blue-500 underline">prinjtax@princekwesi.website</a></li>
                <li>By visiting this page on our website: <a href="https://princekwesi.website/" className="text-blue-500 underline" target="_blank">https://princekwesi.website/</a></li>
            </ul>
        </div>
    )
}
