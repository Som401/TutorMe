import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const PrivacyModal = (props) => {
    const [open, setOpen] = React.useState(false);
    const policyText = (
        <p>
                Last Updated: 11/19/2023

                <h3>1. Introduction </h3>

                Welcome to Tutor ME. We are committed to protecting the privacy and security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website.

                <h3> 2. Information We Collect</h3>

               <h5> 2.1. User-Provided Information:</h5>
                When you sign up for an account, apply to become a tutor, or search for tutors, 
                we may collect personal information, including but not limited to your name, email address, contact details, 
                educational background, and relevant experience.

                <h5>2.2. Automatically Collected Information:</h5> We may also collect certain information automatically, 
                such as your IP address, browser type, and device information.

                <h3> 3. How We Use Your Information</h3>

                <h5>3.1. Providing Services:</h5> We use the information you provide to offer our tutoring services, 
                connect students with tutors, and facilitate communication between users.

                <h5>3.2. Communication:</h5> We may use your contact information to send you important updates, notifications, 
                and marketing materials.

                <h3> 4. Information Sharing</h3>

                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                except as described in this Privacy Policy or as required by law.

                <h3> 5. Security</h3>

                We implement security measures to protect your personal information. 
                However, no method of transmission over the internet or electronic storage is entirely secure, 
                and we cannot guarantee absolute security.

                <h3> 6. Cookies</h3>

                Our website may use cookies to enhance your experience. You can set your browser to refuse cookies, 
                but this may limit certain features.

                <h3>7. Your Choices</h3>

                You have the right to access, correct, or delete your personal information. 
                You can do this by logging into your account or contacting us directly.

                <h3>8. Changes to This Privacy Policy</h3>

                We reserve the right to modify this Privacy Policy at any time. 
                The date of the latest revision will be indicated at the top of the page.

                <h3>9. Contact Us</h3>

                If you have any questions or concerns about this Privacy Policy, please contact us at 99 999 999.
        </p>
    );
    return (
        <>
            <button className="item1" onClick={() => setOpen(true)}>
                Privacy Policy
            </button>
            <Modal open={open} onClose={() => setOpen(false)} center>
                <h2>Privacy Policy</h2>
                {policyText}
                {/* {policyText}
                {policyText} */}
            </Modal>
        </>
    );
};

export default PrivacyModal;