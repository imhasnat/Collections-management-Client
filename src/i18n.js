// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        top5: "Top 5 collections",
        recentItem: "Recent Items",
        home: "Home",
        name: "Name",
        corresItem: "Corresponding Items",
        create: "Created At",
        collection: "Collection",
        item: "Item",
        dashboard: "Dashboard",
        login: "Login",
        signup: "Signup",
        logout: "Logout",
        cusField: "Custom Field",
        cusFieldValue: "Custom Field Value",
        tags: "Tags",
        category: "Category",
        viewItem: "View Item",
        addItem: "Add Item",
        addCollection: "Add Collection",
        userList: "Users List",
        hi: "Hi",
        welcome: "Welcome to",
        fn: "First Name",
        ln: "Last Name",
        email: "Email",
        role: "Role",
        status: "Status",
        action: "Action",
      },
    },
    fr: {
      translation: {
        top5: "Top 5 collections",
        recentItem: "Éléments récents",
        home: "Accueil",
        name: "Nom",
        corresItem: "Éléments correspondants",
        create: "Créé le",
        collection: "Collection",
        item: "Élément",
        dashboard: "Tableau de bord",
        login: "Connexion",
        signup: "S'inscrire",
        logout: "Déconnexion",
        cusField: "Champ personnalisé",
        cusFieldValue: "Valeur du champ personnalisé",
        tags: "Étiquettes",
        category: "Catégorie",
        viewItem: "Voir l'élément",
        addItem: "Ajouter un élément",
        addCollection: "Ajouter une collection",
        userList: "Liste des utilisateurs",
        hi: "Salut",
        welcome: "Bienvenue au",
        fn: "Prénom",
        ln: "Nom de famille",
        email: "E-mail",
        role: "Rôle",
        status: "Statut",
        action: "Action",
      },
    },
  },

  fallbackLng: "en",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
