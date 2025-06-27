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

## 👤 User Features

The website offers a rich set of features for regular users. Here’s a breakdown of what users can do:

---

### 🕌 1. Islamic Q&A with AI & Scholars

- On the **Home Page**, users can:
  - Ask any Islamic question to **Nurify AI**.
  - Submit questions to **Islamic Scholars**.
- All submitted questions are saved under the **"Your Questions"** section in the dashboard.

---

### 📂 2. Question Management

In the **"Your Questions"** section:

- Users can see **all questions** they asked.
- Filter by:
  - ✅ **Answered Questions**
  - ⏳ **Unanswered Questions**
- Actions available:
  - ❌ Delete **any question**
  - ✏️ Edit **unanswered questions only**
  - ✅ Answered questions **cannot be edited**, only deleted

---

### 📞 3. Quick Contact Options

At the bottom of the home page:

- 📲 **Direct Call**
- 💬 **WhatsApp Call**

For fast responses from scholars or support.

---

### 🕓 4. Prayer Time

- Users can see **daily prayer times** on the home page.

---

### 🎥 5. Islamic Content Streaming

- Watch the latest **videos** released on the Nurify platform.
- Listen to **Quran audio**:
  - Divided by **Para**
  - Divided by **Surah**

---

### 🛍️ 6. Shop (Halal & Religious Products)

On the **Shop Page**, users can:

- Browse **religious and halal products**
- Add items to:
  - ❤️ **Favorites**
  - 🛒 **Cart**
- Or click **Buy Now** to purchase directly.

---

### 🎬 7. Videos Page

- Dedicated page to explore **all videos** uploaded to Nurify.

---

### 🙍‍♂️ 8. Profile Management

In the **Profile Page**, users can:

- 📝 Edit their **name**
- 📧 View their **email**
- ⏱️ See **last login**
- 🛑 Use **Danger Zone** to **delete their account** permanently

---

### ❤️ 9. Favorites

- See all products added to **favorites** in the profile.

---

### 🛒 10. Cart

- See all products added to the **cart** in the profile.

---

### 📦 11. Your Orders

- See all **orders placed**
- View **status** of each order (e.g. pending, shipped)
- 🛠️ Can **edit or delete** orders **before delivery**

---


---

## 🛠️ How to Set Up the Website in Your Local Environment

To run this website on your own computer, follow the steps below:

---

### 📦 Step 1: Download the Project Files

You need to download both **noorify-client** and **noorify-server** source code:

---

### 🎨 Step 2: Configure the Client Side

After downloading, go to the **noorify-client** folder and follow these steps:

1. Open the project in your code editor.
2. Run `npm install` to install dependencies.
3. Create a **Firebase App** 
4. **Signin/ Signup Imagebb** to host product image by api and follow 4th step. 
5. Create a `.env.local` file and set the following values:
   ```env
    VITE_apiKey=(firebase apiKey)
    VITE_authDomain=(firebase authDomain)
    VITE_projectId=(firebase projectId)
    VITE_storageBucket=(firebase storageBucket)
    VITE_messagingSenderId=(firebase messagingSenderId)
    VITE_appId=(firebase appId)
    VITE_IMAGE_HOSTING_KEY=(image hosting key of imagebb)
6. Add 30 para to **noorify-client\public\assets\paras** and set 1.mp3 for para-1 to 30.mp3 for para-30
7. Add 114 sura to **noorify-client\public\assets\suras** and set 1.mp3 for sura-1 to 114.mp3 for sura-114
8. Run `npm run dev` and click the following live link to view.


---


### 🗄️ Step 3: Configure the Server Side

After downloading, go to the **noorify-server** folder and follow these steps:

1. Open the project in your code editor.
2. Run `npm install` to install dependencies.
3. Create a **Mongodb Server**
4. Login or Signup **Gemini Developer API** and create an api for integrated api feature and follow 4th step. 
5. Create a `.env` file and set the following values:
   ```env
    SECRET_KEY=(Mongodb KEY)
    SECRET_HASH=(Mongodb HASH)
    ACCESS_SECRET_TOKEN=366021a3625219eb70e934d809adbe1a1f6e86363ba3f5e103d5538df30fbdfdd91a0b1912169acce28344f50854bbdd489fec058c4c87e0963
    GEMINI_KEY=(Gemini API key)

6. Run `nodemon index.js` for connect server to client.