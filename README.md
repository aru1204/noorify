<!-- Website Banner -->
<p align="center">
  <!-- Caption for first image -->
  <h2>💻 Computer View</h2>
  <img src="https://i.ibb.co/Y44qxgyp/computer-view.png" alt="Computer View" width="100%" />

  <!-- Spacer -->
  <br /><br />

  <!-- Caption for second image -->
  <h2>📱 Mobile View</h2>
  <img src="https://i.ibb.co/Z6FPtZdc/mobile-view.jpg" alt="Mobile View" />
</p>



<!-- Live Website Button -->
<p align="center">
  <a href="https://noorify-bangladesh.web.app/" target="_blank">
    <img src="https://img.shields.io/badge/View%20Live%20Website-Click%20Here-blue?style=for-the-badge" alt="View Live Website" />
  </a>
</p>

---

## 🛠️ How to Set Up the Website in Your Local Environment

To run this website on your own computer, follow the steps below:

---

### 📦 Step 1: Download the Project Files

You need to download both **noorify-client** and **noorify-server** source code:

---

### 🎨 Step 2: Configure the Client Side

After downloading, go to the client-side folder and follow these steps:

1. Open the project in your code editor.
2. Run `npm install` to install dependencies.
3. Create a Firebase App and Signin/ Signup Imagebb and follow 4th step. 
4. Create a `.env.local` file and set the following values:
   ```env
    VITE_apiKey=(firebase apiKey)
    VITE_authDomain=(firebase authDomain)
    VITE_projectId=(firebase projectId)
    VITE_storageBucket=(firebase storageBucket)
    VITE_messagingSenderId=(firebase messagingSenderId)
    VITE_appId=(firebase appId)
    VITE_IMAGE_HOSTING_KEY=(image hosting key of imagebb)
5. Add 30 para to noorify-client\public\assets\paras and set 1.mp3 for para-1 to 30.mp3 for para-30
6. Add 114 sura to noorify-client\public\assets\suras and set 1.mp3 for sura-1 to 114.mp3 for sura-114
