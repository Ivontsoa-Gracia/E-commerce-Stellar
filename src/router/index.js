import { createRouter, createWebHistory } from 'vue-router';

import AcceuilPage from "@/components/pages/landing/AcceuilPage.vue";
import ConceptPage from "@/components/pages/landing/ConceptPage.vue";
import CaracteristiquePage from "@/components/pages/landing/CaracteristiquePage.vue";
import VideoPage from "@/components/pages/landing/VideoPage.vue";
import ProduitPage from "@/components/pages/landing/ProduitPage.vue";
import ContactPage from "@/components/pages/landing/ContactPage.vue";
import FooterPAge from "@/components/pages/landing/FooterPage.vue";
import LandingPage from "@/components/pages/landing/LandingPage.vue";
import PopUp from "@/components/pages/landing/PopUp.vue";

import ListProduit from '@/components/pages/newapp/ListProduit.vue';
import MonPanier from '@/components/pages/newapp/MonPanier.vue';
import AuthPage from '@/components/pages/newapp/AuthPage.vue';
import MesCommande from '@/components/pages/newapp/MesCommande.vue';
import DetailPage from '@/components/pages/newapp/DetailPage.vue';
import FacturePage from '@/components/pages/newapp/FacturePage.vue';

import SalesDashboard from '@/components/pages/admin/SalesDashboard.vue';
import AdminPage from '@/components/pages/admin/AdminPage.vue';

import ImportCsv from "../components/pages/csv/ImportCsv.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/acceuil", component: AcceuilPage },
  { path: "/popup", component: PopUp },
  { path: "/concept", component: ConceptPage },
  { path: "/caracteristique", component: CaracteristiquePage },
  { path: "/video", component: VideoPage },
  { path: "/produit", component: ProduitPage },
  { path: "/contact", component: ContactPage },
  { path: "/footer", component: FooterPAge },
  { path: "/list", component: ListProduit },
  { path: "/panier", component: MonPanier },
  { path: "/auth", component: AuthPage },
  { path: "/commande", component: MesCommande },
  { path: "/detail-commande/:reference", component: DetailPage },
  { path: "/dashboard", component: SalesDashboard },
  { path: "/reset", component: AdminPage},
  {
    path: '/facture/:reference/:idFacture',
    name: 'facture',
    component: FacturePage,  
    props: true, 
  },
  { path: "/import", component: ImportCsv },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

