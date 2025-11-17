# Recipe Sharing Platform – Frontend

This is the frontend for the **Recipe Sharing Platform**, built using **React.js**.  
Users can register, login, create recipes, edit/delete their own recipes, and view recipes from everyone.  
The frontend also integrates a **third-party external API (TheMealDB)** to fetch recipe images dynamically using the recipe title.

---

## Live Features

- Fully responsive UI  
- Authentication (Register & Login)  
- Create / Edit / Delete recipes  
- View recipe details in a separate page  
- Fetch images from TheMealDB using recipe title  
- Displays fallback image if external API fails  
- Protected routes using JWT  
- Uses Axios instance for requests  

---

## Tech Stack

- **React.js**
- **React Router**
- **Axios**
- **Bootstrap + Custom CSS**
- **JWT-based authentication**
- **External API Integration (TheMealDB)**

---


---

## Getting Started

### Clone the Repository

Run the following command:

```bash
git clone https://github.com/orwel009/recipe-sharing-platform-frontend.git
cd recipe-sharing-platform-frontend
```

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm start
```

#Frontend runs at: http://localhost:3000