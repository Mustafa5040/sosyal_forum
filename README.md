# ATU Social - University Community & Campus Forum Web Platform 🎓💬

A full-stack campus forum and student community platform developed with **ASP.NET Core MVC**, **Entity Framework Core**, and relational database management principles. Designed to facilitate student discussions, event organization, and campus interactions.

---

## 📌 Project Overview

This project was built as a comprehensive database systems application to model real-world social and event interactions within a university environment (Adana Alparslan Türkeş Science and Technology University - ATU).

It demonstrates relational database design, Code-First migrations, authentication workflows, and server-side rendered dynamic views paired with modular front-end components.

---

## ✨ Features

### 👤 User Management & Authentication
* **Cookie-Based Authentication**: Secure login/logout and session management using ASP.NET Core Cookie Authentication.
* **Profile Management**: Profile customization (bio, avatar URLs, contact links) and public profile inspection.
* **Client-Side Guards**: Route protection and status checking via modular JavaScript helpers (`login_guard.js`, `login_checker.js`).

### 📝 Forum & Discussion Threads
* **Topic Categorization**: Create, view, and organize discussion threads across academic and social topics.
* **Discussion Comments**: Threaded replies linked via foreign keys to topics and authors.
* **View Tracking & Recency**: Live view count updates and recent comment aggregation.

### 📅 Campus Event Engine
* **Event Creation & Listing**: Organize student club activities and campus gatherings with time, date, and location metadata.
* **Reusable Widgets**: Dedicated partial views (`_EtkinlikWidget.cshtml`, `_SonEtkinlikPartial.cshtml`) for embedding upcoming events across the forum dashboard.

### 🎨 Responsive & Theme-Aware UI
* **Bootstrap 5 UI**: Clean, responsive layout optimized for mobile and desktop screens.
* **Dark / Light Theme Toggle**: Dynamic theme switching with persistence via `theme_helper.js`.

---

## 🛠️ Tech Stack & Architecture

* **Backend Framework**: ASP.NET Core MVC (.NET 8 / .NET 9 compatible)
* **ORM & Database**: Entity Framework Core (Code-First workflow with SQLite / SQL Server)
* **Frontend**: Razor Views (`.cshtml`), Bootstrap 5, Vanilla JavaScript, jQuery Validation & Unobtrusive Validation
* **Design Pattern**: Model-View-Controller (MVC) with ViewModel separation (`TopicViewModel`, `UserEditViewModel`, `RecentCommentViewModel`)

---

## 📂 Entity Relationship & Database Schema

The core domain model consists of 4 main relational entities managed by `AppDbContext`:

```text
       ┌───────────┐
       │   User    │
       └─────┬─────┘
             │ 1
             │
             ├───────────────────┐
             │ *                 │ *
       ┌─────┴─────┐       ┌─────┴─────┐
       │   Topic   │       │ Etkinlik  │
       └─────┬─────┘       │  (Event)  │
             │ 1           └───────────┘
             │
             │ *
       ┌─────┴─────┐
       │  Comment  │
       └───────────┘
```

* **User**: Stores credentials, user handles, bio, role, and relational collections (`Topics`, `Comments`, `Etkinlikler`).
* **Topic**: Forum thread with title, body, view count, creation date, author reference, and associated comments.
* **Comment**: Message entity tied to a specific `TopicId` and `UserId`.
* **Etkinlik**: Campus event details including title, organizer reference, location, date, and descriptions.

---

## 📁 Project Structure

```text
atu_sosyal/
├── Controllers/              # MVC Controllers (Account, Topic, Etkinlik, Contact, Home)
├── Data/
│   └── AppDbContext.cs       # EF Core Database context and Fluent API configurations
├── Migrations/               # Database versioning and migration history
├── Models/                   # Core business entities (User, Topic, Comment, Etkinlik)
├── ViewModels/               # DTOs and presentation models
├── Views/                    # Razor View templates & partials
└── wwwroot/                  # Static assets (custom CSS, JS helpers, Bootstrap, icons)
```

---

## 🚀 Getting Started

### Prerequisites
* [.NET SDK (8.0 or higher)](https://dotnet.microsoft.com/download)
* Visual Studio 2022 / VS Code / JetBrains Rider

### Setup & Execution

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/social_forum.git
   cd social_forum/atu_sosyal
   ```

2. **Configure Connection String:**
   Check `appsettings.json` to verify your database provider (defaults to LocalDB / SQLite / SQL Server):
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Data Source=atusosyal.db"
   }
   ```

3. **Apply Database Migrations:**
   ```bash
   dotnet ef database update
   ```

4. **Run the Application:**
   ```bash
   dotnet run
   ```
   Open `https://localhost:5001` or `http://localhost:5000` in your browser.

---

## 📌 Academic Takeaways

* Implemented **Code-First Entity Framework Core** migrations and relational constraints (`OnDelete`, `ForeignKey`).
* Managed state and authentication workflows via **Claims-based identity** and cookie policies.
* Built re-usable view components and partials to avoid frontend code duplication.
