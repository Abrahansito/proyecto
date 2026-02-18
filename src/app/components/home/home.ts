import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ServiceCard } from '../service-card/service-card';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { PaginatorModule } from 'primeng/paginator'
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { RadioButtonModule } from 'primeng/radiobutton';


@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, ServiceCard, Navbar, Footer, CheckboxModule, AccordionModule, InputTextModule, SelectModule, PaginatorModule, IconFieldModule, InputIconModule, RadioButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  checked: any = null;
  selectedRating: any = null;

  //Variables para paginación
  visibleServices: any[] = []; //Esta es la lista que se ve en pantalla
  first: number = 0;           //Índice del primer elemento
  rows: number = 5;            //Cantidad de elementos por página
  totalRecords: number = 0;    //Total de elementos

  sections = {
    services: true,
    districts: true,
    rating: true,
    payment: true,
    languages: true
  };

  //Opciones de ordenamiento
  sortOptions = [
    { label: 'Más popular', value: 'pop' },
    { label: 'Mejor valorado', value: 'rating' },
    { label: 'Más reciente', value: 'new' },
  ];
  selectedSort: string = 'pop';

  constructor() {}

  //Calculamos el total y mostramos la primera página
  ngOnInit() {
    this.totalRecords = this.allServices.length;
    this.updatePage();
  }

  //Función que se ejecuta al cambiar de página
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePage();

    //Scroll suave hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  //Función para actualizar la lista visible según la página actual
  updatePage() {
    this.visibleServices = this.allServices.slice(this.first, this.first + this.rows);
  }

  //Función para mostrar u ocultar secciones del filtro
  toggleSection(sectionName: keyof typeof this.sections) {
    this.sections[sectionName] = !this.sections[sectionName];
  }

  serviceCategories = [
    { id: 's1', label: 'Arquitectura y Diseño', count: 245, selected: false },
    { id: 's2', label: 'Carpintería', count: 705, selected: false },
    { id: 's3', label: 'Cerrajería', count: 492, selected: false },
    { id: 's4', label: 'Construcción', count: 1184, selected: false },
    { id: 's5', label: 'Gasfitería', count: 2004, selected: false},
    { id: 's6', label: 'Pintura', count: 350, selected: false },
    { id: 's7', label: 'Electricidad', count: 890, selected: false },
    { id: 's8', label: 'Jardinería', count: 420, selected: false },
    { id: 's9', label: 'Limpieza', count: 650, selected: false },
    { id: 's10', label: 'Transporte', count: 320, selected: false },
  ];

  allServices = [
    {
      name: 'Alev Constructores "Complementos para la construcción"',
      title: 'Construcción de viviendas, remodelaciones, ampliaciones entre otros proyectos',
      image: 'imagen/imagen1_1.jpg',
      rating: 4.9,
      reviews: 158,
      verified: true,
      hours: '2 horas',
      languages: 'Español • Inglés',
      location: 'La Molina • La Molina, Surco, Miraflores'
    },
    {
      name: 'TechBuild Perú "Técnicos en Construcción Civil"',
      title: 'Especialistas en estructuras y acabados de alta calidad',
      image: 'imagen/imagen2_2.jpg',
      rating: 4.8,
      reviews: 203,
      verified: true,
      hours: '1 hora',
      languages: 'Español • Quechua',
      location: 'San Isidro • San Isidro, Lince, Jesús María'
    },
    {
        name: 'Arquitectura Total "Diseño y Construcción Integral"',
        title: 'Proyectos arquitectónicos completos desde el diseño hasta la ejecución',
        image: 'imagen/imagen3_3.jpg',
        rating: 4.7,
        reviews: 89,
        verified: true,
        hours: '4 horas',
        languages: 'Español • Inglés • Francés',
        location: 'Miraflores • Miraflores, Barranco, Chorrillos'
      },
      {
      name: 'Construye Fácil "Remodelaciones Express"',
      title: 'Remodelaciones rápidas y eficientes para hogares y oficinas',
      image: 'imagen/imagen4_4.jpg',
      rating: 4.6,
      reviews: 142,
      verified: true,
      hours: '3 horas',
      languages: 'Español',
      location: 'Surco • Surco, San Borja, Santiago de Surco'
    },
    {
      name: 'Ingeniería & Proyectos "Ingenieros Civiles Especializados"',
      title: 'Cálculo estructural y supervisión de obras civiles',
      image: 'imagen/imagen5_5.jpg',
      rating: 5,
      reviews: 67,
      verified: true,
      hours: '24 horas',
      languages: 'Español • Inglés • Alemán',
      location: 'Lima Centro • Cercado de Lima, Breña, Pueblo Libre'
    },
    {
        name: 'Acabados Premium "Especialistas en Acabados"',
        title: 'Trabajos de pintura, drywall y acabados finos',
        image: 'imagen/imagen6_6.jpg',
        rating: 4.5,
        reviews: 178,
        verified: true,
        hours: '2 horas',
        languages: 'Español',
        location: 'San Miguel • San Miguel, Magdalena, Pueblo Libre'
      },
      {
      name: 'Electricidad Segura "Instalaciones Eléctricas"',
      title: 'Instalación y mantenimiento eléctrico residencial e industrial',
      image: 'imagen/imagen7_7.jpg',
      rating: 4.8,
      reviews: 95,
      verified: true,
      hours: '1 hora',
      languages: 'Español',
      location: 'Callao • Callao, Ventanilla, Bellavista'
    },
    {
      name: 'Fontanería Moderna "Servicios de Fontanería"',
      title: 'Reparación e instalación de tuberías y sistemas de agua',
      image: 'imagen/imagen8_8.jpg',
      rating: 4.4,
      reviews: 211,
      verified: true,
      hours: '3 horas',
      languages: 'Español',
      location: 'Comas • Comas, Los Olivos, Independencia'
    },
    {
        name: 'Techos & Estructuras "Especialistas en Techos"',
        title: 'Construcción y reparación de techos de todo tipo',
        image: 'imagen/imagen9_9.jpg',
        rating: 4.7,
        reviews: 123,
        verified: true,
        hours: '6 horas',
        languages: 'Español',
        location: 'Villa El Salvador • Villa El Salvador, Villa María, San Juan de Miraflores'
      },
      {
      name: 'Pisos & Porcelanatos "Instalación de Pisos"',
      title: 'Colocación de porcelanatos, madera y pisos flotantes',
      image: 'imagen/imagen10_10.jpg',
      rating: 4.9,
      reviews: 87,
      verified: true,
      hours: '2 horas',
      languages: 'Español',
      location: 'Barranco • Barranco, Chorrillos, Surco'
    },
    {
        name: 'Carpintería Artesanal "Muebles a Medida"',
        title: 'Diseño y fabricación de muebles de madera personalizados',
        image: 'imagen/imagen11_11.jpg',
        rating: 4.8,
        reviews: 134,
        verified: true,
        hours: '48 horas',
        languages: 'Español • Inglés',
        location: 'San Borja • San Borja, Surco, La Molina'
      },
      {
        name: 'Vidriería Express "Trabajos en Vidrio"',
        title: 'Cortado, instalación y reparación de vidrios y espejos',
        image: 'imagen/imagen12_12.jpg',
        rating: 4.6,
        reviews: 98,
        verified: true,
        hours: '4 horas',
        languages: 'Español',
        location: 'Jesús María • Jesús María, Lince, San Isidro'
      },
      {
        name: 'Climatización Total "Instalación de Aire Acondicionado"',
        title: 'Venta e instalación de sistemas de climatización',
        image: 'imagen/imagen13_13.jpg',
        rating: 4.7,
        reviews: 76,
        verified: true,
        hours: '24 horas',
        languages: 'Español',
        location: 'San Isidro • San Isidro, Miraflores, Surco'
      },
      {
        name: 'Albañilería Profesional "Trabajos de Albañilería"',
        title: 'Construcción de muros, tabiques y obras de albañilería',
        image: 'imagen/imagen14_14.jpg',
        rating: 4.5,
        reviews: 189,
        verified: true,
        hours: '1 día',
        languages: 'Español',
        location: 'Los Olivos • Los Olivos, Comas, Independencia'
      },
      {
        name: 'Jardinería & Paisajismo "Diseño de Jardines"',
        title: 'Diseño, instalación y mantenimiento de áreas verdes',
        image: 'imagen/imagen15_15.jpg',
        rating: 4.9,
        reviews: 112,
        verified: true,
        hours: '3 días',
        languages: 'Español',
        location: 'La Molina • La Molina, Ate, Surco'
      },
      {
        name: 'Gasfitería Integral "Servicios de Gasfitería"',
        title: 'Instalación y reparación de sistemas de gas y agua',
        image: 'imagen/imagen16_16.jpg',
        rating: 4.6,
        reviews: 156,
        verified: true,
        hours: '2 horas',
        languages: 'Español',
        location: 'Magdalena • Magdalena, San Miguel, Pueblo Libre'
      },
      {
        name: 'Cerrajería Segura "Cerrajería Profesional"',
        title: 'Instalación y reparación de cerraduras y sistemas de seguridad',
        image: 'imagen/imagen17_17.jpg',
        rating: 4.8,
        reviews: 92,
        verified: true,
        hours: '1 hora',
        languages: 'Español',
        location: 'Surquillo • Surquillo, San Borja, Miraflores'
      },
      {
        name: 'Pintura Decorativa "Pintura de Interiores y Exteriores"',
        title: 'Trabajos de pintura con técnicas decorativas modernas',
        image: 'imagen/imagen18_18.jpg',
        rating: 4.7,
        reviews: 144,
        verified: true,
        hours: '2 días',
        languages: 'Español • Inglés',
        location: 'Miraflores • Miraflores, Barranco, Chorrillos'
      },
      {
        name: 'Drywall Expert "Instalación de Drywall"',
        title: 'Trabajos en drywall, cielos rasos y tabiquería',
        image: 'imagen/imagen19_19.jpg',
        rating: 4.5,
        reviews: 101,
        verified: true,
        hours: '3 horas',
        languages: 'Español',
        location: 'San Luis • San Luis, La Victoria, Santa Anita'
      },
      {
      name: 'Impermeabilización Total "Impermeabilización de Techos"',
      title: 'Sistemas de impermeabilización para techos y terrazas',
      image: 'imagen/imagen20_20.jpg',
      rating: 4.9,
      reviews: 78,
      verified: true,
      hours: '1 día',
      languages: 'Español',
      location: 'Chorrillos • Chorrillos, Barranco, Surco'
    },
  ];
}
