# EmailJS Setup Guide for Golden Castle Roofing Builders

This guide will help you set up email notifications when someone submits the consultation form.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. Once logged in, go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose **Gmail** (since your email is goldencastleroofingbuilders@gmail.com)
4. Click **Connect Account** and sign in with your Gmail
5. Give your service a name (e.g., "Golden Castle Notifications")
6. Copy the **Service ID** (looks like: `service_xxxxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template content:

**Template Name:** Consultation Request

**Subject:** New Consultation Request from {{from_name}}

**Content:**
```
Hello Golden Castle Team,

You have received a new consultation request from your website!

Client Details:
--------------
Name: {{from_name}}
Phone: {{phone}}
Email: {{from_email}}
Property Address: {{address}}

Message:
{{message}}

Please respond to this inquiry as soon as possible.

---
This email was sent from your website contact form.
```

4. In the settings, set **To Email** to: `goldencastleroofingbuilders@gmail.com`
5. Save the template and copy the **Template ID** (looks like: `template_xxxxxxx`)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the dashboard
2. Find your **Public Key** (looks like a random string)
3. Copy this key

## Step 5: Update Your Website Code

1. Open the file: `src/App.jsx`
2. Find these lines (around line 36-38):
```javascript
const serviceID = 'service_golden_castle'; // Replace with your EmailJS service ID
const templateID = 'template_consultation'; // Replace with your EmailJS template ID
const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY'; // Replace with your EmailJS public key
```

3. Replace them with your actual values:
```javascript
const serviceID = 'service_xxxxxxx'; // Your Service ID from Step 2
const templateID = 'template_xxxxxxx'; // Your Template ID from Step 3
const publicKey = 'your_actual_public_key'; // Your Public Key from Step 4
```

4. Save the file

## Step 6: Test the Form

1. Go to your website
2. Fill out the consultation form
3. Click "REQUEST A QUOTE NOW"
4. You should see a success message
5. Check your email: goldencastleroofingbuilders@gmail.com

## Important Notes

- **Free Tier Limits:** EmailJS free plan allows 200 emails per month
- **Email Delivery:** Emails may take 1-2 minutes to arrive
- **Spam Folder:** Check your spam folder if you don't see the email
- **Gmail Security:** Make sure to authorize EmailJS in your Gmail settings

## Troubleshooting

**If emails aren't sending:**

1. Check that all IDs are correct in `App.jsx`
2. Verify your EmailJS account is active
3. Check EmailJS dashboard for error logs
4. Make sure your Gmail is connected properly
5. Try the "Test" button in EmailJS template settings

**Alternative Option:**

If you prefer not to use EmailJS, you can also set up the form to send to a webhook or backend service. Let me know if you need help with that!

## Support

- EmailJS Documentation: https://www.emailjs.com/docs/
- If you need help, contact: support@emailjs.com

---

Once set up, every form submission will automatically send an email to **goldencastleroofingbuilders@gmail.com** with all the customer details!
